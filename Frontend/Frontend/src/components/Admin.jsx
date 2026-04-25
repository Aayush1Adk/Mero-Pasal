import { useState, useRef } from "react";
import { BASE, gh, inp, lbl, mkBtn, row, col } from "../styles";

export default function Admin({ categories, fetchAll, showToast, form, setForm, image, setImage }) {
  // Category States
  const [catTitle, setCatTitle] = useState("");
  const [editingCatId, setEditingCatId] = useState(null);
  const [editCatTitle, setEditCatTitle] = useState("");

  // Product States - now using props from parent
  const [loading, setLoading] = useState(false);
  const imgRef = useRef();

  // --- Category Actions ---
  const addCategory = async () => {
    if (!catTitle.trim()) return;
    try {
      const res = await fetch(`${BASE}/catagory/Add-Catagory`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: catTitle }),
      });
      if (res.ok) { showToast("Category added"); setCatTitle(""); fetchAll(); }
      else showToast("Category may already exist", "err");
    } catch { showToast("Network error", "err"); }
  };

  const deleteCategory = async (id) => {
    if (!window.confirm("Are you sure? Deleting this might affect products using it.")) return;
    try {
      const res = await fetch(`${BASE}/catagory/Delete-Catagory/${id}`, { method: "DELETE" });
      if (res.ok) { showToast("Category deleted"); fetchAll(); }
      else showToast("Failed to delete category", "err");
    } catch { showToast("Network error", "err"); }
  };

  const updateCategory = async (id) => {
    if (!editCatTitle.trim()) return;
    try {
      const res = await fetch(`${BASE}/catagory/Update-Catagory/${id}`, {
        method: "PATCH", // Change to "PUT" if your backend requires it
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editCatTitle }),
      });
      if (res.ok) { 
        showToast("Category updated"); 
        setEditingCatId(null); 
        fetchAll(); 
      }
      else showToast("Failed to update category", "err");
    } catch { showToast("Network error", "err"); }
  };

  const startCategoryEdit = (cat) => {
    setEditingCatId(cat._id);
    setEditCatTitle(cat.title);
  };

  // --- Product Actions ---
  const addProduct = async () => {
    if (!form.title || !form.catagory || !form.Details || !form.MP || !form.SP) {
      showToast("Please fill all required fields", "err"); return;
    }
    if (!image) { showToast("Please choose a product image", "err"); return; }
    
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    fd.append("image", image);
    
    try {
      setLoading(true);
      const res = await fetch(`${BASE}/product/Add-Product`, { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok) {
        showToast("Product added successfully!");
        setForm({ title: "", catagory: "", Details: "", MP: "", SP: "", offer: false, Discount: "" });
        setImage(null);
        fetchAll();
      } else showToast(data.error || "Failed to add product", "err");
    } catch { showToast("Network error", "err"); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "16px", alignItems: "start" }}>
      
      {/* ── Category Panel ── */}
      <div style={{ background: gh.surface, border: `1px solid ${gh.border}`, borderRadius: "6px", position: "sticky", top: "72px" }}>
        <div style={{ padding: "12px 16px", borderBottom: `1px solid ${gh.border}`, fontSize: "13px", fontWeight: 600, color: gh.text }}>
          Categories
        </div>
        <div style={{ padding: "16px" }}>
          <label style={lbl}>New category</label>
          <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
            <input style={inp} placeholder="e.g. Medicine" value={catTitle}
              onChange={e => setCatTitle(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addCategory()} />
            <button style={{ ...mkBtn("primary"), whiteSpace: "nowrap" }} onClick={addCategory}>Add</button>
          </div>
          <div style={{ fontSize: "12px", color: gh.muted, marginBottom: "8px" }}>
            Existing ({categories.length})
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", maxHeight: "300px", overflowY: "auto", paddingRight: "4px" }}>
            {categories.length === 0 ? (
              <div style={{ fontSize: "12px", color: gh.muted, fontStyle: "italic", padding: "8px 0" }}>No categories yet</div>
            ) : categories.map(cat => (
              <div key={cat._id} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "8px 10px", background: gh.surface2, borderRadius: "6px",
                border: `1px solid ${gh.borderMuted}`, fontSize: "13px", minHeight: "36px"
              }}>
                {editingCatId === cat._id ? (
                  // Edit Mode
                  <div style={{ display: "flex", gap: "6px", width: "100%" }}>
                    <input 
                      style={{ ...inp, padding: "2px 6px", fontSize: "12px" }} 
                      value={editCatTitle} 
                      onChange={e => setEditCatTitle(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && updateCategory(cat._id)}
                      autoFocus
                    />
                    <button style={{ ...mkBtn("primary"), padding: "2px 8px", fontSize: "11px" }} onClick={() => updateCategory(cat._id)}>Save</button>
                    <button style={{ ...mkBtn(), padding: "2px 8px", fontSize: "11px" }} onClick={() => setEditingCatId(null)}>Cancel</button>
                  </div>
                ) : (
                  // View Mode
                  <>
                    <span style={{ fontWeight: 500 }}>{cat.title}</span>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button 
                        style={{ background: "none", border: "none", color: "#388bfd", cursor: "pointer", fontSize: "12px", padding: 0 }} 
                        onClick={() => startCategoryEdit(cat)}>
                        Edit
                      </button>
                      <button 
                        style={{ background: "none", border: "none", color: gh.danger, cursor: "pointer", fontSize: "12px", padding: 0 }} 
                        onClick={() => deleteCategory(cat._id)}>
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Add Product Form ── */}
      <div style={{ background: gh.surface, border: `1px solid ${gh.border}`, borderRadius: "6px" }}>
        <div style={{ padding: "12px 16px", borderBottom: `1px solid ${gh.border}`, fontSize: "13px", fontWeight: 600 }}>
          Add New Product
        </div>
        <div style={{ padding: "20px" }}>
          <div style={row}>
            <div style={col}>
              <label style={lbl}>Title *</label>
              <input style={inp} placeholder="Product name" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            </div>
            <div style={col}>
              <label style={lbl}>Category *</label>
              <select style={inp} value={form.catagory} onChange={e => setForm({ ...form, catagory: e.target.value })}>
                <option value="">Select category...</option>
                {categories.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
              </select>
            </div>
          </div>
          <div style={row}>
            <div style={col}>
              <label style={lbl}>Market Price (MP) *</label>
              <input style={inp} type="number" placeholder="800" value={form.MP} onChange={e => setForm({ ...form, MP: e.target.value })} />
            </div>
            <div style={col}>
              <label style={lbl}>Selling Price (SP) *</label>
              <input style={inp} type="number" placeholder="750" value={form.SP} onChange={e => setForm({ ...form, SP: e.target.value })} />
            </div>
          </div>
          <div style={row}>
            <div style={col}>
              <label style={lbl}>Discount (%)</label>
              <input style={inp} type="number" placeholder="0" value={form.Discount} onChange={e => setForm({ ...form, Discount: e.target.value })} />
            </div>
            <div style={{ ...col, display: "flex", flexDirection: "column" }}>
              <label style={lbl}>Offer Active?</label>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingTop: "4px" }}>
                <input type="checkbox" id="offer-chk" checked={form.offer} onChange={e => setForm({ ...form, offer: e.target.checked })}
                  style={{ display: "block", width: "16px", height: "16px", cursor: "pointer", accentColor: gh.success }} />
                <label htmlFor="offer-chk" style={{ fontSize: "13px", color: form.offer ? gh.success : gh.muted, cursor: "pointer" }}>
                  {form.offer ? "Active" : "Inactive"}
                </label>
              </div>
            </div>
          </div>
          <div style={{ marginBottom: "12px" }}>
            <label style={lbl}>Product Details *</label>
            <textarea style={{ ...inp, height: "80px" }} placeholder="Describe the product..." value={form.Details} onChange={e => setForm({ ...form, Details: e.target.value })} />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={lbl}>Product Image *</label>
            <input ref={imgRef} type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} style={{ display: 'none' }} />
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <button style={mkBtn()} onClick={() => imgRef.current?.click()}>Choose Image</button>
              {image ? <span style={{ fontSize: "12px", color: gh.success }}>Selected: {image.name}</span> : <span style={{ fontSize: "12px", color: gh.muted }}>No file chosen</span>}
            </div>
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <button style={{ ...mkBtn("primary"), padding: "7px 28px", opacity: loading ? 0.6 : 1 }} onClick={addProduct} disabled={loading}>
              {loading ? "Uploading..." : "+ Add Product"}
            </button>
            <button style={mkBtn()} onClick={() => { setForm({ title: "", catagory: "", Details: "", MP: "", SP: "", offer: false, Discount: "" }); setImage(null); }}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}