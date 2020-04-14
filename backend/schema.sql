--
-- PostgreSQL database dump
--

-- Dumped from database version 11.7 (Debian 11.7-0+deb10u1)
-- Dumped by pg_dump version 11.7 (Debian 11.7-0+deb10u1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: participants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.participants (
    uuid text,
    fname text,
    lname text,
    dname text,
    mail text
);


ALTER TABLE public.participants OWNER TO postgres;

--
-- Name: stations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stations (
    stationid integer NOT NULL,
    jumphost text,
    net inet,
    password text NOT NULL,
    participant text,
    notes text
);


ALTER TABLE public.stations OWNER TO postgres;

--
-- Name: status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.status (
    stationid integer,
    title text,
    description text,
    status text,
    task text,
    participantid text
);


ALTER TABLE public.status OWNER TO postgres;

--
-- Name: tasks; Type: TABLE; Schema: public; Owner: kly
--

CREATE TABLE public.tasks (
    seq integer,
    shortname text,
    name text,
    description text
);


ALTER TABLE public.tasks OWNER TO kly;

--
-- Name: timeslots; Type: TABLE; Schema: public; Owner: kly
--

CREATE TABLE public.timeslots (
    participant text,
    startt timestamp with time zone,
    endt timestamp with time zone,
    stationid integer
);


ALTER TABLE public.timeslots OWNER TO kly;

--
-- Name: puniq; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX puniq ON public.participants USING btree (uuid);


--
-- PostgreSQL database dump complete
--

