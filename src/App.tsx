import Menu from "./Menu";
import AppStyle from "./App.module.css";
import Leaderboard from "./Leaderboard";
import ProfilePage from "./ProfilePage";
import AchievementSwitch from "./AchievementPage";
import PageBanner from "./PageBanner";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import { Routes, Route } from "react-router-dom"

function App() {
 

  return (
    <>
      <Menu />
      <PageBanner/>
      <div className={AppStyle.contentContainer}> 
      <Routes>
          <Route path="/" element={<Leaderboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/achievements" element={<AchievementSwitch />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
