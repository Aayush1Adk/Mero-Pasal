import { gh } from "../styles";

export default function Toast({ toast }) {
  if (!toast) return null;

  return (
    <div style={{
      position: "fixed", bottom: "24px", right: "24px", zIndex: 9999,
      background: toast.type === "err" ? gh.dangerBg : gh.successBg,
      color: "#fff", padding: "10px 20px", borderRadius: "6px",
      fontSize: "13px", fontWeight: 600, maxWidth: "340px",
      boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
      borderLeft: `3px solid ${toast.type === "err" ? "#ff7b72" : "#56d364"}`,
    }}>
      {toast.type === "err" ? "X  " : "OK  "}{toast.msg}
    </div>
  );
}