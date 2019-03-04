# 1. Grab the latest node image
FROM node:latest
# 2. Set the working directory inside the container to /app
WORKDIR /app
# 3. Add the .env to the directory (We need those variables)
ADD $HOME/partyplanner/Webapp/.env /app/.env
# ADD /opt/partyplanner/.env /app
# 4. Expose port defined in .env file
EXPOSE 3333
# 5. Add package.json to the directory
ADD Webapp/package.json /app
# 6. Install dependencies
RUN npm install
# 7. Copy the rest into directory
COPY /Webapp /app
# 8. Start the app inside the container
CMD ["npm", "start"]