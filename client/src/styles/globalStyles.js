import { createGlobalStyle } from 'styled-components';
import { devices } from './devices';

const GlobalStyles = createGlobalStyle`

*,
*::after,
*::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
}

html {
    font-size: 14px;
}

body {
    font-family: "Lato", sans-serif;
    box-sizing: border-box;
    letter-spacing: 0.5px;
}

#root {
    background: linear-gradient(225deg, #fff, #ddd);;
    &.navigation-open {
        max-height: 100vh;
        overflow-y: hidden;
    }
}

main {
    min-height: calc(100vh);
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media ${devices.tablet} {
        min-height: auto;

    }
}

`;

export default GlobalStyles;
