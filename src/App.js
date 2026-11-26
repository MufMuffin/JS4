import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

const API_URL = 'https://fakestoreapi.com/products';

const INITIAL_PIZZAS = [
  {
    id: 1,
    title: 'Піца Неаполітано',
    price: 385,
    category: 'Фірмова',
    image: 'https://pablito.com.ua/wp-content/uploads/2017/11/Pica_Neapolitanska_2024-09.jpg',
  },
  {
    id: 2,
    title: 'Піца Пепероні',
    price: 340,
    category: 'Класична',
    image: 'https://ecopizza.com.ua/555-large_default/pica-peperoni.jpg',
  },
  {
    id: 3,
    title: 'Піца ВегаТаріо',
    price: 395,
    category: 'Вегетаріанська',
    image: 'https://ecopizza.com.ua/557-large_default/pica-vegetarianska.jpg',
  },
  {
    id: 4,
    title: "4 м'яса",
    price: 300,
    category: "М'ясна",
    image: 'https://ecopizza.com.ua/548-large_default/pica-4-m-yasa.jpg',
  },
  {
    id: 5,
    title: "М'ясна країна",
    price: 330,
    category: "М'ясна",
    image: 'https://ecopizza.com.ua/551-large_default/pica-bavariya.jpg',
  },
  {
    id: 6,
    title: 'Сирна мрія',
    price: 375,
    category: 'Фірмова',
    image: 'https://ecopizza.com.ua/559-large_default/pica-4-siru.jpg',
  },
];

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        await axios.get(`${API_URL}?limit=6`);
        setProducts(INITIAL_PIZZAS);
        setError(null);
      } catch (err) {
        setError('Помилка під час завантаження меню піцерії.');
        console.error('Error fetching pizzas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addProduct = async (newProductData) => {
    const createdProduct = {
      id: Date.now(),
      title: newProductData.title,
      price: Number(newProductData.price),
      category: newProductData.category || 'Піца',
      image:
        newProductData.image ||
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80',
    };

    setProducts((prev) => [createdProduct, ...prev]);

    try {
      await axios.post(API_URL, createdProduct);
    } catch (err) {
      console.error('Помилка POST-запиту:', err);
    }
  };

  const editProduct = async (id, updatedTitle, updatedPrice) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, title: updatedTitle, price: Number(updatedPrice) }
          : item
      )
    );

    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, title: updatedTitle, price: Number(updatedPrice) }
          : item
      )
    );

    try {
      await axios.put(`${API_URL}/${id}`, {
        title: updatedTitle,
        price: Number(updatedPrice),
      });
    } catch (err) {
      console.error('Помилка PUT-запиту:', err);
    }
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateCartQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    alert('Замовлення в «Арчі Піца» успішно оформлено! Очікуйте доставку.');
    setCart([]);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <header className="store-header">
        <h1>Арчі Піца</h1>
        <input
          type="text"
          className="search-input"
          placeholder="Пошук піци за назвою..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </header>

      <div className="main-layout">
        <div className="catalog-section">
          <ProductForm onAddProduct={addProduct} />

          {loading && <p className="status-msg">Завантаження меню піцерії...</p>}
          {error && <p className="error-msg">{error}</p>}

          {!loading && !error && (
            <ProductList
              products={filteredProducts}
              onAddToCart={addToCart}
              onEditProduct={editProduct}
              onDeleteProduct={deleteProduct}
            />
          )}
        </div>

        <aside className="cart-section">
          <Cart
            cartItems={cart}
            onUpdateQuantity={updateCartQuantity}
            onRemoveFromCart={removeFromCart}
            onClearCart={clearCart}
          />
        </aside>
      </div>
    </div>
  );
}

export default App;