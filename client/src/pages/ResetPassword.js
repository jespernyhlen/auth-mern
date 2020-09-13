import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import Notification from '../components/Notification';
import Nav from '../layout/Navbar';
import {
    Container,
    ImageContainer,
    ImageOverlay,
    ContentContainer,
    Content,
    HeaderText,
    TextContent,
    FormGroup,
    FormContainer,
    FormContent,
    FormHeaderText,
    InputFieldWithLabel,
    Label,
    Button,
} from '../styles/formStyles';
import FadeIn from 'react-fade-in';

const API_URL =
    process.env.REACT_APP_ENVIRONMENT === 'development'
        ? 'http://localhost:8888/api'
        : process.env.REACT_APP_API;

const ResetPassword = ({ match }) => {
    const [values, setValues] = useState({
        name: '',
        token: '',
        newPassword: '',
        buttonText: 'Reset password',
    });

    useEffect(() => {
        let token = match.params.token;
        let { name } = jwt.decode(token);
        if (token) {
            setValues({ ...values, name, token });
        }
    }, []);

    const { name, token, newPassword, buttonText } = values;

    const handleChange = (event) => {
        setValues({ ...values, newPassword: event.target.value });
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Resetting' });
        axios({
            method: 'PUT',
            url: `${API_URL}/reset-password`,
            data: { password: newPassword, passwordResetLink: token },
        })
            .then((response) => {
                setValues({ ...values, buttonText: 'Reset password' });
                Notification(response.data.message, 'success');
            })
            .catch((error) => {
                setValues({ ...values, buttonText: 'Reset password' });
                Notification(error.response.data.error, 'danger');
            });
    };

    const passwordResetForm = () => (
        <form>
            <FormGroup className='form-group'>
                <InputFieldWithLabel
                    onChange={handleChange}
                    value={newPassword}
                    type='password'
                    name='password'
                    id='password'
                    placeholder='Type new password'
                    required
                />
                <Label htmlFor='password'>Type new password</Label>
            </FormGroup>
            <br />

            <div>
                <Button
                    bgColor={'#2c3a5a'}
                    btnType={'main'}
                    onClick={clickSubmit}
                >
                    {buttonText}
                </Button>
            </div>
        </form>
    );

    const imageContent = () => (
        <ImageContainer backgroundUrl="url('https://images.unsplash.com/photo-1586848768968-ae2667b872e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')">
            <ContentContainer>
                <Content>
                    <FadeIn transitionDuration='700' delay='100'>
                        <HeaderText>
                            {name}, Let's Reset
                            <br />
                            <span>Your Password</span>
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
                <FormHeaderText>New Password</FormHeaderText>
                {passwordResetForm()}
            </FormContent>
        </FormContainer>
    );

    return (
        <main>
            <FadeIn transitionDuration='300'>
                <Container>
                    {imageContent()}
                    {formContent()}
                </Container>
            </FadeIn>
        </main>
    );
};

export default ResetPassword;
