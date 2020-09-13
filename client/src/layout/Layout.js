import React from 'react';
import { withRouter } from 'react-router-dom';
// import Nav from './Navbar';
// import styled from 'styled-components';
// import { devices } from '../styles/devices';

const Layout = ({ children }) => {
    return (
        <>
            {/* <Nav /> */}
            {children}
        </>
    );
};

export default withRouter(Layout);
