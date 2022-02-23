import React, { PureComponent } from 'react';
import './Category.styles.scss';
import Directory from '../../components/Directory/Directory.Component';
import { CategoryProductsContext, CurrencyContext } from '../../contexts';
import { withRouter } from '../../withRouter';

class Category extends PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		// console.log(this.props);
		return (
			<div className='category-page'>
				<CurrencyContext.Consumer>
					{(currency) => (
						<CategoryProductsContext.Consumer>
							{(products) => (
								<Directory currency={currency} products={products} />
							)}
						</CategoryProductsContext.Consumer>
					)}
				</CurrencyContext.Consumer>
			</div>
		);
	}
}

export default withRouter(Category);
