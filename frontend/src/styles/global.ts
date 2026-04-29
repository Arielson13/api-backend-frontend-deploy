import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Inter, system-ui, sans-serif;
    background: #f8fafc;
    color: #0f172a;
    min-height: 100vh;
  }

  button,
  input {
    font: inherit;
  }

  button {
    cursor: pointer;
  }
`;
