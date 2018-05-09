const Client = require('../../database/client')

const pollValidate = require('./explore-validation')

const env = {
    uid: process.env.uid,
    users: process.env.userTable
};




module.exports = {
    getExploreQueries : (res)=> {
        Client.query(`
                SELECT question, subject, author_username, created_at
                FROM polls
                ORDER BY random()
                LIMIT 10;
                `,
                function(err, success) {
                    if (success){
                        if (success.rows[0]){
                        console.log('this is the success', success.rows)
                        res.status(200).send(success.rows)
                        }
                        if (success.rows==[]){
                        res.status(200).send(success.rows)
                        }
                        console.log('this is the success', success)
                    }
                    if (err) {
                        console.log('err.name', err)
                        res.status(500).send({error: err})
                    }
                })
        }
}