import React from 'react';
import PropTypes from 'prop-types';
import image from './assets/003-image.svg';

export function PostForm(props) {
    return(
       <form className="text-form" onSubmit={props.onSubmit}>       
        <div className="text-form__box">
          <img className="text-form__author" src={image} alt=""/>
          <textarea id={props.name}
                    name={props.name}
                    onChange={props.onChange}>
            {props.text}
          </textarea>
        </div>
        {props.children}
        <input type="submit" value={props.submitValue} className="button"/>
       </form>
    )
};

PostForm.propTypes = {
  onSubmit: PropTypes.func,
  name: PropTypes.string,
  onChange: PropTypes.func,
  submitValue: PropTypes.string,
  text: PropTypes.string,
  children: PropTypes.node
}
