import React from 'react';
import StepModel from './StepModel';
import StepAddForm from '../StepAddForm/StepAddForm';
import StepList from '../StepList/StepList';
import moment from 'moment';
import './Steps.css';

export default function Steps(props) {
  const [ steps, setSteps ] = React.useState([]);
  const [ editingStepID, setEditingStepID ] = React.useState();
  const [ form, setForm ] = React.useState({ date: '', distance: '' });

  const handleChange = (name, value) => {
    setForm(prevForm => ({...prevForm, [name]: value}));
  };

  const handleSubmit = () => {
    const { distance } = form;
    const mDate = moment(form.date, 'DD.MM.YY', true);
    if (!mDate.isValid()) return;
    const date = mDate.toDate();

    if (editingStepID) {
      const oldDate = steps.find((o) => o.id === editingStepID).date;
      setSteps((prevSteps) => prevSteps.map((o) => {
        if (o.date.valueOf() === oldDate.valueOf()) return new StepModel(date, Number(distance));
        return o;
      }));
    } else {
      if (steps.find((o) => o.date.valueOf() === date.valueOf())) {
        setSteps((prevSteps) => prevSteps.map((o) => {
          if (o.date.valueOf() === date.valueOf()) return new StepModel(date, Number(distance) + o.distance);
          return o;
        }));
      } else {
        setSteps((prevSteps) => [...prevSteps, new StepModel(date, Number(distance))]);
      }
    }
    
    setForm({ date: '', distance: '' });
    setEditingStepID(null);
  }

  const handleRemove = (id) => {
    setSteps((prevSteps) => prevSteps.filter((o) => o.id !== id));
  }

  const handleEdit = (id) => {
    const step = steps.find((o) => o.id === id);
    setEditingStepID(step.id);
    setForm({ date: moment(step.date).format('DD.MM.YY'), distance: step.distance });
  }

  return (
    <div className='steps'>
      <StepAddForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <StepList steps={steps} onRemove={handleRemove} onEdit={handleEdit}/>
    </div>
  )
}
