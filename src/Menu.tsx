import { LogIn } from "lucide-react";
import menuStyle from "./Menu.module.css";
import TitleImage from "./assets/Janken Arena Icon.webp";
import JankenArenaIcon from "./assets/Janken Arena.webp";
import { Link, useLocation } from "react-router-dom";

function Menu() {
  return (
    <div className={menuStyle.navContainer}>
      <nav className={menuStyle.nav}>
        <ul>
          <CustomLink href="/" className={menuStyle.siteTitle}>
            <img src={TitleImage} alt="logo" />
            <img src={JankenArenaIcon} alt="logo" />
          </CustomLink>
        </ul>
        <ul>
          <CustomLink href="/profile"> PROFILE</CustomLink>
          <CustomLink href="/achievements"> ACHIEVEMENTS</CustomLink>
          <CustomLink href="/about"> ABOUT</CustomLink>
        </ul>
        <ul>
          <CustomLink href="/login">
            LogIn
            <LogIn />
          </CustomLink>
        </ul>
      </nav>
    </div>
  );
}

type CustomLinkProps = {
  href: string;
  children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

function CustomLink({ href, children }: CustomLinkProps) {
  const path = useLocation();
  return (
    <li className={path.pathname === href ? menuStyle.active : ""}>
      <Link to={href}>{children}</Link>
    </li>
  );
}

export default Menu;
