-- connect as root
-- create user va with CREATEDB;

-- reconnect as user va
create database va encoding = 'UTF-8';
use va;

create table vaccination (
id varchar(11) not null primary key,
province varchar(2) not null,
population int not null);
