import React, { PureComponent } from 'react';
import './ProductCard.styles.scss';

class ProductCard extends PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		const name = this.props.product.name;
		const price = this.props.product.prices;
		const img = this.props.product.gallery[0];

		return (
			<div className='product'>
				<img src={img} alt={name} width='350px' height='330px' />
				<p>{name}</p>
				<p>{price[0].amount}</p>
			</div>
		);
	}
}

export default ProductCard;
