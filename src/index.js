import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { globalTheme } from "./styles/theme"
import { ServiceProvider } from './contexts/services';
import { AuthProvider } from './contexts/auth';
import { UserProvider } from './contexts/user';

ReactDOM.render(
	<React.StrictMode>
		<ServiceProvider>
			<AuthProvider>
				<UserProvider>
					<ThemeProvider theme={globalTheme}>
						<CssBaseline />
						<App />
					</ThemeProvider>
				</UserProvider>
			</AuthProvider>
		</ServiceProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
