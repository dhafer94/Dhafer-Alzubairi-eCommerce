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
			<div className='product'>
				<NavLink
					id={id}
					onClick={handleProductChoice}
					to={`/${category}/${id}`}>
					<img id={id} src={img} alt={name} width='350px' height='330px' />
					<p id={id}>{name}</p>
					<p id={id}>
						{price.currency.symbol}
						{price.amount}
					</p>
				</NavLink>
			</div>
		);
	}
}

export default ProductCard;
