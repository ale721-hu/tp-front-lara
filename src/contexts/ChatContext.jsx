import { createContext, useMemo, useState, useCallback, useEffect } from "react";


export const ChatContext = createContext(null);

const seedChats = [
  {
    id: "1",
    name: "Noelia",
    lastMessage: "¿Hoy te conectas?",
    avatarColor: "#2F6BFF",
    messages: [
      { id: "m1", from: "me", text: "¡Hey! Sí, hace rato.", ts: 1730000000000 },
      { id: "m2", from: "them", text: "Perfecto. ¿Hoy te conectas?", ts: 1730000060000 }
    ]
  },
  {
    id: "2",
    name: "Bruno",
    lastMessage: "Te paso el link",
    avatarColor: "#0B1B3A",
    messages: [
      { id: "m3", from: "them", text: "Te paso el link", ts: 1730000100000 }
    ]
  }
];

export function ChatProvider({ children }) {
  const [chats, setChats] = useState(() => {
    try {
      const saved = localStorage.getItem("tp_chats");
      return saved ? JSON.parse(saved) : seedChats;
    } catch {
      return seedChats;
    }
  });

  const [activeChatId, setActiveChatId] = useState(seedChats[0]?.id ?? null);

  useEffect(() => {
    try {
      localStorage.setItem("tp_chats", JSON.stringify(chats));
    } catch {
      // ignore
    }
  }, [chats]);

  const activeChat = useMemo(
    () => chats.find((c) => c.id === activeChatId) || null,
    [chats, activeChatId]
  );

  const sendMessage = useCallback((chatId, text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const now = Date.now();

    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id !== chatId) return chat;
        const newMsg = { id: `m_${now}`, from: "me", text: trimmed, ts: now };
        return {
          ...chat,
          lastMessage: trimmed,
          messages: [...chat.messages, newMsg]
        };
      })
    );
  }, []);

  const value = useMemo(
    () => ({ chats, setChats, activeChatId, setActiveChatId, activeChat, sendMessage }),
    [chats, activeChatId, activeChat, sendMessage]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}
