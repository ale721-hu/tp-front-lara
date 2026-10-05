import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import useChat from "../hooks/useChat";
import Sidebar from "../components/Chat/Sidebar";
import ChatHeader from "../components/Chat/ChatHeader";
import MessageList from "../components/Chat/MessageList";
import MessageComposer from "../components/Chat/MessageComposer";
import EmptyState from "../components/Chat/EmptyState";
import "../styles/chatPage.css";


export default function ChatPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { chatId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { activeChat, activeChatId, setActiveChatId, filteredChats, handleSend } = useChat();

  // Seguridad: si no hay usuario, vuelve a login
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  // Sincronizar el chatId de la URL con el chat activo en el contexto
  useEffect(() => {
    if (chatId && chatId !== activeChatId) {
      setActiveChatId(chatId);
    }
  }, [chatId, activeChatId, setActiveChatId]);

  useEffect(() => {
    if (!searchParams.has("query")) setSearchParams({ query: "" }, { replace: true });
  }, [searchParams, setSearchParams]);

  const query = (searchParams.get("query") || "").trim();

  const handleSelectChat = (selectedId) => {
    setActiveChatId(selectedId);
    navigate(`/chat/${selectedId}${query ? `?query=${encodeURIComponent(query)}` : ""}`);
  };

  return (
    <div className="chatPage">
      <div className="chatGrid">
        <aside className="chatSidebarWrap">
          <Sidebar
            chats={filteredChats}
            activeChatId={activeChatId || chatId}
            onSelectChat={handleSelectChat}
            query={query}
            setSearchParams={setSearchParams}
          />
        </aside>

        <section className="chatMain">
          {activeChat ? (
            <div className="chatCard">
              <ChatHeader name={activeChat.name} avatarColor={activeChat.avatarColor} />
              <MessageList messages={activeChat.messages} />
              <MessageComposer onSend={handleSend} />
            </div>
          ) : (
            <div className="chatCard">
              <EmptyState onSelectFirstChat={() => filteredChats[0] && handleSelectChat(filteredChats[0].id)} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
