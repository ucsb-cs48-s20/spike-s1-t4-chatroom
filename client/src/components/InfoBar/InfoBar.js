import React from 'react';

import closeIcon from "../../icons/closeIcon.png";
import onlineIcon from "../../icons/onlineIcon.png";

import "./InfoBar.css";

const InfoBar = (props) => {
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <img
                    className="onlineIcon"
                    src={onlineIcon}
                />
                <h3>{props.room}</h3>
            </div>
            <div className="rightInnerContainer">
                <a href="/">
                    <img src={closeIcon} />
                </a>
            </div>
        </div>
    );
};

export default InfoBar;
