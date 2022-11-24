import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddForm from '../AddForm/AddForm';
import './Watches.css';
import WatchesList from '../WatchesList/WatchesList';

export class Watches extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      zone: PropTypes.number.isRequired,
    }))
  };

  static defaultFormFields = [
    { name: 'name', label: 'Название', value: '' },
    { name: 'zone', label: 'Временная зона', value: '' },
  ];
  
  state = {
    formFields: [...Watches.defaultFormFields],
    watches: [],
  }

  componentDidMount() {
    if (!this.props.items) return;
    this.setState({
      watches: this.props.items,
    })
  }

  handleAddFormChange = (name, value) => {
    this.setState((prevState) => ({
      formFields: prevState.formFields.map((o) => {
        const field = { ...o };
        if (field.name === name) field.value = value;
        return field;
      }),
    }))
  };

  handleAdd = () => {
    const name = this.state.formFields.find((o) => o.name === 'name').value;
    const zone = Number(this.state.formFields.find((o) => o.name === 'zone').value);
    if (name === '') return;
    if (this.state.watches.find((o) => o.name === name)) return;
    this.setState((prevState) => 
      ({
        formFields: [...Watches.defaultFormFields],
        watches: [...prevState.watches, { name, zone }],
      })
    );
  };

  handleRemove = (name) => {
    this.setState((prevState) => ({
      watches: prevState.watches.filter((o) => o.name !== name),
    }));
  }

  render() {
    const addFormProps = {
      fields: this.state.formFields,
      onSubmit: this.handleAdd,
      onChange: this.handleAddFormChange,
    }
    const watchesListProps = {
      items: this.state.watches,
      onRemove: this.handleRemove,
    }
    return (
      <div className='watches'>
        <AddForm {...addFormProps}/>
        <WatchesList {...watchesListProps}/>
      </div>
    )
  }
}

export default Watches
