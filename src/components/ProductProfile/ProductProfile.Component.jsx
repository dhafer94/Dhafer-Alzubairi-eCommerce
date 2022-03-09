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
			this.setState({
				product: product,
			});
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
			this.setState({
				product: product,
			});
		}
	}

	render() {
		const { prices, name, brand, attributes, gallery, description } =
			this.state.product;
		const createMarkup = () => {
			return { __html: description };
		};
		// console.log(this.props);

		return (
			<>
				{gallery ? (
					<>
						<aside className='secondary-images'>
							{gallery.map((img, i) => (
								<img
									className='product-secondary-image'
									width='50'
									key={i}
									src={img}
									alt='product'
								/>
							))}
						</aside>

						<div className='product-image-description'>
							<img
								className='product-primary-image'
								src={gallery[0]}
								alt='product'
							/>
							<div className='product-box'>
								<h2 className='product-name'>{brand}</h2>
								<p>{name}</p>
								{attributes[0] ? (
									<>
										<p>{attributes[0].name}</p>
										{attributes[0].items.map((attribute, i) => (
											<div key={i}>{attribute.value}</div>
										))}
									</>
								) : null}

								{attributes[1] ? (
									<>
										<p>{attributes[1].name}</p>
										{attributes[1].items.map((attribute, i) => (
											<div key={i}>{attribute.value}</div>
										))}
									</>
								) : null}
								<div
									className='product-description-box'
									dangerouslySetInnerHTML={createMarkup()}
								/>
								{/* {description} */}
							</div>
						</div>
					</>
				) : (
					'Loading'
				)}
			</>
		);
	}
}

export default withRouter(ProductProfile);
