import React, { PureComponent } from 'react';
import './ProductCard.styles.scss';
import { NavLink } from 'react-router-dom';

class ProductCard extends PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		const { currency, handleProductChoice } = this.props;
		const { id, name, gallery, prices, category } = this.props.product;
		const img = gallery[0];
		const price = prices.find((i) => currency.label === i.currency.label);
		// console.log(category);
		return (
			<NavLink
				className='product-card'
				id={id}
				onClick={handleProductChoice}
				to={`/plp/${category}/${id}`}>
				<img
					className='product-img'
					id={id}
					src={img}
					alt={name}
					// width='350px'
					height='330px'
				/>
				<div className='product-info'>
					<p className='product-title' id={id}>
						{name}
					</p>
					<p className='product-price' id={id}>
						{price.currency.symbol}
						{price.amount}
					</p>
				</div>
			</NavLink>
		);
	}
}

export default ProductCard;
