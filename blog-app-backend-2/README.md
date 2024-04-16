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