import type { Actress } from "./type";

function isActress(data: unknown): data is Actress {
    if (
        data &&
        typeof data === "object" &&
        "id" in data &&
        typeof data.id === "number" &&
        "name" in data &&
        typeof data.name === "string" &&
        "birth_year" in data &&
        typeof data.birth_year === "number" &&
        (!('death_year' in data) || typeof data.death_year === 'number') &&
        "biography" in data &&
        typeof data.biography === "string" &&
        "image" in data &&
        typeof data.image === "string" &&
        "most_famous_movies" in data &&
        data.most_famous_movies instanceof Array &&
        data.most_famous_movies.length === 3 &&
        data.most_famous_movies.every((m) => typeof m === "string") &&
        "awards" in data &&
        typeof data.awards === "string" &&
        "nationality" in data &&
        typeof data.nationality === "string"
    ) {
        return true
    }

    return false
}

async function getActress(id: number): Promise<Actress | null> {
    try {
        const response = await fetch(`http://localhost:3333/actresses/${id}`)

        if (!response.ok) {
            throw new Error(`Errore HTTP: ${response.status}, ${response.statusText}`)
        }
        const data = await response.json()

        if (!isActress(data)) {
            console.error("Formato di dati non valido:", data);
            throw new Error(`Formato di dati non valido`)
        }

        return data

    } catch (error) {
        if (error instanceof Error) {
            console.error("Errore durante il recupero del dato", error);
        }
        return null;
    }

}


(async () => {

    const resolve = await getActress(2)

    console.log(resolve)

})()


/*Crea una funzione getAllActresses che chiama:

GET /actresses
La funzione deve restituire un array di oggetti Actress.

Può essere anche un array vuoto.*/

async function getAllActresses(): Promise<Actress[]> {
    try {
        const response = await fetch(`http://localhost:3333/actresses/`)

        if (!response.ok) {
            throw new Error(`Errore HTTP: ${response.status}, ${response.statusText}`)
        }
        const data: unknown = await response.json()

        if (!(data instanceof Array)) {
            console.error("Formato di dati non valido:", data);
            throw new Error(`Formato di dati non valido`)
        }

        const attriciValid: Actress[] = data.filter((a) => isActress(a))
        return attriciValid

    } catch (error) {
        if (error instanceof Error) {
            console.error("Errore durante il recupero del dato", error);
        }
        return [];
    }

}

(async () => {

    const listaArray = await getAllActresses()

    console.log(listaArray)

})()


/*📌 Milestone 5
Crea una funzione getActresses che riceve un array di numeri (gli id delle attrici).

Per ogni id nell’array, usa la funzione getActress che hai creato nella Milestone 3 per recuperare l’attrice corrispondente.

L'obiettivo è ottenere una lista di risultati in parallelo, quindi dovrai usare Promise.all.

La funzione deve restituire un array contenente elementi di tipo Actress oppure null (se l’attrice non è stata trovata).*/

async function getActresses(array: number[]) {
    try {

        const response = array.map((a) => getActress(a))

        const resolve = await Promise.all(response)

        return resolve

    } catch (error) {
        if (error instanceof Error) {
            console.error("Errore durante il recupero del dato", error);
        }
        return [];
    }
}


(async () => {
    const result = await getActresses([1, 2, 3])
    console.log(result)
})()
