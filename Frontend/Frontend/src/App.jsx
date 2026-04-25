import { useState, useEffect, useCallback } from "react";
import { BASE, gh } from "./styles";
import Toast from "./components/Toast";
import Header from "./components/Header";
import Feed from "./components/Feed";
import Admin from "./components/Admin";
import Modal from "./components/Modal";

export default function App() {
  const [tab, setTab] = useState("feed");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toast, setToast] = useState(null);

  // Admin form state - persists across tab switches
  const [adminForm, setAdminForm] = useState({
    title: "", catagory: "", Details: "", MP: "", SP: "", offer: false, Discount: "",
  });
  const [adminImage, setAdminImage] = useState(null);

  

  const showToast = useCallback((msg, type = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);


  // fetchAll is now wrapped in useCallback to avoid missing dependency warning
  const fetchAll = useCallback(async () => {
    try {
      const [cRes, pRes] = await Promise.all([
        fetch(`${BASE}/catagory/Get-Catagory`),
        fetch(`${BASE}/product/ViewProduct`),
      ]);
      const cData = await cRes.json();
      const pData = await pRes.json();
      setCategories(cData.catagory || []);
      setProducts(pData.products || []);
    } catch {
      showToast("Cannot connect to server. Make sure it is running on port 3000.", "err");
    }
  }, [showToast]);

  const viewDetail = async (id) => {
    try {
      const res = await fetch(`${BASE}/product/ViewAllProduct/${id}`);
      const data = await res.json();
      setSelectedProduct(data.products);
    } catch { 
      showToast("Failed to load product details", "err"); 
    }
  };

  useEffect(() => {
    (async () => {
      await fetchAll();
    })();
  }, [fetchAll]);

  return (
    <div style={{ minHeight: "100vh", background: gh.bg, color: gh.text, fontFamily: "'SF Mono', 'Fira Code', 'Cascadia Code', monospace", fontSize: "14px" }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        input:focus, select:focus, textarea:focus { border-color: #58a6ff !important; outline: none; box-shadow: 0 0 0 3px rgba(88,166,255,0.12); }
        .pcard { transition: border-color 0.15s, background 0.15s; }
        .pcard:hover { border-color: #58a6ff !important; background: #1c2128 !important; }
        .nav-btn:hover { background: #21262d !important; }
        textarea { resize: vertical; font-family: inherit; }
        ::-webkit-scrollbar { width: 8px; } ::-webkit-scrollbar-track { background: #0d1117; }
        ::-webkit-scrollbar-thumb { background: #30363d; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #484f58; }
        select option { background: #21262d; color: #e6edf3; }
      `}</style>

      <Toast toast={toast} />
      
      <Header 
        tab={tab} 
        setTab={setTab} 
        productsCount={products.length} 
        categoriesCount={categories.length} 
      />

      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "28px 16px" }}>
        {tab === "feed" && (
          <Feed products={products} setTab={setTab} viewDetail={viewDetail} />
        )}

        {tab === "admin" && (
          <Admin 
            categories={categories} 
            fetchAll={fetchAll} 
            showToast={showToast}
            form={adminForm}
            setForm={setAdminForm}
            image={adminImage}
            setImage={setAdminImage}
          />
        )}
      </main>

      <Modal 
        product={selectedProduct} 
        setProduct={setSelectedProduct} 
        categories={categories} 
        fetchAll={fetchAll} 
        showToast={showToast} 
      />
    </div>
  );
}