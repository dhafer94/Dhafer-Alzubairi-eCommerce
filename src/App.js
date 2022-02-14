import React, { PureComponent, createContext } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation.Component';
import Category from './pages/Category/Category.Component';
import { Link, Outlet } from 'react-router-dom';
import { gql } from '@apollo/client';
import { CategoryContext, CategoryProductsContext } from './contexts';

class App extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			allData: [],
			categoriesNames: [],
			activeRoute: 'all',
			products: [],
		};
	}
	//one request to get all the needed data from the server
	componentDidMount() {
		this.props.client
			.query({
				query: gql`
					{
						categories {
							name
							products {
								id
								category
								name
								gallery
								prices {
									currency {
										label
										symbol
									}
									amount
								}
								brand
								inStock
								attributes {
									items {
										value
									}
								}
								description
							}
						}
					}
				`,
			})
			.then((res) =>
				this.setState({
					allData: res.data.categories.map((item) => item),
					categoriesNames: res.data.categories.map((item) => item.name),
					products: res.data.categories[0].products.map((item) => item),
				}),
			);

		// to fully render the content when going back to root route
		window.addEventListener('popstate', () => {
			window.location.reload();
		});
	}

	handleCategoryClick = (e) => {
		this.setState({
			activeRoute: e.target.innerText,
			products: this.state.allData.filter((product, i) => {
				return product.name === e.target.innerText;
			}),
		});
	};

	render() {
		const category = this.state.activeRoute;
		const products = this.state.products;
		// console.log(window.location.pathname);

		return (
			<div className='App'>
				<Navigation
					handleCategoryClick={this.handleCategoryClick}
					categoriesNames={this.state.categoriesNames}
				/>
				{window.location.pathname === '/' ? (
					<Category />
				) : (
					<CategoryContext.Provider value={category}>
						<CategoryProductsContext.Provider value={products}>
							<Outlet />
						</CategoryProductsContext.Provider>
					</CategoryContext.Provider>
				)}
			</div>
		);
	}
}

export default App;
