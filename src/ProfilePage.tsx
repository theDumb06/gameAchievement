import profile from "./Profile.module.css";
import achievement from "./Achievement.module.css";
import heroImg from "./assets/react.svg";
import Achievement from "./Achievement";
import { useState, useEffect } from "react";
import { Grid, List } from "lucide-react";

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
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        // Fetch achievements for a specific user (replace 'user123' with dynamic user ID if available)
        const response = await fetch('http://localhost:5000/achievements/user123');
        if (!response.ok) {
          throw new Error('Failed to fetch achievements');
        }
        const data = await response.json();
        setAchievements(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  const toggleViewMode = () => {
    setViewMode(!viewMode);
  };

  if (loading) return <div>Loading achievements...</div>;
  if (error) return <div>Error: {error}</div>;

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
              key={ach._id} // Use _id from MongoDB
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
