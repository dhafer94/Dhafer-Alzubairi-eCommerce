import React, { PureComponent } from 'react';
import './Category.styles.scss';
import Directory from '../../components/Directory/Directory.Component';
import {
	CategoryContext,
	CategoryProductsContext,
	CurrencyContext,
	HandleProductChoiceContext,
} from '../../contexts';
import { withRouter } from '../../withRouter';

class Category extends PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		// console.log(this.props);
		return (
			<div className='category-page'>
				<HandleProductChoiceContext.Consumer>
					{(handleProductChoice) => (
						<CategoryContext.Consumer>
							{(route) => (
								<CurrencyContext.Consumer>
									{(currency) => (
										<CategoryProductsContext.Consumer>
											{(products) => (
												<Directory
													currency={currency}
													products={products}
													category={route}
													client={this.props.client}
													handleProductchoice={handleProductChoice}
												/>
											)}
										</CategoryProductsContext.Consumer>
									)}
								</CurrencyContext.Consumer>
							)}
						</CategoryContext.Consumer>
					)}
				</HandleProductChoiceContext.Consumer>
			</div>
		);
	}
}

export default withRouter(Category);
