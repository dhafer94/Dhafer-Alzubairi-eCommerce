import React, { PureComponent } from 'react';
import './Product.styles.scss';
import Navigation from '../../components/Navigation/Navigation.Component';
import { gql } from '@apollo/client';

class Product extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			categories: [],
		};
	}

	componentDidMount() {
		this.props.client
			.query({
				query: gql`
					{
						categories {
							name
							products {
								id
								name
								gallery
								attributes {
									id
									name
									type
									items {
										displayValue
										value
										id
									}
								}
							}
						}
					}
				`,
			})
			.then((res) =>
				this.setState({
					categories: res.data.categories.map((item) => item.name),
				}),
			);
	}

	render() {
		return (
			<div>
				{/* <Navigation categories={this.state.categories} /> */}
				<div>{this.props.d === 1 ? <h1> Product Page</h1> : null}</div>;
			</div>
		);
	}
}

export default Product;
