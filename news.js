const client = require ('./database')

//==================NEWS FUNCTION======================

module.exports = {
    getAllnews : async function getAllnews(){
        const result = await client.query('SELECT * FROM public.news_item')
        return result
    },
    
    getNewsByJudul : async function getNewsByJudul(judul_berita){
        const result = await client.query('SELECT * FROM public.news_item WHERE judul_berita LIKE $1 ', ['%'+judul_berita+'%'])
        return result
    },
    
    getNewsByKategori : async function getNewsByKategori(kategori){
        const result = await client.query('SELECT * FROM public.news_item WHERE kategori= $1',[kategori])
        return result
    },
    
    getAllNewsASC : async function getAllNewsASC(){
        const result = await client.query('SELECT * FROM public.news_item ORDER BY publish_date ASC')
        return result
    },
    
    getAllNew : async function getAllNew(){
        const result = await client.query('SELECT * FROM public.news_item ORDER BY publish_date ASC limit 1')
        return result
    },
    
    insertNews : async function insertNews(id_game,judul_berita,kategori,isi,thumbnail,create_date,lastupdate_date,publish_date){
        client.query(`INSERT INTO public.news_item(id_game,judul_berita,kategori,isi,thumbnail,create_date,lastupdate_date,publish_date)
        VALUES($1,$2,$3,$4,$5,$6,$7,$8)`,[id_game,judul_berita,kategori,isi,thumbnail,create_date,lastupdate_date,publish_date])
    },
    
    deleteNews : async function deleteNews(id_berita){
        client.query('DELETE FROM public.news_item WHERE id_berita = $1', [id_berita])
    },
    
    updateNews : async function updateNews(id,id_game,judul_berita,kategori,isi,thumbnail,create_date,lastupdate_date,publish_date){
        client.query(`UPDATE public.news_item SET id_game = $2, judul_berita = $3, kategori = $4, isi =$5, thumbnail=$6, create_date=$7,
        lastupdate_date =$8, publish_date=$9 WHERE id_berita = $1`,[id,id_game,judul_berita,kategori,isi,thumbnail,create_date,lastupdate_date,publish_date])
    }
}