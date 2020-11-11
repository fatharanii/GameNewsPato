 const cors = require ('cors')
 const express = require ('express')
// const {Client} = require ('pg')

 const app = express()
 const port = 8100

const client = require ('./database')
const user = require ('./user')
const read_later = require ('./read_later')
const games = require ('./game')
const news = require ('./news')

app.use(express.json())
app.use(cors())
app.listen(port, ()=>{
    console.log (`app listening at http://localhost:${port}`)
})

//===============USER BACKEND================
app.get('/api/users/', async (req,res)=>{
    const users = await user.getAllUser()
    res.send(await users.rows)
})

app.post('/api/users/', async (req, res)=>{
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const isAdmin = req.body.is_admin

    await user.insertUser(username, email, password, user.string_to_boolean(isAdmin))
    res.status(201).send
})

app.delete ('/api/users/:id', async (req, res)=>{
    await user.deleteUser(req.params.id)
    res.status(200).send()
})

app.put('/api/users/:id', async (req, res)=>{
    const id = req.params.id
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const isAdmin = req.body.is_admin

    await user.updateUser(id, username, email, password, user.string_to_boolean(isAdmin))
    res.status(204).send
})



//=============READ LATER BACKEND===========
app.get('/api/read_later/', async (req,res)=>{
    const bookmark = await read_later.getAllReadLater()
    res.send(await bookmark.rows)
})

app.post('/api/read_later/', async (req, res)=>{
    const id_user = req.body.id_user
    const id_berita = req.body.id_berita

    await read_later.addReadLater(id_user, id_berita)
    res.status(201).send
})

app.delete ('/api/read_later/:id', async (req, res)=>{
    await read_later.deleteBookmark(req.params.id)
    res.status(200).send()
})

app.get('/api/read_later/my_bookmark/:id', async (req,res)=>{
    const bookmark = await read_later.getUserBookmark(req.params.genre)
    res.send(await bookmark.rows)
})

//===============GAME BACKEND================
app.get('/api/game/', async (req,res)=>{
    const game = await games.getAllGame()
    res.send(await game.rows)
})

app.get('/api/game_allthumbnail/:id', async (req,res)=>{
    const game = await games.getGameThumbnail(req.params.id)
    res.setHeader('content-type', 'image/jpg')
    res.send(await game.rows[0].thumbnail_game)
})

app.put('/api/game_save/:id', async (req,res)=>{
    const id = req.params.id
    var bufs = [];
    req.on('data', function(d){ bufs.push(d); });
    req.on('end', function(){
    var data = Buffer.concat(bufs);
    games.updateGameThumbnail(id, data)
    });
})

app.post('/api/game/', async (req, res)=>{
    const judul_game = req.body.judul_game
    const genre = req.body.genre
    const publisher = req.body.publisher
    const platform = req.body.platform
    const release_date = req.body.release_date
    const price = req.body.price
    const thumbnail_game = req.body.thumbnail_game
    const description = req.body.description
    const system_requirement = req.body.system_requirement

    await games.insertGame(judul_game, genre, publisher, platform, release_date, price, thumbnail_game, description, system_requirement)
    res.status(201).send
})

app.delete('/api/game/:id', async (req, res)=>{
    await games.deleteGame(req.params.id)
    res.status(200).send()
})

app.put('/api/game/:id', async (req, res)=>{
    const id = req.params.id
    const judul_game = req.body.judul_game
    const genre = req.body.genre
    const publisher = req.body.publisher
    const platform = req.body.platform
    const release_date = req.body.release_date
    const price = req.body.price
    const thumbnail_game = req.body.thumbnail_game
    const description = req.body.description
    const system_requirement = req.body.system_requirement

    await games.updateGame(id, judul_game, genre, publisher, platform, release_date, price, thumbnail_game, description, system_requirement)
    res.status(204).send
})

app.put('/api/game_thumbnail/:id', async (req, res)=>{
    const id = req.params.id
    const thumbnail_game = req.body
    console.log("kepanggil")
    await games.updateGameThumbnail(id, thumbnail_game)
    res.status(204).send
})

app.get('/api/gamesASC', async (req,res)=>{
    const games = await games.getAllgamesASC()
    res.send(await games.rows)
})

app.get('/api/home/NewGame', async (req,res)=>{
    const games = await games.getFiveGamesASC()
    res.send(await games.rows)
})

app.get('/api/games/search/:judul_game/', async (req,res)=>{
    const games = await games.getGamesBySearch(req.params.judul_game)
    res.send(await games.rows)
})

app.get('/api/games/genre/:genre/', async (req,res)=>{
    const games = await games.getGamesByGenre(req.params.genre)
    res.send(await games.rows)
})

