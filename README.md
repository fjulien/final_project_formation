# Project NodeJS_React_Final_Checkpoint
This repository contains the last NodeJS/React checkpoint.
Open the PDF document called "Final checkpoint - JS" to see instructions.

## Installation

- 1 .  Fork this project.

- 2 . Go to  your repository

- 3 . Clone it in your computer :

`$ git clone https://github.com/[your_profile_github]/final_project_formation.git`

### SQL initialization

- 1 . Make your Sql database.

### Rest api initialization

- 1 . Go to the back folder .

- 2 . Add new file *conf.js* in /back/routes/conf.js with your settings.

Example :

```javascript
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '',
  user: '',
  password: '',
  database: '',
});
export default connection;

```
- 3 . Add new folder *images* in /back/routes/movies/images.

- 4 . Dependencies installation  npm:

`$ npm install`

- 5 . Start the api:

`$ npm start`

### Front initialization 

- 1 . Go to the front folder.

- 2 . Create a new file *.env* at the folder's root with the fetch path.
Example: 

`REACT_APP_API_URL = http://localhost:4000`

- 3 . Npm dependencies installation :

`$ npm install`

- 4 . Start the front project :

`$ npm start`

- 5 . And to finish, in your navigator,  go to *http://localhost:3000/*  to see the web project.

## Team

- Fettinger Julien


