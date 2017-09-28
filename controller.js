module.exports = {
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
    }
}