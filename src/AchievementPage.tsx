import { Achievement, UserAchievement } from "./Achievement";
import achievementPage from "./AchievementPage.module.css";
import achievement from "./Achievement.module.css";
import { useEffect, useState } from "react";
import { addAchievement, getUserAchievements } from "./api/auth";
import { getAchievements } from "./api/auth";
import { Grid, List } from "lucide-react";

function SearchBar({ onSearch }: { onSearch: (value: string) => void }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value); // 🔥 send to parent
  };

  return (
    <div className={achievementPage.searchBarContainer}>
      <div className={achievementPage["search-bar"]}>
        <input
          type="text"
          placeholder="Search achievements..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button onClick={() => onSearch(searchTerm)}>Search</button>
      </div>
    </div>
  );
}

function AddAchievement(props: { onAdded: () => void }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [achievementName, setAchievementName] = useState("");
  const [achievementDescription, setAchievementDescription] = useState("");
  const [targetValue, setTargetValue] = useState("");

  type AchievementType = "OneTime" | "Progressive";

  const [selected, setSelected] = useState<AchievementType>("OneTime");

  const options: AchievementType[] = ["OneTime", "Progressive"];

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
      props.onAdded();
      // Reset form fields
      setSelectedFile(null);
      setAchievementName("");
      setAchievementDescription("");
      setTargetValue("");
      setSelected("OneTime");
      alert("Achievement added successfully!");
    } catch (error) {
      console.error("Error adding achievement:", error);
      alert("Failed to add achievement. Please try again.");
    }
  };
  return (
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
  );
}

function MyAchievement(props: { viewMode: boolean; searchTerm: string }) {
  const [achievements, setAchievements] = useState<any[]>([]);
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const data = await getUserAchievements();
        setAchievements(data);
      } catch (error) {
        console.error("Error fetching achievements:", error);
      }
    };
    fetchAchievements();
  }, []);
  return (
    <div
      className={
        props.viewMode ? achievement["grid-layout"] : achievement["list-layout"]
      }
    >
      {achievements
      
      .filter((achievement) =>
        achievement.title.toLowerCase().includes(props.searchTerm.toLowerCase())
      )
      .map((achievement) => (
        <UserAchievement
          key={achievement.id}
          id={achievement.id}
          title={achievement.title}
          achievementURL={achievement.achievementURL}
          description={achievement.description}
          progress={achievement.progress}
          total={achievement.targetValue}
        />
      ))}
    </div>
  );
}

function AchievementPage(props: { viewMode: boolean; achievements: any[];  searchTerm: string;}) {
  return (
    <div
      className={
        props.viewMode ? achievement["grid-layout"] : achievement["list-layout"]
      }
    >
      {props.achievements
      .filter((achievement) =>
        achievement.title.toLowerCase().includes(props.searchTerm.toLowerCase())
      )
      .map((achievement) => (
        <Achievement
          key={achievement._id}
          id={achievement._id}
          title={achievement.title}
          achievementURL={achievement.achievementURL}
          description={achievement.description}
          total={achievement.targetValue}
        />
      ))}
    </div>
  );
}

function AchievementSwitch() {
  const [achievements, setAchievements] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAchievements = async () => {
    try {
      const data = await getAchievements();
      setAchievements(data);
    } catch (error) {
      console.error("Error fetching achievements:", error);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const [activeTab, setActiveTab] = useState("myAchievements");

  const [viewMode, setViewMode] = useState(true);

  const toggleViewMode = () => {
    setViewMode(!viewMode);
  };

  const renderComponent = () => {
    switch (activeTab) {
      case "myAchievements":
        return <MyAchievement viewMode={viewMode} searchTerm={searchTerm} />;
      case "allAchievements":
        return (
          <AchievementPage viewMode={viewMode} achievements={achievements} searchTerm={searchTerm} />
        );
      default:
        return null;
    }
  };

  return (
    <div className={achievementPage["achievement-page"]}>
      <div className={achievementPage.topBarContainer}>
        <SearchBar onSearch={setSearchTerm} />
        <AddAchievement onAdded={fetchAchievements} />
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
            <List size={20} />
              <span>List View</span>
            </>
          ) : (
            <>
            <Grid size={20} />
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
