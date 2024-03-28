module.exports = function (sqlite3) {
  const db = new sqlite3.Database("database/app.db");

  db.serialize(() => {
    db.run(
      "CREATE TABLE IF NOT EXISTS Users (Id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Email TEXT)"
    );
  });

  return db;
};
