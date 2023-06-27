import { createGlobalStyle, css } from 'styled-components';

export const GlobalStyle = createGlobalStyle(
  () => css`
    * {
      margin: 0;
      padding: 0;
      outline: 0;
      box-sizing: border-box;
    }

    body {
      background: #fff;
      -webkit-font-smoothing: antialiased;
    }

    body,
    input,
    button {
      font: 16px 'Poppins', sans-serif;
    }

    button {
      cursor: pointer;
    }
  `
);
