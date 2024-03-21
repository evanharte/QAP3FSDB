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

// router.get("/:id/edit", async (req, res) => {
//   if (DEBUG) console.log("login.Edit : " + req.params.id);
//   res.render("loginPatch.ejs", {
//     username: req.query.username,
//     password: req.query.password,
//     email: req.query.email,
//     theId: req.params.id,
//   });
// });

// router.get("/:id/delete", async (req, res) => {
//   if (DEBUG) console.log("login.Delete : " + req.params.id);
//   res.render("loginDelete.ejs", {
//     username: req.query.username,
//     theId: req.params.id,
//   });
// });

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

// router.patch("/:id", async (req, res) => {
//   if (DEBUG) console.log("logins.PATCH: " + req.params.id);
//   try {
//     await loginsDal.patchLogin(
//       req.params.id,
//       req.body.username,
//       req.body.password,
//       req.body.email
//     );
//     res.redirect("/logins/");
//   } catch {
//     // log this error to an error log file.
//     res.render("503");
//   }
// });

// router.delete("/:id", async (req, res) => {
//   if (DEBUG) console.log("logins.DELETE: " + req.params.id);
//   try {
//     await loginsDal.deleteLogin(req.params.id);
//     res.redirect("/logins/");
//   } catch {
//     // log this error to an error log file.
//     res.render("503");
//   }
// });

module.exports = router;
