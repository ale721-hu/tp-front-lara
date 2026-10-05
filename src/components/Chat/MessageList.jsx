import { useEffect, useRef } from "react";
import "../../styles/messageList.css";


function formatTime(ts) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/**
 * Indicador de estado de lectura con doble barra // estilizada.
 * Solo se muestra en mensajes enviados por "me".
 */
function ReadStatus({ from, read }) {
  if (from !== "me") return null;
  return (
    <span
      className={`msg__readTick ${read ? "msg__readTick--read" : "msg__readTick--unread"}`}
      title={read ? "Leído" : "Enviado"}
      aria-label={read ? "Leído" : "Enviado"}
    >
      / /
    </span>
  );
}

export default function MessageList({ messages = [] }) {
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.scrollTo?.({ top: ref.current.scrollHeight, behavior: "smooth" });
  }, [messages?.length]);

  const list = Array.isArray(messages) ? messages : [];

  return (
    <div className="messageList" ref={ref}>
      {list.length === 0 ? (
        <div className="emptyState__sub" style={{ textAlign: "center", margin: "auto" }}>
          No hay mensajes en esta conversación. ¡Saluda para empezar!
        </div>
      ) : (
        list.map((m) => (
          <div key={m.id} className={`msg ${m.from === "me" ? "msg--me" : "msg--them"}`}>
            <div className="msg__bubble">
              <div className="msg__text">{m.text}</div>
              <div className="msg__meta">
                <span className="msg__time">{formatTime(m.ts)}</span>
                <ReadStatus from={m.from} read={m.read} />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
