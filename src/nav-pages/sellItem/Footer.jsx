import React, { useState, useEffect } from 'react';
import DebitInfo from '../../db.json';

const Footer = ({ selectedOption, total, transactionsSubmitted, totalQuantity, dateTime }) => {
  const [totalAmount, setTotalAmount] = useState(total);
  const [discount, setDiscount] = useState(0);
  const [debit, setDebit] = useState(0);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [capturedTotalQuantity, setCapturedTotalQuantity] = useState(0);

  useEffect(() => {
    setTotalAmount(total);
  }, [total]);

  useEffect(() => {
    setCapturedTotalQuantity(totalQuantity);
  }, [totalQuantity]);

  const handleDiscountChange = (e) => {
    const discountValue = parseFloat(e.target.value) || 0;
    setDiscount(discountValue);
  };

  const handleDebitChange = (e) => {
    const debitValue = parseFloat(e.target.value) || 0;
    setDebit(debitValue);
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
  };

  const handleNumberChange = (e) => {
    const newNumber = e.target.value;
    setNumber(newNumber);
  };

  const netTotal = (totalAmount - debit )- discount;

  useEffect(() => {
    const submitData = async () => {
      if (transactionsSubmitted && name && totalAmount > 0) {
        const existingUser = DebitInfo.DebitInfo.find((user) => user.name === name);

        if (existingUser) {
          const updatedDebitAmount = existingUser.debit + debit;

          const response = await fetch(`http://localhost:4000/DebitInfo/${existingUser.id}`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
              name,
              number: number !== '' ? number : existingUser.number,
              debit: updatedDebitAmount,
              dateTime,
            }),
          });

          const updatedUser = await response.json();

          setTotalAmount((prevTotalAmount) => prevTotalAmount);
          setName(updatedUser.name);
          setNumber(updatedUser.number);
        } else {
          const response = await fetch('http://localhost:4000/DebitInfo', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
              name,
              number: number !== '' ? number : null,
              debit,
              dateTime,
            }),
          });

          const newUser = await response.json();

          setTotalAmount((prevTotalAmount) => prevTotalAmount);
          setName(newUser.name);
          setNumber(newUser.number);
        }
      }
    };
    const existingNetTotal = parseFloat(localStorage.getItem('netTotal')) || 0;
    const existingTotalQuantity = parseFloat(localStorage.getItem('totalQuantity')) || 0;
    
    const newNetTotal = existingNetTotal + (totalAmount - discount) - debit;
    const newTotalQuantity = existingTotalQuantity + capturedTotalQuantity;
    
    localStorage.setItem('netTotal', JSON.stringify(newNetTotal));
    localStorage.setItem('totalQuantity', JSON.stringify(newTotalQuantity));
    
    submitData();

    setDebit(0);
    setDiscount(0);
    setName('');
    setNumber('');

  }, [transactionsSubmitted]);


  return (
    <div className="footer-info">
      <div className="left-footer">
        <div>
          <h3> عدد الوحدات المباعه : {capturedTotalQuantity} </h3>
          <h3>الخصم :{discount}</h3>
          <h3>الدائن : {debit}</h3>
          <h1> {netTotal.toLocaleString() + '.IQD'} : صافي المبلغ</h1>
        </div>
      </div>

      <div className="middle-footer">
        {selectedOption === 'دائن' && selectedOption && (
          <div>
            <input placeholder="اسم العميل" value={name} onChange={handleNameChange} />
            <input placeholder="رقم العميل" value={number} onChange={handleNumberChange} />
            <input type="number" placeholder="Enter debit" value={debit} onChange={handleDebitChange} min="0" step="1000" />
          </div>
        )}
      </div>

      <div className="right-footer">
        <h3> {totalAmount.toLocaleString()}.IQD : اجمالي المبلغ</h3>
        <input
          type="number"
          placeholder="Enter discount"
          value={discount}
          onChange={handleDiscountChange}
          min="0"
          step="1000"
        />
      </div>
    </div>
  );
};

export default Footer;
