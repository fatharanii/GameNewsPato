const client = require ('./database')

//========READ LATER FUNCTION===================

module.exports = {
    getAllReadLater : async function getAllReadLater(){
        const result = await client.export().query('SELECT * FROM public.read_later')
        return result
    },
    
    addReadLater : async function addReadLater(id_user, id_berita){
        client.export().query(`INSERT INTO public.read_later(id_user, id_berita)
        VALUES ($1, $2)`, [id_user, id_berita])
    },
    
    deleteBookmark : async function deleteBookmark(id){
        client.export().query('DELETE FROM public.read_later WHERE "id_readLater" = $1', [id])
    },
    
    getUserBookmark : async function getUserBookmark(id){
        const result = await client.export().query('SELECT * FROM public.read_later WHERE id_user = $1', [id])
        return result
    }
}