import React, { PureComponent } from 'react';
import './Directory.styles.scss';
import ProductCard from '../ProductCard/ProductCard.Component';
import { useNavigate } from 'react-router';

class Directory extends PureComponent {
	constructor(props) {
		super(props);
		// this.state = {
		// 	products: [],
		// };
	}

	render() {
		return (
			<>
				<h2 className='category-name'>Category Name</h2>
				<div className='directory-container'>
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
				</div>
			</>
		);
	}
}

export default Directory;
