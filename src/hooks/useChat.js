import { useEffect, useMemo, useCallback } from "react";
import { useChatContext } from "./useChatContext";
import { useSearchParams } from "react-router-dom";

export default function useChat() {
  const { chats, setChats, activeChatId, setActiveChatId, activeChat, sendMessage } = useChatContext();
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("query") || "").toLowerCase();

  const filteredChats = useMemo(() => {
    if (!query) return chats;
    return chats.filter((c) => c.name.toLowerCase().includes(query));
  }, [chats, query]);

  // Si viene query (buscar), intenta seleccionar el PRIMERO que coincida
  useEffect(() => {
    if (!query) return;
    if (filteredChats.length === 0) return;
    if (!activeChatId || !filteredChats.some((c) => c.id === activeChatId)) {
      setActiveChatId(filteredChats[0].id);
    }
  }, [query, filteredChats, activeChatId, setActiveChatId]);

  const handleSend = useCallback((text) => {
    if (!activeChatId) return;
    sendMessage(activeChatId, text);
  }, [activeChatId, sendMessage]);

  return {
    chats,
    setChats,
    filteredChats,
    activeChatId,
    setActiveChatId,
    activeChat,
    query,
    handleSend
  };
}