app.get('/api/games/publisher/:publisher/', async (req,res)=>{
    const games = await games.getGamesByPublisher(req.params.publisher)
    res.send(await games.rows)
})

app.get('/api/games/platform/:platform/', async (req,res)=>{
    const games = await games.getGamesByPlatform(req.params.publisher)
    res.send(await games.rows)
})


//=====================NEWS BACKEND===============
//Mendapatkan semua berita
app.get('/api/news', async (req,res)=>{
    const news = await getAllnews()
    res.send(await news.rows)
    })
    
    //Create berita
    app.post('/api/news/', async (req,res)=>{
        const id_game = req.body.id_game
        const judul_berita = req.body.judul_berita
        const kategori =req.body.kategori
        const isi = req.body.isi
        const thumbnail =req.body.thumbnail
        const create_date=req.body.create_date
        const lastupdate_date=req.body.lastupdate_date
        const publish_date = req.body.publish_date
    
        await insertNews(id_game,judul_berita,kategori,isi,thumbnail,create_date,lastupdate_date,publish_date)
        res.status(201).send
    })
    
    //Delete berita berdasarkan Id
    app.delete ('/api/news/:id', async (req, res)=>{
        await deleteNews(req.params.id)
        res.status(200).send()
    })
    
    //Update berita berdasarkan Id
    app.put('/api/news/:id', async (req,res)=>{
        const id = req.params.id
        const id_game = req.body.id_game
        const judul_berita = req.body.judul_berita
        const kategori =req.body.kategori
        const isi = req.body.isi
        const thumbnail =req.body.thumbnail
        const create_date=req.body.create_date
        const lastupdate_date=req.body.lastupdate_date
        const publish_date = req.body.publish_date
    
        await updateNews(id,id_game,judul_berita,kategori,isi,thumbnail,create_date,lastupdate_date,publish_date)
        res.status(204).send
    })
    
    //GET berita bedasarkan judul (tapi belum sesuai keiinginan)
    app.get('/api/news/:judul_berita', async(req,res)=>{
        const news = await getNewsByJudul(req.params.judul_berita)
        res.send(await news.rows)
    })
    
    //GET berita berdasarkan kategori
    app.get('/api/news/kategori/:kategori', async(req,res)=>{
        const news = await getNewsByKategori(req.params.kategori)
        res.send(await news.rows)
    })
    
    //GET berita berdasarkan publish_date secara Ascending
    app.get('/api/newsASC', async(req,res)=>{
        const news = await getAllNewsASC()
        res.send(await news.rows)
    })
    
    //GET berita terbaru berdasarkan hasil sort publish_date
    app.get('/api/home', async(req,res)=>{
        const news = await getAllNew()
        res.send(await news.rows)
    })
    

//==================NEWS FUNCTION======================

    async function getAllnews(){
        const result = await client.query('SELECT * FROM public.news_item')
        return result
    }
    
    async function getNewsByJudul(judul_berita){
        const result = await client.query('SELECT * FROM public.news_item WHERE judul_berita LIKE $1 ', ['%'+judul_berita+'%'])
        return result
    }
    
    async function getNewsByKategori(kategori){
        const result = await client.query('SELECT * FROM public.news_item WHERE kategori= $1',[kategori])
        return result
    }
    
    async function getAllNewsASC(){
        const result = await client.query('SELECT * FROM public.news_item ORDER BY publish_date ASC')
        return result
    }
    
    async function getAllNew(){
        const result = await client.query('SELECT * FROM public.news_item ORDER BY publish_date ASC limit 1')
        return result
    }
    
    async function insertNews(id_game,judul_berita,kategori,isi,thumbnail,create_date,lastupdate_date,publish_date){
        client.query(`INSERT INTO public.news_item(id_game,judul_berita,kategori,isi,thumbnail,create_date,lastupdate_date,publish_date)
        VALUES($1,$2,$3,$4,$5,$6,$7,$8)`,[id_game,judul_berita,kategori,isi,thumbnail,create_date,lastupdate_date,publish_date])
    }
    
    async function deleteNews(id_berita){
        client.query('DELETE FROM public.news_item WHERE id_berita = $1', [id_berita])
    }
    
    async function updateNews(id,id_game,judul_berita,kategori,isi,thumbnail,create_date,lastupdate_date,publish_date){
        client.query(`UPDATE public.news_item SET id_game = $2, judul_berita = $3, kategori = $4, isi =$5, thumbnail=$6, create_date=$7,
        lastupdate_date =$8, publish_date=$9 WHERE id_berita = $1`,[id,id_game,judul_berita,kategori,isi,thumbnail,create_date,lastupdate_date,publish_date])
    }
    
    