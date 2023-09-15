const { DataTypes } = require('sequelize');
const { sequelize } = require('./database.js');

const Publicacion = sequelize.define('Publicacion', {
    titulo: {
        type: DataTypes.STRING,
    },
    descripcion: {
        type: DataTypes.STRING,
    },
    imagen: {
        type: DataTypes.STRING,
    },
}, {
    timestamps: false,
    tableName: 'publicaciones',
});

module.exports = Publicacion;