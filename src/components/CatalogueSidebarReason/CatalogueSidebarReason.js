import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import '../../css/style-catalogue.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CatalogueSidebarReason extends Component {
  constructor(props) {
    super(props);
    this.activeStyle = {
      border: '2px solid lightskyblue',
      borderRadius: '4px'
    };

    this.state = {
      isVisible: true
    }
  }

  static get propTypes() {
    return {
      fReason: PropTypes.string.isRequired,
      filters: PropTypes.object,
      setFilter: PropTypes.func.isRequired
    }
  }

  getReasonElements = (fReason) => {
    const { filters } = this.props;
    if (!filters || !filters.reason || !filters.reason.length) return null;
    const reasons = filters.reason;
    return reasons.map(reason => {
      return (
        <li key={reason} >
          <a 
            style={fReason === reason ? this.activeStyle : null}
            onClick={this.props.setFilter({name: 'fReason', value: reason})} 
            href="#"
          >{reason}</a>
        </li>
      );
    });
  }

  toggleListVisibility = () => {
    this.setState({ isVisible: !this.state.isVisible });
  }

  render() {
    const { isVisible } = this.state;
    return (
      <section className="sidebar__division">  
        <div className="sidebar__occasion">
          <div className="sidebar__division-title">
            <h3>Повод</h3><div onClick={this.toggleListVisibility} className={isVisible ? 'opener-down' : 'opener-up'} ></div>
          </div>
          <ul style={isVisible ? null : {display: 'none'}} >
            {this.getReasonElements(this.props.fReason)}
          </ul>
        </div>
      </section>
    );
  }
}

export default CatalogueSidebarReason;