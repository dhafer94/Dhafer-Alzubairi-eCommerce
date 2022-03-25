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
			cart: [
				{
					"name": "iMac 2021",
					"brand": "Apple",
					"prices": [
						{
							"__typename": "Price",
							"currency": {
								"__typename": "Currency",
								"label": "USD",
								"symbol": "$"
							},
							"amount": 1688.03
						},
						{
							"__typename": "Price",
							"currency": {
								"__typename": "Currency",
								"label": "GBP",
								"symbol": "£"
							},
							"amount": 1213.34
						},
						{
							"__typename": "Price",
							"currency": {
								"__typename": "Currency",
								"label": "AUD",
								"symbol": "A$"
							},
							"amount": 2177.57
						},
						{
							"__typename": "Price",
							"currency": {
								"__typename": "Currency",
								"label": "JPY",
								"symbol": "¥"
							},
							"amount": 182294.51
						},
						{
							"__typename": "Price",
							"currency": {
								"__typename": "Currency",
								"label": "RUB",
								"symbol": "₽"
							},
							"amount": 127653.82
						}
					],
					"id": "apple-imac-2021",
					"attributes": [
						[
							{
								"id": "apple-imac-2021",
								"name": "Capacity",
								"value": "512GB"
							},
							{
								"id": "apple-imac-2021",
								"name": "With USB 3 ports",
								"value": "No"
							},
							{
								"id": "apple-imac-2021",
								"name": "Touch ID in keyboard",
								"value": "No"
							}
						]
					],
					"quantity": 1,
					"gallery": [
						"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imac-24-blue-selection-hero-202104?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1617492405000"
					]
				},
				{
					"name": "Jacket",
					"brand": "Canada Goose",
					"prices": [
						{
							"__typename": "Price",
							"currency": {
								"__typename": "Currency",
								"label": "USD",
								"symbol": "$"
							},
							"amount": 518.47
						},
						{
							"__typename": "Price",
							"currency": {
								"__typename": "Currency",
								"label": "GBP",
								"symbol": "£"
							},
							"amount": 372.67
						},
						{
							"__typename": "Price",
							"currency": {
								"__typename": "Currency",
								"label": "AUD",
								"symbol": "A$"
							},
							"amount": 668.83
						},
						{
							"__typename": "Price",
							"currency": {
								"__typename": "Currency",
								"label": "JPY",
								"symbol": "¥"
							},
							"amount": 55990.46
						},
						{
							"__typename": "Price",
							"currency": {
								"__typename": "Currency",
								"label": "RUB",
								"symbol": "₽"
							},
							"amount": 39207.96
						}
					],
					"id": "jacket-canada-goosee",
					"attributes": [
						[
							{
								"id": "jacket-canada-goosee",
								"name": "Size",
								"value": "M"
							}
						]
					],
					"quantity": 1,
					"gallery": [
						"https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg",
						"https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016107/product-image/2409L_61_a.jpg",
						"https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016108/product-image/2409L_61_b.jpg",
						"https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016109/product-image/2409L_61_c.jpg",
						"https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016110/product-image/2409L_61_d.jpg",
						"https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058169/product-image/2409L_61_o.png",
						"https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058159/product-image/2409L_61_p.png"
					]
				},
				{
					"name": "Nike Air Huarache Le",
					"brand": "Nike x Stussy",
					"prices": [
						{
							"__typename": "Price",
							"currency": {
								"__typename": "Currency",
								"label": "USD",
								"symbol": "$"
							},
							"amount": 144.69
						},
						{
							"__typename": "Price",
							"currency": {
								"__typename": "Currency",
								"label": "GBP",
								"symbol": "£"
							},
							"amount": 104
						},
						{
							"__typename": "Price",
							"currency": {
								"__typename": "Currency",
								"label": "AUD",
								"symbol": "A$"
							},
							"amount": 186.65
						},
						{
							"__typename": "Price",
							"currency": {
								"__typename": "Currency",
								"label": "JPY",
								"symbol": "¥"
							},
							"amount": 15625.24
						},
						{
							"__typename": "Price",
							"currency": {
								"__typename": "Currency",
								"label": "RUB",
								"symbol": "₽"
							},
							"amount": 10941.76
						}
					],
					"id": "huarache-x-stussy-le",
					"attributes": [
						[
							{
								"id": "huarache-x-stussy-le",
								"name": "Size",
								"value": "43"
							}
						]
					],
					"quantity": 1,
					"gallery": [
						"https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087",
						"https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087",
						"https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087",
						"https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087",
						"https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087"
					]
				},
				{
					"name": "iPhone 12 Pro",
					"brand": "Apple",
					"prices": [
						{
							"__typename": "Price",
							"currency": {
								"__typename": "Currency",
								"label": "USD",
								"symbol": "$"
							},
							"amount": 1000.76
						},
						{
							"__typename": "Price",
							"currency": {
								"__typename": "Currency",
								"label": "GBP",
								"symbol": "£"
							},
							"amount": 719.34
						},
						{
							"__typename": "Price",
							"currency": {
								"__typename": "Currency",
								"label": "AUD",
								"symbol": "A$"
							},
							"amount": 1290.99
						},
						{
							"__typename": "Price",
							"currency": {
								"__typename": "Currency",
								"label": "JPY",
								"symbol": "¥"
							},
							"amount": 108074.6
						},
						{
							"__typename": "Price",
							"currency": {
								"__typename": "Currency",
								"label": "RUB",
								"symbol": "₽"
							},
							"amount": 75680.48
						}
					],
					"id": "apple-iphone-12-pro",
					"attributes": [
						[
							{
								"id": "apple-iphone-12-pro",
								"name": "Capacity",
								"value": "512G"
							},
							{
								"id": "apple-iphone-12-pro",
								"name": "Color",
								"value": "#03FFF7"
							}
						]
					],
					"quantity": 1,
					"gallery": [
						"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-family-hero?wid=940&amp;hei=1112&amp;fmt=jpeg&amp;qlt=80&amp;.v=1604021663000"
					]
				}
			],
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

		} else
			if (id === currencyId && dropdown.currency === 'active') {
				this.setState({
					dropdown: {
						currency: 'inactive',
						cartOverlay: 'inactive'
					}
				});

			}

	};

	handleIncrementDecrement = (e, item) => {
		const id = e.target.id;
		const name = e.target.name;

		const matchingItemIndex = this.state.cart.findIndex(item =>
			item.id === id
		);
		const incremented = {
			name: item.name,
			brand: item.brand,
			prices: item.prices,
			id: item.id,
			quantity: item.quantity + 1,
			gallery: item.gallery
		};
		const decremented = {
			name: item.name,
			brand: item.brand,
			prices: item.prices,
			id: item.id,
			quantity: item.quantity - 1,
			gallery: item.gallery
		};

		const newCart = this.state.cart.filter(item =>
			item.id !== id
		);
		if (name === 'increment') {
			newCart.splice(matchingItemIndex, 0, incremented);
			this.setState({
				cart: newCart
			});
		}
		if (name === 'decrement') {
			newCart.splice(matchingItemIndex, 0, decremented);
			this.setState({
				cart: newCart
			});
		}
	};

	//to hide dropdown and cart overlay when clicking anywhere else on the page
	resetter = (e) => {
		const id = e.target.id;
		const name = e.target.name;
		const cartId = 'navbar-cart';
		const currencyId = 'navbar-currency';
		// console.log(e);
		//exceptions are 
		if (id !== cartId && name !== 'increment' && name !== 'decrement' && id !== currencyId && id !== currencyId && id !== 'cart-overlay') {
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
