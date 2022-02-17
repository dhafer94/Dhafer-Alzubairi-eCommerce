import React, { PureComponent } from 'react';
import './ProductCard.styles.scss';

class ProductCard extends PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		const name = this.props.product.name;
		const img = this.props.product.gallery[0];
		const currency = this.props.currency;
		const price = this.props.product.prices.find(
			(i) => currency.label === i.currency.label,
		);
		return (
			<div className='product'>
				<img src={img} alt={name} width='350px' height='330px' />
				<p>{name}</p>
				<p>
					{price.currency.symbol}
					{price.amount}
				</p>
			</div>
		);
	}
}

export default ProductCard;
