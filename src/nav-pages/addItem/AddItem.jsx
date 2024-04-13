import React, { useState } from 'react';
import '../style.css'; 

const AddItemForm = () => {
  const [item, setItem] = useState({
    itemName: '',
    category: '',
    color: [],
    sizes: [],
    img: null,
    price: '',
    quantity: '',
  });

  const [notification, setNotification] = useState(null);
  const [useNumericLabels, setUseNumericLabels] = useState(false);

  const colors = ['أحمر', 'أزرق', 'أخضر', 'أصفر', 'أسود', 'أبيض', 'برتقالي', 'وردي', 'بنفسجي', 'بيجي', 'رصاصي', 'تركوازي', 'فستقي', 'زيتوني', ' ماروني', 'مشمشي', 'جوزي'];
  const categories = ['بنطرون ', 'تي-شيرت', 'قميص', 'سويتر', 'تي-شيرت رياضي', 'قمصله', 'بلوزة', 'شورت', ' بجامه', 'تراك سود', 'حذاء ', 'جورب', 'غطاء رأس', 'إكسسوارات', 'ملابس داخليه', 'قياس خاص',];
  const originalSizes = ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', '6XL', '7XL', '8XL'];
  const numericSizes = ['28', '29', '30', '31', '32', '33', '34', '35', '36', '38', '40', '41', '42', '43', '44', '45', '46'];

  const sizes = useNumericLabels ? numericSizes : originalSizes;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    if (type === 'file') {
      handleFileChange(e);
    } else if (type === 'checkbox') {
      handleCheckboxChange(name, value, checked);
    } else {
      setItem({
        ...item,
        [name]: value,
      });
    }
  };

  const handleCheckboxChange = (name, value, checked) => {
    if (name === 'color') {
      const updatedColors = checked
        ? [...item.color, value]
        : item.color.filter((color) => color !== value);

      setItem({
        ...item,
        color: updatedColors,
      });
    } else if (name === 'useNumericLabels') {
      setUseNumericLabels(checked);
    } else {
      const updatedSizes = checked
        ? [...item.sizes, value]
        : item.sizes.filter((size) => size !== value);

      const updatedItem = {
        ...item,
        sizes: updatedSizes,
        quantity: calculateTotalQuantity(updatedSizes),
      };
      setItem(updatedItem);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setItem((prevItem) => ({
        ...prevItem,
        img: file
      }));
    } else {
      setItem((prevItem) => ({
        ...prevItem,
        img: null
      }));
    }
  };

  const calculateTotalQuantity = (sizes) => {
    const sizeCount = sizes.reduce((count, size) => {
      count[size] = (count[size] || 0) + 1;
      return count;
    }, {});

    const totalQuantity = Object.values(sizeCount).reduce((total, count) => total + count, 0);

    return totalQuantity.toString();
  };

  const handleSubmit = () => {
    try {
      fetch('http://localhost:4000/itemData', {
        method: 'POST',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(item),
      }).then(response => {
        if (!response.ok) {
          throw new Error('Failed to add item');
        }
        return response.json();
      })
        .then(data => {
          console.log(data);
          setNotification({
            message: 'Item added successfully',
            success: true
          });
        })
        .catch(error => {
          console.error(error);
          setNotification({
            message: 'Failed to add item',
            success: false
          });
        });
    } catch (err) {
      console.error(err);
      setNotification({
        message: 'Failed to add item',
        success: false
      });
    }

    // Reset the form after a delay
    setTimeout(() => {
      setItem({
        itemName: '',
        category: '',
        color: [],
        sizes: [],
        img: null,
        price: '',
        quantity: '',
      });
      setNotification(null);
    }, 2000);
  };

  return (
    <div className='item-container'>
      <div className="add-item-container">
        {notification && (
          <div className={`notification ${notification.success ? 'success' : 'error'}`}>
            {notification.message} {notification.success ? <span className="checkmark">&#10004;</span> : <span className="crossmark">&#10008;</span>}
          </div>
        )}
        <form>
          <div className='form-inputs'>
            <label htmlFor="itemName">Name of Item:</label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              value={item.itemName}
              onChange={handleChange}
              required
            />

            <label htmlFor="category">Category:</label>
            <select
              id="category"
              name="category"
              value={item.category}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <label>Choose Colors:</label>
            <div className="size-checkboxes">
              {colors.map((color) => (
                <label key={color}>
                  <input
                    type="checkbox"
                    name="color"
                    value={color}
                    checked={item.color.includes(color)}
                    onChange={handleChange}
                  />
                  {color}
                </label>
              ))}
            </div>

            <label>Choose Sizes:</label>
            <div className="size-checkboxes">
              {sizes.map((size) => (
                <label key={size}>
                  <input
                    type="checkbox"
                    name="sizes"
                    value={size}
                    checked={item.sizes.includes(size)}
                    onChange={handleChange}
                  />
                  {size}
                </label>
              ))}
            </div>

            <label htmlFor="img">Image Upload:</label>
            <input
              type="file"
              id="img"
              name="img"
              onChange={handleFileChange}
              required
            />

            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              min="0"
              step="1000"
              value={item.price}
              onChange={handleChange}
              required
            />

            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              value={item.quantity}
              onChange={handleChange}
              required
            />
          </div>

          <label>
            <input
              type="checkbox"
              name="useNumericLabels"
              checked={useNumericLabels}
              onChange={handleChange}
            />
            Use Numeric Labels
          </label>
          <button type="button" onClick={handleSubmit}>
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItemForm;
