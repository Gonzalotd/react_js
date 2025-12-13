// pages/products/index.js
import Link from 'next/link';

export async function getServerSideProps() {
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();
  
  return {
    props: {
      products,
    },
  };
}

export default function ProductsPage({ products }) {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Productos</h1>
      <Link href="/">
        <button style={{ padding: '10px', marginBottom: '20px' }}>
          ← Volver al inicio
        </button>
      </Link>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {products.map(product => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', cursor: 'pointer' }}>
              <img 
                src={product.image} 
                alt={product.title}
                style={{ width: '100%', height: '200px', objectFit: 'contain' }}
              />
              <h3>{product.title}</h3>
              <p style={{ fontWeight: 'bold', color: 'green' }}>${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}