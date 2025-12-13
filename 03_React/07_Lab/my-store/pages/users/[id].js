import Link from 'next/link';

export async function getServerSideProps(context) {
  const { id } = context.params;
  
  try {
    const res = await fetch(`https://fakestoreapi.com/users/${id}`);
    
    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }
    
    const user = await res.json();
    
    return {
      props: {
        user,
        error: null
      },
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    return {
      props: {
        user: null,
        error: error.message
      },
    };
  }
}

export default function UserDetailPage({ user, error }) {
  if (error || !user) {
    return (
      <div style={{ 
        padding: '40px', 
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#dc2626' }}>Usuario no encontrado</h1>
        <p style={{ color: '#666', marginBottom: '20px' }}>
          {error || 'El usuario solicitado no existe.'}
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <Link href="/users">
            <button style={{
              padding: '12px 24px',
              backgroundColor: '#f3f4f6',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500'
            }}>
              ← Volver a usuarios
            </button>
          </Link>
          <Link href="/">
            <button style={{
              padding: '12px 24px',
              backgroundColor: '#e5e7eb',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500'
            }}>
              Ir al inicio
            </button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '40px',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <h1 style={{ fontSize: '32px', color: '#1f2937' }}>Detalle del Usuario</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link href="/users">
            <button style={{
              padding: '12px 24px',
              backgroundColor: '#f3f4f6',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500',
              transition: 'background-color 0.2s'
            }}>
              ← Volver a usuarios
            </button>
          </Link>
          <Link href="/">
            <button style={{
              padding: '12px 24px',
              backgroundColor: '#e5e7eb',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500',
              transition: 'background-color 0.2s'
            }}>
              Ir al inicio
            </button>
          </Link>
        </div>
      </div>
      
      <div style={{ 
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: 'white',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{ 
          backgroundColor: '#10b981',
          padding: '40px',
          textAlign: 'center',
          color: 'white'
        }}>
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            backgroundColor: 'white',
            color: '#10b981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '36px',
            fontWeight: 'bold',
            margin: '0 auto 20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
          }}>
            {user.name.firstname[0]}{user.name.lastname[0]}
          </div>
          <h2 style={{ fontSize: '32px', marginBottom: '8px' }}>
            {user.name.firstname} {user.name.lastname}
          </h2>
          <p style={{ fontSize: '18px', opacity: '0.9' }}>@{user.username}</p>
        </div>
        
        <div style={{ padding: '40px' }}>
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ 
              fontSize: '20px', 
              color: '#374151', 
              marginBottom: '16px',
              paddingBottom: '8px',
              borderBottom: '2px solid #f3f4f6'
            }}>
              Información de Contacto
            </h3>
            <div style={{ 
              backgroundColor: '#f9fafb', 
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
            }}>
              <p style={{ marginBottom: '12px', fontSize: '16px' }}>
                <strong style={{ display: 'inline-block', width: '100px', color: '#6b7280' }}>Email:</strong>
                <span>{user.email}</span>
              </p>
              <p style={{ marginBottom: '12px', fontSize: '16px' }}>
                <strong style={{ display: 'inline-block', width: '100px', color: '#6b7280' }}>Teléfono:</strong>
                <span>{user.phone}</span>
              </p>
            </div>
          </div>
          
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ 
              fontSize: '20px', 
              color: '#374151', 
              marginBottom: '16px',
              paddingBottom: '8px',
              borderBottom: '2px solid #f3f4f6'
            }}>
              Dirección
            </h3>
            <div style={{ 
              backgroundColor: '#f9fafb', 
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
            }}>
              <p style={{ marginBottom: '8px', fontSize: '16px' }}>
                <strong style={{ display: 'inline-block', width: '120px', color: '#6b7280' }}>Calle:</strong>
                {user.address.street}
              </p>
              <p style={{ marginBottom: '8px', fontSize: '16px' }}>
                <strong style={{ display: 'inline-block', width: '120px', color: '#6b7280' }}>Ciudad:</strong>
                {user.address.city}
              </p>
              <p style={{ marginBottom: '8px', fontSize: '16px' }}>
                <strong style={{ display: 'inline-block', width: '120px', color: '#6b7280' }}>Código Postal:</strong>
                {user.address.zipcode}
              </p>
              <p style={{ fontSize: '16px' }}>
                <strong style={{ display: 'inline-block', width: '120px', color: '#6b7280' }}>Coordenadas:</strong>
                {user.address.geolocation.lat}, {user.address.geolocation.long}
              </p>
            </div>
          </div>
          
          <div>
            <h3 style={{ 
              fontSize: '20px', 
              color: '#374151', 
              marginBottom: '16px',
              paddingBottom: '8px',
              borderBottom: '2px solid #f3f4f6'
            }}>
              Información Adicional
            </h3>
            <div style={{ 
              backgroundColor: '#f9fafb', 
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
            }}>
              <p style={{ marginBottom: '8px', fontSize: '16px' }}>
                <strong style={{ display: 'inline-block', width: '100px', color: '#6b7280' }}>ID:</strong>
                {user.id}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}