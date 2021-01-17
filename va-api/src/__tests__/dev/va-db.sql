-- connect as root
-- create user va with CREATEDB;

-- reconnect as user va
create database va encoding = 'UTF-8';
use va;

drop table if exists vaccination;

create table vaccination (
id varchar(11) not null primary key,
province varchar(2) not null,
population int not null,
firstDoses int not null,
secondDoses int not null,
received int not null);

drop table if exists userProfile;

create table userProfile (
id varchar(11) not null primary key,
province varchar(2) not null,
age int not null,
homeCare boolean null,
healthCare boolean null,
indigenous boolean null,
congregated boolean null,
essential boolean null,
frontline boolean null,
pregnant boolean null,
email varchar(150) null,
);

drop table if exists location;

create table location (
id varchar(11) not null primary key,
name varchar(200) not null,
address varchar(2000) not null,
phone varchar(20) not null,
lat decimal(10,8) not null,
lng decimal(11,8) not null,
url varchar(3000) not null
);

create table SmsSubscription (
  phoneNumber varchar(50) not null
);

create table EmailSubscription (
  email varchar(100) not null
);

create table BrowserSubscription (
  deviceToken varchar(500) not null
);
