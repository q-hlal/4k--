import React, { useState, useEffect } from 'react';

const AccountFooter = () => {
  const [inputAdd, setInputAdd] = useState('');
  const [inputWithdrawal, setInputWithdrawal] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [savedEntries, setSavedEntries] = useState([]);
  const [netTotal, setNetTotal] = useState(0);
  const [withdrawalTotal, setWithdrawalTotal] = useState(0);

  useEffect(() => {
    const storedNetTotal = localStorage.getItem('netTotal');
    const storedWithdrawalTotal = localStorage.getItem('withdrawalTotal');
    const storedSavedEntries = JSON.parse(localStorage.getItem('savedEntries'));

    setNetTotal(storedNetTotal ? parseFloat(storedNetTotal) : 0);
    setWithdrawalTotal(
      storedWithdrawalTotal ? parseFloat(storedWithdrawalTotal) : 0
    );
    setSavedEntries(storedSavedEntries || []);
  }, []);

  const handleDelete = (e) => {
    e.preventDefault();
    localStorage.clear();
    setSavedEntries([]); 
    window.location.reload(); 
  };
  const handleSaveChanges = () => {
    const addValue = parseFloat(inputAdd) || 0;
    const withdrawalValue = parseFloat(inputWithdrawal) || 0;
  
    let message = '';
  
    if (textareaValue.trim() !== '') {
      message = `  ملاحظة: ${textareaValue}`;
      setSavedEntries(prevEntries => [
        ...prevEntries,
        { value: message, isText: true , isPositive:false},
      ]);
    }
    if (addValue > 0) {
      message = `+ تم إضافة مبلغ بقيمة  :  ${addValue} `;
      setSavedEntries(prevEntries => [
        ...prevEntries,
        { value: message, isText: false, isPositive: true },
      ]);
    }
  
    if (withdrawalValue > 0) {
      message = `- تم سحب مبلغ بقيمة  : ${withdrawalValue}`;
      setSavedEntries(prevEntries => [
        ...prevEntries,
        { value: message, isText: false, isPositive: false },
      ]);
  
      const updatedWithdrawalTotal = withdrawalTotal + withdrawalValue;
      setWithdrawalTotal(updatedWithdrawalTotal);
      localStorage.setItem(
        'withdrawalTotal',
        updatedWithdrawalTotal.toString()
      );
    }
  
    const updatedNetTotal = netTotal + addValue - withdrawalValue;
    setNetTotal(updatedNetTotal);
  
    const updatedEntries = [
      ...savedEntries,
      {
        value: message,
        isText: textareaValue.trim() !== '' || (inputAdd > 0 && inputWithdrawal > 0),
        isPositive: addValue > 0,
      },
    ];
  
    localStorage.setItem('netTotal', updatedNetTotal.toString());
    localStorage.setItem('savedEntries', JSON.stringify(updatedEntries));
  
    setTextareaValue('');
    setInputAdd('');
    setInputWithdrawal('');
  };

  return (
    <div className='bottom-account'>
      <div className='account-left-footer'>
        {savedEntries.length > 0 && (
          <div>
            {savedEntries.map((entry, index) => (
              <div
                key={index}
                style={{
                  background: entry.isText
                    ? 'grey'
                    : entry.isPositive
                    ? 'green'
                    : '#ff6d00',
                }}
              >
                {entry.value}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='account-right-footer'>
        <textarea
          rows={1}
          placeholder='ملاحظات'
          value={textareaValue}
          onChange={(e) => setTextareaValue(e.target.value)}
        />
        <form className='account-form'>
          <input
            placeholder='اضافه'
            value={inputAdd}
            onChange={(e) => setInputAdd(e.target.value)}
          />
          <input
            placeholder='مسحوبات شخصيه'
            value={inputWithdrawal}
            onChange={(e) => setInputWithdrawal(e.target.value)}
          />
          <div>
            <button type='button' onClick={handleDelete}>
              اغلاق الحساب
            </button>
            <button type='button' onClick={handleSaveChanges}>
              حفظ التغير
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountFooter;
