import React, { PureComponent } from 'react';
import './App.scss';
import Navigation from './components/Navigation/Navigation.Component';
import CartOverlay from './components/CartOverlay/CartOverlay.Component';
import { Outlet } from 'react-router-dom';
import { gql } from '@apollo/client';
import {
	CategoryProductsContext,
	CurrencyContext,
	AllDataContext,
	DataFetchedContext,
	ChosenCategoryContext,
	HandleAddToCartContext,
	HandleAttributeClickContext
} from './contexts';
import { withRouter } from './withRouter';

class App extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			allData: [],
			products: [],
			categoriesNames: [],
			productsToBeShown: [],
			currency: [],
			dataFetched: false,
			dropdown: {
				currency: 'inactive',
				cartOverlay: 'inactive'
			},
			chosenAttributes: [],
			cart: [],
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
						productsToBeShown: res.data.categories[0].products,
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
						//all products with duplicates if they exist in other categories
						products: res.data.categories.map((item) => item.products).flat(Infinity)

					});
				}
			});
		return () => {
			controller.abort();
		};
	}

	componentDidUpdate() {
		if (this.state.dataFetched && this.props.router.location.pathname === `/plp/${this.props.router.params.plp}`) {
			const productsToBeShown = this.state.allData.filter((category) => {
				return category.name === this.props.router.params.plp && category.products;
			})[0].products;
			// console.log(products);

			return this.setState({
				productsToBeShown: productsToBeShown,
				// products: products
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

	handleAttributeClick = (e) => {
		const name = e.target.attributes.attribute.nodeValue;
		const value = e.target.attributes.attributeval.nodeValue;
		const id = e.target.id;

		//to reset the previous active attribute/s and visually set the active attribute visually
		if (e.target.className === 'product-attribute') {
			e.target.parentNode.childNodes.forEach(
				(child) => (child.className = 'product-attribute'),
			);
			e.target.className = 'product-attribute-active';
		}
		if (e.target.className === 'product-attribute-swatch') {
			e.target.parentNode.childNodes.forEach(
				(child) => (child.className = 'product-attribute-swatch'),
			);
			e.target.className = 'product-attribute-swatch-active';
		}

		//to set active attributes, reset the previous active attribute/s in our data and set the newones if any changes
		this.setState({
			chosenAttributes:
				this.state.chosenAttributes.length === 0
					?
					[
						{
							id: id,
							name: name,
							value: value,
						}
					]
					:
					[
						...this.state.chosenAttributes.filter((att) => att.name !== name),
						{
							id: id,
							name: name,
							value: value,
						}
					],
		});
	};


	handleAddToCart = (e) => {
		const { products, cart } = this.state;
		const AddedProductId = e.target.id;
		const chosenAttributes = this.state.chosenAttributes.filter((att) => att.id === AddedProductId);
		const AddedProduct = products.find((product) => product.id === AddedProductId);
		const { name, brand, prices, attributes, id, gallery } = AddedProduct;

		//To only add the product to the cart when attributes has been chosen
		//a popup to choose the correct one can be shown to the user otherwise, in the meantime an alert is implemented
		if (chosenAttributes.length === attributes.length) {
			if (cart.length > 0) {
				if (cart.some((item) => item.id === AddedProductId)) {
					const newItem = cart.filter((item) => item.id === AddedProductId);

					this.setState({
						cart: [
							...this.state.cart.filter((item) => item.id !== AddedProductId),
							{

								name: name,
								brand: brand,
								prices: prices,
								id: id,
								attributes: [
									...this.state.cart.filter((item) => item.id === AddedProductId)[0].attributes, chosenAttributes
								],
								quantity: newItem[0].quantity + 1,
								gallery: gallery
							}
						]
					});
				}
				else {
					this.setState({
						cart: [
							...this.state.cart,
							{
								name: name,
								brand: brand,
								prices: prices,
								id: id,
								attributes: [this.state.chosenAttributes.filter(att => att.id === AddedProductId)],
								quantity: 1,
								gallery: gallery

							}
						]
					});
				}
			}
			else {
				this.setState({
					cart: [
						...this.state.cart,
						{
							name: name,
							brand: brand,
							prices: prices,
							id: id,
							attributes: [this.state.chosenAttributes.filter(att => att.id === AddedProductId)],
							quantity: 1,
							gallery: gallery
						}]
				});
			}

		} else {
			const chosenAttributesNames = chosenAttributes.map((att) => att.id === AddedProductId).map((att) => att.name);
			const notAddedAttributes = attributes.map(att => att.name).filter((attr) => !chosenAttributesNames.includes(attr));

			if (notAddedAttributes.length === 1) {
				const alert = notAddedAttributes.map(att => att);
				window.alert(`Please select one of the available options for your ${name}:\n${alert.map((att) => ` ${att}`)
					} `);
			}
			else {
				const alert = notAddedAttributes.map(att => att);
				window.alert(`Please select one of the available options for your ${name}:\n${alert.map((att) => ` ${att}`).slice(0, -1)} and ${alert[alert.length - 1]
					} `);

			}
		}
	};

	//Listen to clicks anywhere on the page to control dropdown active, inactive state
	//Added the cart for the same action and refactored the code using id in s
	handleClicksForDropDown = (e) => {
		const id = e.target.id;
		const { dropdown } = this.state;
		const cartId = 'navbar-cart';
		const currencyId = 'navbar-currency';
		// console.log(id);

		if (id === cartId && dropdown.cartOverlay === 'inactive') {
			this.setState({
				dropdown: {
					currency: 'inactive',
					cartOverlay: 'active'
				}
			});
		} else
			if (id === cartId && dropdown.cartOverlay === 'active') {
				this.setState({
					dropdown: {
						currency: 'inactive',
						cartOverlay: 'inactive'
					}
				});

			}
		if (id === currencyId && dropdown.currency === 'inactive') {
			this.setState({
				dropdown: {
					currency: 'active',
					cartOverlay: 'inactive'
				}
			});

		};

	};

	handleIncrementDecrement = (e) => {
		// console.log(e.target.name, 'name');
		// console.log(e.target.id, 'id');
		const id = e.target.id;
		const name = e.target.name;

		const matchingItem = this.state.cart.filter(item =>
			item.id === id
		);

		// console.log(matchingItem, 'matchingItem');


	};

	//to hide dropdown and cart overlay when clicking anywhere else on the page
	resetter = (e) => {
		const id = e.target.id;
		const cartId = 'navbar-cart';
		const currencyId = 'navbar-currency';
		if (id !== cartId && id !== currencyId) {
			this.setState({
				dropdown: {
					currency: 'inactive',
					cartOverlay: 'inactive'
				}
			});
		}
	};

	render() {
		const { productsToBeShown, currency, dataFetched, allData, dropdown, cart, chosenAttributes } = this.state;
		const chosenCategory = this.props.router.params.plp;
		const selectedCurrency = this.state.currency.filter(
			(item) => item.selected === true,
		);
		// console.log(dropdown, 'dropdown');

		return (
			<div
				onClick={this.resetter}
				className='App' >
				<Navigation
					categoriesNames={this.state.categoriesNames}
					currency={currency}
					handleCurrencyClick={this.handleCurrencyClick}
					dataFetched={dataFetched}
					selectedCurrency={selectedCurrency}
					dropdown={dropdown.currency}
					cartLength={cart.length}
					handleIncrementDecrement={this.handleIncrementDecrement}
					handleClicksForDropDown={this.handleClicksForDropDown}
					cart={cart}
				/>
				<HandleAttributeClickContext.Provider value={this.handleAttributeClick}>
					<HandleAddToCartContext.Provider value={this.handleAddToCart}>
						<ChosenCategoryContext.Provider value={chosenCategory}>
							<DataFetchedContext.Provider value={dataFetched}>
								<AllDataContext.Provider value={allData}>
									<CurrencyContext.Provider value={selectedCurrency}>
										<CategoryProductsContext.Provider value={productsToBeShown}>
											<Outlet />
											<CartOverlay
												// id='cart-overlay'
												dropdown={dropdown.cartOverlay}
												handleIncrementDecrement={this.handleIncrementDecrement}
												currency={selectedCurrency}
												cart={cart} />
										</CategoryProductsContext.Provider>
									</CurrencyContext.Provider>
								</AllDataContext.Provider>
							</DataFetchedContext.Provider>
						</ChosenCategoryContext.Provider>
					</HandleAddToCartContext.Provider>
				</HandleAttributeClickContext.Provider>
			</div>
		);
	}
}

export default withRouter(App);
