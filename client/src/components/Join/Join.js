import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Join.css';

/*
class Join extends React.Component {
    render(props) {
        const [name, setName] = useState(''); // name is a state
        // setName is a setter on that state, parameter is name's initial value
        const [room, setRoom] = useState(''); // hooks

        return (
            <div className="joinOuterContainer">
                <div className="joinInnerContainer">
                    <h1 className="heading">Join</h1>

                    <div><input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} /></div>
                    <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} /></div>
                    
                    <Link
                     onClick={(event) => (!name || !room) ? event.preventDefault() : null}
                     to={`/chat?name=${name}&room=${room}`}>
                        <button className="button mt-20" type="submit">Sign In</button>
                    </Link>
                </div>
            </div>
        );
    }
}*/

const Join = () => {
    const [name, setName] = useState(''); // name is a state
    // setName is a setter on that state, parameter is name's initial value
    const [room, setRoom] = useState(''); // hooks

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div><input placeholder="Name" 
                 className="joinInput" type="text"
                 onChange={(event) => setName(event.target.value)} /></div>
                <div><input placeholder="Room"
                 className="joinInput mt-20" type="text"
                 onChange={(event) => setRoom(event.target.value)} /></div>
                <Link
                 onClick={(event) => (!name || !room) ? event.preventDefault() : null}
                 to={`/chat?name=${name}&room=${room}`}>
                    <button className="button mt-20" type="submit">Sign In</button>
                </Link>
            </div>
        </div>
    );
    // to is absolute path, goes to website/chat?name, etc.
    // href is relative path, goes to website/currentindex/chat
};

export default Join;