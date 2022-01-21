import React, { PureComponent } from 'react';
import './App.css';
import Category from './pages/Category/Category.Component';

class App extends PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='App'>
				<Category />
			</div>
		);
	}
}

export default App;
