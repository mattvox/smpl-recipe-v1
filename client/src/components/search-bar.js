import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { Input } from 'semantic-ui-react';

import { fetchRecipes, setSearch } from '../actions';


class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      term: event.target.value,
    });
  }

  handleFormSubmit(event) {
    event.preventDefault();

    this.props.fetchRecipes(this.state.term, () => {
      browserHistory.push(`/?search=${this.state.term}`);
      this.props.setSearch(this.state.term);

      this.setState({
        term: '',
      });
    });
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit} className='input-group'>
        <Input
          // action={{ icon: 'search' }}
          icon='search'
          size='large'
          placeholder='Search favorite recipes...'
          value={this.state.term}
          onChange={this.handleInputChange}
        />
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { search: state.recipes.search };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchRecipes, setSearch }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
