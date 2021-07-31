import { Box, makeStyles, Theme, Typography, Link as MaterialLink, List } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import Link from 'next/link';

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    display: `flex`,
    justifyContent: `space-between`,
    alignItems: `flex-start`,
    flexDirection: `column`,
    padding: theme.spacing(1, 1),
    [theme.breakpoints.up(`sm`)]: {
      padding: theme.spacing(0, 2.5),
      alignItems: `center`,
      flexDirection: `row`,
    },
    [theme.breakpoints.up(`lg`)]: {
      padding: `0 5%`,
    },
  },
  ul: {
    marginLeft: `auto`,
    '& li': {
      display: `inline-block`,
    },
  },
}));

export default function GlobalFooter(): JSX.Element {
  const classes = useStyles();
  return (
    <Box component="footer" className={classes.footer}>
      <Typography>Made by Patrick McLennan &amp; Matthew Palmer</Typography>
      <List className={classes.ul}>
        <li>
          <Link href="https://www.github.com/patrickmclennan" passHref>
            <MaterialLink target="_blank">
              <GitHubIcon fontSize="large" />
            </MaterialLink>
          </Link>
        </li>
        <li>
          <Link href="https://www.linkedin.com/javascriptpat" passHref>
            <MaterialLink target="_blank">
              <LinkedInIcon fontSize="large" />
            </MaterialLink>
          </Link>
        </li>
      </List>
    </Box>
  );
}
