import "../../styles/chatHeader.css";
import Avatar from "../UI/Avatar";


export default function ChatHeader({ name, avatarColor = "#2F6BFF" }) {
  return (
    <div className="chatHeader">
      <div className="chatHeader__left">
        <Avatar name={name || "Chat"} color={avatarColor} size={36} />
        <div>
          <div className="chatHeader__title">{name}</div>
          <div className="chatHeader__status">
            <span className="chatHeader__pulse" />
            <span>En línea</span>
          </div>
        </div>
      </div>
    </div>
  );
}
