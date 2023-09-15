require('dotenv').config()

const express = require('express')
const helmet = require('helmet');

const { DBTest } = require('./database.js');
const tareaModel = require('./tareaModel.js');

const app = express()
const PORT = process.env.PORT

// Configurar EJS como motor de plantilla
app.set('view engine', 'ejs');

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/', async function (req, res) {
    const publicaciones = await publicacionModel.findAll();
    res.render('inicio', { publicacion: publicaciones });
})

app.get('/agregar', function (req, res) {
    res.render('agregar')
})

app.post('/agregar', async function (req, res) {
    const { titulo, descripcion, imagen } = req.body
    try {
        const nuevaPublicacion = await publicacionModel.create({
            nombre: titulo,
            descripcion: descripcion,
            imagen: imagen
        });
        if (nuevaPublicacion) {
            res.redirect('/');
        } else {
            res.send('No se pudo agregar la publicacion :(')
        }
    } catch (err) {
        res.send('Se produjo un errror al cargar la publicacion: ' + err)
    }
})

app.get('/eliminar/:id', async function (req, res) {
    const { id } = req.params;
    try {
        const borrarPublicacion = await publicacionModel.destroy({
            where: {
                id: id
            }
        })
        if (borrarPublicacion) {
            res.redirect('/');
        } else {
            res.send('No se pudo borrar la publicacion :(')
        }
    } catch (err) {
        res.send('Se produjo un errror al borrar la publicacion: ' + err)
    }
})

app.get('/editar/:id', async function (req, res) {
    const { id } = req.params;
    try {
        const publicacion = await publicacionModel.findOne({
            where: {
                id: id
            }
        })
        if (publicacion) {
            res.render('editar', { publicacion: publicacion });
        } else {
            res.send('No se pudo encontrar la publicacion :(')
        }
    } catch (err) {
        res.send('Se produjo un errror al buscar la publicacion: ' + err)
    }
})

app.post('/editar/:id', async function (req, res) {
    const { id } = req.params;
    const { titulo, descripcion, imagen } = req.body
    try {
        const publicacionActualizada = await publicacionModel.update(
            {
                nombre: tarea,
                descripcion: descripcion,
                imagen: imagen
            }, {
                where: {
                    id: id
                }
            }
        )
        if (publicacionActualizada) {
            res.redirect('/');
        } else {
            res.send('No se pudo actualizar la publicacion :(')
        }
    } catch (err) {
        res.send('Se produjo un errror al actualizar la publicacion: ' + err)
    }
})
DBTest()
app.listen(PORT)