//==============USER FUNCTION================
const client = require ('./database')

module.exports = {
    getAllUser : async function getAllUser(){
        const result = await client.export().query('SELECT * FROM public.user')
        return result
    },
    insertUser : async function insertUser(username, email, password, isAdmin){
        client.export().query(`INSERT INTO public.user(username, email, password, is_admin)
        VALUES ($1, $2, $3, $4)`, [username, email, password, isAdmin])
    },
    deleteUser : async function deleteUser(id_user){
        client.export().query('DELETE FROM public.user WHERE id_user = $1', [id_user])
    },
    updateUser : async function updateUser(id, username, email, password, isAdmin){
        client.export().query(`UPDATE public.user SET username = $2, email = $3, password = $4, is_admin = $5
                        WHERE id_user = $1`, [id, username, email, password, isAdmin])
    },
    string_to_boolean : function string_to_boolean (isAdmin){
        if (isAdmin == "true") {
            return true
        }
        return false
    }
}