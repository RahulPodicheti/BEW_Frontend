import React from 'react';

function ProductList({ products }) {
  return (
    <div className="row">
      {products.map(product => (
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={product.id}>
          <div className="card h-100 shadow-lg">
            <img
              src={product?.imageUrl || 'http://placehold.co/600x400'}
              className="card-img-top"
              alt={product?.name}
              style={{ height: '200px', width: '100%', objectFit: 'cover' }}
            />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text">
                <strong>${product.price.toFixed(2)}</strong>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
