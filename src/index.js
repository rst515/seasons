import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import './SeasonDisplay.css';  // webpack will add to index.html

class App extends React.Component {
    // initialize object states 
    // constructor(props) {  
    //     // override parent constructor function in React.component
    //     super(props); 
    //     // initial state variables
    //     this.state = { lat: 'Loading...', errorMessage: '' }; // can add others, e.g. { lat: null, long: null }
    // };

    // instead, for short, can just use state which will be transpiled by Babel to the above
    state = { lat: null, errorMessage: '' };



    // lifecycle methods: componentDidMount, componentDidUpdate, componentWillUnmount

    // data loading
    componentDidMount() {
        // begin call to get user's current location 
        // runs in the future when the lat is returned
                // never do direct assignment for setState, i.e. not
                // this.setState.lat = position.coords.latitude
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({ lat: position.coords.latitude }),
            err => this.setState({ errorMessage: err.message })
        );
    };
    // more data loading when state/props change
    componentDidUpdate() {
        console.log('componentDidUpdate ran');
    };
    // clean-up, esp. for non-React studd
    componentWillUnmount() {
        console.log('componentWillUnmount ran');
    }



    // conditional rendering
    render() {
        if (this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage}</div>
        };

        if (!this.state.errorMessage && this.state.lat) {
            return <SeasonDisplay lat={this.state.lat} />
        };

        return <div>Loading...</div>;
    };
};

ReactDOM.render(<App />, document.querySelector("#root"));