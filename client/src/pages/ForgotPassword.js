import React, { useState } from 'react';
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

const ForgotPassword = () => {
    const [values, setValues] = useState({
        email: '',
        buttonText: 'Send password reset link',
    });

    const { email, buttonText } = values;

    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        axios({
            method: 'PUT',
            url: `${API_URL}/forgot-password`,
            data: { email },
        })
            .then((response) => {
                setValues({
                    ...values,
                    email: '',
                    buttonText: 'Send password reset link',
                });
                Notification(response.data.message, 'success');
            })
            .catch((error) => {
                setValues({
                    ...values,
                    buttonText: 'Send password reset link',
                });
                Notification(error.response.data.error, 'danger');
            });
    };

    const passwordForgotForm = () => (
        <form>
            <FormGroup>
                <InputFieldWithLabel
                    onChange={handleChange('email')}
                    value={email}
                    placeholder='Email'
                    type='email'
                    name='email'
                    id='email'
                />
                <Label>Enter email to your account</Label>
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
        <ImageContainer backgroundUrl="url('https://images.unsplash.com/photo-1561756719-55231c95c511?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80')">
            <ContentContainer>
                <Content>
                    <FadeIn transitionDuration='700' delay='100'>
                        <HeaderText>
                            Did You Forget <br />
                            <span>Your Password?</span>
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
                <FormHeaderText>Reset Password</FormHeaderText>
                {passwordForgotForm()}
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

export default ForgotPassword;
