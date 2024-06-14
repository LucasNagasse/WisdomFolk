drop database if exists WisdomFolk;
create database WisdomFolk;

use WisdomFolk;

create table User (
  id int primary key auto_increment,
  createdAt datetime default current_timestamp,
  deleted boolean default 0,
  name varchar(80) not null unique,
  email varchar(80) not null unique,
  password varchar(256) not null,

  constraint unqUser unique (name, deleted)
);
create table Folk (
  id int auto_increment,
  createdAt datetime default current_timestamp,
  deleted boolean default 0,
  name varchar(80) not null unique,
  fkOwner int,
  fkFolk int,

  constraint unqFolk unique (name, deleted),
  constraint pkFolk primary key (id, fkOwner),
  constraint FolkFkOwner foreign key (fkOwner) references User(id),
  constraint FolkFkFolk foreign key (fkFolk) references Folk(id)
);
create table FolkHasUser (
  createdAt datetime default current_timestamp,
  fkFolk int,
  fkUser int,

  constraint pkFolkHasUser primary key (fkFolk, fkUser),
  constraint FolkHasUserFkFolk foreign key (fkFolk) references Folk(id),
  constraint FolkHasUserFkUser foreign key (fkUser) references User(id)
);
create table Post (
  id int auto_increment,
  createdAt datetime default current_timestamp,
  deleted boolean default 0,
  content varchar(2000) not null,
  fkFolk int,
  fkAuthor int,
  fkPost int,

  constraint pkPost primary key (id, fkFolk),
  constraint PostFkFolk foreign key (fkFolk) references Folk(id),
  constraint PostFkAuthor foreign key (fkAuthor) references User(id),
  constraint PostFkPost foreign key (fkPost) references Post(id)
);

select * from User;
select * from Folk;
select * from Post;
select * from FolkHasUser;
