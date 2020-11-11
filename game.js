//==============GAME FUNCTION================

const client = require ('./database')

module.exports = {
    getAllGame : async function getAllGame(){
        const result = await client.export().query('SELECT * FROM public.game')
        return result
    },
    
    getGameThumbnail : async function getGameThumbnail(id){
        const result = await client.export().query('SELECT thumbnail_game FROM public.game WHERE id_game = $1' [id])
        return result
    },
    
    insertGame : async function insertGame(judul_game, genre, publisher, platform, release_date, price, thumbnail_game, description, system_requirement){
        client.export().query(`INSERT INTO public.game(judul_game, genre, publisher,platform, release_date, price, thumbnail_game, description, system_requirement)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [judul_game, genre, publisher, platform, release_date, price, thumbnail_game, description, system_requirement])
    },
    
    deleteGame : async function deleteGame(id_game){
        client.export().query('DELETE FROM public.game WHERE id_game = $1', [id_game])
    },
    
    updateGame : async function updateGame(id, judul_game, genre, publisher, platform, release_date, price, thumbnail_game, description, system_requirement){
        client.export().query(`UPDATE public.game SET judul_game = $2, genre = $3, publisher = $4, platform = $5, release_date = $6, price = $7, thumbnail_game = $8, description = $9, system_requirement = $10
                        WHERE id_game = $1`, [id, judul_game, genre, publisher, platform, release_date, price, thumbnail_game, description, system_requirement])
    },
    
    updateGameThumbnail : async function updateGameThumbnail(id, thumbnail_game){
        console.log(id)
        client.export().query(`UPDATE public.game SET thumbnail_game = $2
                        WHERE id_game = $1`, [id, thumbnail_game])
    },
    
    getAllgamesASC : async function getAllgamesASC(){
        const result = await client.export().query('SELECT * FROM public.game ORDER BY release_date ASC')
        return result
    },
    
    getFiveGamesASC : async function getFiveGamesASC(){
        const result = await client.export().query('SELECT * FROM public.game ORDER BY release_date ASC limit 5')
        return result
    },
    
    getGamesByGenre : async function getGamesByGenre(genre){
        const result = await client.export().query('SELECT * FROM public.game WHERE genre = $1', [genre])
        return result
    },
    
    getGamesByPublisher : async function getGamesByPublisher(publisher){
        const result = await client.export().query('SELECT * FROM public.game WHERE publisher = $1', [publisher])
        return result
    },
    
    getGamesBySearch : async function getGamesBySearch(judul_game){
            const result = await client.export().query('SELECT * FROM public.game WHERE judul_game LIKE $1', ['%'+judul_game+'%'])
            return result
    },

    getGamesByPlatform : async function getGamesByPlatform(platform){
        const result = await client.export().query('SELECT * FROM public.game WHERE platform LIKE $1', [platform])
        return result
    }
}

