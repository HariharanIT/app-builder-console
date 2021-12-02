import React, {useContext} from 'react';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import {useRouter} from 'next/router';
import {Button} from '@material-ui/core';
import {useQuery} from '@apollo/client';
import {getUserEmailQuery} from '../graphql/queries';
import ApiStatusContext from './APIContext';

export interface IUser {
  email: string;
  id: number;
}

const useNavStyles = makeStyles(() =>
  createStyles({
    AppBar: {
      paddingLeft: '70px',
      paddingRight: '40px',
      ['@media (max-width:600px)']: {
        paddingLeft: '30px',
        paddingRight: '30px',
      },
    },
    Logo: {
      height: '25px',
      marginRight: 'auto',
    },
    Avatar: {
      width: '30px',
      height: '30px',
      background: '#DEE5EF',
      marginLeft: 'auto',
    },
  }),
);

const Navbar = () => {
  const NavbarClasses = useNavStyles();
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const {loading, error, data} = useQuery(getUserEmailQuery());
  const {setLoading, setAPIError} = useContext(ApiStatusContext);
  const handleProfileClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    handleProfileClose();
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('token');
      router.push('/');
    }
  };
  React.useEffect(() => {
    if (loading) {
      setLoading(true);
    }
    if (error) {
      setAPIError(error.message);
    }
  }, [loading, error, setLoading, setAPIError]);

  React.useEffect(() => {
    if (data) {
      const email = data.user ? data.user.email : '';
      setEmail(email);
    }
  }, [data, setEmail]);
  return (
    <Box position="static">
      <Toolbar className={NavbarClasses.AppBar}>
        <Box display="flex" alignItems="center">
          <img width="130px" src="./splashAssets/logo.png" />
        </Box>
        {email !== '' && <Avatar className={NavbarClasses.Avatar} />}
        <Box mx={7}>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleProfileClick}>
            {email.split('@')[0]}
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleProfileClose}>
            <MenuItem disabled>{email}</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </Box>
  );
};

export default Navbar;
