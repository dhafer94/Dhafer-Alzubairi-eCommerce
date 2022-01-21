import React, { PureComponent } from 'react';
import './ProductCard.styles.scss';

class ProductCard extends PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='product'>
				<img
					src='https://i.picsum.photos/id/868/360/330.jpg?hmac=Aiix5OahigAB9MD3SnvWpCg1lGXGsli0OOPAIn_jPfM'
					alt=''
				/>
				<p>Product</p>
				<p>Price</p>
			</div>
		);
	}
}

export default ProductCard;
