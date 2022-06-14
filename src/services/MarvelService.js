import apiKey from './_apiKey'

class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    _apiKey = apiKey()

    getData = async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }
        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getData(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`)
        return res.data.results.map(this._transformCharacterData)
    }

    getCharacter = async (id) => {
        const res = await this.getData(`${this._apiBase}characters/${id}?${this._apiKey}`)
        return this._transformCharacterData(res.data.results[0])
    }

    _transformCharacterData = (character) => {
        return {
            name: character.name,
            description: character.description,
            thumbnail: character.thumbnail.path + '.' + character.thumbnail.extension,
            detail: character.urls[0].url,
            wiki: character.urls[1].url,
            id: character.id,
            comics: character.comics.items
        }
    }
}

export default MarvelService;