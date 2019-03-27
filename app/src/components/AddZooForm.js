import React, { Component } from 'react';

class AddZooForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			zoo: {
				name: ''
			}
		};
	}

	inputHandler = (event) => {
		this.setState({ zoo: { ...this.state.zoo, [event.target.name]: event.target.value } });
	};

	render() {
		return (
			<div className="add-zoo">
				<form onSubmit={this.createZoo}>
					<h2>Add a new zoo:</h2>
					<input onChange={this.inputHandler} placeholder="Zoo name" value={this.state.name} name="name" />
					<button type="submit">Submit</button>
				</form>
			</div>
		);
	}
}

export default AddZooForm;
