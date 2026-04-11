import {  LogIn} from "lucide-react";
import menuStyle from "./Menu.module.css";
import TitleImage from "./assets/Janken Arena Icon.webp";
import JankenArenaIcon from "./assets/Janken Arena.webp";

function Menu() {
  return (
    <div className={menuStyle.navContainer}>
      <nav className={menuStyle.nav}>
        <li>
          <a href="/#/" className={menuStyle.siteTitle}>
            <img src={TitleImage} alt="logo" />
            <img src={JankenArenaIcon} alt="logo" />
          </a>
        </li>
        <ul>
          <CustomLink href="/#/profile"> PROFILE</CustomLink>
          <CustomLink href="/#/achievements"> ACHIEVEMENTS</CustomLink>
        </ul>
        <li>
          <a href="/#/login">
            LogIn
            <LogIn />
          </a>
        </li>
      </nav>
    </div>
  );
}

type CustomLinkProps = {
  href: string;
  children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

function CustomLink({ href, children, ...props }: CustomLinkProps) {
  const path = window.location.pathname;
  return (
    <li className={path === href ? menuStyle.active : ""}>
      <a href={href} {...props}>
        {children}
      </a>
    </li>
  );
}

export default Menu;
