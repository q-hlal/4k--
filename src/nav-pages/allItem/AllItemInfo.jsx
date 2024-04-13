import React, { useState } from 'react';
import itemData from '../../db.json';
import { MdDeleteForever } from "react-icons/md";

const getRandomColor = () => {
  // Generate a random hexadecimal color
  return `#${Math.floor(Math.random()*16777215).toString(16)}`;
};

const AllItemInfo = () => {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [filterTerm, setFilterTerm] = useState('');

  const handleClick = (id) => {
    setSelectedItemId(id === selectedItemId ? null : id);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/itemData/${id}`, {
      method: 'DELETE',
      headers: { "Content-type": "application/json" },
    });
  };

  const filteredItems = itemData.itemData.filter((item) => {
    const searchTerm = filterTerm.toLowerCase();
    return (
      item.itemName.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className="container">
      <div className="main-content">
        <div className="item-search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
          />
        </div>

        <div className="modern-card">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`info ${selectedItemId === item.id ? 'selected' : ''}`}
              // style={{ backgroundColor: getRandomColor() }}
            >
              <div className='left-item-details'>
                <img src={item.img} alt={item.category} onClick={() => handleClick(item.id)}/>
              {selectedItemId === item.id && (
                <div className='img-detail-sec'>
                  <div>1</div>
                  <div>2</div>
                  <div>3</div>
                </div>
              )}
              </div>

              {selectedItemId === item.id && (
                <div className="right-item-details">
                  <MdDeleteForever className='delete-icon' onClick={() => handleDelete(item.id)} />
                  <div>
                    <h3>نوع المنتج : {item.category}</h3>
                    <h3>اسم المنتج : {item.itemName}</h3>
                  </div>
                  <div>
                  <p>كميه المنتج: {item.quantity}</p>
                  <p>سعر المنتج : {item.price}</p>
                  </div>
                  <p>لون المنتج : {item.color.join(' _ ')}</p>
                  <p> {item.sizes.join(' _ ')} : حجم المنتج</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllItemInfo;
