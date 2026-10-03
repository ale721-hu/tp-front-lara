import "../../styles/emptyState.css";
import Button from "../UI/Button";

export default function EmptyState({ onSelectFirstChat }) {
  return (
    <div className="emptyState">
      <div className="emptyState__title">Selecciona un chat</div>
      <div className="emptyState__sub">Usa la barra lateral para abrir una conversación existente o buscar contactos.</div>
      {onSelectFirstChat && (
        <div style={{ marginTop: "12px" }}>
          <Button onClick={onSelectFirstChat} variant="primary">
            Abrir primer chat
          </Button>
        </div>
      )}
    </div>
  );
}