import profile from "./Profile.module.css";
import achievement from "./Achievement.module.css";
import heroImg from "./assets/react.svg";
import { UserAchievement } from "./Achievement";
import { useRef, useEffect, useState } from "react";
import {
  getMe,
  updateProfilePic,
  updateProfileInfo,
  getUserAchievements,
} from "./api/auth";
import { Grid, List, Edit } from "lucide-react";

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

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    username: user.username,
    bio: user.bio || "",
  });

  const handleClick = () => {
    if (!isEditing) return; // disable upload when editing text
    fileInputRef.current?.click(); // trigger hidden input
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // preview
    const previewUrl = URL.createObjectURL(file);
    setImage(previewUrl);

    // upload to backend
    try {
      const updatedUser = await updateProfilePic(file);
      setImage(updatedUser.avatarUrl); // replace preview with real URL
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    // call your API here
    await updateProfileInfo(formData);

    setIsEditing(false);
  };

  return (
    <div className={profile["profile-destails-container"]}>
      <button className={profile.editButton} onClick={() => setIsEditing(true)}>
        <Edit size={20} />
      </button>
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
        {!isEditing ? (
          <h2>{user.username}</h2>
        ) : (
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        )}
        {/* BIO */}
        {!isEditing ? (
          <span>
            {" "}
            Bio:
            {" " + (user.bio || "This is the player's bio")}
          </span>
        ) : (
          <textarea name="bio" value={formData.bio} onChange={handleChange} />
        )}
        {isEditing && (
          <div>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        )}
        {isEditing || <span>Level: 42</span>}
      </div>
    </div>
  );
}

function MyAchievement() {
  const [viewMode, setViewMode] = useState(true);

  const toggleViewMode = () => {
    setViewMode(!viewMode);
  };

  const [achievements, setAchievements] = useState<any[]>([]);
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const data = await getUserAchievements();
        console.log("User Achievements:", data);
        setAchievements(data);
      } catch (error) {
        console.error("Error fetching achievements:", error);
      }
    };
    fetchAchievements();
  }, []);

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
            <UserAchievement
              key={ach.id}
              id={ach.id}
              title={ach.title}
              achievementURL={ach.achievementURL}
              description={ach.description}
              progress={ach.progress}
              total={ach.targetValue}
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
