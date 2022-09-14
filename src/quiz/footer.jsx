import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareFacebook,
  faSquareGithub,
  faSquareWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="social">
      <p> &copy; {year} Copyright Yahaya Abdullah Danjuma</p>
      <div className="social-icon">
        <a
          href="https://www.facebook.com/danjuma.yahaya.54943"
          className="social facebook"
          target="blank"
        >
          <FontAwesomeIcon icon={faSquareFacebook} />
        </a>
        <a
          href="https://api.whatsapp.com/send?phone=%2B2348104203088&text&app_absent=0"
          className="social whatsapp"
          target="blank"
        >
          <FontAwesomeIcon icon={faSquareWhatsapp} />
        </a>
        <a
          href="https://github.com/Dhanjuma"
          className="social whatsapp"
          target="blank"
        >
          <FontAwesomeIcon icon={faSquareGithub} />
        </a>
      </div>
    </footer>
  );
};
