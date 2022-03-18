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
			primaryImg: '',
		};
	}
	componentDidMount() {
		this.setState({
			allData: this.props.allData,
		});
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
				primaryImg:
					this.state.primaryImg.length === 0
						? product.gallery[0]
						: this.state.primaryImg,
			});
		}
	}

	handleSecondaryImageClick = (e) => {
		const src = e.target.src;
		this.setState({
			primaryImg: src,
		});
		// e.target.style.border = '1px solid #000';
		// console.log(e.target.style);
		// if (e.target.src === this.state.primaryImg) {
		// 	console.log('j');
		// 	e.target.className = 'product-secondary-image-active';
		// }
	};

	render() {
		const { prices, name, brand, attributes, gallery, description } =
			this.state.product;
		const { currency } = this.props;
		const { primaryImg } = this.state;
		const createMarkup = () => {
			return { __html: description };
		};

		return (
			<>
				{gallery ? (
					<>
						<aside className='secondary-images'>
							{gallery.map((img, i) => (
								<img
									id={i}
									className={
										this.state.primaryImg === img
											? 'product-secondary-image-active'
											: 'product-secondary-image'
									}
									width='50'
									key={i}
									src={img}
									alt='product'
									onClick={this.handleSecondaryImageClick}
								/>
							))}
						</aside>

						<div className='product-image-description'>
							<img
								className='product-primary-image'
								src={primaryImg}
								alt='product'
							/>
							<div className='product-box'>
								<h2 className='product-brand'>{brand}</h2>
								<p className='product-name'>{name}</p>
								{typeof attributes !== 'undefined' &&
									attributes.map((attribute, i) =>
										// console.log(attribute.type),
										attribute.type === 'swatch' ? (
											<div key={i + 20}>
												<p
													key={i + 10}
													className='product-attribute-name'>{`${attributes[i].name}:`}</p>
												<div key={i} className='product-attributes-box'>
													{attribute.items.map((item, index) => (
														<div
															style={{
																background: `${item.value}`,
																width: '63px',
																height: '45px',
															}}
															className='product-attribute'
															key={index}></div>
													))}
												</div>
											</div>
										) : (
											<div key={i + 20}>
												<p
													key={i + 10}
													className='product-attribute-name'>{`${attributes[i].name}:`}</p>
												<div key={i} className='product-attributes-box'>
													{attribute.items.map((item, index) => (
														<p className='product-attribute' key={index}>
															{item.value}
														</p>
													))}
												</div>
											</div>
										),
									)}
								<p>price:</p>
								{typeof prices !== 'undefined' &&
									prices.map(
										(price, i) =>
											price.currency.label === currency[0].label && (
												<p key={i}>
													{`${price.currency.symbol}${price.amount}`}
												</p>
											),
									)}
								<button className='add-to-cart-btn'>Add to Cart</button>
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
