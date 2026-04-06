import './Profile.css';
import './Achievement.css';
import heroImg from './assets/react.svg'
import Achievement from './Achievement';

const achievements = [
  { id: 1, title: 'First Win', description: 'Won 1 match' },
  { id: 2, title: 'Speedster', description: 'Won in under 5 mins' },
  { id: 3, title: 'Unstoppable', description: 'Won 10 matches in a row' },
  { id: 4, title: 'Collector', description: 'Collected 100 items' },
];
  

function ProfileBanner() {
  return (
    <div className="profile-banner">
      Banner Text
      <div className="profile-picture">
        <img src={heroImg} alt="Profile" />
      </div>
    </div>
  );
}

function MyAchievement() {  
    return (
    <div className= "list-layout">
      {achievements.map((ach) => (
        <Achievement key={ach.id} title={ach.title} description={ach.description} />
      ))}
    </div>
    );
}

function ProfilePage() {
  return (
    <div className="profile-page">
        <ProfileBanner />
        <div className='achievement-conatiner'><MyAchievement /></div>
    </div>
  );
}

export default ProfilePage;