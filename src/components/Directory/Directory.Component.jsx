import React, { PureComponent } from 'react';
import './Directory.styles.scss';
import ProductCard from '../ProductCard/ProductCard.Component';

class Directory extends PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		const currency = this.props.currency;
		const category = this.props.category;

		return (
			<>
				<h2 className='category-name'>{category}</h2>
				<div className='directory-container'>
					{this.props.products.map((product, i) => {
						return (
							<ProductCard currency={currency} key={i} product={product} />
						);
					})}
				</div>
			</>
		);
	}
}

export default Directory;
