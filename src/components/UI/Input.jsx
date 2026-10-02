import "../../styles/ui.css";

export default function Input({ label, error, ...props }) {
  return (
    <label className="ui-field">
      {label ? <span className="ui-label">{label}</span> : null}
      <input className={`ui-input ${error ? "ui-input--error" : ""}`} {...props} />
      {error ? <span className="ui-error">{error}</span> : null}
    </label>
  );
}