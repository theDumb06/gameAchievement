import Achievement from "./Achievement";

function MyAchievement() {
  return (
    <div className="achievement-page">
      <h1>My Achievements</h1>
      <Achievement />
      <Achievement />
      <Achievement />
    </div>
  );
}

function AchievementPage() {
  return (
    <div className="achievement-page">
      <h1>Achievements Page</h1>
      <Achievement />
      <Achievement />
      <Achievement />
    </div>
  );
}

export {MyAchievement,AchievementPage};