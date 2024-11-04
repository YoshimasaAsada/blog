'use client';
// ライブラリ関連
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import { memo, useState } from 'react';

const pages = ['Blog', 'Profile', 'Contact'];

/**
 * ヘッダーのテンプレート
 * @returns
 */
const Header = memo(() => {
  console.log('ヘッダー読み込み');
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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
    // <AppBar position="fixed" sx={{ backgroundColor: 'rgba(66, 66, 66, 0.8)' }}>
    //   <Container maxWidth="xl">
    //     <Toolbar disableGutters>
    //       <Typography
    //         variant="h6"
    //         noWrap
    //         component="a"
    //         href="/"
    //         sx={{
    //           mr: 2,
    //           display: { xs: 'none', md: 'flex' },
    //           fontFamily: 'monospace',
    //           fontWeight: 700,
    //           letterSpacing: '.3rem',
    //           color: 'inherit',
    //           textDecoration: 'none',
    //         }}
    //       >
    //         YASD-TECH
    //       </Typography>

    //       <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
    //         <IconButton
    //           size="large"
    //           aria-label="account of current user"
    //           aria-controls="menu-appbar"
    //           aria-haspopup="true"
    //           onClick={handleOpenNavMenu}
    //           color="inherit"
    //         >
    //           <MenuIcon />
    //         </IconButton>
    //         <Menu
    //           id="menu-appbar"
    //           anchorEl={anchorElNav}
    //           anchorOrigin={{
    //             vertical: 'bottom',
    //             horizontal: 'left',
    //           }}
    //           keepMounted
    //           transformOrigin={{
    //             vertical: 'top',
    //             horizontal: 'left',
    //           }}
    //           open={Boolean(anchorElNav)}
    //           onClose={handleCloseNavMenu}
    //           sx={{
    //             display: { xs: 'block', md: 'none' },
    //           }}
    //         >
    //           <Link href="/" passHref>
    //             <MenuItem onClick={handleCloseNavMenu}>
    //               <Typography textAlign="center">Home</Typography>
    //             </MenuItem>
    //           </Link>
    //           {pages.map((page) => (
    //             <Link key={page} href={`/${page.toLowerCase()}`} passHref>
    //               <MenuItem onClick={handleCloseNavMenu}>
    //                 <Typography textAlign="center">{page}</Typography>
    //               </MenuItem>
    //             </Link>
    //           ))}
    //         </Menu>
    //       </Box>
    //       <Typography
    //         variant="h5"
    //         noWrap
    //         component="a"
    //         href="/blog"
    //         sx={{
    //           mr: 2,
    //           display: { xs: 'flex', md: 'none' },
    //           flexGrow: 1,
    //           fontFamily: 'monospace',
    //           fontWeight: 700,
    //           letterSpacing: '.3rem',
    //           color: 'inherit',
    //           textDecoration: 'none',
    //         }}
    //       >
    //         YASD TECH
    //       </Typography>
    //       <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
    //         <NavButton page="Home" onClick={handleCloseNavMenu} />
    //         {pages.map((page) => (
    //           <NavButton key={page} page={page} onClick={handleCloseNavMenu} />
    //         ))}
    //       </Box>
    //     </Toolbar>
    //   </Container>
    // </AppBar>
    <>
      {' '}
      <Link href="/blog" passHref>
        <Typography>Blog</Typography>
      </Link>
      <Link href="/profile" passHref>
        <Typography>Profile</Typography>
      </Link>
      <Link href="/contact" passHref>
        <Typography>Contact</Typography>
      </Link>
    </>
  );
});

Header.displayName = 'Header';
export default Header;
