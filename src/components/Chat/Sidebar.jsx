import { useMemo } from "react";
import "../../styles/sidebar.css";
import Avatar from "../UI/Avatar";
import Input from "../UI/Input";

export default function Sidebar({ chats, activeChatId, onSelectChat, query = "", setSearchParams }) {
  const list = useMemo(() => chats, [chats]);

  function submitSearch(e) {
    e.preventDefault();
  }

  function handleSearchChange(e) {
    setSearchParams({ query: e.target.value });
  }

  return (
    <div className="sidebar">
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
      </form>

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
    </div>
  );
}