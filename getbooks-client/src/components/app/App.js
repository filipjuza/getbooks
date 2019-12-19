/* eslint-disable react/prop-types */
import './App.scss';

import { Router } from '@reach/router';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchKittens, postHobby, postKitten } from '../../actions';
import Categories from '../categories/Categories';

// import Kitten from './Kitten';
// import Kittens from './Kittens';

class App extends Component {
    constructor(props) {
        super(props);

        this.API_URL = process.env.REACT_APP_API_URL;
    }

    componentDidMount() {
        this.props.fetchKittens().then(() => console.log('Kittens gotten!'));
    }

    getKitten(id) {
        return this.props.kittens.find(k => k._id === id);
    }

    render() {
        return (
            <div className="container">
                <Router>
                    <Categories path="/" categories={this.props.categories} />
                    {/* <Kitten
                        path="/kitten/:id"
                        getKitten={id => this.getKitten(id)}
                        addHobby={(kittenId, hobby) => this.props.postHobby(kittenId, hobby)}
                    /> */}
                    {/* <Kittens path="/" kittens={this.props.kittens} addKitten={name => this.props.postKitten(name)} /> */}
                </Router>
            </div>
        );
    }
}

const mapStatetoProps = state => ({
    categories: state.kittens
});

const mapDispatchToProps = dispatch => ({
    postKitten: name => dispatch(postKitten(name)),
    postHobby: (kittenId, hobby) => dispatch(postHobby(kittenId, hobby)),
    fetchKittens: () => dispatch(fetchKittens())
});

export default connect(mapStatetoProps, mapDispatchToProps)(App);
