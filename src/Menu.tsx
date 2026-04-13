import { LogIn } from "lucide-react";
import menuStyle from "./Menu.module.css";
import TitleImage from "./assets/Janken Arena Icon.svg";
import JankenArenaIcon from "./assets/Janken Arena.svg";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function Menu() {
  const [hide, setHide] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      setHide(window.scrollY > lastScrollY.current);
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`${menuStyle.navContainer} ${hide ? menuStyle.hide : menuStyle.show}`}
    >
      <nav className={menuStyle.nav}>
        <ul>
          <CustomLink href="/" >
            <div className={menuStyle.siteTitle}> 
              <img
                className={menuStyle.titleLogo}
                src={TitleImage}
                alt="logo"
              />
              <img
                className={menuStyle.title}
                src={JankenArenaIcon}
                alt="logo"
              />
            </div>
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
