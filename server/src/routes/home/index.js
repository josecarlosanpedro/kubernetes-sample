const express = require('express')
const request = require('request')
const router = express.Router()
const {
    getHTML,
    addUser,
    getUsers,
    deleteUsers
} = require("./methods")


router.get('/api/users', async (req, res) => {
    const users = await getHTML("https://jsonplaceholder.typicode.com/users")
    res.writeHead(200, { "Content-Type": "application/json"})
        res.write(JSON.stringify({
            success: 1,
            users
        }))
        res.end()
});
router.post('/user', async (req, res) => {
    const result = await addUser(req.body)
    res.writeHead(201, { "Content-Type": "application/json"})
    res.write(JSON.stringify({
        success: 1,
        message: "User added"
    }))
    res.end()
});
router.get('/users', async (req, res) => {
    const { search } = req.query
    const result = await getUsers(search)
    res.writeHead(201, { "Content-Type": "application/json"})
    res.write(JSON.stringify({
        success: 1,
        users: result
    }))
    res.end()
});
router.put('/user/:id/delete', async (req, res) => {
    const result = await deleteUsers(req.params.id)
    res.writeHead(200, { "Content-Type": "application/json"})
    res.write(JSON.stringify({
        success: 1,
        message: "User successfully deleted"
    }))
});

module.exports = router


