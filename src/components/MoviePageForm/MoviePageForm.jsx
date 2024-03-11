import { useState } from 'react';

const MoviePageForm = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const handleSubmitForm = e => {
    e.preventDefault();
    if (inputValue.trim() === '') {
      return;
    }
    onSubmit({ query: inputValue });

    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <input
        value={inputValue}
        type="text"
        placeholder="Search films"
        onChange={handleInputChange}
      />
      <button type="submit">
        <span>Search</span>
      </button>
    </form>
  );
};

export default MoviePageForm;
