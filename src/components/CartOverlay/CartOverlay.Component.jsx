import React, { PureComponent } from 'react';
import './CartOverlay.styles.scss';
import { myCart } from './myCart';

class CartOverlay extends PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		const { cart, currency, handleIncrementDecrement, dropdown } = this.props;
		const carty = myCart;
		// console.log(dropdown);

		return (
			<div
				id='cart-overlay'
				className={
					dropdown === 'active' ? 'cart-overlay' : 'cart-overlay-invisible'
				}>
				<h2 className='cart-overlay-title'>
					my Bag{' '}
					<span className='cart-overlay-products-count'>
						{`${cart.length ? cart.length : 'no'}`} items
					</span>
				</h2>
				<div
					className={
						cart.length <= 1
							? 'cart-overlay-items-main-container-mini'
							: 'cart-overlay-items-main-container'
					}>
					{cart.length > 0
						? cart.map((item, i) => (
								<div key={i} className={'cart-overlay-item-container'}>
									{' '}
									<div className='cart-overlay-item-left-container'>
										<h3 className='cart-overlay-item-title'>
											{item.brand}
											<br />
											{item.name}
										</h3>
										{currency.length > 0
											? item.prices.map(
													(price, i) =>
														price.currency.label === currency[0].label && (
															<p className='cart-overlay-item-price' key={i}>
																{`${price.currency.symbol}${price.amount}`}
															</p>
														),
											  )
											: null}
										<div className='cart-overlay-item-attributes-container'>
											<div className='cart-overlay-item-attribute-box'>s</div>
											<div className='cart-overlay-item-attribute-box'>s</div>
										</div>
									</div>
									<div className='cart-overlay-item-right-container'>
										<div className='cart-overlay-item-mid-container'>
											<button
												id={item.id}
												name='increment'
												onClick={handleIncrementDecrement}
												className='cart-overlay-item-attribute-increment-decrement'>
												+
											</button>

											<p className='cart-overlay-item-quantity'>
												{item.quantity}
											</p>
											<button
												id={item.id}
												name='decrement'
												onClick={handleIncrementDecrement}
												className='cart-overlay-item-attribute-increment-decrement'>
												-
											</button>
										</div>
										<img
											src={item.gallery[0]}
											className='cart-overlay-item-img'
											alt={item.name}
										/>
									</div>
								</div>
						  ))
						: null}
				</div>

				<div className='cart-overlay-total-price-container'>
					<div className='cart-overlay-total-price-text'>total</div>
					<div className='cart-overlay-total-price-amount'>$1329</div>
				</div>
				<div className='cart-overlay-total-price-container'>
					<button className='cart-overlay-view-btn'>view bag</button>
					<button className='cart-overlay-checkout-btn'>checkout</button>
				</div>
			</div>
		);
	}
}

export default CartOverlay;
