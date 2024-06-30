import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 16px;
  }

  body {
    margin: unset;
    padding: unset;
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
  }
`;
