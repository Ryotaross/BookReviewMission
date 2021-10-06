import '../App.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import IconButton from '@mui/material/IconButton';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import RateReviewIcon from '@mui/icons-material/RateReview';
import CreateIcon from '@mui/icons-material/Create';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

function Header() {
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElTool, setAnchorElTool] = useState<null | HTMLElement>(null);
  const history = useHistory();
  const token = localStorage.getItem('token');


  const handleLogout = ()=>{
    localStorage.removeItem("token")
    history.replace('/login');
  }

  const handleAccont = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleTool = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElTool(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseTool = () => {
    setAnchorElTool(null);
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1,textAlign:'left' }} onClick={() => {history.replace('/')}}>
            <MenuBookIcon />Book!
          </Typography>
          {token === '' || token === null || token === 'undefined'? (
            <div>
              <Button color="inherit" onClick={() => {history.replace('/signup')}}><PersonAddIcon />ユーザー登録</Button>
              <Button color="inherit" onClick={() => {history.replace('/login')}}><LoginIcon />ログイン</Button>
            </div>
          ):(
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleTool}
                color="inherit"
              >
                <RateReviewIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElTool}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElTool)}
                onClose={handleCloseTool}
              >
                <MenuItem onClick={() => {history.replace('/new')}}><CreateIcon />新規投稿</MenuItem>
              </Menu>

              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleAccont}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => {history.replace('/profile');}}>ユーザー名変更</MenuItem>
                <MenuItem sx={{color: 'error.main'}}onClick={handleLogout}><LogoutIcon/>ログアウト</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;