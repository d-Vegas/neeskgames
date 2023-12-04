const express = require('express');
const multer = require('multer');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const upload = multer(); //permite laitura de FormData.

const corsOptions = { origin: '*' }; //Permite origem crusada (cors policy).

const db = new sqlite3.Database('teste.db');
const port = 8080;

app.use(cors(corsOptions)); //Configura o cors.
app.use(express.json()); //permite leitura de json no body.

// Auth
app.post('/auth', (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;

    const selectSql = 'SELECT * FROM user WHERE username LIKE ? AND password = ?';

    db.all(selectSql, [username, password], (err, row) => {
        if (err) res.send(err);

        if (!!row.length) {
            res.json({ message: 'Usuário autenticado', user: row[0] })
        } else {
            res.status(401).json({ error: 'Usuário não autenticado' })
        }
    });
});

// User
app.get('/user', (req, res) => {
    db.all('SELECT * FROM user', (err, rows) => {
        if (err) res.send(err);
        res.send(rows)
    });
});

//upload.none() permite o uso de FormData, preferivel em PUT.
app.put('/user', upload.none(), (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ error: 'Todos os campos (username, password, email) são obrigatórios.' });
    }

    const insertSql = 'INSERT INTO user (username, password, email) VALUES (?, ?, ?)';

    db.run(insertSql, [username, password, email], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const userId = this.lastID;

        // Retornar os dados da linha inserida
        const selectSql = 'SELECT * FROM user WHERE id = ?';

        db.get(selectSql, [userId], (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(201).json({ message: 'Usuário inserido com sucesso', data: row });
        });
    });
});

app.post('/user/:id', (req, res) => {
    const userId = req.params.id;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    // Atualizar o usuário no banco de dados
    const updateSql = 'UPDATE user SET username = ?, password = ?, email = ? WHERE id = ?';

    db.run(updateSql, [username, password, email, userId], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Retornar os dados da linha atualizada
        const selectSql = 'SELECT * FROM user WHERE id = ?';

        db.get(selectSql, [userId], (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json({ message: 'Usuário atualizado com sucesso', data: row });
        });
    });
});

app.delete('/user/:id', (req, res) => {
    const userId = req.params.id;

    // Deletar o usuário do banco de dados
    const deleteSql = 'DELETE FROM user WHERE id = ?';

    db.run(deleteSql, [userId], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json({ message: 'Usuário deletado com sucesso' });
    });
});

// Dashboard
app.get('/game', (req, res) => {
    db.all('SELECT * FROM game', (err, rows) => {
        if (err) res.send(err);
        res.send(rows)
    });
});

//upload.none() permite o uso de FormData, preferivel em PUT.
app.put('/game', upload.none(), (req, res) => {
    const { name, type, img, recommend, tested, rate } = req.body;

    if (!name || !type) {
        return res.status(400).json({ error: 'Todos os campos (name, type, recommend, tested, rate' });
    }

    const insertSql = 'INSERT INTO game (name, type, recommend, tested, rate) VALUES (?, ?, ?, ?, ?)';

    db.run(insertSql, [name, type, recommend, tested, rate], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const gameId = this.lastID;

        // Retornar os dados da linha inserida
        const selectSql = 'SELECT * FROM game WHERE id = ?';

        db.get(selectSql, [gameId], (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(201).json({ message: 'Jogo inserido com sucesso', data: row });
        });
    });
});

app.post('/game/:id', (req, res) => {
    const gameId = req.params.id;
    const { name, type, recommend, tested, rate } = req.body;

    // Atualizar o usuário no banco de dados
    const updateSql = 'UPDATE game SET name = ?, type = ?, recommend = ?, tested = ?, rate = ? WHERE id = ?';

    db.run(updateSql, [name, type, recommend, tested, rate, gameId], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Retornar os dados da linha atualizada
        const selectSql = 'SELECT * FROM game WHERE id = ?';

        db.get(selectSql, [gameId], (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json({ message: 'Usuário atualizado com sucesso', data: row });
        });
    });
});

app.delete('/game/:id', (req, res) => {
    const gameId = req.params.id;

    // Deletar o usuário do banco de dados
    const deleteSql = 'DELETE FROM game WHERE id = ?';

    db.run(deleteSql, [gameId], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json({ message: 'Usuário deletado com sucesso' });
    });
});

app.listen(port, () => {
    console.log('local: http://localhost:8080 *Obs: Se alterar aqui , lembre de alterar no front');
});