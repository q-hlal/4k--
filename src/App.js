import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import AddItemForm from './nav-pages/addItem/AddItem';
import SellItem from './nav-pages/sellItem/SellItem';
import Summery from './nav-pages/summery/Summery';
import Account from './nav-pages/account/Account';
import Detail from './nav-pages/sellingDetail/Detail';
import AllItemInfo from './nav-pages/allItem/AllItemInfo';
import Pin from './Pin';

function App() {
  const [correctPin, setCorrectPin] = useState(false);

  const handlePinSubmit = (enteredPin) => {
    // Check if enteredPin is correct
    if (enteredPin === '1111') {
      setCorrectPin(true);
    } else {
      // Handle incorrect PIN
      alert('رمز الدخول غير صحيح الرجاء ادخال قيمه صحيحه');
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/add' element={<AddItemForm />} />
          <Route path='/sell' element={<SellItem />} />
          {correctPin ? <Route path='/summery' element={<Summery />} /> :  <Route path='/summery' element={<Pin onSubmit={handlePinSubmit} />} />}
          {correctPin ? <Route path='/account' element={<Account />}/>:<Route path='/account' element={<Pin onSubmit={handlePinSubmit} />} />}
          <Route path='/detail' element={<Detail />} />
          <Route path='/allItem' element={<AllItemInfo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
