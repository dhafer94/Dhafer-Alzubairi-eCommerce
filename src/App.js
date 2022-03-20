import React, { PureComponent } from 'react';
import './App.scss';
import Navigation from './components/Navigation/Navigation.Component';
import { Outlet } from 'react-router-dom';
import { gql } from '@apollo/client';
import {
	CategoryProductsContext,
	CurrencyContext,
	AllDataContext, DataFetchedContext
} from './contexts';
import { withRouter } from './withRouter';

class App extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			allData: [],
			categoriesNames: [],
			products: [],
			currency: [],
			dataFetched: false,
			dropdown: 'inactive'
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
								name
								type
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
		return () => {
			controller.abort();
		};
	}

	componentDidUpdate() {
		if (this.state.dataFetched && this.props.router.location.pathname === `/plp/${this.props.router.params.plp}`) {
			const products = this.state.allData.filter((category) => {
				return category.name === this.props.router.params.plp && category.products;
			})[0].products;

			return this.setState({
				products: products,
			});
		}
		if (this.props.router.location.pathname === '/') {
			this.props.router.navigate('/plp/all');
		}
	}

	handleCurrencyClick = (e) => {
		const value = e.target.value;
		if (this.state.dataFetched) {
			this.setState((state) => ({
				currency: state.currency.map((c) => {
					return {
						...c,
						selected: c.label === value,
					};
				}),
				dropdown: 'inactive'
			}));
		}
	};

	//Listen to clicks anywhere on the page to control dropdown active, inactive state
	handleClicksForDropDown = (e) => {
		const activeClass = 'currency-container active-bg';
		const inactiveClass = 'currency-container inactive-bg';

		if (e.target.className === inactiveClass || e.target.parentNode.className === inactiveClass) {
			this.setState({ dropdown: 'active' });
		} else if (e.target.className === activeClass || e.target.parentNode.className === activeClass) {
			this.setState({ dropdown: 'inactive' });
		} else {
			this.setState({
				dropdown: this.state.dropdown === 'inactive'
			});
		}
	};

	render() {
		const { products, currency, dataFetched, allData, dropdown } = this.state;
		const selectedCurrency = this.state.currency.filter(
			(item) => item.selected === true,
		);

		return (
			<div onClick={(e) => this.handleClicksForDropDown(e)} className='App' >
				<Navigation
					categoriesNames={this.state.categoriesNames}
					currency={currency}
					handleCurrencyClick={this.handleCurrencyClick}
					dataFetched={dataFetched}
					selectedCurrency={selectedCurrency}
					dropdown={dropdown}
				/>
				<DataFetchedContext.Provider value={dataFetched}>
					<AllDataContext.Provider value={allData}>
						<CurrencyContext.Provider value={selectedCurrency}>
							<CategoryProductsContext.Provider value={products}>
								<Outlet />
							</CategoryProductsContext.Provider>
						</CurrencyContext.Provider>
					</AllDataContext.Provider>
				</DataFetchedContext.Provider>
			</div>
		);
	}
}

export default withRouter(App);
