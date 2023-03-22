import express from 'express'

// Maak een nieuwe express app
const server = express()

// Stel de public map in
server.use(express.static('public'))

// Stel de view engine in
server.set('view engine', 'ejs')
server.set('views', './views')

// Stel afhandeling van formulieren in
server.use(express.json())
server.use(express.urlencoded({extended: true}))

// Maak een route voor de index
server.get('/', async function (req, res) {

    const baseurl = "https://api.buurtcampus-oost.fdnd.nl/api/v1"
    const url = ('https://api.buurtcampus-oost.fdnd.nl/api/v1/stekjes')
    const data = await fetch(url).then((response) => response.json())
    res.render('index', data)
})

server.get('/new', (request, response) => {
    response.render('form')
})

server.post('/new', (request, response) => {
    const baseurl = "https://api.buurtcampus-oost.fdnd.nl/api/v1"
    const url = ('https://api.buurtcampus-oost.fdnd.nl/api/v1/stekjes')

    postJson(url, request.body).then((data) => {
        let newStekje = {...request.body}

        if (data.success) {
            response.redirect('/?memberPosted=true')
            // TODO: squad meegeven, message meegeven
            // TODO: Toast meegeven aan de homepagina
        } else {
            const errormessage = `${data.message}: Mogelijk komt dit door de slug die al bestaat.`
            const newdata = {error: errormessage, values: newStekje}

            response.render('form', newdata)
        }
    })
})

// Stel het poortnummer in
server.set('port', 4000)

// Start met luisteren
server.listen(server.get('port'), () => {
    console.log(`Application started on http://localhost:${server.get('port')}`)
})

/**
 * Wraps the fetch api and returns the response body parsed through json
 * @param {*} url the api endpoint to address
 * @returns the json response from the api endpoint
 */
async function fetchJson(url) {
    return await fetch(url)
        .then((response) => response.json())
        .catch((error) => error)
}

/**
 * postJson() is a wrapper for the experimental node fetch api. It fetches the url
 * passed as a parameter using the POST method and the value from the body paramater
 * as a payload. It returns the response body parsed through json.
 * @param {*} url the api endpoint to address
 * @param {*} body the payload to send along
 * @returns the json response from the api endpoint
 */
export async function postJson(url, body) {
    return await fetch(url, {
        method: 'post',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'},
    })
        .then((response) => response.json())
        .catch((error) => error)
}


// Importeer express uit de node_modules map
// import express from 'express'

// Maak een nieuwe express app aan
// Van express een variabel app gemaakt
// const app = express()

// Stel ejs in als template engine en geef de 'views' map door
// app.set('view engine', 'ejs')
// app.set('views', './views')

// Gebruik de map 'public' voor statische resources
// app.use(express.static('public'))

// Informatie krijgen
// / routing voor de index
// Maak een route voor de index
// app.get('/', async function (req, res) {
//     const url = ('https://api.buurtcampus-oost.fdnd.nl/api/v1/stekjes')
//     const data = await fetch (url).then ((response)=> response.json())
//     res.render('index', data)
// })

// app.get('/', (request, response) => {
//     response.render('index')
// })

// app.get('/reservation', (request, response) => {
//     // fetchen van data uit API, var veranderen naar data, de response met render functie voor de index de data erbij
//     fetchJson(stekjesUrl).then((data) => {
//         response.render('reservation', data)
//     })
// })

// app.get('/workshops', (request, response) => {
//     response.render('workshops')
// })
//
// app.get('/contact', (request, response) => {
//     response.render('contact')
// })
//
// app.get('/hoe', (request, response) => {
//     response.render('hoe')
// })
//
// // Stel het poortnummer in en start express
// app.set('port', process.env.PORT || 8000)
// app.listen(app.get('port'), function () {
//     console.log(`Application started on http://localhost:${app.get('port')}`)
// })

/**
 * Wraps the fetch api and returns the response body parsed through json
 * @param {*} url the api endpoint to address
 * @returns the json response from the api endpoint
 */

// async function fetchJson(url) {
//     return await fetch(url)
//         .then((response) => response.json())
//         .catch((error) => error)
// }












