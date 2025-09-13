document.addEventListener("DOMContentLoaded", function() {
    
    const baseUrl = 'https://pokeapi.co/api/v2/';
    let limit = 10;
    let offset = 0;
    let totalCount = 0;
    
    const searchForm = document.querySelector('#search-form');
    const searchInput = document.querySelector('#search-input');
    const pokemonList = document.querySelector('#pokemon-list');
    const prevBtn = document.querySelector('#prev-btn');
    const nextBtn = document.querySelector('#next-btn');
    const currentOffsetSpan = document.querySelector('#current-offset');
    const totalCountSpan = document.querySelector('#total-count');
    const pokemonDetailContainer = document.querySelector('#pokemon-detail-container');
    const closeDetailBtn = document.querySelector('#close-detail');
    
    searchForm.addEventListener('submit', handleSearch);
    prevBtn.addEventListener('click', goToPreviousPage);
    nextBtn.addEventListener('click', goToNextPage);
    closeDetailBtn.addEventListener('click', closeDetail);
    
    init();
    
    function init() {
        fetchPokemonList();
    }
    
    async function handleSearch(e) {
        e.preventDefault();
        const searchValue = searchInput.value.trim();
        
        if (!searchValue) {
            alert('Por favor ingresa un nombre o ID de Pokémon');
            return;
        }
        
        try {
            const pokemon = await fetchPokemonDetail(searchValue.toLowerCase());
            displayPokemonDetail(pokemon);
        } catch (error) {
            alert('Pokémon no encontrado. Intenta con otro nombre o ID.');
            console.error('Error en búsqueda:', error);
        }
    }    
    
    async function fetchPokemonList() {
        try {
            pokemonList.innerHTML = '<li class="loading">Cargando Pokémon...</li>';
            
            const response = await fetch(`${baseUrl}pokemon?limit=${limit}&offset=${offset}`);
            
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            
            const data = await response.json();
            totalCount = data.count;
                        
            const pokemonDetails = await Promise.all(
                data.results.map(pokemon => fetchPokemonDetailByUrl(pokemon.url))
            );
            
            displayPokemonList(pokemonDetails);
            updatePagination();
            
        } catch (error) {
            pokemonList.innerHTML = '<li class="error">Error al cargar Pokémon. Intentalo de nuevo.</li>';
            console.error('Error fetching Pokémon list:', error);
        }
    }    
    
    async function fetchPokemonDetailByUrl(url) {
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error fetching Pokémon detail:', error);
            return null;
        }
    }    
  
    async function fetchPokemonDetail(identifier) {
        try {
            const response = await fetch(`${baseUrl}pokemon/${identifier}`);
            
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error fetching Pokémon detail:', error);
            throw error;
        }
    }
    
    function displayPokemonList(pokemonArray) {
        pokemonList.innerHTML = '';
        
        pokemonArray.filter(pokemon => pokemon !== null).forEach(pokemon => {
            const li = document.createElement('li');
            li.className = 'pokemon-item';
            li.innerHTML = `
                <img class="pokemon-image" src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <div class="pokemon-name">${pokemon.name}</div>
                <div class="pokemon-id">#${pokemon.id.toString().padStart(3, '0')}</div>
            `;
            
            li.addEventListener('click', () => {
                displayPokemonDetail(pokemon);
            });
            
            pokemonList.appendChild(li);
        });
    }
    
    function displayPokemonDetail(pokemon) {
        document.getElementById('detail-name').textContent = pokemon.name;
        document.getElementById('detail-id').textContent = `#${pokemon.id.toString().padStart(3, '0')}`;
        document.getElementById('detail-image').src = pokemon.sprites.front_default;
        document.getElementById('detail-image').alt = pokemon.name;
        
        const types = pokemon.types.map(type => type.type.name).join(', ');
        document.getElementById('detail-types').textContent = types;
        
        const abilities = pokemon.abilities.slice(0, 3).map(ability => ability.ability.name).join(', ');
        document.getElementById('detail-abilities').textContent = abilities;
        
        pokemonDetailContainer.style.display = 'flex';
    }
    
    function closeDetail() {
        pokemonDetailContainer.style.display = 'none';
    }
    
    function goToPreviousPage() {
        if (offset >= limit) {
            offset -= limit;
            fetchPokemonList();
        }
    }
    
    function goToNextPage() {
        if (offset + limit < totalCount) {
            offset += limit;
            fetchPokemonList();
        }
    }
    
    function updatePagination() {
        currentOffsetSpan.textContent = Math.floor(offset / limit) + 1;
        totalCountSpan.textContent = Math.ceil(totalCount / limit);
        
        prevBtn.disabled = offset === 0;
        nextBtn.disabled = offset + limit >= totalCount;
    }
});