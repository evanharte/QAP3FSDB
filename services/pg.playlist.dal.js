const dal = require("./pg.auth_db");

var getSongs = function () {
  if (DEBUG) console.log("logins.pg.dal.getLogins()");
  return new Promise(function (resolve, reject) {
    const sql = `SELECT id, title, artist, album, duration FROM public."Playlist" \ 
    ORDER BY id DESC;`;
    dal.query(sql, [], (err, result) => {
      if (err) {
        if (DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

async function getSongById(id) {
  if (DEBUG) console.log("pg.playlist.dal.getSongById()");
  const sql = `SELECT id, title, artist, album, duration FROM public."Playlist" WHERE id = $1;`;
  try {
    let result = await dal.query(sql, [id]);
    return result.rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function addSong(title, artist, album, duration) {
  if (DEBUG) console.log("pg.playlist.dal.addSong()");
  const sql = `INSERT INTO public."Playlist"(title, artist, album, duration) VALUES ($1, $2, $3, $4) RETURNING id;`;
  try {
    let result = await dal.query(sql, [title, artist, album, duration]);
    if (DEBUG) console.log(result);
    return result.rows[0].id;
  } catch (error) {
    if (error.code === "23505") return error.code;
    console.log(error);
    throw error;
  }
}

// var patchSong = function (id, username, password, email) {
//   if (DEBUG) console.log("logins.pg.dal.patchLogin()");
//   return new Promise(function (resolve, reject) {
//     const sql = `UPDATE public."Logins" SET username=$2, password=$3, email=$4 WHERE id=$1;`;
//     dal.query(sql, [id, username, password, email], (err, result) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(result.rows);
//       }
//     });
//   });
// };

// var deleteSong = function (id) {
//   if (DEBUG) console.log("logins.pg.dal.deleteLogin()");
//   return new Promise(function (resolve, reject) {
//     const sql = `DELETE FROM public."Logins" WHERE id = $1;`;
//     dal.query(sql, [id], (err, result) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(result.rows);
//       }
//     });
//   });
// };

module.exports = {
  getSongs,
  addSong,
  getSongById,
  // patchSong,
  // deleteSong,
};
