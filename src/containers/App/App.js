import React, { Component } from 'react';

import Entry from '../../components/Entry/Entry';
import MostPopular from '../../components/MostPopular/MostPopular';

import Aux from '../../hoc/Aux';

class App extends Component {
	render() {
		return (
			<Aux>
				<Entry />
				<MostPopular />
				{/* <LearnMore />
				<Footer /> */}
			</Aux>
		);
	}
}

export default App;
