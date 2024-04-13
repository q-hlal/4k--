import React, { useState } from 'react';
import itemData from '../../db.json';
import { AiOutlineDelete, AiOutlineShoppingCart, AiOutlinePlus } from 'react-icons/ai';
import '../style.css';
import SearchFilter from './SearchFilter';
import Footer from './Footer';

const SellItem = () => {
  const [searchValue, setSearchValue] = useState('');
  const [itemCards, setItemCards] = useState([]);
  const [selectedOption, setSelectedOption] = useState("نقد");
  const [transactionsSubmitted, setTransactionsSubmitted] = useState(false);
  const [dateTime, setDateTime] = useState({ date: '', time: '' });
  

  const handleAddItem = () => {
    const newItemCard = { selectedItem: '', selectedColor: '', selectedSize: '', quantity: 1, itemPrice: 0 };
    const newItemCards = [...itemCards, newItemCard];
    setItemCards(newItemCards);
  };

  const handleDeleteItem = (index) => {
    const newItemCards = [...itemCards];
    newItemCards.splice(index, 1);
    setItemCards(newItemCards);
  };

  const handleItemChange = (event, index) => {
    const selectedItemValue = event.target.options[event.target.selectedIndex].value;
    const newItemCards = [...itemCards];
    newItemCards[index].selectedItem = selectedItemValue;
  
    newItemCards[index] = {
      selectedItem: selectedItemValue,
      selectedColor: '',
      selectedSize: '',
      quantity: 1,
    };
  
    const selectedItemInfo = itemData.itemData.find((item) => item.itemName === selectedItemValue);
    const initialItemPrice = selectedItemInfo ? selectedItemInfo.price || 0 : 0;
    newItemCards[index].itemPrice = initialItemPrice;
  
    setItemCards(newItemCards);
  };

  const handleColorChange = (event, index) => {
    const selectedColorValue = event.target.value;
    const newItemCards = [...itemCards];
    newItemCards[index].selectedColor = selectedColorValue;
    setItemCards(newItemCards);
  };

  const handleSizeChange = (event, index) => {
    const selectedSizeValue = event.target.value;
    const newItemCards = [...itemCards];
    newItemCards[index].selectedSize = selectedSizeValue;
    setItemCards(newItemCards);
  };

  const handleQuantityChange = (e, index) => {
    const newQuantity = parseInt(e.target.value, 10);
    const newItemCards = [...itemCards];
    newItemCards[index].quantity = newQuantity;

    const selectedItemInfo = itemData.itemData.find((item) => item.itemName === newItemCards[index].selectedItem);
    const basePrice = selectedItemInfo ? selectedItemInfo.price || 0 : 0;
    newItemCards[index].itemPrice = basePrice * newQuantity;

    setItemCards(newItemCards);
  };

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleCartClick = async () => {
    try {
      // Main transaction data
      const mainTransactionData = {
        date: dateTime.date,
        time: dateTime.time,
        paymentOption: selectedOption,
        totalAmount: calculateTotalPrice(),
      };
  
      // Details of each item
      const itemDetails = itemCards.map((itemCard, index) => {
        const selectedItemInfo = itemData.itemData.find(item => item.itemName === itemCard.selectedItem);
        const category = selectedItemInfo ? selectedItemInfo.category : '';
        const totalPrice = itemCard.itemPrice * itemCard.quantity  ;
  
        return {
          transactionNumber: index + 1,
          selectedItem: itemCard.selectedItem,
          selectedColor: itemCard.selectedColor,
          selectedSize: itemCard.selectedSize,
          quantity: itemCard.quantity,
          itemPrice: itemCard.itemPrice,
          category: category,
          total: totalPrice,
        };
      });
  
      const response = await fetch("http://localhost:4000/SingleItemInfo", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mainTransaction: mainTransactionData,
          itemDetails: itemDetails,
        }),
      });
  
      if (!response.ok) {
        console.error('Failed to submit transaction data');
        return;
      }
  
      setItemCards([]);
      setTransactionsSubmitted(true);
    } catch (error) {
      console.error('Error while submitting transactions', error);
    }
  };
  

  const calculateTotalPrice = () => {
    return itemCards.reduce((total, card) => {
      const itemTotal = card.quantity > 1 ? card.itemPrice : card.itemPrice * card.quantity ;
      return total + itemTotal;
    }, 0);
  };
  

  const calculateTotalQuantity = () => {
    return itemCards.reduce((totalQuantity, card) => totalQuantity + card.quantity, 0);
  };

  const itemOptions = itemData.itemData
    .filter((item) => item.itemName && item.quantity)
    .map((item) => (
      <option key={item.id} value={item.itemName}>
        {`${item.itemName} (${item.category})`} * {item.quantity}
      </option>
    ));

  const colorOptions = (selectedItem) => {
    const item = itemData.itemData.find((item) => item.itemName === selectedItem);

    if (item) {
      const colors = Array.isArray(item.color) ? item.color : [item.color];

      if (colors.length > 0) {
        return colors.map((color, index) => (
          <option key={index} value={color}>
            {color}
          </option>
        ));
      }
    }

    return [];
  };

  const sizeOptions = (selectedItem) => {
    const item = itemData.itemData.find((item) => item.itemName === selectedItem);

    if (item && Array.isArray(item.sizes)) {
      return item.sizes.map((size, index) => (
        <option key={index} value={size}>
          {size}
        </option>
      ));
    }

    return [];
  };

  const filteredItemOptions = itemOptions.filter(
    (item) =>
      String(item.props.children)
        .toLowerCase()
        .includes(searchValue.toLowerCase())
  );

  return (
    <div className="sell-item-container">
      <SearchFilter
        onSearch={handleSearch}
        onSelectChange={handleSelectChange}
        selectedOption={selectedOption}
        onDateTimeChange={(dateTime) => setDateTime(dateTime)}
      />

      <div className="selling-info">
        {itemCards.map((itemCard, index) => (
          <div className="item-card" key={index}>
            <div>
              {filteredItemOptions.length > 0 && (
                <select value={itemCard.selectedItem} onChange={(e) => handleItemChange(e, index)}>
                  <option value="">Select Item</option>
                  {filteredItemOptions}
                </select>
              )}
              {itemCard.selectedItem && (
                <>
                  {colorOptions(itemCard.selectedItem).length > 0 && (
                    <select value={itemCard.selectedColor} onChange={(e) => handleColorChange(e, index)}>
                      <option value="">Select Color</option>
                      {colorOptions(itemCard.selectedItem)}
                    </select>
                  )}
                  {sizeOptions(itemCard.selectedItem).length > 0 && (
                    <select value={itemCard.selectedSize} onChange={(e) => handleSizeChange(e, index)}>
                      <option value="">Select Size</option>
                      {sizeOptions(itemCard.selectedItem)}
                    </select>
                  )}
                  <input
                    type="number"
                    min="1"
                    placeholder="Quantity"
                    value={itemCard.quantity}
                    onChange={(e) => handleQuantityChange(e, index)}
                  />
                  <span>Price: {itemCard.itemPrice.toLocaleString()}.IQD</span>
                </>
              )}
            </div>
            <button onClick={() => handleDeleteItem(index)}>
              <AiOutlineDelete />
            </button>
          </div>
        ))}
        <div>
          <button onClick={handleAddItem}>
            <AiOutlinePlus />
          </button>
          <button onClick={handleCartClick}>
            <AiOutlineShoppingCart />
          </button>
        </div>
      </div>
      <Footer
        selectedOption={selectedOption}
        total={calculateTotalPrice()}
        totalQuantity={calculateTotalQuantity()} 
        transactionsSubmitted={transactionsSubmitted}
        dateTime={dateTime}
      />
    </div>
  );
};

export default SellItem;
