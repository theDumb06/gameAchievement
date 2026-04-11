import LeaderboardEntry from "./LeaderboardEntry";
import LeaderboardStyle from "./Leaderboard.module.css";
import heroImg from "./assets/react.svg";

import { useState } from "react";

function ColumnName() {
  return (
    <div className={LeaderboardStyle.columnName}>
      <div className={LeaderboardStyle.rank}>
        {/* <img src={heroImg} alt="Rank" /> */}
        <h2>Ranking#</h2>
      </div>
      <h2>Player Name</h2>
      <h2>Scores</h2>
    </div>
  );
}

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={LeaderboardStyle.searchBar}>
      <input
        type="text"
        placeholder="Search achievements..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <button>Search</button>
    </div>
  );
}

function Leaderboard() {
  return (
    <div className={LeaderboardStyle.leaderboardContainer}>
      <div className={LeaderboardStyle.searchBarContainer}>
        <SearchBar />
      </div>
      <div className={LeaderboardStyle.container}>
        <ColumnName />
        <div className={LeaderboardStyle.slider}>
          <div className={LeaderboardStyle.sliderContainer}>
            {Array.from({ length: 100 }, (_, i) => (
              <LeaderboardEntry
                key={i}
                rank={i + 1}
                title={`Player ${i + 1}`}
                description={`Won ${i * 10} matches`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
