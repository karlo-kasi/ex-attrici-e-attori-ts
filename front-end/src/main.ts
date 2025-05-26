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
        // Restituisci null in caso di errore
        return null;
    }

}


(async () => {

    const resolve = await getActress(2)

    console.log(resolve)

})()