# Aura - Kahoot! App

For this project, I've decided to make a replica of my favorite class quiz app called Kahoot!. Using the MERN Stack (MongoDB, Express, React, & NodeJS) this quiz application interacts with a database, contains models & controllers, and even can be played with other devices so long as they join the PIN code.


<p align="center">
    <img src="./src/screenshots/logo.jpg" width="400px"/>
</p>

Below are some snapshots for how the game would look when (forked &) cloned. Instructions on how to install are also listed below. 

## Snapshots 

|Main Menu|Quiz Questions|
|---------|------------|
|![Main Menu](./src/screenshots/main-menu.jpg)|![Quiz Questions](./src/screenshots/quiz-questions.jpg)|

|Host Lobby|Player Lobby|
|---------|------------|
|![Host Lobby](./src/screenshots/host-lobby.jpg)|![Player Lobby](./src/screenshots/player-lobby.jpg)|

|Game Preview|Question Preview|
|---------|------------|
|![Host Preview](./src/screenshots/preview.jpg)|![Player Preview](./src/screenshots/question-preview.jpg)|

|Question Board|Answer Board|
|---------|------------|
|![Question](./src/screenshots/questions.jpg)|![Answer](./src/screenshots/poll-and-answer.jpg)|

|Player Answer| Scoreboard|
|---------|------------|
|![Player Answer](./src/screenshots/player-answer.jpg)|![Scoreboard](./src/screenshots/scoreboard.jpg)|

|Leaderboard|
|-----------|
|![Leaderboard](./src/screenshots/leaderboard.jpg)|

## Built With

[![MongoDB](https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

[![Express](https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

[![React](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=gray)](https://reactjs.org/) 

[![NodeJs](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/)

[![NPM](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)

[![Socket.io](https://img.shields.io/badge/socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/docs/v4/)

## Installation

First, head to my backend server:

* [Backend Server](https://github.com/Chudii/aura-server) 

Clone this repository. This is the server that will allow you to access the important data. You will need `node` installed

```
git clone https://github.com/Chudii/aura-server.git
```
Go to the project directory
```
cd <project-name>
```
Then install the NPM packages
```
npm install
```
To Start Server:
```
npm run start
```

THEN...

Repeat the same steps for this repository. Once completed you should have both the server and the client running simultaenously.

To Visit App: 
`http://localhost:3000`

---

### Environmental Variables

To run this project, you will need to add the following environment variables to your `.env` file

A `PORT` & `MONGO_URI`.

---

### Feel free to contribute!

## Contact

[![LinkedIn](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/chudi-ibida/)

[![GitHub](https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Chudii)

## Acknowledgements, References & Tools

[Fire Animation](https://codepen.io/yamanda/pen/RpNMaY) - For Fire Logo


[Uno](https://github.com/mizanxali/uno-online) - For Socket.io Logic


[Quizy](https://github.com/jeffreyquan/quizy-server) - For Kahoot Logic