import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import ManageSearchTwoToneIcon from '@mui/icons-material/ManageSearchTwoTone';

function Form({ onSubmit, onInputChange }) {
  const [text, setText] = useState('');
  const [error, setError] = useState(null);
  const [inputError, setInputError] = useState(false);

  const handleChange = (event) => {
    const value = event.target.value;
    setText(value);
    onInputChange(value); // Notify parent component of input change
    if (value.trim() !== '') {
      setInputError(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (text.trim() === '') {
      setInputError(true);
      return;
    }

    try {
      await onSubmit(text);
      setError(null);
    } catch (error) {
      setError('Error occurred while fetching prediction');
    }
  };

  return (
    <Box sx={{ m: 3 }}>
      <Typography variant="h4" gutterBottom>
        Sarcasm Detection
      </Typography>
      <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          label="Enter text here"
          rows={1}
          value={text}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          sx={{ mr: 2, flexGrow: 1 }}
          error={inputError}
          helperText={inputError ? 'This field is required' : ''}
        />
        <Button type="submit" variant="outlined" color="info">
          <ManageSearchTwoToneIcon /> Check
        </Button>
      </form>
      {error && (
        <Alert variant="filled" severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
}

export default Form;
