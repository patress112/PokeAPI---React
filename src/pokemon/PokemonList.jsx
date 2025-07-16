import React, { useState, useEffect }  from "react";
import { apiDelete, apiGet, apiPost, apiPut } from "../utils/api";
import "bootstrap/dist/css/bootstrap.min.css";
import PokemonCard from "./PokemonCard";


function PokemonList() {

    // const [pokemons, setPokemons] = useState([]);
    const [data, setData] = useState( {pokemons: [], nextUrl:"", previousUrl:"" } );
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
    const [isLoading, setIsLoading] = useState(true);
    // Pridáme si stav, ktorý si bude pamätať aktuálne vybraného pokémona. Keďže prvý pokémon je Bulbasaur, po spustení appky nastavíme jeho ako defaultnú hodnotu stavu selectedPokemon
    const [selectedPokemon, setSelectedPokemon] = useState('bulbasaur');

    useEffect(() => {
        async function fetchPokemons() {
            // Pomocou settera nastavíme isLoading na true, lebo stránka sa musí prvýkrát načítať
            setIsLoading(true);
            // Do premennej data uložíme požiadavku / funkciu na PokéAPI
            const data = await apiGet(url);
            // Do stavu setData uložíme do poľa pokemons stav data a v ňom budú results z nášho PokéAPI. Kedže v premennej data je uložená požiadavka na API, tak results získame cez data.results
            // Do nextUrl zadáme hodnotu získanú podobne ako pri pokémonoch, len v API hodnotu ďalšej URL ukladá vlastnosť next. Čiže hodnotu nextURL získame cez data.next
            // Hodnotu previous získame podobne, cez vlastnosť previous a teda cez data.previous
            setData ({
                pokemons: data.results,
                nextUrl: data.next,
                previousUrl: data.previous,
            });
            // Nakoniec isLoading nastavíme na false - dáta sú už načítané
            setIsLoading(false);
            };

        fetchPokemons();
        // Na úplne poslednom riadku sme do nepovinnej závislosti pridali stav url. Tým sa funkcia automaticky zavolá vždy, keď sa zmení URL adresa stránky a stiahnu sa nove dáta
    }, [url]);

    function handleNavigationClick(url) {
    // Ak v url nie je žiadna hodnota, funkcia sa ukončí - toto sa aplikuje na začiatku / konci zoznamu, ak by sme chceli ísť dozadu alebo dopredu, čo nebude možné
    if (!url) return;
    // Inak cez setUrl nastavíme do url jej aktuálnu hodnotu z vlastnosti next / previous
    setUrl(url);
    }

    // Pridanie handleAddPokemon funkcie pre pridanie nového Pokémona 
    async function handleAddPokemon() {
        const newPokemon = {
            name: "Testachu",
            type: "Electric",
        };

        const response = await apiPost('https://jsonplaceholder.typicode.com/posts', newPokemon);

        alert("Server response: \n\n " + JSON.stringify(response, null, 2));
    }

    // Pridanie handleUpdatePokemon(id) funkcie pre update Pokémona
    async function handleUpdatePokemon(id) {
        const updatedData = {
            name: "Updatechu",
            type: "Electric",
        };
        
        const response = await apiPut(`https://jsonplaceholder.typicode.com/posts/${id}`, updatedData);
        alert(`Server response (PUT ${id}):\n\n` + JSON.stringify(response, null, 2));
    }

    // Pridanie handleDeletePokemon(id) pre vymazanie pokémona
    async function handleDeletePokemon(id) {
    await apiDelete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    alert(`Test Pokemon with ID ${id} has been deleted.`);
    }

    // Napokon vrátime ul zoznam
    /* 
    V ul elemente bude funkcia map zavolaná na stave pokemons.
    Tá prejde všetky prvky poľa (túto metódu používa každé pole)
    Ako parameter príjme hodnotu, s ktorou bude pracovať (objekt  pokémona)
    Elementu li pridáme atribút key a jeho hodnota bude pokemon.name - kedže chceme vypisovať mená pokémonov a v JSON vidíme, že meno pokémona je dostupné cez vlastnosť name
    Meno každého pokémona sa vypíše v ul zozname ako odrážka
    */
    return (
    <div>
        <div className="container text-center my-3">
            <button
                type="button"
                className="btn btn-primary me-1"
                onClick={() => handleNavigationClick(data.previousUrl)}>
                Previous
            </button>
            <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleNavigationClick(data.nextUrl)}>
                Next
            </button>
            <button
                type="button"
                className="btn btn-success ms-2"
                onClick={handleAddPokemon}
            >
            Add Pokemon - test
            </button>
        </div>
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    {isLoading ? (
                        <div className="text-center my-3">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <ul>
                            {data.pokemons.map((pokemon) => (
                                <li
                                    key={pokemon.name}
                                    onClick={() => setSelectedPokemon(pokemon.name)}
                                    style={{cursor: 'pointer'}}
                                    className="link-primary">
                                    {pokemon.name}
                                </li>
                            ))}
                        </ul>
                        )}
                </div>
                {selectedPokemon && (
                    <div className="col m-5 p-5" >
                        <PokemonCard pokemonName={selectedPokemon} />
                    </div>
                )}
            </div>
        </div>
    </div>
);

}

export default PokemonList;
