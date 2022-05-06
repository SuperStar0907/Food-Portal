import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography
            variant='h6'
            component='div'
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            Canteen Portal
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <>
          
            {(user && user.name ) && (
              <p>
                Wallet:{user.wallet}
              </p>
              
            )}
          </>
          <>
            {(user && user.name ) && (
              <Button color='inherit' onClick={() => navigate('/buyfood')}>
                Food Items List
              </Button>
            )}
          </>
          <>
            {(user && !user.name && user.managername) && (
              <Button color='inherit' onClick={() => navigate('/fooddash')}>
                Food Items List
              </Button>
            )}
          </>
          <>
            {(user && user.name ) && (
              <Button color='inherit' onClick={() => navigate('/buyerorder')}>
                Orders
              </Button>
            )}
          </>
          <>
            {(user && !user.name && user.managername) && (
              <Button color='inherit' onClick={() => navigate('/vendororder')}>
                Orders
              </Button>
            )}
          </>
          <>
            {(user && !user.name && user.managername) && (
              <Button color='inherit' onClick={() => navigate('/stats')}>
                Statistics
              </Button>
            )}
          </>
          <Button color='inherit' onClick={() => navigate('/profile')}>
            My Profile
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
