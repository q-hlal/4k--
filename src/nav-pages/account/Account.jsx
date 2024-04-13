import React, { useEffect, useState } from 'react';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { MdOutlineAttachMoney } from 'react-icons/md';
import { FaMoneyCheckDollar } from 'react-icons/fa6';
import { FaClipboardList } from 'react-icons/fa';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import '../style.css';
import DebitInfo from '../../db.json';
import AccountFooter from './AccountFooter';

function Account() {
  const [totalValues, setTotalValues] = useState({
    totalQuantity: 0,
    netTotalIncome: 0,
  });
  const [totalDebit, setTotalDebit] = useState(0);
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);

  useEffect(() => {
    const storedNetTotal = JSON.parse(localStorage.getItem('netTotal'));
    const storedTotalQuantity = JSON.parse(localStorage.getItem('totalQuantity'));
    const storedWithdrawalAmount = JSON.parse(localStorage.getItem('withdrawalTotal'));

    if (storedNetTotal !== null && storedTotalQuantity !== null) {
      setTotalValues({
        totalQuantity: parseFloat(storedTotalQuantity),
        netTotalIncome: parseFloat(storedNetTotal),
      });
    }

    if (storedWithdrawalAmount !== null) {
      setWithdrawalAmount(parseFloat(storedWithdrawalAmount));
    }
  }, []);

  useEffect(() => {
    const calculateTotalDebit = (debitInfo) => {
      return debitInfo.reduce((total, item) => total + (item.debit || 0), 0);
    };

    const totalDebitAmount = calculateTotalDebit(DebitInfo.DebitInfo);
    setTotalDebit(totalDebitAmount);
  }, [DebitInfo.DebitInfo]);

  const data = [
    {
      name: 'Sunday',
      نقد: totalValues.netTotalIncome,
      دائن: totalDebit,
      mount: 500000,
      amt: 32000,
    },
    {
      name: 'Monday',
      نقد: totalValues.netTotalIncome,
      دائن: totalDebit,
      amt: 2210,
    },
    {
      name: 'Tuesday',
      نقد: totalValues.netTotalIncome,
      دائن: totalDebit,
      amt: 2290,
    },
    {
      name: 'Wednesday',
      نقد: totalValues.netTotalIncome,
      دائن: totalDebit,
      amt: 2000,
    },
    {
      name: 'Thursday',
      نقد: totalValues.netTotalIncome,
      دائن: totalDebit,
      amt: 2181,
    },
    {
      name: 'Friday',
      نقد: totalValues.netTotalIncome,
      دائن: totalDebit,
      amt: 2500,
    },
    {
      name: 'Saturday',
      نقد: totalValues.netTotalIncome,
      دائن: totalDebit,
      amt: 2100,
    },
  ];

  return (
    <div className="account-content">
      <main className="account-container">
        <div className="main-cards">
          <div className="card">
            <div className="card-inner">
              <h3>SELLING PRODUCT QUANTITY</h3>
              <FaClipboardList className="card_icon" />
            </div>
            <h1>{totalValues.totalQuantity}</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>PERSONAL WITHDRAWALS</h3>
              <BsFillPersonLinesFill className="card_icon" />
            </div>
            <h1>{withdrawalAmount.toLocaleString()}</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>TOTAL INCOME</h3>
              <MdOutlineAttachMoney className="card_icon" />
            </div>
            <h1>{totalValues.netTotalIncome.toLocaleString()}</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>TOTAL DEBIT</h3>
              <FaMoneyCheckDollar className="card_icon" />
            </div>
            <h1>{totalDebit.toLocaleString()}</h1>
          </div>
        </div>

        <div className="charts">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis dataKey="mount" />
              <Tooltip />
              <Legend />
              <Bar dataKey="دائن" fill="#d50000" />
              <Bar dataKey="نقد" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>

          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis dataKey="mount" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="دائن" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="نقد" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>
      <AccountFooter />
    </div>
  );
}

export default Account;