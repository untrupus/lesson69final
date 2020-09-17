import React from 'react';
import Header from "../containers/Header/Header";

const Layout = props => {
    return (
        <>
        <Header/>
            <div className="container show">
                {props.children}
            </div>
        </>
    );
};

export default Layout;