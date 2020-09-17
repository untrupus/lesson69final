import React from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import Show from "./containers/Show/Show";
import Layout from "./components/Layout";
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route path="/" exact render={() => <h1>Find your favorite show</h1>}/>
                    <Route path="/shows/:id" exact component={Show}/>
                </Switch>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
