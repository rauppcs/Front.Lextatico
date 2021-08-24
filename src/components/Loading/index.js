import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { LextaticoLoadingBox } from "./styles";

const Loading = () => {

    return (
        <LextaticoLoadingBox>
            <FontAwesomeIcon size="5x" icon={faSpinner} spin />
        </LextaticoLoadingBox>
    );
}

export default Loading