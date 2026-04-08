import LeaderboardEntry from "./LeaderboardEntry";
import LeaderboardStyle from './Leaderboard.module.css';

function ColumnName() {
  return (
    <div className={LeaderboardStyle.columnName}>
      <h2>Ranking</h2>
<h2>Player Name</h2>
<h2>Scores</h2>

    </div>
  );
}

function Leaderboard() {
  return (
    <>
    <ColumnName />
      {Array.from({ length: 10 }, (_, i) => (
        <LeaderboardEntry key={i} rank={i + 1} title={`Player ${i + 1}`} description={`Won ${i * 10} matches`} />
      ))}
    </>
  );
}

export default Leaderboard;