import React, { Component } from 'react';
import axios from 'axios';
import Zoos from './components/Zoos';
import AddZooForm from './components/AddZooForm';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			zoos: []
		};
	}

	componentDidMount() {
		axios
			.get('http://localhost:3300/api/zoos')
			.then((response) => {
				this.setState(() => ({ zoos: response.data }));
			})
			.catch((err) => console.log(err));
	}

	addHandler = (event, newZoo) => {
		event.preventDefault();
		axios
			.post('http://localhost:3300/api/zoos', newZoo)
			.then((response) => {
				this.setState({ zoos: response.data });
			})
			.catch((err) => console.log(err));
	};

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1>Zoos</h1>
					<Zoos zoos={this.state.zoos} />
					<AddZooForm addHandler={this.addHandler} />
				</header>
			</div>
		);
	}
}

export default App;
