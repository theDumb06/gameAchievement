import banner from "./assets/Background.webp";
import menuStyle from "./Menu.module.css";

function PageBanner() {
  return (
    <div className={menuStyle.topBannerBar}>
      <div className={menuStyle.imageContainer}>
        <img src={banner} alt="" />
        
      </div>
    </div>
  );
}

export default PageBanner;
