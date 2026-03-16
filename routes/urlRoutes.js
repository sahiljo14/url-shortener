const express = require("express")
const router = express.Router()

const {
  createShortUrl,
  getAllLinks,
  redirectToUrl,
  deleteUrl
} = require("../controllers/urlController")

router.post("/shorten", createShortUrl)

router.get("/links", getAllLinks)

router.delete("/delete/:id", deleteUrl)

router.get("/:id", redirectToUrl)

module.exports = router