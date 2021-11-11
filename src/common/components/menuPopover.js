import PropTypes from 'prop-types';
import { Popover } from '@material-ui/core';

MenuPopover.propTypes = {
    children: PropTypes.node.isRequired,
    sx: PropTypes.object
};

export default function MenuPopover({ children, sx, ...other }) {
    return (
        <Popover
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
                style: {
                    overflow: "inherit",
                    mt: 1.5,
                    ml: 0.5,
                },
                sx: {

                    // overflow: "inherit",
                    // boxShadow: (theme) => theme.customShadows.z20,
                    // border: (theme) => `solid 1px ${theme.palette.grey[500_8]}`,
                    // width: 20,
                    // ...sx
                }
            }}
            {...other}>
            {children}
        </Popover>
    );
}
