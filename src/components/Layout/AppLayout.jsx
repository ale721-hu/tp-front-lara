import { Outlet } from "react-router-dom";
import TopBar from "../Navigation/TopBar";
import "../../styles/appLayout.css";

export default function AppLayout() {
  return (
    <div className="appShell">
      <TopBar />
      <main className="appMain">
        <Outlet />
      </main>
    </div>
  );
}