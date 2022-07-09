import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "./i18n";
import { Provider } from "react-redux";
import store from "./store";
import { CircularProgress } from "@mui/material";

ReactDOM.render(
	<React.StrictMode>
		<React.Suspense fallback={<CircularProgress />}>
			<Provider store={store}>
				<Router>
					<App />
				</Router>
			</Provider>
		</React.Suspense>
	</React.StrictMode>,
	document.getElementById("root")
);
