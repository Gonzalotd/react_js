document.addEventListener("DOMContentLoaded", function() {
    const baseUrl = 'https://pokeapi.co/api/v2/';
    const pokemonId = localStorage.getItem('selectedPokemonId');
    const pokemonName = localStorage.getItem('selectedPokemonName');

    if (pokemonId) {
        fetchPokemonDetail(pokemonId);
    } else if (pokemonName) {
        fetchPokemonDetail(pokemonName);
    } else {
        document.body.innerHTML = '<div class="error">Debe de seleccionar un Pokémon. <a href="index.html">Volver al inicio</a></div>';
    }

    async function fetchPokemonDetail(identifier) {
        try {
            const response = await fetch(`${baseUrl}pokemon/${identifier}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            displayPokemonDetails(data);
            
        } catch (error) {
            document.body.innerHTML = `<div class="error">Error al cargar el Pokémon: ${error.message}. <a href="index.html">Volver al inicio</a></div>`;
            console.error("Error fetching Pokémon details:", error);
        }
    }

    function displayPokemonDetails(pokemon) {
        document.querySelector('.datos__id').textContent = `#${pokemon.id.toString().padStart(3, '0')}`;
        document.querySelector('.datos__name').textContent = pokemon.name;
        document.querySelector('.datos__image').src = pokemon.sprites.front_default;
        document.querySelector('.datos__image').alt = pokemon.name;
        
        const typesElement = document.querySelector('.datos__types');
        if (typesElement) {
            typesElement.textContent = pokemon.types.map(type => type.type.name).join(', ');
        }
        
        const abilitiesElement = document.querySelector('.datos__abilities');
        if (abilitiesElement) {
            abilitiesElement.textContent = pokemon.abilities.map(ability => ability.ability.name).join(', ');
        }
    }
});