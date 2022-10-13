import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProjectList from './ProjectList';
import Toolbar from './Toolbar';

export class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.filters = props.filters;
    this.projects = props.projects;
    this.state = {
      selected: "All",
    };
  }

  static propTypes = {
    filters: PropTypes.array.isRequired,
    projects: PropTypes.array.isRequired,
  }



  onSelectFilter = (filter) => {
    this.setState({ selected: filter });
  }

  render() {
    return (
      <div className='portfolio'>
        <Toolbar filters={this.filters} selected={this.state.selected} onSelectFilter={this.onSelectFilter}/>
        <ProjectList projects={this.state.selected === 'All' ? this.projects : this.projects.filter((o) => o.category === this.state.selected)}/>
      </div>
    )
  }
}

export default Portfolio
