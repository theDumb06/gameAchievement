import AchievementSwitch from "./AchievementPage";
import { useState } from "react";
import Leaderboard from "./Leaderboard";
import ProfilePage from "./ProfilePage";
import {User, Trophy, BarChart, MenuIcon} from "lucide-react";
import menuStyle from './Menu.module.css'

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
    <div >
      {/* Sidebar */}
      <div className={menuStyle.topBar}>
        {/* ` ${menuStyle["menuSidebar"] } ${open ? "open" : "closed"}` */}
        <button onClick={() => setOpen(!open)}
            className= {menuStyle["menuButton"]} 
            ><MenuIcon />{open && <span  className={open ? "show" : "hide"}>Menu</span>}</button>
    
        <button
          onClick={() => setActiveTab("Profile")}
          className={menuStyle["menuButton"]}
          style={{
            background: activeTab === "Profile" ? "#555" : "transparent",
          }}
        >
          <User />
          {open && <span> Profile</span>}
        </button>
        <button
          onClick={() => setActiveTab("Leaderboard")}
          className= {menuStyle["menuButton"] }
          style={{
            background: activeTab === "Leaderboard" ? "#555" : "transparent",
          }}
        >
          <BarChart />
          {open && <span> Leaderboard</span>}
          
        </button>
        <button
          onClick={() => setActiveTab("Achievements")}
          className= {menuStyle.menuButton}
          style={{
            background: activeTab === "Achievements" ? "#555" : "transparent",
          }}
        >
            <Trophy />
            {open && <span> Achievements</span>}
        </button>
      </div>
      <div className={menuStyle.mainContent}>{renderComponent()}</div>
    </div>
  );
}

export default Menu;
