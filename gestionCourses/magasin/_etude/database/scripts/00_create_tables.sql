-- object: public.produit | type: TABLE --
DROP TABLE IF EXISTS public.produit CASCADE;
CREATE TABLE public.produit (
	id_produit smallint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	nom_produit varchar(30),
	id_categorie_produit smallint,
	CONSTRAINT produits_pk PRIMARY KEY (id_produit)

);
-- ddl-end --
ALTER TABLE public.produit OWNER TO dev;
-- ddl-end --

--------------------------------------------------------------------------------------------
-- object: public.rayon | type: TABLE --
DROP TABLE IF EXISTS public.rayon CASCADE;
CREATE TABLE public.rayon (
	id_rayon smallint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	nom_rayon varchar(10) NOT NULL,
	CONSTRAINT rayon_pk PRIMARY KEY (id_rayon)

);
-- ddl-end --
ALTER TABLE public.rayon OWNER TO dev;
-- ddl-end -
-----------------------------------------------------------------------------------------------


-- object: public.etagere | type: TABLE --
DROP TABLE IF EXISTS public.etagere CASCADE;
CREATE TABLE public.etagere (
	id_etagere smallint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	nom_etagere varchar(10),
	id_rayon smallint,
	CONSTRAINT etagere_pk PRIMARY KEY (id_etagere)

);
-- ddl-end --
ALTER TABLE public.etagere OWNER TO dev;
-- ddl-end -

--------------------------------------------------------------------------------------------
-- object: public.categorie_produit | type: TABLE --
DROP TABLE IF EXISTS public.categorie_produit CASCADE;
CREATE TABLE public.categorie_produit (
	id_categorie_produit smallint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	nom_categorie_produit varchar(50),
	CONSTRAINT categorie_produits_pk PRIMARY KEY (id_categorie_produit)

);
-- ddl-end --
ALTER TABLE public.categorie_produit OWNER TO dev;
-- ddl-end --

---- object: categorie_produit_fk | type: CONSTRAINT --
-- ALTER TABLE public.produit DROP CONSTRAINT IF EXISTS categorie_produit_fk CASCADE;
-- ALTER TABLE public.produit ADD CONSTRAINT categorie_produit_fk FOREIGN KEY (id_categorie_produit)
-- REFERENCES public.categorie_produit (id_categorie_produit) MATCH FULL
-- ON DELETE SET NULL ON UPDATE CASCADE;
---- ddl-end --

----------------------------------------------------------------------------------------------
-- object: public.association_etagere_produit | type: TABLE --
DROP TABLE IF EXISTS public.association_etagere_produit CASCADE;
CREATE TABLE public.association_etagere_produit (
	id_association_etagere_produit smallint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	id_etagere smallint,
	id_produit smallint,
	CONSTRAINT association_etagere_produit_pk PRIMARY KEY (id_association_etagere_produit)

);
-- ddl-end --
ALTER TABLE public.association_etagere_produit OWNER TO dev;
-- ddl-end --

----------------------------------------------------------------------------------
--
-- -- object: public.association_liste_produit | type: TABLE --
-- DROP TABLE IF EXISTS public.association_liste_produit CASCADE;
-- CREATE TABLE public.association_liste_produit (
-- 	id_liste_produit smallint NOT NULL GENERATED ALWAYS AS IDENTITY ,
-- 	id_liste_de_courses smallint,
-- 	id_produit smallint,
-- 	CONSTRAINT liste_produits_pk PRIMARY KEY (id_liste_produit)
--
-- );
-- -- ddl-end --
-- ALTER TABLE public.association_liste_produit OWNER TO dev;
-- -- ddl-end --
--
--

--------------------------------------------------------------------------------------------
-- -- Mettre en commentaire ??
-- -- object: utilisateur_fk | type: CONSTRAINT --
-- -- ALTER TABLE public.liste_de_courses DROP CONSTRAINT IF EXISTS utilisateur_fk CASCADE;
-- ALTER TABLE public.liste_de_courses ADD CONSTRAINT utilisateur_fk FOREIGN KEY (id_utilisateur)
-- REFERENCES public.utilisateur (id_utilisateur) MATCH FULL
-- ON DELETE SET NULL ON UPDATE CASCADE;
-- -- ddl-end --
-- ----------------------------------------------------------------------------------------------
-- -- Mettre en commentaire ??
-- -- object: liste_de_courses_fk | type: CONSTRAINT --
-- -- ALTER TABLE public.association_liste_produit DROP CONSTRAINT IF EXISTS liste_de_courses_fk CASCADE;
-- ALTER TABLE public.association_liste_produit ADD CONSTRAINT liste_de_courses_fk FOREIGN KEY (id_liste_de_courses)
-- REFERENCES public.liste_de_courses (id_liste_de_courses) MATCH FULL
-- ON DELETE SET NULL ON UPDATE CASCADE;
-- -- ddl-end --
-- ------------------------------------------------------------------------------------------
-- -- Mettre en commentaire ??
-- -- object: produit_fk | type: CONSTRAINT --
-- -- ALTER TABLE public.association_liste_produit DROP CONSTRAINT IF EXISTS produit_fk CASCADE;
-- ALTER TABLE public.association_liste_produit ADD CONSTRAINT produit_fk FOREIGN KEY (id_produit)
-- REFERENCES public.produit (id_produit) MATCH FULL
-- ON DELETE SET NULL ON UPDATE CASCADE;
-- -- ddl-end --

