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
      alert(res.message);
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
  interface NativeProgressProps {
    value: number; // Current value
    max?: number; // Total value, defaults to 1
  }

  const NativeProgressBar = ({ value, max = 100 }: NativeProgressProps) => {
    const percentage = (value / max) * 100;
    return (
      <div className={styles.progressBar} style={{ width: "100%" }}>
        <div className={styles.progressFill} style={{ width: `${percentage > 100 ? 100 : percentage}%` }}>
          <p className={styles.progressText}>{percentage >= 100 ? `Completed` : `${value}/${max}`}</p>
        </div>
        
      </div>
    );
  };

  return (
    <div className={styles.achievement}>
      <img src={achievementData.achievementURL} alt={achievementData.title} />
      <h2>{achievementData.title}</h2>
      <p>{achievementData.description}</p>

      <NativeProgressBar
        value={achievementData.progress || 0}
        max={achievementData.total}
      />
    </div>
  );
}

export { Achievement, UserAchievement };
