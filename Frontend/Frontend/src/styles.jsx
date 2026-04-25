export const BASE = "http://localhost:3000";

export const gh = {
  bg: "#0d1117",
  surface: "#161b22",
  surface2: "#21262d",
  border: "#30363d",
  borderMuted: "#21262d",
  text: "#e6edf3",
  muted: "#8b949e",
  accent: "#58a6ff",
  success: "#3fb950",
  successBg: "#238636",
  danger: "#f85149",
  dangerBg: "#da3633",
  warning: "#d29922",
  btnBg: "#21262d",
  btnBorder: "#363b42",
};

export const inp = {
  background: gh.surface2, border: `1px solid ${gh.border}`, borderRadius: "6px",
  color: gh.text, padding: "5px 12px", fontSize: "13px", outline: "none",
  width: "100%", fontFamily: "inherit",
};

export const lbl = { fontSize: "12px", color: gh.muted, marginBottom: "4px", display: "block" };

export const mkBtn = (v = "default") => ({
  padding: "5px 16px", borderRadius: "6px", fontSize: "13px", cursor: "pointer",
  fontWeight: 500, fontFamily: "inherit", transition: "opacity 0.1s",
  background: v === "primary" ? gh.successBg : v === "danger" ? gh.dangerBg : v === "blue" ? "#1f6feb" : gh.btnBg,
  color: gh.text,
  border: `1px solid ${v === "primary" ? "#2ea043" : v === "danger" ? gh.danger : v === "blue" ? "#388bfd" : gh.btnBorder}`,
});

export const row = { display: "flex", gap: "12px", marginBottom: "12px" };
export const col = { flex: 1, minWidth: 0 };