import React, { useState, useRef } from 'react';
import axios from 'axios';

const LocationIQAutocomplete = ({setSelection}) => {
  const [query, setQuery] = useState('');
 const [suggestions, setSuggestions] = useState([]); // [ { display_name: '...', lat: '...', lon: '...' }, ...
  const inputRef = useRef(null);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      try {
        const response = await axios.get('/api/autocomplete', {
          params: { q: value }
        });

        if (response.data) {
          setSuggestions(response.data);
          console.log('Suggestions:', response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (suggestion) => {
    const coordinates = {
      lat: Number(suggestion.lat),
      lon: Number(suggestion.lon)
    };
    console.log('Selected coordinates:', coordinates);
    setQuery(suggestion.display_name);
    setSelection(coordinates)
    setSuggestions([]);
  };

  return (
    <div>
        <h1 className='font-medium text-[16px] pl-12'>Home Town</h1>
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Enter a location"
        className="form-control bg-[#ceeafd20] border pl-1 border-[rgb(10,105,174)] h-[2rem] rounded-sm  ml-[3rem] w-[75%]"
         
      />
      {suggestions.length > 0 && (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSelect(suggestion)}
              style={{ cursor: 'pointer', padding: '5px 10px', borderBottom: '1px solid #ddd' }}
            >
              {suggestion.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationIQAutocomplete;