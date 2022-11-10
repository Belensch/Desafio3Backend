const express = require('express')
const classContainer = require('./Container/archivosContainer')
const moment = require('moment')
const app = express();
const PORT = process.env.PORT || 8080
const archivo = new classContainer('productos.txt')

//Va a mostrar numero de visitas en cada endpoint
const visitas = {
    products: 0,
    fecha_ingreso_products: '',
    prod_random: 0,
    fecha_ingreso_products_random: ''

}

// config de los distintos endpoints

app.get('/', (req, res) => {
    res.send(`<h1 style= 'color: blue'> Bienvenidos!!`)
})

app.get('/products', async(req, res) => {
    visitas.products++
        visitas.fecha_ingreso_products = moment().format('MMMM Do YYYY, h:mm:ss a');
    const prods = await archivo.leer()
    res.send({ Productos: prods })
})


//Muestra los productos al azar
app.get('/productoRandom', async(req, res) => {
    visitas.prod_random++
        visitas.fecha_ingreso_products_random = moment().format('MMMM Do YYYY, h:mm:ss a');
    const prods = await archivo.leer()
    const random = parseInt(Math.random() * prods.length)
    res.send({ Productos: prods[random] })
})


app.get('/visitas', (req, res) => {

    res.send(visitas)
})


app.get('/fyh', (req, res) => {
    const date = new Date()
    res.send(date.toLocaleString())
})


//Config Puerto
const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})

//Escucha en caso de error 
server.on('error', error => console.log(`Error en el servidor: ${error}`))