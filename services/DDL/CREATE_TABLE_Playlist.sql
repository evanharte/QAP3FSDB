CREATE TABLE public."Playlist"
(
    id serial NOT NULL,
    title character varying(100) NOT NULL,
    artist character varying(50) NOT NULL,
    album character varying(50) NOT NULL,
    duration character varying(10) NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public."Playlist"
    OWNER to evanharte;