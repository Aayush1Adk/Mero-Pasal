import { useState, useRef, useEffect } from "react";
import { BASE, gh, inp, lbl, mkBtn, row, col } from "../styles";

export default function Modal({ product, setProduct, categories, fetchAll, showToast }) {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [editImage, setEditImage] = useState(null);
  const editImgRef = useRef();

  // Reset states when a new product is selected
  useEffect(() => {
    setTimeout(() => {
      setEditMode(false);
      setEditImage(null);
    }, 0);
  }, [product]);

  if (!product) return null;

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product? This cannot be undone.")) return;
    const res = await fetch(`${BASE}/product/Delete-Product/${id}`, { method: "DELETE" });
    if (res.ok) { showToast("Product deleted"); setProduct(null); fetchAll(); }
    else showToast("Delete failed", "err");
  };

  const startEdit = () => {
    setEditForm({
      title: product.title,
      catagory: product.catagory?._id || "",
      Details: product.Details,
      MP: product.MP,
      SP: product.SP,
      offer: product.offer || false,
      Discount: product.Discount || "",
    });
    setEditImage(null);
    setEditMode(true);
  };

  const saveEdit = async () => {
    const fd = new FormData();
    if (editForm.title) fd.append("title", editForm.title);
    if (editForm.catagory) fd.append("catagory", editForm.catagory);
    if (editForm.Details) fd.append("Details", editForm.Details);
    if (editForm.MP) fd.append("MP", editForm.MP);
    if (editForm.SP) fd.append("SP", editForm.SP);
    if (editForm.Discount) fd.append("Discount", editForm.Discount);
    fd.append("offer", editForm.offer);
    if (editImage) fd.append("image", editImage);
    
    try {
      setLoading(true);
      const res = await fetch(`${BASE}/product/Update-Product/${product._id}`, { method: "PATCH", body: fd });
      if (res.ok) {
        showToast("Product updated!");
        setEditMode(false);
        // Refresh detail view
        const detailRes = await fetch(`${BASE}/product/ViewAllProduct/${product._id}`);
        const data = await detailRes.json();
        setProduct(data.products);
        fetchAll();
      } else showToast("Update failed", "err");
    } catch { showToast("Network error", "err"); }
    finally { setLoading(false); }
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(1,4,9,0.8)",
      display: "flex", alignItems: "flex-start", justifyContent: "center",
      zIndex: 100, padding: "48px 16px 24px", overflowY: "auto",
    }} onClick={() => setProduct(null)}>
      <div onClick={e => e.stopPropagation()} style={{
        background: gh.surface, border: `1px solid ${gh.border}`,
        borderRadius: "12px", width: "100%", maxWidth: "580px", overflow: "hidden",
        boxShadow: "0 16px 64px rgba(0,0,0,0.7)",
      }}>
        {!editMode && product.image && (
          <div style={{ position: "relative" }}>
            <img src={product.image} alt={product.title} style={{ width: "100%", height: "200px", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 60%, #161b22)" }} />
          </div>
        )}

        <div style={{ padding: "20px" }}>
          {!editMode ? (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <div>
                  <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "6px" }}>{product.title}</h2>
                  <span style={{ fontSize: "12px", color: gh.muted, background: gh.surface2, padding: "2px 10px", borderRadius: "12px", border: `1px solid ${gh.border}` }}>
                    {product.catagory?.title}
                  </span>
                </div>
                <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                  <button style={mkBtn("blue")} onClick={startEdit}>Edit</button>
                  <button style={mkBtn("danger")} onClick={() => deleteProduct(product._id)}>Delete</button>
                  <button style={mkBtn()} onClick={() => setProduct(null)}>Close</button>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "16px" }}>
                {[
                  ["Market Price", `Rs. ${product.MP}`, gh.text],
                  ["Selling Price", `Rs. ${product.SP}`, gh.accent],
                  ["Discount", product.Discount ? `${product.Discount}%` : "—", gh.warning],
                  ["Offer", product.offer ? "Active" : "None", product.offer ? gh.success : gh.muted],
                ].map(([k, v, color]) => (
                  <div key={k} style={{ background: gh.surface2, borderRadius: "6px", padding: "10px 14px", border: `1px solid ${gh.borderMuted}` }}>
                    <div style={{ fontSize: "11px", color: gh.muted, marginBottom: "3px" }}>{k}</div>
                    <div style={{ fontSize: "15px", fontWeight: 700, color }}>{v}</div>
                  </div>
                ))}
              </div>

              {product.Details && (
                <div style={{ background: gh.surface2, borderRadius: "6px", padding: "12px 14px", border: `1px solid ${gh.borderMuted}`, fontSize: "13px", color: gh.muted, lineHeight: "1.7" }}>
                  {product.Details}
                </div>
              )}
            </>
          ) : (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h2 style={{ fontSize: "16px", fontWeight: 600 }}>Edit Product</h2>
                <button style={mkBtn()} onClick={() => setEditMode(false)}>Cancel</button>
              </div>
              <div style={row}>
                <div style={col}>
                  <label style={lbl}>Title</label>
                  <input style={inp} value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })} />
                </div>
                <div style={col}>
                  <label style={lbl}>Category</label>
                  <select style={inp} value={editForm.catagory} onChange={e => setEditForm({ ...editForm, catagory: e.target.value })}>
                    {categories.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
                  </select>
                </div>
              </div>
              <div style={row}>
                <div style={col}>
                  <label style={lbl}>Market Price (MP)</label>
                  <input style={inp} type="number" value={editForm.MP} onChange={e => setEditForm({ ...editForm, MP: e.target.value })} />
                </div>
                <div style={col}>
                  <label style={lbl}>Selling Price (SP)</label>
                  <input style={inp} type="number" value={editForm.SP} onChange={e => setEditForm({ ...editForm, SP: e.target.value })} />
                </div>
              </div>
              <div style={row}>
                <div style={col}>
                  <label style={lbl}>Discount (%)</label>
                  <input style={inp} type="number" value={editForm.Discount} onChange={e => setEditForm({ ...editForm, Discount: e.target.value })} />
                </div>
                <div style={{ ...col, display: "flex", flexDirection: "column" }}>
                  <label style={lbl}>Offer</label>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingTop: "4px" }}>
                    <input type="checkbox" id="edit-offer" checked={editForm.offer} onChange={e => setEditForm({ ...editForm, offer: e.target.checked })}
                      style={{ display: "block", width: "16px", height: "16px", cursor: "pointer", accentColor: gh.success }} />
                    <label htmlFor="edit-offer" style={{ fontSize: "13px", color: editForm.offer ? gh.success : gh.muted, cursor: "pointer" }}>
                      {editForm.offer ? "Active" : "Inactive"}
                    </label>
                  </div>
                </div>
              </div>
              <div style={{ marginBottom: "12px" }}>
                <label style={lbl}>Details</label>
                <textarea style={{ ...inp, height: "72px" }} value={editForm.Details} onChange={e => setEditForm({ ...editForm, Details: e.target.value })} />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={lbl}>New Image (leave empty to keep current)</label>
                <input ref={editImgRef} type="file" accept="image/*" onChange={e => setEditImage(e.target.files[0])} style={{ display: 'none' }} />
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <button style={mkBtn()} onClick={() => editImgRef.current?.click()}>Change Image</button>
                  {editImage ? <span style={{ fontSize: "12px", color: gh.success }}>Selected: {editImage.name}</span> : <span style={{ fontSize: "12px", color: gh.muted }}>Keeping current image</span>}
                </div>
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <button style={{ ...mkBtn("primary"), padding: "7px 28px", opacity: loading ? 0.6 : 1 }} onClick={saveEdit} disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button style={mkBtn()} onClick={() => setEditMode(false)}>Cancel</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}