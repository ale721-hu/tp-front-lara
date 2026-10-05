import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { useAuth } from "../hooks/useAuth";
import { useChatContext } from "../hooks/useChatContext";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import "../styles/loginPage.css";


export default function LoginPage() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const { chats, setActiveChatId } = useChatContext();

  const topChatId = chats?.[0]?.id || "1";

  useEffect(() => {
    if (user) navigate(`/chat/${topChatId}?query=`);
  }, [user, navigate, topChatId]);

  const validate = (vals) => {
    const e = {};
    if (!vals.name.trim()) e.name = "Escribe tu nombre de usuario.";
    return e;
  };

  const form = useForm({ name: "", password: "" }, validate);

  function onSubmit(e) {
    e.preventDefault();
    if (!form.canSubmit()) return;

    setUser({
      id: "me",
      name: form.values.name.trim(),
      avatarColor: "#2F6BFF"
    });

    if (setActiveChatId) {
      setActiveChatId(topChatId);
    }

    navigate(`/chat/${topChatId}?query=`);
  }

  return (
    <div className="loginPage">
      <div className="loginCard">
        <h1 className="loginTitle">Entrar a WhatsAPPX</h1>
        <p className="loginSubtitle">
          Bienvenido a WhatsAPPX
        </p>

        <form className="loginForm" onSubmit={onSubmit}>
          <Input
            label="Nombre de Usuario"
            name="name"
            value={form.values.name}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            placeholder="Ej. Carla"
            error={form.touched.name ? form.errors.name : ""}
            autoComplete="username"
          />

          <Input
            label="Contraseña"
            name="password"
            type="password"
            value={form.values.password}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            placeholder="••••••••"
            autoComplete="current-password"
            error={form.touched.password ? form.errors.password : ""}
          />

          <Button type="submit" variant="primary" disabled={!form.values.name.trim()}>
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
}
