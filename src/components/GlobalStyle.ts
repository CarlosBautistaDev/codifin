import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        background: #1E1E1E; 
        color: #fff; 
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
    }
    a {
         text-decoration: inherit;
    }

`;

export default GlobalStyle;
