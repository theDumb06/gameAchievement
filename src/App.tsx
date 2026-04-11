import Menu from "./Menu";
import AppStyle from "./App.module.css";
import Leaderboard from "./Leaderboard";
import ProfilePage from "./ProfilePage";
import AchievementSwitch from "./AchievementPage";
import PageBanner from "./PageBanner";

function App() {
  let componentPage;
  switch (window.location.pathname) {
    case "/#/":
      componentPage = <Leaderboard />;
      break;
    case "/#/profile":
      componentPage = <ProfilePage />;
      break;
    case "/#/achievements":
      componentPage = <AchievementSwitch />;
  }

  return (
    <>
      <Menu />
      <PageBanner/>
      <div className={AppStyle.contentContainer}> 
      {componentPage}
      </div>
    </>
  );
}

export default App;
