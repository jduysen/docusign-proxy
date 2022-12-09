const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const fs = require('fs')
const https = require('https')
const bodyParser = require('body-parser')
const axios = require('axios')
const { json } = require('body-parser')

const PORT = process.env.PORT || 8000

app.use(cors())

app.use(bodyParser.json({ limit: "50mb", extended: true, parameterLimit: 50000 }))

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.post('/api', async (req, res) => {
    console.log(req.headers)

    await axios.post('https://demo.docusign.net/restapi/v2.1/accounts/3286cb04-bdda-49d9-b594-78c90a428052/envelopes',
        req.body,
        {
            headers: { 'Authorization': req.headers.authorization }
        }
    ).then(async (response) => {
        let data = await response
        // console.log(response)
        res.send(JSON.stringify(data.data))
    }).catch(e => {
        console.log(e)
    })
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))