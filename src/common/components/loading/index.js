import { Box, CircularProgress } from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress';
import { Fragment } from 'react'
import { LextaticoLoadingBox } from "./styles";

export const CircularLoading = ({ height, sizeLoading = 50 }) => {
    return (
        <Fragment>
            <LextaticoLoadingBox style={{ height: height }}>
                <CircularProgress size={sizeLoading} />
            </LextaticoLoadingBox>
        </Fragment>
    );
}

export const LinearLoading = ({ height }) => {
    return (
        <Fragment>
            <Box style={{ height: height }}>
                <LinearProgress />
            </Box>
        </Fragment>
    );
}
