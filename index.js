const express = require("express")
const cors = require("cors")
require("dotenv").config()
require("./models")

const app = express()
const port = process.env.PORT
const userRoutes = require("./routes/user")

app.use(express.json())
app.use(cors())
app.use(express.static("public"))

app.use("/user", userRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
