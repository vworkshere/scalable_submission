from locust import HttpUser, between, task, TaskSet
import json
import uuid

class BlogUserBehavior(TaskSet):
    def on_start(self):
        """ On start, each user registers and logs in """
        self.register()
        self.login()

    def register(self):
        """ Register a new user with a unique username and email """
        unique_id = uuid.uuid4()  # Generate a unique UUID for each user
        self.username = f"user_{unique_id}"
        self.user_email = f"user_{unique_id}@example.com"
        self.user_password = "password"

        response = self.client.post("/api/auth/register", json={
            "username": self.username,
            "email": self.user_email,
            "password": self.user_password
        })
        print("Registration response:", response.status_code)

    def login(self):
        """ Log in to get a JWT token """
        response = self.client.post("/api/auth/login", json={
            "email": self.user_email,
            "password": self.user_password
        })
        result = response.json()
        self.token = result['token']
        self.user_id = result['user']['id']  # Assuming the login response includes user ID
        print("Login response:", response.status_code)

    @task(2)
    def view_posts(self):
        """ View list of blog posts """
        self.client.get("/api/blogs", headers={
            "Authorization": f"Bearer {self.token}"
        })

    @task(1)
    def create_post(self):
        """ Create a new blog post using the user ID from login """
        self.client.post("/api/blogs", json={
            "title": "A new post",
            "content": "Content of the new post",
            "userId": self.user_id  # Use the user ID from the logged-in user
        }, headers={
            "Authorization": f"Bearer {self.token}"
        })

    @task(1)
    def view_single_post(self):
        """ View a specific post """
        self.client.get("/api/blogs/5", headers={  # Assuming post ID 5 exists for simplicity
            "Authorization": f"Bearer {self.token}"
        })

    @task(1)
    def update_post(self):
        """ Update a blog post """
        self.client.put("/api/blogs/5", json={  # Assuming post ID 5 exists
            "title": "Updated post title",
            "content": "Updated content here"
        }, headers={
            "Authorization": f"Bearer {self.token}"
        })

    #Need to write complex logic here
    #@task(1)
    #def delete_post(self):
    #    """ Delete a blog post """
    #    self.client.delete("/api/blogs/1", headers={  # Assuming post ID 1 exists
    #        "Authorization": f"Bearer {self.token}"
    #    })

class WebsiteUser(HttpUser):
    tasks = [BlogUserBehavior]
    wait_time = between(1, 3)

