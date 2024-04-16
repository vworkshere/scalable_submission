require('dotenv').config();
const Sequelize = require('sequelize');
const UserModel = require('./user');
const BlogModel = require('./blog');

// Create a new Sequelize instance using environment variables
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false, // Toggle logging if you want SQL queries logged
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

// Initialize models
const User = UserModel(sequelize, Sequelize);
const Blog = BlogModel(sequelize, Sequelize);

// Sync all models with the database
sequelize.sync({ force: false }).then(() => {
    console.log('Database & tables created!');
});

module.exports = {
    sequelize,
    User,
    Blog
};
