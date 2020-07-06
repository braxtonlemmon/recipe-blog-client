import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './src/theme/GlobalStyle';
import theme from './src/theme/theme';
import { ViewportProvider } from './src/components/ViewportProvider';

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <ViewportProvider>
      <GlobalStyle />
      {element}
    </ViewportProvider>
  </ThemeProvider>
)