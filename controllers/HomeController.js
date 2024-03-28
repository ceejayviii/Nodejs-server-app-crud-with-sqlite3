module.exports = (express) => {
  const router = express.Router();

  router.get("/", (req, res) => {
    res.send("Hello World!");
  });

  router.get("/about", (req, res) => {
    res.send("About page");
  });

  router.get("/contact", (req, res) => {
    res.send("Contact page");
  });

  return router;
};
