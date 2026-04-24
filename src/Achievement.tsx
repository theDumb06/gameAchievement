import styles from "./Achievement.module.css";
import { addProgress } from "./api/auth";

interface AchievementProps {
  id: string;
  title: string;
  achievementURL: string;
  description: string;
  total: number;
  progress?: number;
}

function Achievement(achievementData: AchievementProps) {
  console.log(achievementData.title);
  const handleClicked = async () => {
    try {
      console.log("Sending progress...");
      const res = await addProgress(achievementData.id, 1);
      alert("Progress added!");
      console.log("Progress added:", res);
    } catch (error) {
      alert("Failed to add progress. Please try again.");
      console.error("Error adding progress:", error);
    }
  };
  return (
    <div className={styles.achievement}>
      <img src={achievementData.achievementURL} alt={achievementData.title} />
      <h2>{achievementData.title}</h2>
      <p>{achievementData.description}</p>
      <p>Total: {achievementData.total}</p>
      <button onClick={handleClicked}>Add Progress</button>
    </div>
  );
}

function UserAchievement(achievementData: AchievementProps) {
  console.log("Achievement URL: " + achievementData.title);
  return (
    <div className={styles.achievement}>
      <img src={achievementData.achievementURL} alt={achievementData.title} />
      <h2>{achievementData.title}</h2>
      <p>{achievementData.description}</p>
      <p>Progress: {achievementData.progress}/{achievementData.total}</p>
    </div>
  );
}

export { Achievement, UserAchievement };
