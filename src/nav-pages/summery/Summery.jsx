import React, { useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import '../style.css';
import DebitInfo from '../../db.json';

const Summery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editMode, setEditMode] = useState(null);
  const [newDebitValue, setNewDebitValue] = useState(''); 

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/DebitInfo/${id}`, {
        method: 'DELETE',
        headers: { "Content-type": "application/json" },
      });

      if (!response.ok) {
        console.error(`Failed to delete item with id ${id}`);
        return;
      }

      console.log(`Deleted item with id ${id}`);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEditToggle = (id) => {
    setEditMode((prev) => (prev === id ? null : id));
    setNewDebitValue('');
  };

  const handleEditSave = async (id, newDebitValue) => {
    const currentItem = DebitInfo.DebitInfo.find((item) => item.id === id);
  
    const remainingValue = currentItem.debit - parseInt(newDebitValue, 10);
    const currentDate = new Date();
  
    const formattedDate = currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const formattedTime = currentDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
  
    try {
      const response = await fetch(`http://localhost:4000/DebitInfo/${id}`, {
        method: 'PATCH',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          debit: remainingValue,
          dateTime: {
            date: formattedDate,
            time: formattedTime,
          },
        }),
      });
  
      if (!response.ok) {
        console.error(`Failed to update item with id ${id}`);
        return;
      }
  
      const netTotal = JSON.parse(localStorage.getItem('netTotal')) || 0;
      const updatedNetTotal = netTotal + parseInt(newDebitValue, 10) || 0;
      localStorage.setItem('netTotal', JSON.stringify(updatedNetTotal));
  
      setEditMode(null);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const filteredDebitInfo = DebitInfo.DebitInfo.filter((item) => {
    const nameMatch = item.name && item.name.includes(searchTerm);
    const idMatch = item.id && item.id.toString().includes(searchTerm);
    const numberMatch = item.number && item.number.includes(searchTerm);

    return nameMatch || idMatch || numberMatch;
  });

  return (
    <div className="debit-container">
      <input
        placeholder='ابحث عن اسم أو رقم العميل'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredDebitInfo.length > 0 ? (
        filteredDebitInfo.map((item) => (
          <div className="debit-details" key={item.id}>
            <div className="buttons">
              <button onClick={() => handleDelete(item.id)}>
                <AiOutlineDelete />
              </button>
              <button onClick={() => handleEditToggle(item.id)}>
                <AiOutlineEdit />
              </button>
            </div>
            <div className="date-time">
              {item.dateTime && item.dateTime.date && (
                <span>{item.dateTime.date} : التاريخ </span>
              )}
              {item.dateTime && item.dateTime.time && (
                <span>{item.dateTime.time} : الوقت </span>
              )}
            </div>
            <div className="debit-value">
              {item.debit === 0 ? (
                <span className='empty-debit'> تم استلام اجمالي الدين</span>
              ) : (
                <span> اجمالي مبلغ الدين : {item.debit?.toLocaleString()} </span>
              )}
              {editMode === item.id && (
                <div className='edit-debit-value'>
                  <input
                    placeholder='قيمه الدين المستلمه'
                    value={newDebitValue}
                    onChange={(e) => setNewDebitValue(e.target.value)}
                  />
                  <button onClick={() => handleEditSave(item.id, newDebitValue)}>
                    حفظ
                  </button>
                </div>
              )}
            </div>
            <div className="customer-details">
              <h3> رمز العميل : {item.id}</h3>
              {item.name && <h3> اسم العميل : {item.name}</h3>}
              {item.number && <h3>رقم هاتف العميل: {item.number} </h3>}
            </div>
          </div>
        ))
      ) : (
        <div className='empty-text'>
          <p>لا يوجد حسابات  حاليًا !</p>
        </div>
      )}
    </div>
  );
};

export default Summery;
