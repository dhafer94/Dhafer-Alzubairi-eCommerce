import React, { PureComponent } from 'react';
import './Product.styles.scss';
import ProductProfile from '../../components/ProductProfile/ProductProfile.Component';
import {
	CategoryProductsContext,
	CurrencyContext,
	ChosenProductIdContext,
	AllDataContext,
} from '../../contexts';

class Product extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			categories: [],
		};
	}

	render() {
		return (
			<div>
				<ChosenProductIdContext.Consumer>
					{(chosenProduct) => (
						<AllDataContext.Consumer>
							{(allData) => (
								<CurrencyContext.Consumer>
									{(currency) => (
										<CategoryProductsContext.Consumer>
											{(products) => (
												<ProductProfile
													currency={currency}
													products={products}
													client={this.props.client}
													allData={allData}
													chosenProduct={chosenProduct}
												/>
											)}
										</CategoryProductsContext.Consumer>
									)}
								</CurrencyContext.Consumer>
							)}
						</AllDataContext.Consumer>
					)}
				</ChosenProductIdContext.Consumer>
			</div>
		);
	}
}

export default Product;
