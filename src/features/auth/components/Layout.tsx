import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ReactComponent as Logo } from '../../../assets/logo.svg';

// import logo from '/assets/logo.svg';
// import InternalLink from '../../../components/InternalLink';
// import { Link } from '@/components/Elements';
// import { Head } from '@/components/Head';

type LayoutProps = {
  children: React.ReactNode;
  title: string;
  description: string;
};

const useStyles = makeStyles({
  box: {
    paddingTop: '8%',
  },
  container: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  textH6: {
    paddingTop: '30px',
    paddingBottom: '12px',
  },
  textBody1: {
    padding: '0 52px 60px',
  },
});

export const Layout = ({
  children,
  title,
  description,
}: LayoutProps) => {
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <Container
        maxWidth="xs"
        className={classes.container}
      >
        <Logo />
        <Typography
          variant="h6"
          color="primary"
          className={classes.textH6}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          className={classes.textBody1}
        >
          {description}
        </Typography>
        <form>
          {children}
        </form>
      </Container>
    </Box>
  );
};
