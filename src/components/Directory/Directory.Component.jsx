import React, { PureComponent } from 'react';
import './Directory.styles.scss';
import ProductCard from '../ProductCard/ProductCard.Component';
import { withRouter } from '../../withRouter';
class Directory extends PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		const { currency, products } = this.props;
		const category = this.props.router.params.plp;
		// console.log(this.props.router.params.plp);
		return (
			<>
				<h2 className='category-name'>{category}</h2>
				<div className='directory-container'>
					{products.map((product, i) => {
						return (
							<ProductCard currency={currency} key={i} product={product} />
						);
					})}
				</div>
			</>
		);
	}
}

export default withRouter(Directory);
