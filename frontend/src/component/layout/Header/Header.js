import React from 'react';
import { ReactNavbar } from "overlay-navbar";
import MainLogo from "../../../images/MainLogo.png";

const options = {
    burgerColor: "#531C92",
    burgerColorHover: "#531C92",
    logo: MainLogo,
    logoWidth: "15vmax",
    navColor1: "rgb(0, 0, 0, 0.9)",
    logoHoverSize: "10px",
    logoHoverColor: "none",
    link1Text: "Home",
    link2Text: "Products",
    link3Text: "Contact",
    link4Text: "About",
    link1Url: "/",
    link2Url: "/products",
    link3Url: "/contact",
    link4Url: "/about",
    link1Size: "1.3vmax",
    link1Color: "#fff",
    nav1justifyContent: "flex-end",
    nav2justifyContent: "flex-end",
    nav3justifyContent: "flex-start",
    nav4justifyContent: "flex-start",
    link1ColorHover: "#531C92",
    link1Margin: "1vmax",
    profileIconUrl: "/login",
    profileIconColor: "#fff",
    searchIconColor: "#fff",
    cartIconColor: "#fff",
    profileIconColorHover: "#531C92",
    searchIconColorHover: "#531C92",
    cartIconColorHover: "#531C92",
    cartIconMargin: "1vmax",

}

const Header = () => {
    return <ReactNavbar {...options} />;
}

export default Header