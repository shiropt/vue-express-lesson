const express = require('express')
const app = express()
const router = require("./router/user")

app.use("/",router)

//3000番ポートでローカルサーバーにアクセス
app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
})