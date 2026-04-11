import {  LogIn} from "lucide-react";
import menuStyle from "./Menu.module.css";
import TitleImage from "./assets/Janken Arena Icon.webp";
import JankenArenaIcon from "./assets/Janken Arena.webp";
import { Link, useLocation } from "react-router-dom"

function Menu() {
  return (
    <div className={menuStyle.navContainer}>
      <nav className={menuStyle.nav}>
        <li>
          <CustomLink href="/" className={menuStyle.siteTitle}>
            <img src={TitleImage} alt="logo" />
            <img src={JankenArenaIcon} alt="logo" />
          </CustomLink>
        </li>
        <ul>
          <CustomLink href="/profile"> PROFILE</CustomLink>
          <CustomLink href="/achievements"> ACHIEVEMENTS</CustomLink>
        </ul>
        <li>
          <CustomLink href="/login">
            LogIn
            <LogIn />
          </CustomLink>
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
  const path = useLocation();
  return (
    <li className={path.pathname === href ? menuStyle.active : ""}>
      <Link to={href}>
        {children}
      </Link>
    </li>
  );
}

export default Menu;
