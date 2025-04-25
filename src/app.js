const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000 


//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../template/views')
const partialsPath = path.join(__dirname, '../template/partials')


//setup handelbars engine and views location 
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req , res) => {
    res.render('index',{
        title : 'weather',
        name : 'Bhuvaneshwari'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address)
    {
        return res.send({
            error: 'You must provide an Address'
        })
    }

    geoCode(req.query.address , (error , { latitude, longitude, place} = {}) => {
        if( error ){
            return res.send({ error })
        }
        forecast( latitude, longitude , ( error , forecastData) => {
            if( error ){
                return res.send(error)
            }
            return res.send({
                forecast: forecastData,
                place,
                address: req.query.address
            })
        })
    })

    // res.send((
    //     {
    //         place : req.query.address,
    //         tempearature : '8 degrees'
    //     }
    // ))
})

app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title : 'Help page',
        name : 'Bhuvaneshwari'

    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title : 'Bhuvaneshwari',
        name : 'Bhuvaneshwari',
        age : 19
    })
})

app.get('/help/*', (req, res) => {
   res.render('404',{
        title : '404',
        name : 'Bhuvaneshwari',
        errorMessage:'help article not found!'
   })
})

app.get('*',(req,res) => {
    res.render('404', {
        title: '404',
        name:'Bhuvaneshwari',
        errorMessage:'page not found'
    })
})
// app.get('',(req, res) => {
//     res.send('<h1>Hello express!</h1>')
// })

// app.get('/help',(req,res) => {
//     res.send('Help page')
// })

// app.get('/about',(req,res) => {
//     res.send('About')
// })



app.listen(port,() => {
    console.log('server is up on port ' +  port)
})