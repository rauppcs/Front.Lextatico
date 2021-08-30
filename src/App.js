import Routes from "./routes"
import { Fragment, useState, createContext } from "react";
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from "@material-ui/lab";
import { getUser } from "./services/authService";
import { Helmet } from "react-helmet";


export const MyContext = createContext();

const App = () => {
	const [titleName, setTitleName] = useState("");
	const [user, setUser] = useState(getUser());
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
			<MyContext.Provider value={{ setSnackBar, authenticated, setAuthenticated, user, setUser, titleName, setTitleName }}>
				<Helmet title={`${process.env.REACT_APP_TITLE} | ${titleName}`} />
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
