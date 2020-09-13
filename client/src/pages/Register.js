import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import {
    setClientData,
    isAuthenticated,
    getAuthenticatedUser,
} from '../utils/Helpers';
import Nav from '../layout/Navbar';
import Notification from '../components/Notification';
import { Google, Facebook } from '../auth/AuthSocial';
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
    ButtonContainer,
    Button,
    TextWithLink,
    TextLine,
} from '../styles/formStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faUnlockAlt,
    faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import FadeIn from 'react-fade-in';

const API_URL =
    process.env.REACT_APP_ENVIRONMENT === 'development'
        ? 'http://localhost:8888/api'
        : process.env.REACT_APP_API;

const Register = ({ history }) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        buttonText: 'SIGN UP',
    });

    const { name, email, password, buttonText } = values;

    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };

    const informParent = (response) => {
        setClientData(response, () => {
            isAuthenticated() && getAuthenticatedUser().role === 'admin'
                ? history.push('/admin')
                : history.push('/private');
        });
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'SIGNING UP' });
        axios({
            method: 'POST',
            url: `${API_URL}/register`,
            data: { name, email, password },
        })
            .then((response) => {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    buttonText: 'SIGNED UP',
                });
                Notification(response.data.message, 'success');
            })
            .catch((error) => {
                setValues({ ...values, buttonText: 'SIGN UP' });
                Notification(error.response.data.error, 'danger');
            });
    };

    const signupForm = () => (
        <form>
            <FormGroup>
                <InputFieldWithLabel
                    onChange={handleChange('name')}
                    value={name}
                    placeholder='Name'
                    name='name'
                    type='text'
                    id='name'
                />
                <Label htmlFor='name'>
                    <FontAwesomeIcon className='mr-2' icon={faUser} />
                    Name
                </Label>
            </FormGroup>

            <FormGroup>
                <InputFieldWithLabel
                    onChange={handleChange('email')}
                    value={email}
                    placeholder='Email'
                    name='email'
                    type='email'
                    id='email'
                    required
                />
                <Label htmlFor='email'>
                    <FontAwesomeIcon className='mr-2' icon={faEnvelope} />
                    Email
                </Label>
            </FormGroup>

            <FormGroup>
                <InputFieldWithLabel
                    onChange={handleChange('password')}
                    value={password}
                    placeholder='Password'
                    autoComplete='new-password'
                    name='password'
                    type='password'
                    id='password'
                    required
                />
                <Label htmlFor='password'>
                    <FontAwesomeIcon className='mr-2' icon={faUnlockAlt} />
                    Password
                </Label>
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
        <ImageContainer backgroundUrl="url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80')">
            <ContentContainer>
                <Content>
                    <FadeIn transitionDuration='700' delay='100'>
                        <HeaderText>
                            Multiple Ways To
                            <br />
                            <span>Register A User</span>
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
                {isAuthenticated() ? <Redirect to='/' /> : null}
                <FormHeaderText className=''>Register</FormHeaderText>
                {signupForm()}
                <br />
                <TextWithLink>
                    Already have an account?
                    <Link to='/login'>Sign in</Link>
                </TextWithLink>
                <TextLine>
                    <span>OR</span>
                </TextLine>
                <ButtonContainer>
                    <Google informParent={informParent} />
                    <Facebook informParent={informParent} />
                </ButtonContainer>
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

export default Register;
