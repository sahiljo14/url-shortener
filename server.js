require("dotenv").config()

const express = require("express")
const connectDB = require("./config/db")

const urlRoutes = require("./routes/urlRoutes")

const app = express()

const PORT = process.env.PORT || 3000

// connect database
connectDB()

// middleware
app.use(express.json())
app.use(express.static("public"))

// routes
app.use("/", urlRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})