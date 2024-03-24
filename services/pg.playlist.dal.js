const dal = require("./pg.auth_db");

var getSongs = function () {
  if (DEBUG) console.log("playlist.pg.dal.getSongs()");
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

async function patchSong(id, title, artist, album, duration) {
  if (DEBUG) console.log("pg.playlist.dal.patchSong()");
  const sql = `UPDATE public."Playlist" SET title=$2, artist=$3, album=$4, duration=$5 WHERE id=$1;`;
  try {
    let result = await dal.query(sql, [id, title, artist, album, duration]);
    if (DEBUG) console.log(result);
    return result.rowCount;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function deleteSong(id) {
  if (DEBUG) console.log("pg.playlist.dal.deleteSong()");
  const sql = `DELETE FROM public."Playlist" WHERE id = $1;`;
  try {
    let result = await dal.query(sql, [id]);
    if (DEBUG) console.log(result);
    return result.rowCount;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  getSongs,
  addSong,
  getSongById,
  patchSong,
  deleteSong,
};
