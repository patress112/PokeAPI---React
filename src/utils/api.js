// apiGet je asynchrónna funkcia - nechceme, aby sa appka zasekla pri čakaní na odpoveď
export async function apiGet(url) {
    // Do response konštanty uložíme dáta, ktoré pomocou funkcie fetch() stiahneme z danej URL
    const response = await fetch(url);
    // Nakoniec tieto prijaté dáta uložené v premennej response naparsujeme do JSON (cez funkciu .json - čiže response.json) čím ich získame ako javascriptový objekt a ten uložíme do konštanty data
    const data = await response.json();
    // Napokon JSON objekt, resp premennú data, v ktorej je uložený, vrátime
    return data;
}

export async function apiPost(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'}, 
        body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
}

export async function apiPut(url, data) {
    const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
}

export async function apiDelete(url) {
    await fetch(url, {
        method: 'DELETE',
    });
}