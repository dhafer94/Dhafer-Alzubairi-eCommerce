import React, { PureComponent } from 'react';
import './ProductProfile.styles.scss';
import { withRouter } from '../../withRouter';

class ProductProfile extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			allData: [],
			productId: this.props.router.params.pdp,
			category: this.props.router.params.plp,
			product: {},
		};
	}
	componentDidMount() {
		this.setState({
			allData: this.props.allData,
		});
		if (this.state.allData[0]) {
			const product = this.state.allData
				.filter((category) => category.name === this.state.category)[0]
				.products.find((i) => i.id === this.state.productId);
			this.setState({ product: product });
		}
	}
	componentDidUpdate() {
		this.setState({
			allData: this.props.allData,
		});
		if (this.state.allData[0]) {
			const product = this.state.allData
				.filter((category) => category.name === this.state.category)[0]
				.products.find((i) => i.id === this.state.productId);
			this.setState({ product: product });
		}
	}

	render() {
		const { category, name, brand, attributes, gallery } = this.state.product;
		// console.log(gallery);
		return (
			<>
				<div className='product-profile'>
					<div className='product-images'>
						{gallery
							? gallery.map((img, i) => {
									return i === 0 ? (
										<img
											className='product-primary-image'
											width='200'
											key={i}
											src={img}
											alt='product'
										/>
									) : (
										<aside key={i}>
											<img
												className='product-secondary-image'
												width='50'
												key={i}
												src={img}
												alt='product'
											/>{' '}
										</aside>
									);
							  })
							: 'Loading'}
					</div>
					<div className='product-box'>
						<h2 className='product-name'>{name}</h2>
					</div>
				</div>
			</>
		);
	}
}

export default withRouter(ProductProfile);
