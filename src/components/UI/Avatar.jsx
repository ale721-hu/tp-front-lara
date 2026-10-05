import "../../styles/ui.css";


export default function Avatar({ name = "", color = "#2F6BFF", size = 40 }) {
  const initials = (name || "?")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("") || "?";

  return (
    <div className="ui-avatar" style={{ width: size, height: size, background: color }}>
      <span>{initials}</span>
    </div>
  );
}
