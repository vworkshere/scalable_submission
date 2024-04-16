# MVP Architecture

## Code Structure
```
blog-app-backend/
|-- config/
    |-- config.json
|-- controllers/
    |-- authController.js
    |-- blogController.js
|-- middleware/
    |-- authMiddleware.js
|-- migrations/
|-- models/
    |-- index.js
    |-- user.js
    |-- blog.js
|-- routes/
    |-- authRoutes.js
    |-- blogRoutes.js
|-- app.js
```


## Create and setup database 
Update config/config.json
```sequelize db:create```
to create the database and then 
```sequelize db:migrate```
to apply migrations

## How to Run
Update .env
Create Image and push to docker , then deploy image on Fargate/Lambda/OpenFaaS/Openshift/EKS

## Following to run tests
```python3 -m locust -f locust2.py```

## env file sample
```
.env
# Environment Configuration

# Port where the server will listen
PORT=3000

# Database Configuration
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=blog_app
DB_HOST=
DB_PORT=3306
DB_DIALECT=mysql

# JWT Secret for token generation
JWT_SECRET=

# Node Environment (development, production, etc.)
NODE_ENV=development
```

## config.json sample
```
{
    "development": {
      "username": "",
      "password": "",
      "database": "blog_app",
      "host": "",
      "dialect": "mysql"
    }
  }
```
