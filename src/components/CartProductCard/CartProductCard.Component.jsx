import React, { PureComponent } from 'react';
import './CartProductCard.styles.scss';
import { withRouter } from '../../withRouter';

class CartProductCard extends PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		const { cart, currency, handleIncrementDecrement } = this.props;
		// console.log(this.props);

		return (
			<div className='cart-products-container'>
				{cart.length > 0
					? cart.map((item, i) => (
							<div key={i} id={i} className='cart-product-card'>
								<div className='cart-product-left-container'>
									<h3 key={i} className='cart-product-card-brand'>
										{item.brand}
									</h3>
									<h3 key={i + 1000} className='cart-product-card-name'>
										{item.name}
									</h3>
									{item.prices.map((price) =>
										currency.length > 0 &&
										price.currency.label === currency[0].label ? (
											<p key={i} className='cart-product-card-price'>
												{price.currency.symbol}
												{price.amount}
											</p>
										) : null,
									)}
									<div
										key={i + 20000}
										className='cart-product-card-attributes-main-container'>
										<div
											key={i}
											className='cart-product-card-attributes-text-container'>
											{item.allAttributes.map((att, i) =>
												att.map((attr, i) =>
													attr.type === 'text' ? (
														<div
															key={i}
															className={
																attr.selected
																	? 'cart-product-card-attribute-box-selected'
																	: 'cart-product-card-attribute-box'
															}>
															{attr.value}
														</div>
													) : null,
												),
											)}
										</div>
										<div
											key={i + 1000}
											className='cart-product-card-attributes-swatch-container'>
											{item.allAttributes.map((att, i) =>
												att.map((attr, i) =>
													attr.type === 'swatch' ? (
														<div
															key={i}
															style={{ background: attr.value }}
															className={
																attr.selected
																	? 'cart-product-card-attribute-swatch-selected'
																	: 'cart-product-card-attribute-swatch'
															}>
															{attr.value}
														</div>
													) : null,
												),
											)}
										</div>
									</div>
								</div>

								<div className='cart-product-right-container'>
									<div key={i} className='cart-product-mid-container'>
										<button
											id={item.id}
											name='increment'
											onClick={(e) => handleIncrementDecrement(e, i)}
											className='cart-product-increment-decrement'>
											+
										</button>
										<p className='cart-product-quantity'>{item.quantity}</p>
										<button
											id={item.id}
											name='decrement'
											onClick={(e) => handleIncrementDecrement(e, i)}
											className='cart-product-increment-decrement'>
											-
										</button>
									</div>
									<img
										className='cart-product-img'
										src={item.gallery[0]}
										alt={item.name}
									/>
								</div>
							</div>
					  ))
					: null}
			</div>
		);
	}
}

export default withRouter(CartProductCard);
