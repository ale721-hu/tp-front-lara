import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useChatContext } from "../../hooks/useChatContext";
import Avatar from "../UI/Avatar";
import "../../styles/topBar.css";


export default function TopBar() {
  const { user, logout } = useAuth();
  const { chats } = useChatContext();
  const navigate = useNavigate();

  const topChatId = chats?.[0]?.id || "1";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="topbar">
      <NavLink to={user ? `/chat/${topChatId}?query=` : "/login"} className="topbar__brand">
        <span className="brand-full">WhatsAPPX</span>
        <span className="brand-short">WAppX</span>
      </NavLink>

      <nav className="topbar__nav">
        {user ? (
          <div className="topbar__userGroup">
            <div className="topbar__userInfo">
              <Avatar name={user.name} color={user.avatarColor || "#2F6BFF"} size={30} />
              <span className="topbar__userName">{user.name}</span>
            </div>
            <button type="button" onClick={handleLogout} className="topbar__logoutBtn">
              Salir
            </button>
          </div>
        ) : (
          <NavLink to="/login" className={({ isActive }) => (isActive ? "topbar__link isActive" : "topbar__link")}>
            Acceder
          </NavLink>
        )}
      </nav>
    </header>
  );
}
