import { AchievementPage, MyAchievement } from "./AchievementPage";
import Leaderboard from "./Leaderboard";
import ProfilePage from "./ProfilePage";
function Menu() {
  return (
    <div className="menu">
      <h1>Menu</h1>
      <AchievementPage />
      <MyAchievement />
      <ProfilePage />
        <Leaderboard />
    </div>
  );
}

export default Menu;