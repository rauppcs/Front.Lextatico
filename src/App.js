import Routes from "./routes"
import { Fragment, useContext } from "react";
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from "@material-ui/lab";
import { Helmet } from "react-helmet";
import ServiceContext from "./contexts/services";

const App = () => {
	const { snackBar, setSnackBar, titleName } = useContext(ServiceContext);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setSnackBar({ ...snackBar, open: false });
	};

	return (
		<Fragment>
			<Helmet title={`${process.env.REACT_APP_TITLE} | ${titleName}`} />
			<Routes></Routes>
			<Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={snackBar.open} autoHideDuration={6000} onClose={handleClose}>
				<Alert variant="filled" onClose={handleClose} severity={snackBar.severity}>
					{snackBar.message}
				</Alert>
			</Snackbar>
		</Fragment>
	);
}

export default App;
