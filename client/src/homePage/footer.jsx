import homeStyles from "../cssModules/homePage.module.css";
import { Outlet, Link, Navigate } from "react-router-dom";

export function Footer() {
  return (
    <footer id={"footer"} className={`${homeStyles.footer}`}>
      <div className={`${homeStyles.socialLinks}`}>
        <Link to="https://www.facebook.com/" target="_blank">
          <i className="fa-brands fa-facebook"></i>
        </Link>

        <Link to="https://twitter.com/" target="_blank">
          <i className="fa-brands fa-twitter"></i>
        </Link>

        <Link to="https://www.instagram.com/" target="_blank">
          <i className="fa-brands fa-instagram"></i>
        </Link>
      </div>

      <p>Copyright © 2024 ABC Inc</p>
    </footer>
  );
}
