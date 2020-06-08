'use strict';
module.exports = (sequelize, DataTypes) => {
    const restaurants = sequelize.define('restaurants', {
        name: DataTypes.STRING,
        streetAddress: DataTypes.STRING,
        zipCode: DataTypes.INTEGER,
        latLong: DataTypes.STRING
    }, { timestamps: false });
    restaurants.associate = function(models) {
        // associations can be defined here
    };
    return restaurants;
};