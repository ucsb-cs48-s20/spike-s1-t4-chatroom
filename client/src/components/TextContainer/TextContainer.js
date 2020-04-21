import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import "./TextContainer.css";


// messages is the box containing message components
// draws message components from the messages array in chat.js
// unique to each chat room
const TextContainer = (props) => {
    return(
        <div className="textContainer">
            {props.users ? 
                (
                    <div>
                        <h1>In Lobby:</h1>
                        <div className="activeContainer">
                            <h2>
                                {props.users.map(user => {
                                    return (
                                        <div key={user.name} className="activeItem">
                                            {user.name}
                                            <img src={onlineIcon}/>
                                        </div>
                                    );
                                })}
                            </h2>
                        </div>
                    </div>
                ) : null
            }
        </div>
    );
};

export default TextContainer;