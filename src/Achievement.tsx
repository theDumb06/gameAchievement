import heroImg from './assets/react.svg'
import './Achievement.css';
interface AchievementProps {
  title: string;
  description: string;
}

function Achievement(achievementData: AchievementProps) {
  return (
    <div className="achievement">
      <img src={heroImg} alt={achievementData.title} />
      <h2>{achievementData.title}</h2>
      <p>{achievementData.description}</p>
    </div>
  );
}

export default Achievement;