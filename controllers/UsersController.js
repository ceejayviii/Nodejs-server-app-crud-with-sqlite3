module.exports = (db) => {
    const express = require('express');
    const User = require('../models/User')(db);
    const router = express.Router();

    router.get('/', (req, res) => {
        User.Index((err, users) => {
            if (err) {
                res.status(500).json({ message: 'Internal server error' });
                return;
            }
            res.json(users);
        });
    });

    router.get('/details/:id', (req, res) => {
        User.Details(req.params.id, (err, user) => {
            if (err) {
                res.status(500).json({ message: 'Internal server error' });
                return;
            }
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        });
    });

    router.post('/create', (req, res) => {
        const { name, email } = req.body;
        User.Create(name, email, (err, userId) => {
            if (err) {
                res.status(500).json({ message: 'Internal server error' });
                return;
            }
            res.status(201).json({ id: userId, name, email });
        });
    });

    router.put('/edit/:id', (req, res) => {
        const { name, email } = req.body;
        User.Update(req.params.id, name, email, (err) => {
            if (err) {
                res.status(500).json({ message: 'Internal server error' });
                return;
            }
            res.status(200).json({ id: req.params.id, name, email });
        });
    });

    router.delete('/delete/:id', (req, res) => {
        User.Delete(req.params.id, (err) => {
            if (err) {
                res.status(500).json({ message: 'Internal server error' });
                return;
            }
            res.status(204).end();
        });
    });

    return router;
};