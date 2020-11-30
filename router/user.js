const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db= mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'express_vue_db'
});

router.use(express.json())

router.get('/api/v1/users', (req, res) => {
  db.query('SELECT * FROM users', (err, rows) => {
    if (err) throw err
    res.json(rows)
 })
})

router.post('/api/v1/users', (req, res) => {
  const name = req.body.name
  const profile = req.body.profile
  db.query(`INSERT INTO users (name,profile) VALUES ('${name}','${profile}')`, (err, row) => {
    if (!row) throw err;
    res.json(`${name}を登録しました`)
  })  
})

router.put('/api/v1/users/:id', (req, res) => {
  const userId = req.body.id
  const name = req.body.name
  const profile = req.body.profile
  db.query(`UPDATE users SET name = "${name}", profile = "${profile}" WHERE id = ${userId}`, (err, row) => {
    if (!row) throw err;
    res.json(`${name}の情報を更新しました`)
  })
})

router.delete("/api/v1/users/:id", (req, res) => {
  const userId = req.params.id.substr(1)
  db.query(`DELETE FROM users WHERE id = ${userId}`, (err, row) => {
    if (!row) throw err;
    res.json("削除しました")
  })
 })

module.exports = router

