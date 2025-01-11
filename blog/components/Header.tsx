'use client';
// ライブラリ関連
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { memo, useState } from 'react';

// const pages = ['Blog', 'Profile', 'Contact'];
const pages = ['Blog', 'Contact'];

const Header = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
  };

  const NavButton = ({
    page,
    onClick,
  }: {
    page: string;
    onClick: () => void;
  }) => (
    <Link
      href={page.toLowerCase() === 'home' ? '/' : `/${page.toLowerCase()}`}
      passHref
      prefetch={false}
    >
      <Button
        onClick={onClick}
        sx={{
          height: '100%',
          color: 'white',
          display: 'block',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '2px',
            backgroundColor: 'white',
            transform: 'translateX(-100%)',
            transition: 'transform 0.3s ease-in-out',
          },
          '&:hover::before': {
            transform: 'translateX(0)',
          },
        }}
      >
        {page}
      </Button>
    </Link>
  );

  return (
    <>
      {!isFullScreen ? (
        <>
          <AppBar
            position="fixed"
            sx={{ backgroundColor: 'rgba(66, 66, 66, 0.8)' }}
          >
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  YASD-TECH
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                  <IconButton
                    size="large"
                    aria-label="menu"
                    onClick={toggleFullScreen}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                </Box>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  <NavButton page="Home" onClick={() => {}} />
                  {pages.map((page) => (
                    <NavButton key={page} page={page} onClick={() => {}} />
                  ))}
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
        </>
      ) : (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'black',
            color: 'white',
            zIndex: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <NavButton page="Home" onClick={toggleFullScreen} />
            {pages.map((page) => (
              <NavButton key={page} page={page} onClick={toggleFullScreen} />
            ))}
          </Box>
          <Button
            variant="outlined"
            onClick={toggleFullScreen}
            sx={{ mt: 4, color: 'white', borderColor: 'white' }}
          >
            Close
          </Button>
        </Box>
      )}
    </>
  );
};

export default Header;
