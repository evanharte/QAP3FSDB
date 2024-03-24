var router = require("express").Router();

if (DEBUG) {
  console.log("ROUTE: /api");
}

// http://localhost:3000/api/
router.get("/", (req, res) => {
  res.send("API Home Page");
});

// http://localhost:3000/api/playlist/
// !! this is a sub-route of /api which is set in the main index.js file
const playlistRouter = require("./playlist.js");
router.use("/playlist", playlistRouter);

module.exports = router;
