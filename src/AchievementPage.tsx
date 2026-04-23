import Achievement from "./Achievement";
import achievementPage from "./AchievementPage.module.css";
import achievement from "./Achievement.module.css";
import { useState } from "react";
import { addAchievement } from "./api/auth";

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [achievementName, setAchievementName] = useState("");
  const [achievementDescription, setAchievementDescription] = useState("");
  const [targetValue, setTargetValue] = useState("");

  type AchievementType = "OneTime" | "Progressive";

  const [selected, setSelected] = useState<AchievementType>("OneTime");

  const options: AchievementType[] = ["OneTime", "Progressive"];

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async () => {
    console.log("Submitting achievement:");
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("title", achievementName);
    formData.append("description", achievementDescription);
    formData.append("type", selected);
    formData.append("targetValue", targetValue);

    try {
      await addAchievement(formData);
      // Reset form fields
      setSelectedFile(null);
      setAchievementName("");
      setAchievementDescription("");
      setTargetValue("");
      setSelected("OneTime");
    } catch (error) {
      console.error("Error adding achievement:", error);
    }
  };

  return (
    <>
      <div className={achievementPage.searchBarContainer}>
        <div className={achievementPage["search-bar"]}>
          <input
            type="text"
            placeholder="Search achievements..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className={achievementPage["search-bar-button"]}>
            Search
          </button>
        </div>
      </div>

      <div className={achievementPage.addAchievementContainer}>
        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
        />
        <input
          type="text"
          placeholder="Achievement Name"
          value={achievementName}
          onChange={(e) => setAchievementName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Achievement Description"
          value={achievementDescription}
          onChange={(e) => setAchievementDescription(e.target.value)}
        />

        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value as AchievementType)}
        >
          {options.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Target Value"
          value={selected === "OneTime" ? 1 : targetValue}
          onChange={(e) => setTargetValue(e.target.value)}
          disabled={selected === "OneTime"}
        />

        <button
          className={achievementPage["search-bar-button"]}
          onClick={handleSubmit}
        >
          Add
        </button>
      </div>
    </>
  );
}

function MyAchievement(props: { viewMode: boolean }) {
  return (
    <div
      className={
        props.viewMode ? achievement["grid-layout"] : achievement["list-layout"]
      }
    >
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

function AchievementPage(props: { viewMode: boolean }) {
  return (
    <div
      className={
        props.viewMode ? achievement["grid-layout"] : achievement["list-layout"]
      }
    >
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

  const [viewMode, setViewMode] = useState(true);

  const toggleViewMode = () => {
    setViewMode(!viewMode);
  };

  const renderComponent = () => {
    switch (activeTab) {
      case "myAchievements":
        return <MyAchievement viewMode={viewMode} />;
      case "allAchievements":
        return <AchievementPage viewMode={viewMode} />;
      default:
        return null;
    }
  };

  return (
    <div className={achievementPage["achievement-page"]}>
      <div className={achievementPage.topBarContainer}>
        <SearchBar />
      </div>

      <div className={achievementPage["tab-container"]}>
        <button
          className={`${achievementPage["tab-button"]} ${activeTab === "myAchievements" ? achievementPage["active"] : ""}`}
          onClick={() => {
            setActiveTab("myAchievements");
          }}
        >
          <h4>MY ACHIEVEMENTS</h4>
        </button>
        <button
          className={`${achievementPage["tab-button"]} ${activeTab === "allAchievements" ? achievementPage["active"] : ""}`}
          onClick={() => {
            setActiveTab("allAchievements");
          }}
        >
          <h4>ALL ACHIEVEMENTS</h4>
        </button>

        <button
          className={achievementPage["toggle-button"]}
          onClick={toggleViewMode}
        >
          {viewMode ? (
            <>
              <span>List View</span>
            </>
          ) : (
            <>
              <span>Grid View</span>
            </>
          )}
        </button>
      </div>

      <div className={achievementPage["achievement-content"]}>
        <div className={achievementPage["scroll-content"]}>
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}

export default AchievementSwitch;
