import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

// everything in our app is put into public/index.html/root
// where html is stored
ReactDOM.render(<App />, document.querySelector('#root'));