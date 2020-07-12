import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import MenuBar from './components/MenuBar';
import AuthRoute from './utils/AuthRoute';
import { AuthProvider } from './context/auth';

function App() {
	return (
		<AuthProvider>
			<Router>
				<Container>
					<MenuBar />
					<Route path="/" exact component={Home} />
					<AuthRoute path="/login" exact component={Login} />
					<AuthRoute path="/register" exact component={Register} />
				</Container>
			</Router>
		</AuthProvider>
	);
}

export default App;
