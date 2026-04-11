import banner from "./assets/Background.webp";
import menuStyle from "./Menu.module.css"

function PageBanner() {
  return (
    <div className={menuStyle.topBannerBar}>
      <img src={banner} alt="" />
    </div>
  );
}

export default PageBanner;
