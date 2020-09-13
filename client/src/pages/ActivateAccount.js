import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import Nav from '../layout/Navbar';
import Notification from '../components/Notification';
import {
    Container,
    ImageContainer,
    ImageOverlay,
    ContentContainer,
    Content,
    HeaderText,
    TextContent,
    FormContainer,
    FormContent,
    FormHeaderText,
    Button,
} from '../styles/formStyles';
import FadeIn from 'react-fade-in';

const API_URL =
    process.env.REACT_APP_ENVIRONMENT === 'development'
        ? 'http://localhost:8888/api'
        : process.env.REACT_APP_API;

const ActivateAccount = ({ match }) => {
    const [values, setValues] = useState({
        name: '',
        token: '',
        show: true,
        buttonText: 'Activate',
    });

    useEffect(() => {
        let token = match.params.token;
        let { name } = jwt.decode(token);
        if (token) {
            setValues({ ...values, name, token });
        }
    }, []);

    const { name, token, show, buttonText } = values;

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Activating' });
        axios({
            method: 'POST',
            url: `${API_URL}/account-activation`,
            data: { token },
        })
            .then((response) => {
                setValues({
                    ...values,
                    show: false,
                    buttonText: 'Account activated',
                });
                Notification(response.data.message, 'success');
            })
            .catch((error) => {
                Notification(error.response.data.error, 'danger');
            });
    };

    const activationLink = () => (
        <div>
            <Button bgColor={'#2c3a5a'} btnType={'main'} onClick={clickSubmit}>
                {buttonText}
            </Button>
        </div>
    );

    const imageContent = () => (
        <ImageContainer backgroundUrl="url('https://images.unsplash.com/photo-1586848768968-ae2667b872e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')">
            <ContentContainer>
                <Content>
                    <FadeIn transitionDuration='700' delay='100'>
                        <HeaderText>
                            {name}, Let's Activate
                            <br />
                            <span>Your Account</span>
                        </HeaderText>
                    </FadeIn>
                    <FadeIn transitionDuration='700' delay='200'>
                        <TextContent>
                            The login form is created using secure
                            authentication and made to reuse in other
                            applications. Works together with nodeJS backend and
                            React frontend.
                        </TextContent>
                    </FadeIn>
                    <FadeIn transitionDuration='700' delay='300'>
                        <TextContent>
                            Features: Login, Register, Activate Account,
                            User/Admin Profile with Update Capability, Forgot
                            Password and Reset Password.
                        </TextContent>
                    </FadeIn>
                </Content>
            </ContentContainer>
            <ImageOverlay></ImageOverlay>
        </ImageContainer>
    );

    const formContent = () => (
        <FormContainer>
            <Nav />
            <FormContent>
                <FormHeaderText>Activate Account</FormHeaderText>
                {activationLink()}
            </FormContent>
        </FormContainer>
    );

    return (
        <main>
            <FadeIn transitionDuration='300'>
                <Container direction='reverse'>
                    {imageContent()}
                    {formContent()}
                </Container>
            </FadeIn>
        </main>
    );
};

export default ActivateAccount;
