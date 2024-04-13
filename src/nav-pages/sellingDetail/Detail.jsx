import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { AiOutlineDelete } from 'react-icons/ai';
import SingleItemInfo from '../../db.json';

const Detail = () => {
  const [visibleItem, setVisibleItem] = useState(null);

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/SingleItemInfo/${id}`, {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' },
    });
    console.log(`Deleting item with id ${id}`);
  };

  const toggleDetails = (id) => {
    setVisibleItem((prevVisibleItem) => (prevVisibleItem === id ? null : id));
  };

  const formatAmount = (amount) => {
    return amount.toLocaleString() + ' IQD';
  };

  return (
    <div className='detail-page'>
      {SingleItemInfo.SingleItemInfo.length === 0 ? (
        <div className='empty-text'>
        <p>لا يوجد عمليات بيع حالياً</p>
        </div>
      ) : (
        SingleItemInfo.SingleItemInfo.map((item) => (
          <div className='detail-card' key={item.id}>
            <div className='top-card'>
              <div className='left-detail'>
                <div>رقم عملية البيع :<span>{item.id}</span></div>
                <div>
                  نوع البيع :<span className={item.mainTransaction.paymentOption === 'نقد' ? 'option1' : 'option2'}>
                    {item.mainTransaction.paymentOption}
                  </span>
                </div>
              </div>
              <div className='middle-detail'>
                <div>{formatAmount(item.mainTransaction.totalAmount)}</div>
                {visibleItem === item.id ? (
                  <IoIosArrowUp className={`arrow`} onClick={() => toggleDetails(item.id)} />
                ) : (
                  <IoIosArrowDown className={`arrow`} onClick={() => toggleDetails(item.id)} />
                )}
              </div>
              <div className='right-detail'>
                <p>{item.mainTransaction.date}</p>
                <p>{item.mainTransaction.time}</p>
                <button onClick={() => handleDelete(item.id)}>
                  <AiOutlineDelete />
                </button>
              </div>
            </div>

            {visibleItem === item.id && (
              <>
                {item.itemDetails.map((detail) => (
                  <div className='bottom-card' key={detail.transactionNumber}>
                    <div className="item-icons">
                      <h3>{formatAmount(detail.itemPrice)}</h3>
                    </div>
                    <h3>الكميه :{detail.quantity}</h3>
                    <h3>{detail.selectedSize} : الحجم</h3>
                    <h3>اللون : {detail.selectedColor}</h3>
                    <h3> نوع المنتج : {detail.category}</h3>
                  </div>
                ))}
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Detail;
