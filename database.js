const {Client} = require ('pg')
//const port = 8000
const connection = "postgressql://postgres:fatharani@localhost:5432/GameNews"

const client = new Client({
    connectionString: connection
    })

client.connect()
    .then(res => console.log("Connected successfully..."))
    .catch(err => console.log("Connection failed..."));

module.exports = {
    export : function(){
        return client
    }
}