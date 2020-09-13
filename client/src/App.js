import React from 'react';
import GlobalStyles from './styles/globalStyles';
import Layout from './layout/Layout';
import Routes from './Routes';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
const App = () => {
    return (
        <>
            <GlobalStyles />
            <ReactNotification />
            <Layout>
                <Routes />
            </Layout>
        </>
    );
};

export default App;
