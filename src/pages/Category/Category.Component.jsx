import React, { PureComponent } from 'react';
import './Category.styles.scss';
import Directory from '../../components/Directory/Directory.Component';
import {
	CategoryContext,
	CategoryProductsContext,
	CurrencyContext,
} from '../../contexts';

class Category extends PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='category-page'>
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
										/>
									)}
								</CategoryProductsContext.Consumer>
							)}
						</CurrencyContext.Consumer>
					)}
				</CategoryContext.Consumer>
			</div>
		);
	}
}

export default Category;
