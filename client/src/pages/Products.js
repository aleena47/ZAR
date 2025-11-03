import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from '../auth';
import './Products.css';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    style: searchParams.get('style') || '',
    search: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    // Handle URL params
    const styleParam = searchParams.get('style');
    if (styleParam) {
      setFilters(prev => ({ ...prev, style: styleParam }));
    }
  }, [searchParams]);

  useEffect(() => {
    applyFilters();
  }, [products, filters]);

  const fetchProducts = async () => {
    try {
      console.log('🔄 Fetching products from API...');
      const response = await axios.get('/api/products');
      console.log('✅ Products fetched:', response.data.length, 'products');
      setProducts(response.data);
      setFilteredProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('❌ Error fetching products:', error);
      console.log('🔄 Using fallback products...');
      
      // Fallback products if API fails
      const fallbackProducts = [
        {
          id: 1,
          name: "Classic White T-Shirt",
          category: "Tops",
          price: 29.99,
          image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
          description: "Premium cotton t-shirt with comfortable fit",
          style: "Casual"
        },
        {
          id: 2,
          name: "Slim Fit Denim Jeans",
          category: "Bottoms",
          price: 79.99,
          image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
          description: "Classic denim jeans with modern slim fit",
          style: "Casual"
        },
        {
          id: 3,
          name: "Leather Jacket",
          category: "Outerwear",
          price: 199.99,
          image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
          description: "Genuine leather jacket with classic design",
          style: "Edgy"
        },
        {
          id: 4,
          name: "Summer Dress",
          category: "Dresses",
          price: 59.99,
          image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500",
          description: "Light and airy summer dress perfect for warm weather",
          style: "Feminine"
        },
        {
          id: 5,
          name: "Running Shoes",
          category: "Shoes",
          price: 129.99,
          image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
          description: "Comfortable running shoes with excellent support",
          style: "Sporty"
        },
        {
          id: 6,
          name: "Formal Blazer",
          category: "Outerwear",
          price: 149.99,
          image: "https://images.unsplash.com/photo-1594938291221-94f313ab01a6?w=500",
          description: "Elegant blazer for professional occasions",
          style: "Professional"
        }
      ];
      
      setProducts(fallbackProducts);
      setFilteredProducts(fallbackProducts);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category);
    }

    if (filters.style) {
      filtered = filtered.filter(p => p.style === filters.style);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      );
    }

    setFilteredProducts(filtered);
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  if (loading) {
    return (
      <div className="products-loading">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="products-header">
        <div className="container">
          <h1>Shop Our Collection</h1>
          <p>Discover fashion powered by AI</p>
        </div>
      </div>

      <div className="products-content">
        <div className="container">
          <div className="products-layout">
            <aside className="products-sidebar">
              <div className="filter-section">
                <h3>Search</h3>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="search-input"
                />
              </div>

              <div className="filter-section">
                <h3>Category</h3>
                <button
                  className={`filter-btn ${filters.category === '' ? 'active' : ''}`}
                  onClick={() => handleFilterChange('category', '')}
                >
                  All Categories
                </button>
                {categories.map(category => (
                  <button
                    key={category}
                    className={`filter-btn ${filters.category === category ? 'active' : ''}`}
                    onClick={() => handleFilterChange('category', category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="filter-section">
                <h3>Style</h3>
                <button
                  className={`filter-btn ${filters.style === '' ? 'active' : ''}`}
                  onClick={() => handleFilterChange('style', '')}
                >
                  All Styles
                </button>
                <button
                  className={`filter-btn ${filters.style === 'Casual' ? 'active' : ''}`}
                  onClick={() => handleFilterChange('style', 'Casual')}
                >
                  Casual
                </button>
                <button
                  className={`filter-btn ${filters.style === 'Professional' ? 'active' : ''}`}
                  onClick={() => handleFilterChange('style', 'Professional')}
                >
                  Professional
                </button>
                <button
                  className={`filter-btn ${filters.style === 'Edgy' ? 'active' : ''}`}
                  onClick={() => handleFilterChange('style', 'Edgy')}
                >
                  Edgy
                </button>
                <button
                  className={`filter-btn ${filters.style === 'Feminine' ? 'active' : ''}`}
                  onClick={() => handleFilterChange('style', 'Feminine')}
                >
                  Feminine
                </button>
                <button
                  className={`filter-btn ${filters.style === 'Sporty' ? 'active' : ''}`}
                  onClick={() => handleFilterChange('style', 'Sporty')}
                >
                  Sporty
                </button>
              </div>
            </aside>

            <main className="products-main">
              <div className="products-header-bar">
                <p className="products-count">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                </p>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="no-products">
                  <p>No products found. Try adjusting your filters.</p>
                  <button 
                    className="btn btn-primary" 
                    onClick={() => setFilters({ category: '', style: '', search: '' })}
                    style={{ marginTop: '1rem' }}
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="products-grid">
                  {filteredProducts.map(product => (
                    <Link key={product.id} to={`/products/${product.id}`} className="product-card">
                      <div className="product-image-container">
                        <img src={product.image} alt={product.name} />
                      </div>
                      <div className="product-info">
                        <h3>{product.name}</h3>
                        <p className="product-category">{product.category}</p>
                        <p className="product-price">${product.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;

