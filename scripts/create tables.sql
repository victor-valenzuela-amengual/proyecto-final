-- Database: tienda_peliculas

-- DROP DATABASE IF EXISTS tienda_peliculas;

CREATE DATABASE tienda_peliculas
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Spain.1252'
    LC_CTYPE = 'Spanish_Spain.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
	
----------------------------
-- Table: public.pelicula

-- DROP TABLE IF EXISTS public.pelicula;

CREATE TABLE IF NOT EXISTS public.pelicula
(
    id integer NOT NULL DEFAULT nextval('pelicula_id_seq'::regclass),
    titulo text COLLATE pg_catalog."default" NOT NULL,
    precio integer DEFAULT 0,
    idcategoria integer,
    stock integer,
    director character varying(100) COLLATE pg_catalog."default",
    agno integer,
    titulo_alt character varying(200) COLLATE pg_catalog."default",
    CONSTRAINT pelicula_pkey PRIMARY KEY (id),
    CONSTRAINT fk_pelicula_categoria FOREIGN KEY (idcategoria)
        REFERENCES public.categoria (idcategoria) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT pelicula_precio_check CHECK (precio >= 1000)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.pelicula
    OWNER to postgres;

COMMENT ON COLUMN public.pelicula.titulo_alt
    IS 'Titulo en castellano';
	
--------------------
-- Table: public.reparto

-- DROP TABLE IF EXISTS public.reparto;

CREATE TABLE IF NOT EXISTS public.reparto
(
    idpelicula integer NOT NULL,
    actor character varying(100) COLLATE pg_catalog."default" NOT NULL,
    rol character varying(150) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT reparto_pkey PRIMARY KEY (idpelicula, actor),
    CONSTRAINT "FK_pelicula_reparto" FOREIGN KEY (idpelicula)
        REFERENCES public.pelicula (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.reparto
    OWNER to postgres;

---------------------
-- Table: public.usuario

-- DROP TABLE IF EXISTS public.usuario;

CREATE TABLE IF NOT EXISTS public.usuario
(
    id integer NOT NULL DEFAULT nextval('usuario_id_seq'::regclass),
    nombre character varying(100) COLLATE pg_catalog."default",
    activo boolean DEFAULT true,
    direccion character varying(200) COLLATE pg_catalog."default",
    fono character varying(20) COLLATE pg_catalog."default",
    password character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT usuario_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.usuario
    OWNER to postgres;

----------------------------------
-- Table: public.usuario_compra

-- DROP TABLE IF EXISTS public.usuario_compra;

CREATE TABLE IF NOT EXISTS public.usuario_compra
(
    idpelicula integer NOT NULL,
    idusuario integer NOT NULL,
    fecha_compra date,
    cantidad integer DEFAULT 0,
    CONSTRAINT usuario_compra_pkey PRIMARY KEY (idpelicula, idusuario),
    CONSTRAINT "FK_usuario_compras" FOREIGN KEY (idusuario)
        REFERENCES public.usuario (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.usuario_compra
    OWNER to postgres;
--------------------------------
-- Table: public.usuario_pelicula

-- DROP TABLE IF EXISTS public.usuario_pelicula;

CREATE TABLE IF NOT EXISTS public.usuario_pelicula
(
    idpelicula integer NOT NULL,
    idusuario integer NOT NULL,
    comentario text COLLATE pg_catalog."default",
    puntuacion integer DEFAULT 0,
    CONSTRAINT usuario_pelicula_pkey PRIMARY KEY (idpelicula, idusuario),
    CONSTRAINT "FK_pelicula_usuario" FOREIGN KEY (idpelicula)
        REFERENCES public.pelicula (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.usuario_pelicula
    OWNER to postgres;