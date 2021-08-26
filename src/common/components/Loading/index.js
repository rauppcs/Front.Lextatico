import CircularProgress from '@material-ui/core/CircularProgress'
import { LextaticoLoadingBox } from "./styles"

const Loading = () => {
    return (
        <LextaticoLoadingBox>
            <CircularProgress size={100} />
        </LextaticoLoadingBox>
    );
}

export default Loading