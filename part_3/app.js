const pokeAPIBaseURL = "https://pokeapi.co/api/v2/pokemon?limit=1000";

$(document).ready(function() {
  // Event listener for the button
  $("#get-pokemon-btn").on("click", function() {
    $("#pokemon-container").empty(); // Clear previous results

    $.getJSON(pokeAPIBaseURL).then(data => {
      const pokemonList = data.results;

      // Pick three random Pokémon
      const randomPokemon = [];
      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * pokemonList.length);
        randomPokemon.push(pokemonList[randomIndex]);
      }

      // Make requests to the URLs of the selected Pokémon
      const requests = randomPokemon.map(pokemon => $.getJSON(pokemon.url));

      Promise.all(requests).then(pokemonData => {
        // For each Pokémon, make a request to its species URL and display the data
        pokemonData.forEach(pokemon => {
          const speciesURL = pokemon.species.url;
          $.getJSON(speciesURL).then(speciesData => {
            const flavorTextEntry = speciesData.flavor_text_entries.find(
              entry => entry.language.name === "en"
            );
            const description = flavorTextEntry ? flavorTextEntry.flavor_text : "No description available";

            // Create the Pokémon card
            const pokemonCard = `
              <div class="pokemon-card">
                <h2>${pokemon.name}</h2>
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <p>${description}</p>
              </div>
            `;
            $("#pokemon-container").append(pokemonCard);
          });
        });
      });
    });
  });
});
