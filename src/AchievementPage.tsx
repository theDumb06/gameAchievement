import Achievement from "./Achievement";
import { useState } from "react";

function MyAchievement() {
  return (
    <div className="achievement-page">
      <h1>My Achievements</h1>
      <Achievement key={1} title="title" description="Description" />
      <Achievement key={2} title="Another Achievement" description="Another description" />
      <Achievement key={3} title="Yet Another Achievement" description="Yet another description"    />
    </div>
  );
}

function AchievementPage() {
  return (
    <div className="achievement-page">
      <h1>Achievements Page</h1>
      <Achievement key={1} title="title" description="Description" />
      <Achievement key={2} title="Another Achievement" description="Another description" />
      <Achievement key={3} title="Yet Another Achievement" description="Yet another description"    />
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
    <div>  
    <button onClick={() => {setActiveTab("myAchievements");}}> My Achievements</button>
    <button onClick={() => {setActiveTab("allAchievements");}}> All Achievement</button>
{renderComponent()}
    </div>

);
  
}

export default AchievementSwitch;