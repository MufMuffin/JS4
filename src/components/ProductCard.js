import React, { useState } from 'react';

function ProductCard({ product, onAddToCart, onEditProduct, onDeleteProduct }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(product.title);
  const [editedPrice, setEditedPrice] = useState(product.price);

  const handleSave = () => {
    if (!editedTitle.trim() || Number(editedPrice) <= 0) {
      alert('Введіть коректні дані!');
      return;
    }
    onEditProduct(product.id, editedTitle.trim(), Number(editedPrice));
    setIsEditing(false);
  };

  return (
    <div className="product-card">
      <div>
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />

        {!isEditing && (
          <>
            <span className="product-category">{product.category}</span>
            <h4 className="product-title" title={product.title}>
              {product.title}
            </h4>
            <p className="product-price">{product.price} грн</p>
          </>
        )}
      </div>

      {isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <input
            type="number"
            value={editedPrice}
            onChange={(e) => setEditedPrice(e.target.value)}
          />
          <div className="card-secondary-actions">
            <button onClick={handleSave} className="btn-save">
              Зберегти
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="btn-white-small"
            >
              Скасувати
            </button>
          </div>
        </div>
      ) : (
        <div className="card-actions-column">
          <button
            onClick={() => onAddToCart(product)}
            className="btn-buy-large"
          >
            У кошик
          </button>

          <div className="card-secondary-actions">
            <button
              onClick={() => setIsEditing(true)}
              className="btn-white-small"
            >
              Редагувати
            </button>
            <button
              onClick={() => onDeleteProduct(product.id)}
              className="btn-white-small"
            >
              Видалити
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductCard;