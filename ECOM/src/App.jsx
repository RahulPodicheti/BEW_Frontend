import { useEffect, useState } from 'react';
import './App.css';
import ProductList from './ProductList';
import CategoryFilter from './CategoryFilter';

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${BASE_URL}/api/categories`)
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  useEffect(() => {
    const url = selectedCategory
      ? `${BASE_URL}/api/products/category/${selectedCategory}`
      : `${BASE_URL}/api/products`;

    fetch(url)
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, [selectedCategory]);

  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortOrder = (event) => {
    setSortOrder(event.target.value);
  };

  const handleSelectedCategory = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const filteredProducts = products
    .filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === 'asc' ? a.price - b.price : b.price - a.price
    );

  return (
    <div className='container'>
      <h1 className='my-4'>Product Catalog</h1>

      <div className='row align-items-center mb-4'>
        <div className='col-md-3 col-sm-12 mb-2'>
          <CategoryFilter categories={categories} onSelect={handleSelectedCategory} />
        </div>

        <div className='col-md-5 col-sm-12 mb-2'>
          <input
            type="text"
            className='form-control'
            placeholder='Search for Products'
            onChange={handleSearchTerm}
          />
        </div>

        <div className='col-md-4 col-sm-12 mb-2'>
          <select className='form-control' onChange={handleSortOrder}>
            <option value="asc">Sort by Price : Low to High</option>
            <option value="desc">Sort by Price : High to Low</option>
          </select>
        </div>
      </div>

      <div>
        {filteredProducts.length ? (
          <ProductList products={filteredProducts} />
        ) : (
          <p>No Products Found</p>
        )}
      </div>
    </div>
  );
}

export default App;
