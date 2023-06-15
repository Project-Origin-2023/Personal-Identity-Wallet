-- Adminer 4.8.1 PostgreSQL 15.3 (Debian 15.3-1.pgdg110+1) dump

\connect "issuerApp";

CREATE SEQUENCE "IssuerRegister_id_seq" INCREMENT  MINVALUE  MAXVALUE  CACHE ;

CREATE TABLE "public"."IssuerRegister" (
    "id" integer DEFAULT nextval('"IssuerRegister_id_seq"') NOT NULL,
    "familyName" character varying,
    "firstName" character varying,
    "email" character varying,
    "password" character varying,
    CONSTRAINT "IssuerRegister_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "IssuerRegister" ("id", "familyName", "firstName", "email", "password") VALUES
(2,	NULL,	NULL,	NULL,	NULL),
(123,	'Rossi',	'Mario',	'm',	'm');

CREATE SEQUENCE credential_request_personalid_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 5 CACHE 1;

CREATE TABLE "public"."credential_request" (
    "personalid" integer DEFAULT nextval('credential_request_personalid_seq') NOT NULL,
    "personalidfk" integer NOT NULL,
    "dateofbirth" date NOT NULL,
    "familyname" character varying NOT NULL,
    "firstname" character varying NOT NULL,
    "gender" character varying NOT NULL,
    "nameandfamilynameatbirth" character varying NOT NULL,
    "placeobirth" character varying NOT NULL,
    "status" boolean
) WITH (oids = false);

INSERT INTO "credential_request" ("personalid", "personalidfk", "dateofbirth", "familyname", "firstname", "gender", "nameandfamilynameatbirth", "placeobirth", "status") VALUES
(1,	123,	'1990-03-03',	'a',	'b',	'm',	'c',	'd',	't'),
(2,	123,	'1990-03-03',	'a',	'b',	'm',	'c',	'd',	't'),
(3,	123,	'1990-03-03',	'a',	'b',	'm',	'c',	'd',	't'),
(4,	123,	'1990-03-03',	'a',	'b',	'm',	'c',	'd',	't'),
(5,	123,	'1990-03-03',	'a',	'b',	'm',	'c',	'd',	't');

ALTER TABLE ONLY "public"."credential_request" ADD CONSTRAINT "credential_request_personalidfk_fkey" FOREIGN KEY (personalidfk) REFERENCES "IssuerRegister"(id) NOT DEFERRABLE;

-- 2023-06-15 10:04:01.507076+00
