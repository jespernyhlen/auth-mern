import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import { Button } from '../styles/formStyles';

const API_URL =
    process.env.REACT_APP_ENVIRONMENT === 'development'
        ? 'http://localhost:8888/api'
        : process.env.REACT_APP_API;

const Facebook = ({ informParent = (f) => f }) => {
    const responseFacebook = (response) => {
        axios({
            method: 'POST',
            url: `${API_URL}/facebook-login`,
            data: {
                userID: response.userID,
                accessToken: response.accessToken,
            },
        })
            .then((response) => {
                informParent(response);
            })
            .catch((error) => {
                console.log(
                    'Error trying to signin with Facebook',
                    error.response
                );
            });
    };
    return (
        <FacebookLogin
            appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
            autoLoad={false}
            fields='name,email'
            callback={responseFacebook}
            render={(renderProps) => (
                <Button
                    bgColor={'#3B5998'}
                    bgShadow={'1px 3px 7.5px rgba(0, 0, 0, 0.1)'}
                    onClick={renderProps.onClick}
                >
                    <FontAwesomeIcon className='mr-2' icon={faFacebook} />
                    Facebook
                </Button>
            )}
        />
    );
};

const Google = ({ informParent = (f) => f }) => {
    const responseGoogle = (response) => {
        axios({
            method: 'POST',
            url: `${API_URL}/google-login`,
            data: { idToken: response.tokenId },
        })
            .then((response) => {
                informParent(response);
            })
            .catch((error) => {
                console.log(
                    'Error trying to signin with Facebook',
                    error.response
                );
            });
    };
    return (
        <GoogleLogin
            clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            render={(renderProps) => (
                <Button
                    bgColor={'#DB4834'}
                    bgShadow={'1px 3px 7.5px rgba(0, 0, 0, 0.1)'}
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                >
                    <FontAwesomeIcon className='mr-2' icon={faGoogle} />
                    Google
                </Button>
            )}
            cookiePolicy={'single_host_origin'}
        />
    );
};

export { Google, Facebook };
