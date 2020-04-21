import React, { useState, useEffect } from "react";
import queryString from "query-string"; // module helps w/ retrieving data from url
import io from "socket.io-client";
import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';

/*
class Chat extends React.Component {
    render(props) {
        useEffect(() => {
            const data = queryString.parse(location.search);
            
            console.log(location.search);
            console.log(data)
        });

        return (
            <h1>Chat</h1>
        );
    }
}*/

// data will be passed to the socket
let socket;

// useEffect calls is a hook that lets u use lifecycle methods/side effects
// in function components.

// hooks does something when user disconnects
const Chat = (props) => {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [users, setUsers] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    // const ENDPOINT = "https://react-chatv2.herokuapp.com/";
    const ENDPOINT = "localhost:5000";

    // runs when component renders
    useEffect(() => {
        // first step: fetches user query data
        const data = queryString.parse(props.location.search);

        socket = io(ENDPOINT); // pass an endpoint to the socket-client connection
        // end point leads to the address of the server
        // location is a property that's passed to Chat via the Router

        const { name, room } = data;

        setName(name);
        setRoom(room);

        // specifies what to do when there's an error via callback func
        socket.emit("join", { name: name, room: room }, (str) => {
            if (str) {
                alert(str);
                props.history.push('/'); // redirect user to home page
            }
        }); // emit events from client-side socket, which will be picked up by server-side socket

        // used for unmounting (leaving the chat)
        // returns a callback function

    }, [ENDPOINT, props.location.search, props.history]);

    // only rerenders useEffect if the two variables change
    // server endpoint changes, or url changes

    useEffect(() => {
        // on receiving message event from server,
        // message parameter is the second argument passed to the /server/index.js's emit function)
        socket.on("message", (message) => {
            // msgs is the previous array
            setMessages((msgs) => {
                // console.log("msgs: ", msgs);
                return ([...msgs, message]); // adds message to messages array
            });
        });

        // update user list
        socket.on("roomData", (obj) => {
            setUsers(obj.users);
        });
        
        // used when component unmounts
        return () => {
            socket.disconnect();
        }
    }, []); // i don't know why we need [], but it has something to do with
    // not creating additional socket.on listeners each time a message is received
    // we only need one listener!

    // function for sending messages
    // calls socket emitter!
    const sendMessage = (event) => {
        event.preventDefault(); // don't have default behavior of keypress
        // which would involve refreshing the page

        // if message isn't empty
        if (message) {
            socket.emit("sendMessage", message, () => setMessage(""));
            // clears input field when message is sent
        }
    };

    console.log(message, messages);

    // when user enters info in input box, onchange activates
    // sets message to what's currently in the input box
    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                {/*
                <input
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    onKeyPress={(event) =>
                        event.key === "Enter" ? sendMessage(event) : null
                    }
                />
                */}
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users} />
        </div>
    );
    //
};

export default Chat;
