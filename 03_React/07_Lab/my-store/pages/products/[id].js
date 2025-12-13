// pages/products/[id].js
import Link from 'next/link';

export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await res.json();
  
  return {
    props: {
      product,
    },
  };
}

export default function ProductDetail({ product }) {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Detalle del Producto</h1>
        <Link href="/products">
          <button style={{ padding: '10px' }}>
            ← Volver a productos
          </button>
        </Link>
      </div>
      
      <div style={{ display: 'flex', gap: '40px', marginTop: '30px' }}>
        <div style={{ flex: 1 }}>
          <img 
            src={product.image} 
            alt={product.title}
            style={{ width: '100%', maxWidth: '400px', objectFit: 'contain' }}
          />
        </div>
        
        <div style={{ flex: 2 }}>
          <h2>{product.title}</h2>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'green' }}>
            ${product.price}
          </p>
          <p>{product.description}</p>
          <p><strong>Categoría:</strong> {product.category}</p>
          <p>
            <strong>Calificación:</strong> {product.rating?.rate} ⭐ 
            ({product.rating?.count} reseñas)
          </p>
        </div>
      </div>
    </div>
  );
}