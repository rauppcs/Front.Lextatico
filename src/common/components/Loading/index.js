import CircularProgress from '@material-ui/core/CircularProgress'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import { LextaticoLoadingBox } from "./styles"

const Loading = () => {
    return (
        <Fragment>
            <Helmet title={`${process.env.REACT_APP_TITLE} | Loading`} />
            <LextaticoLoadingBox>
                <CircularProgress size={100} />
            </LextaticoLoadingBox>
        </Fragment>

    );
}

export default Loading
