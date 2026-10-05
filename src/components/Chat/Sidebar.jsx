import { useMemo, useState } from "react";
import "../../styles/sidebar.css";
import Avatar from "../UI/Avatar";
import Input from "../UI/Input";
import { CONTACTS } from "../../contexts/ChatContext";


export default function Sidebar({ chats, activeChatId, onSelectChat, query = "", setSearchParams, onNewChat }) {
  const [showNewChat, setShowNewChat] = useState(false);
  const list = useMemo(() => chats, [chats]);

  function submitSearch(e) {
    e.preventDefault();
  }

  function handleSearchChange(e) {
    setSearchParams({ query: e.target.value });
  }

  function handleNewChat(contact) {
    onNewChat?.(contact);
    setShowNewChat(false);
  }

  // Contactos que aún no tienen chat abierto
  const availableContacts = CONTACTS.filter(
    (c) => !chats.some((ch) => ch.name === c.name)
  );

  return (
    <>
      <div className="sidebar">
        {/* ── Barra de búsqueda + botón nuevo chat (pantallas grandes) ── */}
        <form className="sidebar__search" onSubmit={submitSearch}>
          <Input
            label={null}
            type="text"
            name="query"
            value={query}
            onChange={handleSearchChange}
            placeholder="Buscar chats..."
            aria-label="Buscar chats"
          />
          <button type="submit" className="sidebar__searchBtn">
            Buscar
          </button>
          <button
            type="button"
            className="sidebar__newBtn"
            title="Nuevo chat"
            aria-label="Nuevo chat"
            onClick={() => setShowNewChat(true)}
          >
            +
          </button>
        </form>

        {/* ── Lista de chats ── */}
        <div className="sidebar__list" role="list">
          {list.length === 0 ? (
            <div className="sidebar__empty">Sin resultados.</div>
          ) : (
            list.map((c) => {
              const isActive = String(c.id) === String(activeChatId);
              return (
                <div
                  key={c.id}
                  role="button"
                  tabIndex={0}
                  className={`sidebar__item ${isActive ? "sidebar__item--active" : ""}`}
                  onClick={() => onSelectChat?.(c.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelectChat?.(c.id);
                    }
                  }}
                >
                  <Avatar name={c.name} color={c.avatarColor} size={40} />
                  <div className="sidebar__meta">
                    <div className="sidebar__name">{c.name}</div>
                    <div className="sidebar__last">{c.lastMessage}</div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* ── Botón "+" inline en la tira horizontal ≤400px ── */}
        <button
          type="button"
          className="sidebar__stripNewBtn"
          title="Nuevo chat"
          aria-label="Nuevo chat"
          onClick={() => setShowNewChat(true)}
        >
          +
        </button>

        {/* ── Botón "+" solo visible en modo compacto ≤820px ── */}
        <div className="sidebar__newBtnCompact">
          <div className="sidebar__compact-divider" />
          <button
            type="button"
            className="sidebar__newBtn"
            title="Nuevo chat"
            aria-label="Nuevo chat"
            onClick={() => setShowNewChat(true)}
          >
            +
          </button>
        </div>
      </div>

      {/* ── Modal nuevo chat ── */}
      {showNewChat && (
        <div
          className="newChatOverlay"
          role="dialog"
          aria-modal="true"
          aria-label="Nuevo chat"
          onClick={(e) => { if (e.target === e.currentTarget) setShowNewChat(false); }}
        >
          <div className="newChatModal">
            <div className="newChatModal__header">
              <span className="newChatModal__title">Nuevo chat</span>
              <button
                className="newChatModal__close"
                onClick={() => setShowNewChat(false)}
                aria-label="Cerrar"
              >
                ×
              </button>
            </div>

            <div className="newChatModal__list">
              {availableContacts.length === 0 ? (
                <p style={{ color: "var(--muted)", fontSize: 14, margin: 0 }}>
                  Ya tenés un chat con todos tus contactos.
                </p>
              ) : (
                availableContacts.map((c) => (
                  <div
                    key={c.id}
                    className="newChatModal__contact"
                    role="button"
                    tabIndex={0}
                    onClick={() => handleNewChat(c)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleNewChat(c);
                      }
                    }}
                  >
                    <Avatar name={c.name} color={c.avatarColor} size={38} />
                    <span className="newChatModal__contactName">{c.name}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
