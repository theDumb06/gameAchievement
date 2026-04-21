import profile from "./Profile.module.css";
import achievement from "./Achievement.module.css";
import heroImg from "./assets/react.svg";
import Achievement from "./Achievement";
import { useRef, useEffect, useState } from "react";
import { getMe } from "./api/auth";
import { Grid, List } from "lucide-react";

type AchievementItem = {
  id: number;
  title: string;
  description: string;
};

type User = {
  username: string;
  email: string;
  achievements: AchievementItem[];
  bio?: string;
  avatarUrl?: string;
};

const achievements: AchievementItem[] = [
  { id: 1, title: "First Win", description: "Won 1 match" },
  { id: 2, title: "Speedster", description: "Won in under 5 mins" },
  { id: 3, title: "Unstoppable", description: "Won 10 matches in a row" },
  { id: 4, title: "Collector", description: "Collected 100 items" },
  { id: 5, title: "Explorer", description: "Visited all locations" },
  { id: 6, title: "Master", description: "Reached max level" },
  { id: 7, title: "Strategist", description: "Won with a unique strategy" },
  { id: 8, title: "Team Player", description: "Won a team match" },
];

function ProfileBanner({ user }: { user: User }) {
  return (
    <div className={profile["profile-banner"]}>
      <ProfilePicture user={user} />
    </div>
  );
}

function ProfilePicture({ user }: { user: User }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string>(user.avatarUrl || heroImg);

  const handleClick = () => {
    fileInputRef.current?.click(); // trigger hidden input
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file); // preview
    setImage(imageUrl);
  };

  return (
    <div className={profile["profile-destails-container"]}>
      <div className={profile["profile-picture"]} onClick={handleClick}>
        <input
          type="file"
          className={profile["uploadInput"]}
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
        />
        <img src={image} alt="Profile" />
      </div>
      <div className={profile["profile-name"]}>
        <h2>{user.username}</h2>
        <span>{user.bio || "This is the player's bio"}</span>
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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getMe();
        setUser(userData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading || !user) {
    return <h1>Loading profile...</h1>;
  }

  if (!user) {
    return <h1>Failed to load profile</h1>;
  }

  return (
    <div className={profile["profile-page"]}>
      <ProfileBanner user={user} />
      <div className={profile["achievement-container"]}>
        <MyAchievement />
      </div>
      <div className={profile["bottom-div"]}> </div>
    </div>
  );
}

export default ProfilePage;
