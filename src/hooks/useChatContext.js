import { useContext } from "react";
import { ChatContext } from "../contexts/ChatContext";


export function useChatContext() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChatContext debe usarse dentro de ChatProvider");
  return ctx;
}

export default useChatContext;
