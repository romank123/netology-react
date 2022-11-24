import React, { Component } from 'react'
import Note from '../Note/Note'
import AddForm from '../AddForm/AddForm';
import './NotesContainer.css';

const { REACT_APP_NOTES_URL } = process.env;

export class NotesContainer extends Component {
  state = {
    inputValue: '',
    notes: [],
  };

  componentDidMount = () => this.handleUpdate();

  handleRemove = (id) => {
    fetch(`${REACT_APP_NOTES_URL}/${id}`, { method: 'DELETE' })
    .then(() => this.handleUpdate())
  };

  handleInputChange = (_, value) => this.setState({ inputValue: value });

  handleAdd = () => {
    const content = this.state.inputValue;
    if (content === '') return;
    fetch(REACT_APP_NOTES_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ content }),
    })
    .then(() => {
      this.setState({ inputValue: '' });
      this.handleUpdate();
    });
  };

  handleUpdate = () => {
    fetch(REACT_APP_NOTES_URL)
    .then(response => response.json())
    .then(notes => this.setState({ notes }))
  };

  render() {
    const formProps = {
      fields: [
        { name: 'content', label: 'New Note:', value: this.state.inputValue },
      ],
      submitBtnText: 'Add',
      onChange: this.handleInputChange,
      onSubmit: this.handleAdd,
    };
    return (
      <div className='notes'>
        <h1 className='notes-title'>{'Notes'}
          <span className='notes-update' onClick={this.handleUpdate}>
            <i className='material-icons'>{'cached'}</i>
          </span>
        </h1>
        <div className='notes-container'>
          { this.state.notes.map((o) =>
            <Note {...o} onClose={this.handleRemove} key={o.id}/>)
          }
        </div>
        <AddForm {...formProps}/>
      </div>
    )
  }
}

export default NotesContainer
