import React, { PureComponent } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation.Component';
import Category from './pages/Category/Category.Component';
import { Outlet } from 'react-router-dom';
import { gql } from '@apollo/client';
import {
	CategoryContext,
	CategoryProductsContext,
	CurrencyContext,
} from './contexts';

class App extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			allData: [],
			categoriesNames: [],
			activeRoute: 'all',
			products: [],
			currency: [],
			dataFetched: false,
		};
	}

	//one request to get all the needed data from the server
	componentDidMount() {
		const controller = new AbortController();
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
			.then((res) => {
				if (!this.state.dataFetched) {
					this.setState({
						allData: res.data.categories.map((item) => item),
						categoriesNames: res.data.categories.map((item) => item.name),
						products: res.data.categories[0].products,
						currency: res.data.categories[0].products[0].prices.map(
							(item, i) => {
								return {
									label: item.currency.label,
									symbol: item.currency.symbol,
									selected: i === 0 ? true : false,
								};
							},
						),
						dataFetched: true,
					});
				}
			});

		// to fully render the content when going back to root route
		window.addEventListener('popstate', () => {
			window.location.reload();
		});

		return () => {
			controller.abort();
		};
	}

	handleCategoryClick = (e) => {
		const filteredCategory = this.state.allData.filter((category) => {
			return category.name === e.target.innerText && category.products;
		});

		this.setState({
			activeRoute: e.target.innerText,
			products: filteredCategory[0].products,
		});
	};

	handleChange = (value) => {
		this.setState((state) => ({
			currency: state.currency.map((c) => {
				return {
					...c,
					selected: c.label === value,
				};
			}),
		}));
	};

	render() {
		const route = this.state.activeRoute;
		const products = this.state.products;
		const currency = this.state.currency;
		const dataFetched = this.state.dataFetched;
		const selectedCurrency = this.state.currency.find(
			(item) => item.selected === true,
		);
		// console.log(selectedCurrency);

		return (
			<div className='App'>
				<Navigation
					handleCategoryClick={this.handleCategoryClick}
					categoriesNames={this.state.categoriesNames}
					currency={currency}
					handleChange={this.handleChange}
					dataFetched={dataFetched}
				/>
				{window.location.pathname === '/' ? (
					<CurrencyContext.Provider value={selectedCurrency}>
						<CategoryProductsContext.Provider value={products}>
							<Category />
						</CategoryProductsContext.Provider>
					</CurrencyContext.Provider>
				) : (
					<CategoryContext.Provider value={route}>
						<CurrencyContext.Provider value={selectedCurrency}>
							<CategoryProductsContext.Provider value={products}>
								<Outlet />
							</CategoryProductsContext.Provider>
						</CurrencyContext.Provider>
					</CategoryContext.Provider>
				)}
			</div>
		);
	}
}

export default App;
