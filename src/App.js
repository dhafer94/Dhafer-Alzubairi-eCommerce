import React, { PureComponent } from 'react';
import './App.css';
import Category from './pages/Category/Category.Component';
import { Link } from 'react-router-dom';

class App extends PureComponent {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className='App'>
				<Category />
				<nav
					style={{
						borderBottom: 'solid 1px',
						paddingBottom: '1rem',
					}}>
					<Link to='/product'>product</Link> | <Link to='/cart'>cart</Link>
				</nav>
			</div>
		);
	}
}

export default App;
