import React, { useState } from 'react';

const Pin = ({ onSubmit }) => {
  const [enteredPin, setEnteredPin] = useState('');

  const handleDigitClick = (digit) => {
    if (enteredPin.length < 4) {
      setEnteredPin((prevPin) => prevPin + digit);
    }
  };

  const handleBackspace = () => {
    setEnteredPin((prevPin) => prevPin.slice(0, -1));
  };

  const handleSubmit = () => {
    if (enteredPin.length === 4) {
      onSubmit(enteredPin);
      setEnteredPin('');
    }
  };

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h2>Enter PIN:</h2>
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        {Array.from({ length: 4 }, (_, index) => (
          <input
            key={index}
            type="password" 
            value={enteredPin[index] || ''}
            readOnly
            style={{ marginRight: '10px', width: '30px', textAlign: 'center' }}
          />
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {Array.from({ length: 9 }, (_, index) => (
            <button key={index} onClick={() => handleDigitClick(index + 1)} style={{ margin: '5px', width: '40px', height: '40px' }}>
              {index + 1}
            </button>
          ))}
          <button onClick={() => handleDigitClick(0)} style={{ margin: '5px', width: '40px', height: '40px' }}>
            0
          </button>
        </div>
        <div>
          <button onClick={handleBackspace} style={{ margin: '5px', padding: '10px' }}>
            حذف
          </button>
          <button onClick={handleSubmit} style={{ margin: '5px', padding: '10px' }}>
            دخول
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pin;
