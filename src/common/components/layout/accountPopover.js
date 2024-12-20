import { useRef, useState, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { alpha } from '@material-ui/core/styles';
import { Button, Box, Divider, MenuItem, Typography, IconButton, Tooltip } from '@material-ui/core';
import Home from "@material-ui/icons/Home"
// components
import MenuPopover from '../menuPopover';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import UserContext from '../../../contexts/user';
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
    {
        label: 'Home',
        icon: Home,
        linkTo: '/'
    },
    //   {
    //     label: 'Profile',
    //     icon: personFill,
    //     linkTo: '#'
    //   },
    //   {
    //     label: 'Settings',
    //     icon: settings2Fill,
    //     linkTo: '#'
    //   }
];

// ----------------------------------------------------------------------

export default function AccountPopover({ handleLogout }) {
    const anchorRef = useRef(null);
    const { user } = useContext(UserContext);

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <IconButton
                ref={anchorRef}
                icon={AccountCircleIcon}
                onClick={handleOpen}
                sx={{
                    padding: 0,
                    width: 44,
                    height: 44,
                    ...(open && {
                        '&:before': {
                            zIndex: 1,
                            content: "''",
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            position: 'absolute',
                            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
                        }
                    })
                }}>
                <AccountCircleIcon />
            </IconButton>

            <MenuPopover
                open={open}
                onClose={handleClose}
                anchorEl={anchorRef.current}
                sx={{ width: 20 }}
            >
                <Box sx={{ my: 1.5, px: 2.5 }}>
                    <Tooltip title={<Typography>{`${user.name}`}</Typography>} arrow placement='top'>
                        <Typography variant="subtitle1" noWrap>
                            {user.name}
                        </Typography>
                    </Tooltip>

                    <Tooltip title={<Typography>{`${user.email}`}</Typography>} arrow placement='top'>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                            {user.email}
                        </Typography>
                    </Tooltip>

                </Box>

                <Divider sx={{ my: 1 }} />

                {MENU_OPTIONS.map((option) => (
                    <MenuItem
                        key={option.label}
                        to={option.linkTo}
                        component={RouterLink}
                        onClick={handleClose}
                        sx={{ typography: 'body2', py: 1, px: 2.5 }}
                    >
                        <Box
                            component={option.icon}
                            sx={{
                                mr: 2,
                                width: 24,
                                height: 24
                            }}
                        />
                        {option.label}
                    </MenuItem>
                ))}

                <Box sx={{ p: 2, pt: 1.5 }}>
                    <Button onClick={handleLogout} fullWidth color="inherit" variant="outlined">
                        Logout
                    </Button>
                </Box>
            </MenuPopover>
        </>
    );
}
