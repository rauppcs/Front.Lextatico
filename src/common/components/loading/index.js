import { Box, CircularProgress } from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress';
import { Fragment, useContext, useEffect } from 'react'
import { LextaticoLoadingBox } from "./styles";
import { MyContext } from "../../../App";

export const CircularLoading = ({ height, sizeLoading = 50 }) => {
    const { setTitleName } = useContext(MyContext);

    useEffect(() => {
        setTitleName("Loading");
    }, [setTitleName]);

    return (
        <Fragment>
            <LextaticoLoadingBox style={{ height: height }}>
                <CircularProgress size={sizeLoading} />
            </LextaticoLoadingBox>
        </Fragment>
    );
}

export const LinearLoading = ({ height, sizeLoading = 50 }) => {
    const { setTitleName } = useContext(MyContext);

    useEffect(() => {
        setTitleName("Loading");
    }, [setTitleName]);

    return (
        <Fragment>
            <Box style={{ height: height }}>
                <LinearProgress />
            </Box>
        </Fragment>
    );
}
