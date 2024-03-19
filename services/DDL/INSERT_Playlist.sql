-- to build the json object within pgadmin
SELECT json_agg(json_build_object('id', id, 'title', title, 'artist', artist, 'album', album, 'duration', duration)) AS json_data
	FROM public."Playlist";

-- to insert data into the table
INSERT INTO public."Playlist"(
	title, artist, album, duration)
	VALUES ('No Reply', 'Beatles', 'Beatles For Sale', '2:15');

INSERT INTO public."Playlist"(
	title, artist, album, duration)
	VALUES ('I''m a Loser', 'Beatles', 'Beatles For Sale', '2:30');

INSERT INTO public."Playlist"(
	title, artist, album, duration)
	VALUES ('Mr. Moonlight', 'Beatles', 'Beatles For Sale', '2:38');

INSERT INTO public."Playlist"(
	title, artist, album, duration)
	VALUES ('Eight Days a Week', 'Beatles', 'Beatles For Sale', '2:43');

INSERT INTO public."Playlist"(
	title, artist, album, duration)
	VALUES ('A Hard Day''s Night', 'Beatles', 'A Hard Day''s Night', '2:33');

INSERT INTO public."Playlist"(
	title, artist, album, duration)
	VALUES ('Can''t Buy Me Love', 'Beatles', 'A Hard Day''s Night', '2:12');

INSERT INTO public."Playlist"(
	title, artist, album, duration)
	VALUES ('Captain Fantastic and the Brown Dirt Cowboy', 'Elton John', 'Captain Fantastic and the Brown Dirt Cowboy', '5:46');

INSERT INTO public."Playlist"(
	title, artist, album, duration)
	VALUES ('Tower of Babel', 'Elton John', 'Captain Fantastic and the Brown Dirt Cowboy', '4:28');

INSERT INTO public."Playlist"(
	title, artist, album, duration)
	VALUES ('I''m Still Standing', 'Elton John', 'Too Low For Zero', '3:02');

INSERT INTO public."Playlist"(
	title, artist, album, duration)
	VALUES ('I Guess That''s Why They Call It the Blues', 'Elton John', 'Too Low For Zero', '4:41');

INSERT INTO public."Playlist"(
	title, artist, album, duration)
	VALUES ('Hi Dee Dee', 'Ty Segall', 'Three Bells', '3:11');

INSERT INTO public."Playlist"(
	title, artist, album, duration)
	VALUES ('My Best Friend', 'Ty Segall', 'Three Bells', '3:16');

INSERT INTO public."Playlist"(
	title, artist, album, duration)
	VALUES ('City Song', 'Everything Everything', 'Mountainhead', '3:14');

INSERT INTO public."Playlist"(
	title, artist, album, duration)
	VALUES ('Enter the Mirror', 'Everything Everything', 'Mountainhead', '3:42');

INSERT INTO public."Playlist"(
	title, artist, album, duration)
	VALUES ('Last Peace', 'Thee Oh Sees', 'Smote Reverser', '7:41');