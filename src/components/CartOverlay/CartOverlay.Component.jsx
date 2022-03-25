import React, { PureComponent } from 'react';
import './CartOverlay.styles.scss';
import { myCart } from './myCart';

class CartOverlay extends PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		const { cart, currency } = this.props;
		const carty = myCart;
		console.log(carty[0].gallery[0]);

		return (
			<div className='cart-overlay'>
				<h2 className='cart-overlay-title'>
					My Bag{' '}
					<span className='cart-overlay-products-count'>
						{`${carty.length ? carty.length : 'no'}`} items
					</span>
				</h2>
				{carty.length > 0
					? carty.map((item, i) => (
							<div key={i} className='cart-overlay-item-container'>
								{' '}
								<div>
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
								</div>
								<div className='cart-overlay-item-right-container'>
									<div className='cart-overlay-item-mid-container'>
										<svg
											className='cart-overlay-item-increase'
											width='24'
											height='24'
											viewBox='0 0 24 24'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'>
											<path
												d='M12 8V16'
												stroke='#1D1F22'
												stroke-linecap='round'
												stroke-linejoin='round'
											/>
											<path
												d='M8 12H16'
												stroke='#1D1F22'
												stroke-linecap='round'
												stroke-linejoin='round'
											/>
											<rect
												x='0.5'
												y='0.5'
												width='23'
												height='23'
												stroke='#1D1F22'
											/>
										</svg>
										<p className='cart-overlay-item-quantity'>
											{item.quantity}
										</p>
										<svg
											className='cart-overlay-item-decrease'
											width='24'
											height='24'
											viewBox='0 0 24 24'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'>
											<path
												d='M8 12H16'
												stroke='#1D1F22'
												stroke-linecap='round'
												stroke-linejoin='round'
											/>
											<rect
												x='0.5'
												y='0.5'
												width='23'
												height='23'
												stroke='#1D1F22'
											/>
										</svg>
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
				{/* <div className='cart-overlay-item-container'></div> */}
				{/* <div className='cart-overlay-item-container'></div> */}
				<div className='cart-overlay-total-price'>total</div>
			</div>
		);
	}
}

export default CartOverlay;
