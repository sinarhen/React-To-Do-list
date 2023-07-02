import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton  from '@mui/material/ListItemButton';

function App() {
  const [formValues, setFormValues] = useState({
    objectId: 0,
    value: 'initial',
  });

  const [list, setList] = useState([
    {
      objectId: 0,
      value: 'Initial',
    },
  ]);

  const handleInputSubmit = (event) => {
    event.preventDefault();

    if (formValues.value.trim() === '') {
      return;
    }

    const counted = formValues.objectId + 1;
    const newObj = {
      objectId: counted,
      value: formValues.value,
    };
    setList([...list, newObj]);
    setFormValues({
      objectId: counted,
      value: '',
    });

    console.log(list);
  };

  const handleInputChange = (event) => {
    setFormValues({
      ...formValues,
      value: event.target.value,
    });
  };
  const handleDismissButton = (objId) => {
    console.log(objId)
    const newList = list.filter(item => item.objectId !== objId);
    setList(newList)
  }


  const isInputEmpty = formValues.value.trim() === '';
  return (
    <div className="App">
      <h1 className="title">Purple List</h1>
      <form onSubmit={handleInputSubmit} className="form-container">
        <TextField
          id="input"
          label="Enter your task"
          value={formValues.value}
          onChange={handleInputChange}
          variant="outlined"
          color="primary"
          error={formValues.value === ''}
          helperText={formValues.value === "" ? 'Empty field!' : ' '}
        />
        {isInputEmpty && <p className="error-text">Please enter a value.</p>}
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
      <List className="list-container">
        {list.map((item) => (
          <ListItem key={item.objectId}>
            <ListItemText primary={`ID: ${item.objectId}`} secondary={`Value: ${item.value}`} />
            <ListItemButton id={item.objectId} onClick={() => handleDismissButton(item.objectId)} color='primary'>Dismiss</ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default App