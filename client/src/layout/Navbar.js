import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
    isAuthenticated,
    getAuthenticatedUser,
    removeAuthenticatedUser,
} from '../utils/Helpers';

import styled from 'styled-components';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Nav = ({ history }) => {
    const currentPath = history.location.pathname;
    const isActive = (path) => {
        return currentPath === path;
    };

    const options = {
        customUI: ({ onClose }) => (
            <ConfirmAlertBody>
                <ConfirmHeader>Confirm to logout</ConfirmHeader>Are you sure you
                want to logout?
                <ConfirmAlertButtonGroup>
                    <AlertButton
                        onClick={() => {
                            onClose();
                        }}
                    >
                        Cancel
                    </AlertButton>
                    <AlertButton
                        onClick={() => {
                            removeAuthenticatedUser(() => {
                                history.push('/login');
                            });
                            onClose();
                        }}
                    >
                        OK
                    </AlertButton>
                </ConfirmAlertButtonGroup>
            </ConfirmAlertBody>
        ),
        closeOnEscape: true,
        closeOnClickOutside: true,
    };

    return (
        <nav>
            <NavList className='nav'>
                <li className='nav-item' style={{ alignSelf: 'center' }}>
                    <Link
                        to='/'
                        className={
                            isActive('/') ? 'nav-link active' : 'nav-link'
                        }
                    >
                        Home
                    </Link>
                </li>

                {!isAuthenticated() && (
                    <>
                        <li
                            className='nav-item'
                            style={{ alignSelf: 'center' }}
                        >
                            <Link
                                to='/login'
                                className={
                                    isActive('/login')
                                        ? 'nav-link active'
                                        : 'nav-link'
                                }
                            >
                                Login
                            </Link>
                        </li>
                        <li
                            className='nav-item'
                            style={{ alignSelf: 'center' }}
                        >
                            <Link
                                to='/register'
                                className={
                                    isActive('/register')
                                        ? 'nav-link active'
                                        : 'nav-link'
                                }
                            >
                                Register
                            </Link>
                        </li>
                    </>
                )}

                {isAuthenticated() && getAuthenticatedUser().role === 'member' && (
                    <li className='nav-item' style={{ alignSelf: 'center' }}>
                        <Link
                            className={
                                isActive('/private')
                                    ? 'nav-link active'
                                    : 'nav-link'
                            }
                            to='/private'
                        >
                            {getAuthenticatedUser().name}
                        </Link>
                    </li>
                )}

                {isAuthenticated() && getAuthenticatedUser().role === 'admin' && (
                    <li className='nav-item' style={{ alignSelf: 'center' }}>
                        <Link
                            className={
                                isActive('/admin')
                                    ? 'nav-link active'
                                    : 'nav-link'
                            }
                            to='/admin'
                        >
                            {getAuthenticatedUser().name}
                        </Link>
                    </li>
                )}

                {isAuthenticated() && (
                    <>
                        {/* <li
                            className='nav-item'
                            style={{ alignSelf: 'center' }}
                        >
                            <Link
                                to='/users'
                                className={
                                    isActive('/users')
                                        ? 'nav-link active'
                                        : 'nav-link'
                                }
                            >
                                Users
                            </Link>
                        </li> */}
                        <li
                            className='nav-item'
                            style={{ alignSelf: 'center' }}
                        >
                            <span
                                className='nav-link'
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    confirmAlert(options);
                                }}
                            >
                                Logout
                            </span>
                        </li>
                    </>
                )}
            </NavList>
        </nav>
    );
};

export default withRouter(Nav);

const NavList = styled.ul`
    max-width: 1260px;
    margin: 0 auto;
    height: 3.5rem;

    a.nav-link,
    span.nav-link {
        color: #222;
        padding: 1rem 1.5rem 0.5rem;
        font-size: 0.85rem;
        font-weight: 800;
        border: none;
        outline: none;
        letter-spacing: 0.5px;
        transition: 0.1s all ease-in;
    }
    a.nav-link:hover,
    span.nav-link:hover {
        border: none;
        outline: none;
        color: #636363;
    }

    a.nav-link.active {
        color: #109c6f;
        border-bottom: 3px solid #109c6f;
    }
`;

const ConfirmAlertBody = styled.div`
    font-family: inherit;
    text-align: center;
    border-radius: 0;
    padding: 30px 40px;
    background: #fff;
    box-shadow: 0 20px 75px rgba(0, 0, 0, 0.13);
    color: #666;
`;

const ConfirmHeader = styled.div`
    font-size: 1.3rem;
    color: #222;
    font-weight: 700;
    margin-bottom: 10px;
`;

const ConfirmAlertButtonGroup = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
`;

const AlertButton = styled.button`
    outline: none;
    border: none;
    display: inline-block;
    padding: 7px 0;
    margin-right: 10px;
    margin-left: 10px;
    font-size: 14px;
    cursor: pointer;
    width: 80px;
    background: #45b791;
    color: #fff;
    letter-spacing: 1px;
    box-shadow: 2px 5px 8px rgba(0, 0, 0, 0.2);
    transition: 0.15s background-color ease-in-out;

    &:hover {
        background-color: #48daaa;
    }
`;
