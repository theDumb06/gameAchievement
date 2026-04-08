import heroImg from "./assets/react.svg";
import leaderboardStyle from "./Leaderboard.module.css";

interface LeaderboardEntryProps {
  rank: number;
  title: string;
  description: string;
}
function Entry(entryData: LeaderboardEntryProps) {
  return (
    <div className={leaderboardStyle.leaderboardEntry}>
      <div className={leaderboardStyle.rank}>
        <img src={heroImg} alt={entryData.title} />
        <h2>{entryData.rank}</h2>
      </div>
      <h2>{entryData.title}</h2>
      <p>{entryData.description}</p>
    </div>
  );
}

export default Entry;
