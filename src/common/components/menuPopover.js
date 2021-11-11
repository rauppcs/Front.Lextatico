import PropTypes from 'prop-types';
// material
import { Popover } from '@material-ui/core';
import { alpha, styled } from '@material-ui/core/styles';

const ArrowStyle = styled('span')(({ theme }) => ({
    top: -7,
    zIndex: 1,
    width: 12,
    right: 18,
    height: 12,
    content: "''",
    position: 'absolute',
    borderRadius: '0 0 4px 0',
    transform: 'rotate(-135deg)',
    background: theme.palette.background.paper,
    borderRight: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
    borderBottom: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`
}));

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
