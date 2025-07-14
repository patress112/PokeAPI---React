// apiGet je asynchrónna funkcia - nechceme, aby sa appka zasekla pri čakaní na odpoveď
export async function apiGet(url) {
    // Do response konštanty uložíme dáta, ktoré pomocou funkcie fetch() stiahneme z danej URL
    const response = await fetch(url);
    // Nakoniec tieto prijaté dáta uložené v premennej response naparsujeme do JSON (cez funkciu .json - čiže response.json) čím ich získame ako javascriptový objekt a ten uložíme do konštanty data
    const data = await response.json();
    // Napokon JSON objekt, resp premennú data, v ktorej je uložený, vrátime
    return data;
}