------------------------------------------------------------------------------------------

-----------------------------------------------------------------------------------------------

-- -- object: etagere_fk | type: CONSTRAINT --
-- -- ALTER TABLE public.association_etagere_produit DROP CONSTRAINT IF EXISTS etagere_fk CASCADE;
-- ALTER TABLE public.association_etagere_produit ADD CONSTRAINT etagere_fk FOREIGN KEY (id_etagere)
-- REFERENCES public.etagere (id_etagere) MATCH FULL
-- ON DELETE SET NULL ON UPDATE CASCADE;
-- -- ddl-end --
--------------------------------------------------------------------------------------------------------------------
-- -- object: produit_fk | type: CONSTRAINT --
-- -- ALTER TABLE public.association_etagere_produit DROP CONSTRAINT IF EXISTS produit_fk CASCADE;
-- ALTER TABLE public.association_etagere_produit ADD CONSTRAINT produit_fk FOREIGN KEY (id_produit)
-- REFERENCES public.produit (id_produit) MATCH FULL
-- ON DELETE SET NULL ON UPDATE CASCADE;
-- -- ddl-end --
----------------------------------------------------------------------------------------------------------------------
-- object: public.association_rayon_etagere | type: TABLE --
DROP TABLE IF EXISTS public.association_rayon_etagere CASCADE;
CREATE TABLE public.association_rayon_etagere (
	id_association_rayon_etagere smallint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	id_rayon smallint,
	id_etagere smallint,
	CONSTRAINT association_rayon_etagere_pk PRIMARY KEY (id_association_rayon_etagere)

);
-- ddl-end --
ALTER TABLE public.association_rayon_etagere OWNER TO dev;
-- ddl-end --


------------------------------------------------------------------------------------------------

-- -- object: etagere_fk | type: CONSTRAINT --
-- -- ALTER TABLE public."association rayon-etagere" DROP CONSTRAINT IF EXISTS etagere_fk CASCADE;
-- ALTER TABLE public."association rayon-etagere" ADD CONSTRAINT etagere_fk FOREIGN KEY (etagere)
-- REFERENCES public.etagere (id_etagere) MATCH FULL
-- ON DELETE SET NULL ON UPDATE CASCADE;
-- -- ddl-end --

--------------------------------------------------------------------------------------------------

-- -- object: rayon_fk | type: CONSTRAINT --
-- -- ALTER TABLE public."association rayon-etagere" DROP CONSTRAINT IF EXISTS rayon_fk CASCADE;
-- ALTER TABLE public."association rayon-etagere" ADD CONSTRAINT rayon_fk FOREIGN KEY (rayon)
-- REFERENCES public.rayon (id_rayon) MATCH FULL
-- ON DELETE SET NULL ON UPDATE CASCADE;
-- -- ddl-end --

-- object: public.liste_de_courses | type: TABLE --
-- DROP TABLE IF EXISTS public.liste_de_courses CASCADE;
-- CREATE TABLE public.liste_de_courses (
-- 	id_liste_de_courses smallint NOT NULL GENERATED ALWAYS AS IDENTITY ,
-- 	id_utilisateur smallint,
-- 	nom_liste_courses varchar(20),
-- 	date_liste date NOT NULL,
-- 	CONSTRAINT liste_de_courses_pk PRIMARY KEY (id_liste_de_courses)
--
-- );
-- -- ddl-end --
-- COMMENT ON TABLE public.liste_de_courses IS E'pour avoir lies listes en historique';
-- -- ddl-end --
-- ALTER TABLE public.liste_de_courses OWNER TO dev;
-- -- ddl-end --

-- object: public.utilisateur | type: TABLE --
-- DROP TABLE IF EXISTS public.utilisateur CASCADE;
-- CREATE TABLE public.utilisateur (
-- 	id_utilisateur smallint NOT NULL GENERATED ALWAYS AS IDENTITY ,
-- 	nom varchar(20) NOT NULL,
-- 	mail varchar(30),
-- 	mot_de_passe varchar(15),
-- 	CONSTRAINT utilisateur_pk PRIMARY KEY (id_utilisateur)
--
-- );
-- -- ddl-end --
-- ALTER TABLE public.utilisateur OWNER TO dev;
-- -- ddl-end --



