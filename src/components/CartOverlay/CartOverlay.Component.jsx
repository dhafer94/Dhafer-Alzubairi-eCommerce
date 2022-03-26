import React, { PureComponent } from 'react';
import './CartOverlay.styles.scss';

class CartOverlay extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			totalPrice: 0,
		};
	}

	componentDidUpdate() {
		const { cart, currency } = this.props;
		if (cart.length > 0) {
			const prices = cart
				.map((item) =>
					item.prices.map((price) => ({
						quantity: item.quantity,
						price: price.amount,
						currency: price.currency.label,
						symbol: price.currency.symbol,
					})),
				)
				.flat(1)
				.map((item) => ({
					currency: item.currency,
					price: item.quantity * item.price,
					symbol: item.symbol,
				}));

			const sum = prices
				.filter((price) => price.currency === currency[0].label)
				.map((price) => price.price)
				.reduce((prevVal, val) => prevVal + val)
				.toFixed(2);

			this.setState({
				totalPrice: sum,
			});
		}
	}

	render() {
		const {
			cart,
			currency,
			handleIncrementDecrement,
			dropdown,
			handleClicksForDropDown,
		} = this.props;
		const { totalPrice } = this.state;
		// console.log(totalPrice);

		return (
			<div
				onClick={handleClicksForDropDown}
				id='cart-overlay'
				className={
					dropdown === 'active' ? 'cart-overlay' : 'cart-overlay-invisible'
				}>
				<h2 id='cart-overlay' className='cart-overlay-title'>
					my Bag{' '}
					<span id='cart-overlay' className='cart-overlay-products-count'>
						{`${cart.length ? cart.length : 'no'}`} items
					</span>
				</h2>
				<div
					id='cart-overlay'
					className={
						cart.length <= 1
							? 'cart-overlay-items-main-container-mini'
							: 'cart-overlay-items-main-container'
					}>
					{cart.length > 0
						? cart.map(
								(item, i) =>
									item.quantity >= 1 && (
										<div
											id='cart-overlay'
											key={i}
											className={'cart-overlay-item-container'}>
											{' '}
											<div
												id='cart-overlay'
												className='cart-overlay-item-left-container'>
												<h3
													id='cart-overlay'
													className='cart-overlay-item-title'>
													{item.brand}
													<br />
													{item.name}
												</h3>
												{currency.length > 0
													? item.prices.map(
															(price, i) =>
																price.currency.label === currency[0].label && (
																	<p
																		id='cart-overlay'
																		className='cart-overlay-item-price'
																		key={i}>
																		{`${price.currency.symbol}${price.amount}`}
																	</p>
																),
													  )
													: null}
												<div
													id='cart-overlay'
													className='cart-overlay-item-attributes-container'>
													{/* {console.log(item)} */}
													{item.allAttributes.length > 0
														? item.allAttributes.map((att, i) =>
																// console.log(att),
																item.allAttributes.type === 'swatch' ? (
																	<div
																		key={i}
																		style={{ background: `${att.value}` }}
																		id='cart-overlay'
																		className='cart-overlay-item-attribute-box'></div>
																) : (
																	<div
																		key={i}
																		id='cart-overlay'
																		className='cart-overlay-item-attribute-box'>
																		{att.value}
																	</div>
																),
														  )
														: null}
													{/* {item.attributes.flat(1).map((att, i) =>
														att.type === 'swatch' ? (
															<div
																key={i}
																style={{ background: `${att.value}` }}
																id='cart-overlay'
																className='cart-overlay-item-attribute-box'></div>
														) : (
															<div
																key={i}
																id='cart-overlay'
																className='cart-overlay-item-attribute-box'>
																{att.value}
															</div>
														),
													)} */}
													{/* <div
														id='cart-overlay'
														className='cart-overlay-item-attribute-box'>
														s
													</div> */}
												</div>
											</div>
											<div
												id='cart-overlay'
												className='cart-overlay-item-right-container'>
												<div className='cart-overlay-item-mid-container'>
													<button
														id={item.id}
														name='increment'
														onClick={(e) => handleIncrementDecrement(e, item)}
														className='cart-overlay-item-attribute-increment-decrement'>
														+
													</button>

													<p
														id='cart-overlay'
														className='cart-overlay-item-quantity'>
														{item.quantity}
													</p>
													<button
														id={item.id}
														name='decrement'
														onClick={(e) => handleIncrementDecrement(e, item)}
														className='cart-overlay-item-attribute-increment-decrement'>
														-
													</button>
												</div>
												<img
													id='cart-overlay'
													src={item.gallery[0]}
													className='cart-overlay-item-img'
													alt={item.name}
												/>
											</div>
										</div>
									),
						  )
						: null}
				</div>

				<div id='cart-overlay' className='cart-overlay-total-price-container'>
					<p id='cart-overlay' className='cart-overlay-total-price-text'>
						total
					</p>
					<p id='cart-overlay' className='cart-overlay-total-price-amount'>
						{currency[0] && currency[0].symbol}
						{totalPrice}
					</p>
				</div>
				<div id='cart-overlay' className='cart-overlay-total-price-container'>
					<button id='cart-overlay' className='cart-overlay-view-btn'>
						view bag
					</button>
					<button id='cart-overlay' className='cart-overlay-checkout-btn'>
						checkout
					</button>
				</div>
			</div>
		);
	}
}

export default CartOverlay;
