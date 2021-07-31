import { createTheme } from '@material-ui/core';
import { createGlobalStyle, css } from 'styled-components';
import type { CSS, FlexAlignment, FlexDirection, FlexWrap } from '../types/style.types';

export const GlobalStyles = createGlobalStyle`

  #__next {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
`;

export const styledComponentsTheme = {
  flex: ({
    jc = `center`,
    ai = `center`,
    fd = `row`,
    fw = `nowrap`,
  }: {
    jc: FlexAlignment;
    ai: FlexAlignment;
    fd: FlexDirection;
    fw: FlexWrap;
  }): CSS => css`
    display: flex;
    justify-content: ${jc};
    align-items: ${ai};
    flex-direction: ${fd};
    flex-wrap: ${fw};
  `,
  posCenter: css`
    display: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
};

export const materialUiTheme = createTheme({});
