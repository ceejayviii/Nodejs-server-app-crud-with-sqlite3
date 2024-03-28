// models/userModel.js
module.exports = (db) => {
    class User {
        static Index(callback) {
            db.all('SELECT * FROM users', callback);
        }

        static Details(id, callback) {
            db.get('SELECT * FROM users WHERE id = ?', [id], callback);
        }

        static Create(name, email, callback) {
            db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], function(err) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, this.lastID);
            });
        }

        static Update(id, name, email, callback) {
            db.run('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id], function(err) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null);
            });
        }

        static Delete(id, callback) {
            db.run('DELETE FROM users WHERE id = ?', [id], function(err) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null);
            });
        }
    }
    return User;
};
