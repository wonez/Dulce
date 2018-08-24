import React, { Component } from 'react';

import Entry from '../../components/Entry/Entry';

import Aux from '../../hoc/Aux';

class App extends Component {
	render() {
		return (
			<Aux>
				<Entry />
				{/* <LearnMore />
				<MostPopular />
				<Footer /> */}
			</Aux>
		);
	}
}

export default App;
