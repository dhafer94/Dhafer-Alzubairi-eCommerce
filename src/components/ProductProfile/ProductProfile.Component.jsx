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
			chosenAttributes: [],
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
	};

	handleAttributeClick = (e) => {
		const name = e.target.attributes.attribute.nodeValue;
		const value = e.target.attributes.attributeval.nodeValue;

		//to reset the previous active attribute/s and visually set the active attribute visually
		if (e.target.className === 'product-attribute') {
			e.target.parentNode.childNodes.forEach(
				(child) => (child.className = 'product-attribute'),
			);
			e.target.className = 'product-attribute-active';
		}
		if (e.target.className === 'product-attribute-swatch') {
			e.target.parentNode.childNodes.forEach(
				(child) => (child.className = 'product-attribute-swatch'),
			);
			e.target.className = 'product-attribute-swatch-active';
		}

		//to set active attributes, reset the previous active attribute/s in our data and set the newones if any changes
		this.setState({
			chosenAttributes:
				this.state.chosenAttributes.length === 0
					? [
							{
								name: name,
								value: value,
							},
					  ]
					: [
							...this.state.chosenAttributes.filter((att) => att.name !== name),
							{
								name: name,
								value: value,
							},
					  ],
		});
	};

	render() {
		const { prices, name, brand, attributes, gallery, description } =
			this.state.product;
		const { currency } = this.props;
		const { primaryImg, chosenAttributes } = this.state;
		const createMarkup = () => {
			return { __html: description };
		};
		// console.log(description);
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
										attribute.type === 'swatch' ? (
											<>
												<p
													key={i + 10}
													className='product-attribute-name'>{`${attributes[i].name}:`}</p>
												<div key={i} className='product-attributes-box'>
													{attribute.items.map((item, index) => (
														<div
															attribute={attribute.name}
															attributeval={item.value}
															// name={item.value}
															onClick={(e) => this.handleAttributeClick(e)}
															style={{
																background: `${item.value}`,
																width: '63px',
																height: '45px',
															}}
															className='product-attribute-swatch'
															key={index}></div>
													))}
												</div>
											</>
										) : (
											<div key={i + 20}>
												<p
													key={i + 10}
													className='product-attribute-name'>{`${attributes[i].name}:`}</p>
												<div key={i} className='product-attributes-box'>
													{attribute.items.map((item, index) => (
														<p
															attribute={attribute.name}
															attributeval={item.value}
															onClick={(e) => this.handleAttributeClick(e)}
															className='product-attribute'
															key={index}>
															{item.value}
														</p>
													))}
												</div>
											</div>
										),
									)}
								<p className='product-attribute-name'>price:</p>
								{typeof prices !== 'undefined' &&
									prices.map(
										(price, i) =>
											price.currency.label === currency[0].label && (
												<p className='product-price' key={i}>
													{`${price.currency.symbol}${price.amount}`}
												</p>
											),
									)}
								<button className='add-to-cart-btn'>Add to Cart</button>
								<div
									className='product-description-box'
									dangerouslySetInnerHTML={createMarkup()}
								/>
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
