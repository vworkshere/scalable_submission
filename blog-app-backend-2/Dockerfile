# Use an official Node runtime as a parent image
FROM node:slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Install any needed packages specified in package.json
RUN npm install

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Define environment variables
# ENV NAME=Value

# Run server.js when the container launches
CMD ["node", "app.js"]