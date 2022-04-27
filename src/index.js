import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Product from './pages/Product/Product.Component';
import Cart from './pages/Cart/Cart.Component';
import Category from './pages/Category/Category.Component';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
	uri: 'https://dhafer-e-commerce-react-app.herokuapp.com',
	cache: new InMemoryCache(),
});

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<ApolloProvider client={client}>
				<Routes>
					<Route path='/' element={<App client={client} />}>
						<Route path='/plp/:plp' element={<Category client={client} />} />
						<Route path='/plp/:plp/:pdp' element={<Product client={client} />} />
						<Route path='/cart' element={<Cart client={client} />} />
					</Route>
				</Routes>
			</ApolloProvider>
		</Router>
	</React.StrictMode>,
	document.getElementById('root'),
);
