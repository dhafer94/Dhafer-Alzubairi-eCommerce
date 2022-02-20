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
		const { category, name, brand, attributes } = this.state.product;
		console.log(this.state);
		return <div>{name}</div>;
		// return <div>name</div>;
	}
}

export default withRouter(ProductProfile);
