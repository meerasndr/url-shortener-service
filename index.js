const express = require('express')
const app = express();
const validUrl = require('valid-url')
const shortid = require('shortid')
const config = require('config')
app.use(express.json({ extended:false }))

let url = {}

app.post('/', (req, res) => {
    const { longUrl } = req.body
    const baseUrl = config.get('baseUrl')
    const randomCode = shortid.generate()

    url.longUrl = longUrl
    url.baseUrl = baseUrl
    
    if(validUrl.isUri(longUrl)) {
        const shortUrl = baseUrl + '/' + randomCode
        url.shortUrl = shortUrl
        res.send(shortUrl)
    }
    else{
        res.status(401).json('Invalid Long URL')
    }
})

app.get('/:randomcode', async(req, res) => {
    return res.redirect(url.longUrl)

})


const PORT = 5001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))