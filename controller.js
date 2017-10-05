module.exports = {
    createUser: (req, res) => {
        var db = req.app.get('db');
        var user = [
            req.body.first_name,
            req.body.last_name,
            req.body.email,
            req.body.year_born
        ]
        db.create_user(user)
            .then(response =>{
                res.json(response)
                console.log(response, 'create worked')
            })
    },
    getAllUsers: (req, res) => {
        const db = req.app.get('db')
        db.get_all_users()
            .then(user => res.status(200).send(user))
            .catch(() => {
                res.status(500).send()
            })
    },
    getUser: (req, res) => {
        const db = req.app.get('db');
        const { params } = req
        db.get_user_id([params.id])
            .then(user => res.status(200).send(user))
            .catch(() => res.status(500).send())
    },
    deleteUser: (req, res) => {
        const db = req.app.get('db');
        const { params } = req
        db.delete_user([params.id])
        .then(user => res.status(200).send(user))
            .catch(() => res.status(500).send())
            console.log('bye bye')
        }
    }