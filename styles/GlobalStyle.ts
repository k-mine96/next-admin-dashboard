'use client';

import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  /* CSS Reset */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.body};
    color: ${({ theme }) => theme.colors.text.primary};
    background-color: ${({ theme }) => theme.colors.background};
    line-height: 1.5;
  }

  /* Remove default button styles */
  button {
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }

  /* Remove default input styles */
  input,
  textarea,
  select {
    font: inherit;
    border: none;
    outline: none;
  }

  /* Remove default list styles */
  ul,
  ol {
    list-style: none;
  }

  /* Remove default link styles */
  a {
    text-decoration: none;
    color: inherit;
  }

  /* Image responsive */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
`;
