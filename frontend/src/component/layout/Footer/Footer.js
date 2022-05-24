import React from 'react';
import playstore from "../../../images/playstore.png";
import appstore from "../../../images/Appstore.png";
import MainLogo from "../../../images/MainLogo.png"
import "./Footer.css";

const Footer = () => {
    return (
        <footer>
            <div className="leftfooter">
                <h4>Download Our App</h4>
                <p>Download our app for android and IOS mobile phones</p>
                <img src={playstore} alt="playstoreicon" />
                <img src={appstore} alt="appstoreicon" />
            </div>
            <div className="midfooter">
                <img src={MainLogo} alt="mainlogo" />
                <p>Satisfying our customer is our first priority</p>
                <p>Copyrights 2021 &copy; Shopify Hub</p>

            </div>
            <div className="rightfooter">
                <h4>Follow Us</h4>
                <a href="http://instagram.com/syedwasiff">Instagram</a>
                <a href="http://instagram.com/syedwasiff">Facebook</a>
                <a href="http://instagram.com/syedwasiff">Twitter</a>
            </div>

        </footer>
    );
}

export default Footer
