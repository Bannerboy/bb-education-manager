import { createGlobalStyle } from 'styled-components';
import { variables } from './variables';
// import "normalize.css";

export const GlobalStyle = createGlobalStyle`

    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: inherit;
    }

    html {
        /*100 / standard font size of 16 px = 62.5*/
        font-family: sans-serif;
        font-size: 62.5%;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        @media (orientation: landscape) {
            font-size: 40%;
        }
    }

    body {
        background-color: ${variables.colorBlack};
        box-sizing: border-box;
         margin: 0;
         padding: 0;
         overflow-x: hidden;
         -webkit-font-smoothing: antialiased;
         -moz-osx-font-smoothing: grayscale;
    }
   

    button {
        cursor: pointer;
        border: 0;
        appearance: none;
        background-color: transparent;
        color: inherit;
        &:focus{
           outline: none;
}

    }

    a {
        &:link,
        &:visited{
            text-decoration: none;
            background-color: transparent;
            color: inherit;
            font-weight: 900;
            /* overflow: hidden; */

            
        }
    }
    ul {
        list-style: none;
    }

}



    /* Typography */
    body {
        box-sizing: border-box;
        font-family: "Montserrat";
        font-weight: 500;
        /* font-size: 16px; */
        font-size: ${variables.defaultFontSize};
        line-height: ${variables.defaultLineHeight};
        color: ${variables.colorTextWhite};
    }


`;
