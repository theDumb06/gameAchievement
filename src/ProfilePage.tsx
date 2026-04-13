import profile from "./Profile.module.css";
import achievement from "./Achievement.module.css";
import heroImg from "./assets/react.svg";
import Achievement from "./Achievement";
import { useState } from "react";
import { Grid, List } from "lucide-react";

const achievements = [
  { id: 1, title: "First Win", description: "Won 1 match" },
  { id: 2, title: "Speedster", description: "Won in under 5 mins" },
  { id: 3, title: "Unstoppable", description: "Won 10 matches in a row" },
  { id: 4, title: "Collector", description: "Collected 100 items" },
  { id: 5, title: "Explorer", description: "Visited all locations" },
  { id: 6, title: "Master", description: "Reached max level" },
  { id: 7, title: "Strategist", description: "Won with a unique strategy" },
  { id: 8, title: "Team Player", description: "Won a team match" },
];

function ProfileBanner() {
  return (
    <div className={profile["profile-banner"]}>
      <ProfilePicture />
    </div>
  );
}

function ProfilePicture() {
  return (
    <div className={profile["profile-destails-container"]}>
      <div className={profile["profile-picture"]}>
        <img src={heroImg} alt="Profile" />
      </div>
      <div className={profile["profile-name"]}>
        <h2>Player Name</h2>
        <span>This is the players bio </span>
        <span>Level 42</span>
      </div>
    </div>
  );
}

function MyAchievement() {
  const [viewMode, setViewMode] = useState(true);

  const toggleViewMode = () => {
    setViewMode(!viewMode);
  };

  return (
    <>
      <div className={profile["toggle-container"]}>
        <button className={profile["toggle-button"]} onClick={toggleViewMode}>
          {viewMode ? (
            <>
              <List size={20} />
              <span>List View</span>
            </>
          ) : (
            <>
              <Grid size={20} />
              <span>Grid View</span>
            </>
          )}
        </button>
      </div>
      <div className={profile["scroll-content"]}>
        <div
          className={
            viewMode ? achievement["grid-layout"] : achievement["list-layout"]
          }
        >
          {achievements.map((ach) => (
            <Achievement
              key={ach.id}
              title={ach.title}
              description={ach.description}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function ProfilePage() {
  return (
    <div className={profile["profile-page"]}>
      <ProfileBanner />
      <div className={profile["achievement-container"]}>
        <MyAchievement />
      </div>
      <div className={profile["bottom-div"]}> </div>
    </div>
  );
}

export default ProfilePage;
