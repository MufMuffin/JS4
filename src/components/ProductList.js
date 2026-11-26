import React from 'react';
import ProductCard from './ProductCard';

function ProductList({ products, onAddToCart, onEditProduct, onDeleteProduct }) {
  if (products.length === 0) {
    return <p className="status-msg">Товарів за вашим запитом не знайдено.</p>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onEditProduct={onEditProduct}
          onDeleteProduct={onDeleteProduct}
        />
      ))}
    </div>
  );
}

export default ProductList;