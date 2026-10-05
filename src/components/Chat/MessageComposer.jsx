import { useState } from "react";
import "../../styles/messageComposer.css";


export default function MessageComposer({ onSend }) {
  const [text, setText] = useState("");

  function submit(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText("");
  }

  return (
    <form className="composer" onSubmit={submit}>
      <input
        className="composer__input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe un mensaje..."
      />
      <button className="composer__btn" type="submit" disabled={!text.trim()}>
        Enviar
      </button>
    </form>
  );
}
