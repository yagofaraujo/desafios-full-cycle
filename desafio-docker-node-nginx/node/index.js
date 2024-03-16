const express = require('express');
const mysql = require('mysql')

const app = express();

const NAMES = ["Yago", "Daniel", "Gabriel", "Thiago", "Leozinho", "Pedro", "Fernando", "Marco", "Gleica", "Yudi", "Wesley", "Renan"];

app.get('/', async (_, res) => {
  const connection = mysql.createConnection({
    host: 'database',
    user: 'root',
    password: 'root',
    database:'app_database'
  })

  await new Promise((resolve, reject) => {
    connection.query(`CREATE TABLE IF NOT EXISTS people (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(100), PRIMARY KEY (id));`, function (error, results) {
      if (error) reject(error);
  
      resolve(results)
      })
    });

  
  const people = await new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM people`, function (error, results) {
      if (error) reject(error);
  
      resolve(results)
      })
    });
  
  const randomName = NAMES[Math.floor(Math.random() * ((NAMES.length - 1) - 0 + 1)) + 0];

  connection.query(`INSERT INTO people (name) values ('${randomName}');`);

  people.push({name: randomName})

  const result = `
    <h1>Full Cycle Rocks!</h1>  
  
    <ul>
    ${people.map(p => `<li>${p.name}</li>`).join('')}
    </ul>
  `;

  res.send(result);
  connection.end()
});

app.listen(3000, async () => {
  console.log('Aplicação rodando na porta 3000');
});