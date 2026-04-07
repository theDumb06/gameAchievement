import AchievementSwitch from "./AchievementPage";
import { useState } from "react";
import Leaderboard from "./Leaderboard";
import ProfilePage from "./ProfilePage";
import {User, Trophy, BarChart, MenuIcon} from "lucide-react";
import './Menu.css'

function Menu() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [open, setOpen] = useState(false);

  const renderComponent = () => {
    switch (activeTab) {
      case "Profile":
        return <ProfilePage />;
      case "Leaderboard":
        return <Leaderboard />;
      case "Achievements":
        return <AchievementSwitch />;
      default:
        return null;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div className={`menuSidebar ${open ? "open" : "closed"}`}>
        <button onClick={() => setOpen(!open)}
            className="menuButton"
            ><MenuIcon />{open && <span  className={`menuText ${open ? "show" : "hide"}`}>Menu</span>}</button>
    
        <button
          onClick={() => setActiveTab("Profile")}
          className="menuButton"
          style={{
            background: activeTab === "Profile" ? "#555" : "transparent",
          }}
        >
          <User />
          {open && <span> Profile</span>}
        </button>
        <button
          onClick={() => setActiveTab("Leaderboard")}
          className="menuButton"
          style={{
            background: activeTab === "Leaderboard" ? "#555" : "transparent",
          }}
        >
          <BarChart />
          {open && <span> Leaderboard</span>}
          
        </button>
        <button
          onClick={() => setActiveTab("Achievements")}
          className="menuButton"
          style={{
            background: activeTab === "Achievements" ? "#555" : "transparent",
          }}
        >
            <Trophy />
            {open && <span> Achievements</span>}
        </button>
      </div>
      {/* Main Content */}
      <div className="mainContent">{renderComponent()}</div>
    </div>
  );
}

export default Menu;
