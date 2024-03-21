const express = require("express");
const router = express.Router();
const playlistDal = require("../services/pg.playlist.dal");

router.get("/", async (req, res) => {
  try {
    let thePlaylist = await playlistDal.getSongs();
    if (DEBUG) console.table(thePlaylist);
    res.render("playlist", { thePlaylist });
  } catch {
    res.render("503");
  }
});

router.get("/:id", async (req, res) => {
  try {
    let aSong = await playlistDal.getSongById(req.params.id);
    if (aSong === undefined) {
      res.render("norecord");
    } else {
      if (DEBUG) console.table(aSong);
      res.render("song", { aSong });
    }
  } catch (err) {
    res.render("503");
  }
});

router.get("/:id/edit", async (req, res) => {
  if (DEBUG) console.log("song.Edit : " + req.params.id);
  res.render("songPatch.ejs", {
    title: req.query.title,
    artist: req.query.artist,
    album: req.query.album,
    duration: req.query.duration,
    theId: req.params.id,
  });
});

router.get("/:id/delete", async (req, res) => {
  if (DEBUG) console.log("song.Delete : " + req.params.id);
  res.render("songDelete.ejs", {
    title: req.query.title,
    theId: req.params.id,
  });
});

router.post("/", async (req, res) => {
  if (DEBUG) console.log("playlist.POST");
  try {
    await playlistDal.addSong(
      req.body.title,
      req.body.artist,
      req.body.album,
      req.body.duration
    );
    res.redirect("/playlist/");
  } catch (err) {
    // if (DEBUG) console.log(err);
    res.render("503");
  }
});

router.patch("/:id", async (req, res) => {
  if (DEBUG) console.log("playlist.PATCH: " + req.params.id);
  try {
    await playlistDal.patchSong(
      req.params.id,
      req.body.title,
      req.body.artist,
      req.body.album,
      req.body.duration
    );
    res.redirect("/playlist/");
  } catch {
    // log this error to an error log file.
    res.render("503");
  }
});

router.delete("/:id", async (req, res) => {
  if (DEBUG) console.log("playlist.DELETE: " + req.params.id);
  try {
    await playlistDal.deleteSong(req.params.id);
    res.redirect("/playlist/");
  } catch {
    // log this error to an error log file.
    res.render("503");
  }
});

module.exports = router;
