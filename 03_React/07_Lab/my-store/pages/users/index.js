import Link from 'next/link';

export async function getServerSideProps() {
  try {
    const res = await fetch('https://fakestoreapi.com/users');
    
    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }
    
    const users = await res.json();
    
    return {
      props: {
        users,
        error: null
      },
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    return {
      props: {
        users: [],
        error: error.message
      },
    };
  }
}

export default function UsersPage({ users, error }) {
  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1200px',
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
        <div>
          <h1 style={{ fontSize: '32px', color: '#1f2937', marginBottom: '8px' }}>
            Listado de Usuarios
          </h1>
          <p style={{ color: '#6b7280' }}>
            {error ? `Error: ${error}` : `${users.length} usuarios encontrados`}
          </p>
        </div>
        <Link href="/">
          <button style={{
            padding: '12px 24px',
            backgroundColor: '#f3f4f6',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500',
            transition: 'background-color 0.2s'
          }}>
            ← Volver al inicio
          </button>
        </Link>
      </div>
      
      {error ? (
        <div style={{ 
          padding: '40px', 
          textAlign: 'center',
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          color: '#dc2626'
        }}>
          <p>Error al cargar los usuarios: {error}</p>
          <p>Por favor, intenta nuevamente más tarde.</p>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '24px' 
        }}>
          {users.map((user) => (
            <Link 
              key={user.id} 
              href={`/users/${user.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div style={{
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '24px',
                cursor: 'pointer',
                backgroundColor: 'white',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '16px', 
                  marginBottom: '20px' 
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: '#10b981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '22px',
                    fontWeight: 'bold',
                    flexShrink: 0
                  }}>
                    {user.name.firstname[0]}{user.name.lastname[0]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ 
                      fontSize: '18px', 
                      marginBottom: '6px',
                      color: '#1f2937'
                    }}>
                      {user.name.firstname} {user.name.lastname}
                    </h3>
                    <p style={{ 
                      fontSize: '14px', 
                      color: '#6b7280',
                      marginBottom: '4px'
                    }}>
                      @{user.username}
                    </p>
                    <p style={{ 
                      fontSize: '14px', 
                      color: '#6b7280',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      📧 {user.email}
                    </p>
                  </div>
                </div>
                
                <div style={{ 
                  marginTop: 'auto',
                  paddingTop: '16px',
                  borderTop: '1px solid #f3f4f6'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    fontSize: '14px',
                    color: '#6b7280'
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      📱 {user.phone}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      🏠 {user.address.city}
                    </span>
                  </div>
                  <div style={{ 
                    marginTop: '12px',
                    textAlign: 'right'
                  }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '6px 12px',
                      backgroundColor: '#f0fdf4',
                      color: '#10b981',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      Ver detalles →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}