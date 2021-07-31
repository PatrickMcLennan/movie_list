import { ThemeProvider as StyledComponentsTheme } from 'styled-components';
import {
  makeStyles,
  Theme,
  ThemeProvider as MaterialUiTheme,
} from '@material-ui/core/styles';
import { Box, createTheme } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  materialUiTheme,
  styledComponentsTheme,
  GlobalStyles,
} from '../styles/themes.styles';
import { useEffect, useState } from 'react';
import { IS_CLIENT } from '../constants';
import { ApolloProvider } from '@apollo/client';
import { clientGraphQl } from '../utils/clients.utils';

type Props = {
  Component: React.ElementType;
  pageProps: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  layout: {
    padding: theme.spacing(0, 1),
    [theme.breakpoints.up(`md`)]: {
      padding: theme.spacing(0, 2.5),
    },
    [theme.breakpoints.up(`lg`)]: {
      padding: `0 5%`,
    },
  },
}));

export default function App({ Component, pageProps }: Props): JSX.Element {
  const [colorMode, setColorMode] = useState<'dark' | 'light'>(`dark`);
  const classes = useStyles();
  const isDark = colorMode === `dark`;

  const changeTheme = () => {
    const newMode = isDark ? `light` : `dark`;
    setColorMode(newMode);
    if (IS_CLIENT)
      return window.localStorage.setItem(`backgroundsColor`, newMode);
    else return;
  };

  useEffect(() => {
    if (IS_CLIENT) {
      const savedColorPreference =
        window.localStorage.getItem(`backgroundsColor`);
      if (savedColorPreference) return setColorMode(savedColorPreference as 'dark' | 'light');
      else return;
    }
  }, []);

  return (
    <ApolloProvider client={clientGraphQl}>
      <StyledComponentsTheme theme={styledComponentsTheme}>
        <MaterialUiTheme
          theme={{
            ...createTheme({
              ...materialUiTheme,
              palette: {
                type: isDark ? `dark` : `light`,
              },
            }),
          }}
        >
          <GlobalStyles />
          <CssBaseline />
          <Box component="main" className="main" pt={6} flex={1}>
            <Box className={classes.layout}>
              <Component {...pageProps} />
            </Box>
          </Box>
        </MaterialUiTheme>
      </StyledComponentsTheme>
    </ApolloProvider>
  );
}
