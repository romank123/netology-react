import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FooterSubscribeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscribe: 'both',
      email: ''
    }
  }

  static get propTypes() {
    return {
      becomeSubscribed: PropTypes.func.isRequired
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.subscribe === this.state.subscribe && nextState.email === this.state.email) return false;
    return true;
  }

  onSubscribeChange = (event) => {
    const { value, name } = event.currentTarget;
    this.setState({ [name]: value });
  }

  onSubscribeSubmit = (event) => {
    event.preventDefault();
    const reg = /^[\w\.]+@[\w\.]+\.[\w\.]+$/;
    if (!this.state.email.match(reg)) return;
    this.props.becomeSubscribed();
  }

  render() {
    const { subscribe, email } = this.state;
    return (
      <form onSubmit={this.onSubscribeSubmit} className="subscribe__radios" action="">
        <label className="subscribe__radio_label">
          <input 
            checked={subscribe === 'women'}
            onChange={this.onSubscribeChange}
            className="subscribe__radio" 
            type="radio" 
            name="subscribe" 
            value="women" 
          />
          <div className="subscribe__radio_text">Женское</div>
        </label>
        <label className="subscribe__radio_label">
          <input 
            checked={subscribe === 'men'}
            onChange={this.onSubscribeChange}
            className="subscribe__radio" 
            type="radio" 
            name="subscribe" 
            value="men" 
          />
          <div className="subscribe__radio_text">Мужское</div>
        </label>
        <label className="subscribe__radio_label">
          <input 
            checked={subscribe === 'both'}
            onChange={this.onSubscribeChange}
            className="subscribe__radio" 
            type="radio" 
            name="subscribe" 
            value="both" 
          />
          <div className="subscribe__radio_text">Всё</div>
        </label>
        <input 
          value={email}
          onChange={this.onSubscribeChange}
          className="subscribe__email" 
          type="email" 
          name="email" 
          placeholder="Ваш e-mail" 
        />
        <input className="subscribe__submit" type="submit" value="ПОДПИСАТЬСЯ" />
      </form>
    );
  }
}

export default FooterSubscribeForm;
