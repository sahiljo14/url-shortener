const Url = require("../models/Url")
const shortid = require("shortid")


// Create short URL
exports.createShortUrl = async (req, res) => {
  try {

    let { url } = req.body

    if (!url) {
      return res.status(400).json({ message: "URL is required" })
    }

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url
    }

    const shortId = shortid.generate()

    const newUrl = new Url({
      shortId,
      originalUrl: url
    })

    await newUrl.save()

    res.json({
      shortUrl: `${req.protocol}://${req.get("host")}/${shortId}`
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error creating short URL" })
  }
}


// Get all stored links
exports.getAllLinks = async (req, res) => {
  try {

    const urls = await Url.find().sort({ createdAt: -1 })

    res.json(urls)

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error fetching links" })
  }
}


// Redirect to original URL
exports.redirectToUrl = async (req, res) => {
  try {

    const shortId = req.params.id

    const urlRecord = await Url.findOne({ shortId })

    if (!urlRecord) {
      return res.status(404).send("URL not found")
    }

    urlRecord.clicks++
    await urlRecord.save()

    res.redirect(urlRecord.originalUrl)

  } catch (error) {
    console.error(error)
    res.status(500).send("Server error")
  }
}


// Delete URL
exports.deleteUrl = async (req, res) => {
  try {

    const shortId = req.params.id

    const deletedUrl = await Url.findOneAndDelete({ shortId })

    if (!deletedUrl) {
      return res.status(404).json({ message: "URL not found" })
    }

    res.json({ message: "URL deleted successfully" })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error deleting URL" })
  }
}