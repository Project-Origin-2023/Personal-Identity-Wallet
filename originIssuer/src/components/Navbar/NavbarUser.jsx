import Logout from '../Logout';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Link } from 'react-router-dom';


function NavbarUser({ setToken}) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AccountBalanceIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
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
            Origin Wallet
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
                <MenuItem  key="1" onClick={handleCloseUserMenu}>
                  <Button sx={{ my: 2, color: 'white', display: 'block' }} component={Link} to="/">Home</Button>
                </MenuItem>
                <MenuItem  key="2" onClick={handleCloseUserMenu}>
                  <Button sx={{ my: 2, color: 'white', display: 'block' }} component={Link} to="/CredentialRequestPID">Richiesta VC PID</Button>
                </MenuItem>
                <MenuItem  key="3"onClick={handleCloseUserMenu}>
                  <Button sx={{ my: 2, color: 'white', display: 'block' }} component={Link} to="/CredentialRequestMarital">Richiesta VC Marital Status</Button>
                </MenuItem>
                <MenuItem  key="4" onClick={handleCloseUserMenu}>
                  <Button sx={{ my: 2, color: 'white', display: 'block' }} component={Link} to="/ListCredentialRequests">Lista Richieste VC</Button>
                </MenuItem>
            </Menu>
          </Box>
          <AccountBalanceIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Origin Wallet
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button sx={{ my: 2, color: 'white', display: 'block' }} variant="contained" component={Link} to="/">Home</Button>
            <Button sx={{ my: 2, color: 'white', display: 'block' }} variant="contained" component={Link} to="/CredentialRequestPID">Richiesta VC PID</Button>
            <Button sx={{ my: 2, color: 'white', display: 'block' }} variant="contained" component={Link} to="/CredentialRequestMarital">Richiesta VC Marital Status</Button>
            <Button sx={{ my: 2, color: 'white', display: 'block' }} variant="contained" component={Link} to="/ListCredentialRequests">Lista Richieste VC</Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem  key="5" onClick={handleCloseUserMenu}>
                  <Button sx={{ my: 2, color: 'white', display: 'block' }}><Logout setToken={setToken} /></Button>
                </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavbarUser;

