import styled, { css } from 'styled-components';
import { devices } from './devices';

export const baseInputStyles = css`
    padding: 7px 0;
    margin-bottom: 5px;
    width: 100%;
    box-shadow: none;
    outline: none;
    border: none;
`;

export const Container = styled.div`
    margin: 0 auto;
    display: flex;
    width: 100%;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    /* overflow: hidden; */
    /* position: absolute; */
    /* top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); */
    max-width: 1260px;
    flex-direction: ${(props) =>
        props.direction === 'reverse' ? 'row' : 'row-reverse'};

    @media ${devices.tablet} {
        flex-direction: column;
        box-shadow: none;
    }
`;

// Style for container with background image and content
export const ImageContainer = styled.div`
    position: relative;
    width: 70%;
    box-shadow: 0 3px 20px rgba(0, 0, 0, 0.2);
    margin: -40px 0 -40px;
    background: ${(props) => (props.backgroundUrl ? props.backgroundUrl : '')};
    background-repeat: no-repeat;
    background-size: cover;
    border: 10px solid #fff;
    padding: 1rem 1rem 2rem 0.5rem;
    z-index: 100;

    @media ${devices.laptopSmall} {
        width: 60%;
    }

    @media ${devices.tablet} {
        width: 100%;
        margin: 0;
        box-shadow: none;
        border: 0;
        padding: 0;
    }
`;
export const ImageOverlay = styled.div`
    opacity: 0.9;
    background: linear-gradient(145deg, #0b1630, #1b2d58);
    height: 100%;
    width: 100%;
    min-height: 400px;
`;
export const ContentContainer = styled.div`
    padding: 80px;
    position: absolute;
    margin: 0 auto;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    z-index: 10;
    color: #fff;

    @media ${devices.laptop} {
        padding: 40px;
    }

    @media ${devices.mobile} {
        padding: 40px 20px;
    }
`;

export const Content = styled.div`
    margin: 0 auto;
`;

export const HeaderText = styled.h2`
    font-size: 2.5rem;
    font-weight: 100;
    margin-bottom: 25px;

    @media ${devices.laptopSmall} {
        font-size: 2rem;
    }

    @media ${devices.mobile} {
        font-size: 1.5rem;
    }

    span {
        background: #45b791;
        padding: 0 40px 0 10px;
        font-weight: 600;
        font-size: 4.2rem;

        @media ${devices.laptopSmall} {
            font-size: 3.3rem;
        }

        @media ${devices.tablet} {
            font-size: 3rem;
        }

        @media ${devices.mobile} {
            font-size: 2.5rem;
            padding: 0 20px 0 10px;
        }
    }
`;

export const TextContent = styled.p`
    color: #ddd;
    font-weight: 100;
    margin-bottom: 20px;
`;

// Style for container with Form and content
export const FormContainer = styled.div`
    width: 50%;
    background: #fff;

    @media ${devices.tablet} {
        width: 100%;
    }
`;

export const FormContent = styled.div`
    padding: 150px 80px;
    margin: 0 auto;
    height: 100%;
    justify-content: center;
    display: flex;
    flex-direction: column;
    form {
        div {
            position: relative;
        }
    }

    @media ${devices.laptop} {
        padding: 40px;
    }

    @media ${devices.mobile} {
        padding: 40px 20px;
    }
`;

export const FormHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`;

export const FormHeaderText = styled.h1`
    margin: 0 0 30px;
    color: #2c3a5a;
    font-weight: 600;

    @media ${devices.mobile} {
        font-size: 2rem;
        margin-top: 3.5px;
    }
`;

export const FormGroup = styled.div`
    position: relative;
    padding: 15px 0 0;
    width: 100%;

    input:not(:placeholder-shown) ~ label {
        padding-top: 0;
        padding-bottom: 0;
        color: #777;
        font-size: 0.8rem;
    }

    input:-webkit-autofill ~ label {
        font-size: 0.8rem;
        padding-top: 0;
        padding-bottom: 0;
        color: #777;
    }
`;

export const Label = styled.label`
    position: absolute;
    top: 5px;
    display: flex;
    align-items: center;
    transition: 0.2s;
    color: #aaa;
    font-weight: 700;

    @media ${devices.mobile} {
        font-size: 0.9rem;
    }

    svg {
        margin-top: -0.1rem;
    }
`;

export const InputFieldWithLabel = styled.input`
    ${baseInputStyles}
    border-bottom: 2px solid #bbb;
    color: #000;
    font-size: 1rem;
    background: transparent;
    letter-spacing: 1px;
    transition: all 0.2s;

    &:-internal-autofill-selected {
        font-family: 'Lato', sans-serif;
        background-color: transparent !important;
        box-shadow: 0 0 0 50px white inset;
        -webkit-box-shadow: 0 0 0 50px white inset;
    }
    &:-webkit-autofill::first-line {
        font-family: 'Lato', sans-serif;
    }

    &::placeholder {
        color: transparent;
    }

    &:placeholder-shown ~ ${Label} {
        cursor: text;
        top: 20px;
        display: flex;
        align-items: center;
        pointer-events: none;
    }

    &:focus {
        ~ ${Label} {
            position: absolute;
            top: 5px;
            transition: 0.2s;
            color: #45b791;
            font-size: 0.8rem;
        }
        border-bottom: 2px solid #45b791;
    }
    &.read-only {
        border-bottom: 0;
        cursor: initial;
    }
`;

export const TextWithLink = styled.div`
    color: #666;
    font-size: 0.9rem;
    text-align: center;
    margin-bottom: 7.5px;

    a {
        margin-left: 5px;
        color: #2c3a5a;
        font-weight: bold;
    }
`;

export const TextLine = styled.p`
    width: 100%;
    text-align: center;
    border-bottom: 1px solid rgb(130 130 130);
    line-height: 0.1em;
    margin: 50px 0px 30px;

    span {
        text-transform: capitalize;
        background: rgb(255, 255, 255);
        padding: 0px 10px;
        font-size: 0.9rem;
        letter-spacing: 1px;
    }
`;

// Shared button style

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
`;

export const Button = styled.button`
    ${baseInputStyles}
    padding: 12.5px 0;
    background: ${(props) => (props.bgColor ? props.bgColor : 'blue')};
    color: #fff;
    font-size: ${(props) => (props.btnType === 'main' ? '1.2rem' : '1rem')};
    letter-spacing: 1px;
    box-shadow: ${(props) =>
        props.btnType === 'main'
            ? '2px 5px 10px rgba(0, 0, 0, 0.2)'
            : '1px 3px 7.5px rgba(0, 0, 0, 0.1)'};
    width: ${(props) => (props.btnType === 'main' ? '100%' : '48%')};
    height: 50px;
    border-radius: 5px;
    transition: 0.2s;

    &:hover {
        filter: brightness(1.15);
    }
`;
