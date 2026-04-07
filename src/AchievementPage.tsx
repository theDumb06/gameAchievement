import Achievement from "./Achievement";
import "./AchievementPage.css";
import { useState } from "react";

const achievements = [
  { id: 1, title: "First Win", description: "Won 1 match", completed: true },
  {
    id: 2,
    title: "Speedster",
    description: "Won in under 5 mins",
    completed: false,
  },
  {
    id: 3,
    title: "Unstoppable",
    description: "Won 10 matches in a row",
    completed: false,
  },
  {
    id: 4,
    title: "Collector",
    description: "Collected 100 items",
    completed: false,
  },
  {
    id: 5,
    title: "Explorer",
    description: "Visited all locations",
    completed: true,
  },
  {
    id: 6,
    title: "Master",
    description: "Reached max level",
    completed: false,
  },
  {
    id: 7,
    title: "Strategist",
    description: "Won with a unique strategy",
    completed: false,
  },
  {
    id: 8,
    title: "Team Player",
    description: "Won a team match",
    completed: false,
  },
];

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search achievements..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <button className="search-bar-button">Search</button>
    </div>
  );
}

function MyAchievement() {
  return (
    <div className="grid-layout">
      {achievements
        .filter((ach) => ach.completed)

        .map((achievement) => (
          <Achievement
            key={achievement.id}
            title={achievement.title}
            description={achievement.description}
          />
        ))}
    </div>
  );
}

function AchievementPage() {
  return (
    <div className="grid-layout">
      {achievements.map((achievement) => (
        <Achievement
          key={achievement.id}
          title={achievement.title}
          description={achievement.description}
        />
      ))}
    </div>
  );
}

function AchievementSwitch() {
  const [activeTab, setActiveTab] = useState("myAchievements");

  const renderComponent = () => {
    switch (activeTab) {
      case "myAchievements":
        return <MyAchievement />;
      case "allAchievements":
        return <AchievementPage />;
      default:
        return null;
    }
  };

  return (
    <div className="achievement-page">
      <SearchBar />
      <div className="tab-container">
      <button 
      className="tab-button"
      style={{
            background: activeTab === "myAchievements" ? "#ee0000" : "transparent",
          }}
        onClick={() => {
          setActiveTab("myAchievements");
        }}
      >
        {" "}
        My Achievements
      </button>
      <button
      className="tab-button" style={{
            background: activeTab === "allAchievements" ? "#ee0000" : "transparent",
          }}
        onClick={() => {
          setActiveTab("allAchievements");
        }}
      >
        {" "}
        All Achievement
      </button>
      
      
      </div>
      <div className="achievement-content">
        {renderComponent()}
        </div>
    </div>
  );
}

export default AchievementSwitch;
