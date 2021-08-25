import Routes from "./routes"
import { Fragment, useState, createContext } from "react";
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from "@material-ui/lab";

export const MyContext = createContext();

const App = () => {
	const [authenticated, setAuthenticated] = useState(false);

	const [snackBar, setSnackBar] = useState({
		open: false,
		severity: "info",
		message: ""
	});

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setSnackBar({ ...snackBar, open: false });
	};

	return (
		<Fragment>
			<MyContext.Provider value={{ setSnackBar, authenticated, setAuthenticated }}>
				<Routes></Routes>
				<Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={snackBar.open} autoHideDuration={6000} onClose={handleClose}>
					<Alert variant="filled" onClose={handleClose} severity={snackBar.severity}>
						{snackBar.message}
					</Alert>
				</Snackbar>
			</MyContext.Provider>
		</Fragment>
	);
}

export default App;
