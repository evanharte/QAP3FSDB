var router = require("express").Router();
// imports the (DAL) functions that interact with the database
const playlistDal = require("../../services/pg.playlist.dal");

// api/playlist - GET a list of all songs
router.get("/", async (req, res) => {
  if (DEBUG) console.log("REQUEST: /api/playlist/ GET " + req.url);
  try {
    let thePlaylist = await playlistDal.getSongs();
    res.json(thePlaylist);
  } catch (err) {
    // log this error to an error log file.
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});

// api/playlist/:id - GET a single song by id
router.get("/:id", async (req, res) => {
  if (DEBUG) console.log("REQUEST: /api/users/:id GET " + req.url);
  try {
    let thePlaylist = await playlistDal.getSongById(req.params.id);
    res.json(thePlaylist);
  } catch (err) {
    // log this error to an error log file.
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
    console.log(err);
  }
});

module.exports = router;
