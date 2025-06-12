import logo from "../../assets/images/logo.svg"

import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer-content">
            <img className="footer-logo" src={logo} alt="Logo de l'agence Kasa" />
            <p className="footer-p"> © 2020 Kasa. All rights reserved</p>
        </footer>
    );
};

export default Footer;