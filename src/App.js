import React from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import Header from "./containers/Header/Header";
import Show from "./containers/Show/Show";
import './App.css';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header/>
                <Switch>
                    <Route path="/" exact render={() => <h1>Find your favorite show</h1>}/>
                    <Route path="/shows/:id" exact component={Show}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
