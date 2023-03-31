import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import PropTypes from 'prop-types';
import ChevronUpDownIcon from '@heroicons/react/24/solid/ChevronUpDownIcon';
import {
  Box,
  Button,
  Divider,
  Drawer,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import { Scrollbar } from 'src/components/scrollbar';
import { items } from './config';
import { SideNavItem } from './side-nav-item';
import { useSelector } from 'react-redux';
import { setLogout } from 'src/pages/state';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

export const SideNav = (props) => {
  const { open, onClose } = props;
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const user = useSelector((state) => state.user);

  /**
   * 로그인하면서 token과 발행일자를 AuthTable에 저장
   *  1. 저장된 토큰과 현재토큰을 비교해서 다르면 로그아웃처리
   *  2. 
   */
  const test = async () => {
    console.log();
    const {
      username,
      email,
      phoneNo,
      password,
      address,
      companyName} = user;

    const registerUserResponse = await fetch(
      "http://192.168.219.176:8080/api/article/register",
      {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ` + user.token
          },
          body: JSON.stringify({
            username,
            email,
            phoneNo,
            password,
            address,
            companyName
          }),
      }
    );
    console.log(registerUserResponse);
    if(registerUserResponse.status === 403) {
      dispatch(setLogout());
      router.push('/auth/login');
    } else if(registerUserResponse.status === 200) {
      const registeredUser = await registerUserResponse.json();
      return registeredUser;
    }
  }

  const content = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%'
        },
        '& .simplebar-scrollbar:before': {
          background: 'neutral.400'
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            component={NextLink}
            href="/"
            sx={{
              display: 'inline-flex',
              height: 32,
              width: 32
            }}
          >
              {
                /*
                  <img src='/assets/logos/ktg-black.png'/>
                */
              }
              <Typography sx={{
                fontWeight: 'bold',
                fontSize: '24px',
                color: '#ffffff'
              }}>
                MyBlogs
              </Typography>
          </Box>
          <Box
            sx={{
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              borderRadius: 1,
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              mt: 2,
              p: '12px'
            }}
          >
            <div>
              <Typography
                color="inherit"
                variant="subtitle1"
              >
                - {user.companyName}
              </Typography>
              <Typography
                color="inherit"
                variant="subtitle1"
              >
                {user.name}
              </Typography>
              <Typography
                color="neutral.400"
                variant="body2"
              >
                {user.email}
              </Typography>
              <Typography
                color="neutral.400"
                variant="body2"
              >
                {user.phoneNumber}
              </Typography>
            </div>
            <SvgIcon
              fontSize="small"
              sx={{ color: 'neutral.500' }}
            >
              <ChevronUpDownIcon />
            </SvgIcon>
          </Box>
        </Box>
        <Divider sx={{ borderColor: 'neutral.700' }} />
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0
            }}
          >
            {items.map((item) => {
              const active = item.path ? (pathname === item.path) : false;

              return (
                <SideNavItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                />
              );
            })}
          </Stack>
        </Box>
        <Divider sx={{ borderColor: 'neutral.700' }} />
        <Box
          sx={{
            px: 2,
            py: 3
          }}
        >
          <Typography
            color="neutral.100"
            variant="subtitle2"
          >
            Need more help?
          </Typography>
          <Typography
            color="neutral.500"
            variant="body2"
          >
            Please contact our call center!
          </Typography>
          <Button
            component="a"
            endIcon={(
              <SvgIcon fontSize="small">
                <PhoneIcon />
              </SvgIcon>
            )}
            fullWidth
            onClick={test}
            sx={{ mt: 2 }}
            target="_blank"
            variant="contained"
          >
            080-931-0399 (09:00~18:00)
          </Button>
        </Box>
      </Box>
    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.800',
            color: 'common.white',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.800',
          color: 'common.white',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
