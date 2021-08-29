import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { globalTheme } from "./styles/theme"
import Helmet from "react-helmet"

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={globalTheme}>
			<Helmet title={process.env.REACT_APP_TITLE} />
			<CssBaseline />
			<App />
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
