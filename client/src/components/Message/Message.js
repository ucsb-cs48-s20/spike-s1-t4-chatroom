import React from 'react';

import "./Message.css";

import ReactEmoji from "react-emoji";

// event object contains info about details of the event
const Message = (props) => {
    let isSentByCurrentUser = false;
    const trimmedName = props.name.trim().toLowerCase();

    if (props.message.user === trimmedName) {
        isSentByCurrentUser = true;
    }

    // JSX is an extension to javascript that allows for html to be 
    // stored in variables/return values
    // normally, we would use the class tag to assign CSS properties
    // here, it is JSX syntax, which uses className instead

    // differntiate chat elemnts between sent text and received text
    return(
        isSentByCurrentUser ? (
            <div className="messageContainer justifyEnd">
                <p className="sentText pr-10">{trimmedName}</p>
                <div className="messageBox backgroundBlue">
                    <p className="messageText colorWhite">{ReactEmoji.emojify(props.message.text)}</p>
                </div>
            </div>
        )
        : (
            <div className="messageContainer justifyStart">
                <div className="messageBox backgroundLight">
                    <p className="messageText colorDark">{ReactEmoji.emojify(props.message.text)}</p>
                </div>
                <p className="sentText pl-10">{props.message.user}</p>
            </div>
        )
    );
};

export default Message;