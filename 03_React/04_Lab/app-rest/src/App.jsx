
import { useEffect } from 'react';
import './App.css'
import { useCountries } from './hooks/useCountries';

const Loader = () => {
	return  <div className='spinner'>Cargando...</div>
}

function App() {

  const { countries, loading, error, setError, handleInputChange } = useCountries();

  useEffect(() => {
	if ( error ) {
		alert(error);
		setError(null);
	}
  }, [error, setError]);

  if ( loading ){
	return <Loader />
  }

  return (
    <div>
		<h1>Lista de Países</h1>
		<input
			type='text'
			placeholder='Ingres nombre de país a filtrar'
			name='country'
			onChange={handleInputChange} />

			{countries.length === 0 && !loading && (
				<p>No se encontraron países con ese nombre.</p>
			)}
		<ul>
			{countries.map( country => (
				<li key={country.cca3}>
				<img 
					src={country.flags.png}
					alt={`Bandera de ${country.name.common}`}
					style={{ width: '50px', marginRight: '10px' }} />
				<br/>
				<span>{country.name.common}</span> <br />
				Número de habitantes: <span>{country.population}</span>
				</li>
			))}
		</ul>
    </div>
  )
}

export default App
