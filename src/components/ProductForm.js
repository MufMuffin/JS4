import React, { useState } from 'react';

function ProductForm({ onAddProduct }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !price || Number(price) <= 0) {
      alert('Будь ласка, введіть назву піци та коректну ціну в гривнях!');
      return;
    }

    onAddProduct({
      title: title.trim(),
      price: Number(price),
      category: category.trim() || 'Фірмова піца',
      image: image.trim(),
    });

    setTitle('');
    setPrice('');
    setCategory('');
    setImage('');
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h3>Додати нову піцу до меню</h3>
      <div className="form-row">
        <input
          type="text"
          placeholder="Назва піци"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Ціна (грн)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Категорія"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="url"
          placeholder="Посилання на фото (URL)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button type="submit" className="btn-primary">
          Додати піцу
        </button>
      </div>
    </form>
  );
}

export default ProductForm;