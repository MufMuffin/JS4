import React from 'react';

function Cart({ cartItems, onUpdateQuantity, onRemoveFromCart, onClearCart }) {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-box">
      <h2>Кошик замовлення ({totalItems})</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Ваш кошик порожній. Оберіть піцу з меню.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <span className="cart-item-title">{item.title}</span>
                  <span className="cart-item-price">
                    {item.price * item.quantity} грн ({item.price} грн / шт.)
                  </span>
                </div>

                <div className="cart-controls">
                  <button onClick={() => onUpdateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onUpdateQuantity(item.id, 1)}>+</button>
                  <button
                    onClick={() => onRemoveFromCart(item.id)}
                    className="btn-remove-small"
                    title="Видалити з кошика"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <p>
              <strong>Всього піц:</strong> {totalItems} шт.
            </p>
            <p className="total-price">
              <strong>До сплати:</strong> {totalPrice} грн
            </p>
            <button onClick={onClearCart} className="btn-checkout">
              Оформити замовлення
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;