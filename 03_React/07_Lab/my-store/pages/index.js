import Link from 'next/link';

export async function getServerSideProps() {
  return {
    props: {
      message: 'Bienvenido a FakeStore'
    }
  };
}

export default function HomePage({ message }) {
  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'Arial, sans-serif', 
      textAlign: 'center',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1 style={{ color: '#333', marginBottom: '10px' }}>{message}</h1>
      <p style={{ color: '#666', marginBottom: '40px' }}>Navega a las siguientes secciones:</p>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '30px', 
        marginTop: '40px',
        flexWrap: 'wrap' 
      }}>
        <Link href="/products" style={{ textDecoration: 'none' }}>
          <div style={{
            padding: '30px',
            border: '2px solid #0070f3',
            borderRadius: '12px',
            cursor: 'pointer',
            minWidth: '250px',
            backgroundColor: '#f0f9ff',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 6px rgba(0, 112, 243, 0.1)'
          }}>
            <h2 style={{ color: '#0070f3', marginBottom: '10px' }}>📦 Productos</h2>
            <p style={{ color: '#555' }}>Ver todos los productos disponibles</p>
          </div>
        </Link>
        
        <Link href="/users" style={{ textDecoration: 'none' }}>
          <div style={{
            padding: '30px',
            border: '2px solid #10b981',
            borderRadius: '12px',
            cursor: 'pointer',
            minWidth: '250px',
            backgroundColor: '#f0fdf4',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 6px rgba(16, 185, 129, 0.1)'
          }}>
            <h2 style={{ color: '#10b981', marginBottom: '10px' }}>👥 Usuarios</h2>
            <p style={{ color: '#555' }}>Ver todos los usuarios registrados</p>
          </div>
        </Link>
      </div>
    </div>
  );
}