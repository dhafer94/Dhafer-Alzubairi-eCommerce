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
	HandleProductChoiceContext,
	ChosenProductIdContext,
	AllDataContext
} from './contexts';
import { withRouter } from './withRouter';
// import { currencySort } from './components/Currency/Currency.Component';

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
			chosenProductId: ''
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

		// console.log(this.state.dataFetched);
		return () => {
			controller.abort();
		};
	}
	componentDidUpdate() {
		if (this.state.dataFetched && this.props.router.location.pathname === `/plp/${this.props.router.params.plp}`) {
			// console.log(this.props.router.params);
			const products = this.state.allData.filter((category) => {
				return category.name === this.props.router.params.plp && category.products;
			})[0].products;

			return this.setState({
				activeRoute: this.props.router.params.plp,
				products: products,
			});
		}
		if (this.props.router.location.pathname === '/') {
			this.props.router.navigate('/plp/all');
		}
	}

	handleChange = (value) => {
		if (this.state.dataFetched) {
			this.setState((state) => ({
				currency: state.currency.map((c) => {
					return {
						...c,
						selected: c.label === value,
					};
				}),
			}));
		}
	};

	handleProductChoice = (e) => {
		if (this.state.dataFetched) {
			this.setState({
				chosenProductId: e.target.id
			});
		}
	};


	render() {
		const { activeRoute, products, currency, dataFetched, chosenProductId, allData } = this.state;
		const selectedCurrency = this.state.currency.find(
			(item) => item.selected === true,
		);

		return (
			<div className='App'>
				<Navigation
					categoriesNames={this.state.categoriesNames}
					currency={currency}
					handleChange={this.handleChange}
					dataFetched={dataFetched}
				/>
				<AllDataContext.Provider value={allData}>
					<ChosenProductIdContext.Provider value={chosenProductId}>
						<HandleProductChoiceContext.Provider value={this.handleProductChoice}>
							<CategoryContext.Provider value={activeRoute}>
								<CurrencyContext.Provider value={selectedCurrency}>
									<CategoryProductsContext.Provider value={products}>
										<Outlet />
									</CategoryProductsContext.Provider>
								</CurrencyContext.Provider>
							</CategoryContext.Provider>
						</HandleProductChoiceContext.Provider>
					</ChosenProductIdContext.Provider>
				</AllDataContext.Provider>
			</div>
		);
	}
}

export default withRouter(App);
