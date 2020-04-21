import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

// basically the render function
const App = () => {
    return (
        <Router>
            <Route path="/" exact component={Join} />
            <Route
             path="/chat"
             render={(props) => <Chat {...props} ree={`swag`} />}
             />
        </Router>
    );

    // also pass to it default props sent to the render "props" by the router
    // like location
}

// instead of having a pages directory like nextjs framework, use
// Join and chat uses react-router to set new paths, show different components

// react router does partial matching, returns some routes incorrectly
// /users vs. /users/create

// exact returns the route only if path is a direct match to current url
// paths in react w/o using nextjs framework
// will only match on the exact path it's on, and return the component

export default App;