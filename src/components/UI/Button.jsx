import "../../styles/ui.css";

export default function Button({ children, variant = "primary", ...props }) {
  return (
    <button className={`ui-btn ui-btn--${variant}`} {...props}>
      {children}
    </button>
  );
}