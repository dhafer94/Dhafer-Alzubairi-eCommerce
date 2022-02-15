import React, { PureComponent } from 'react';
import './Directory.styles.scss';
import ProductCard from '../ProductCard/ProductCard.Component';
import { useNavigate } from 'react-router';

class Directory extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
		};
	}
	componentDidMount() {
		this.setState({
			products: this.props.products,
		});
	}

	render() {
		// console.log(this.props.products[0]);
		return (
			<>
				<h2 className='category-name'>Category Name</h2>
				<div className='directory-container'>
					{this.props.products.map((product, i) => {
						return <ProductCard key={i} product={product} />;
					})}
				</div>
			</>
		);
	}
}

export default Directory;
