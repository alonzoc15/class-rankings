create table class_status (
    id serial primary key, 
    status_title text not null, 
    rank integer);

insert into class_status (status_title, rank) 

values 
    ('Awesome', 5), 
    ('Great', 4),
    ('Good', 3),
    ('Okay', 2),
    ('Poor', 1),
    ('Unranked', 0);

create table topics (
    id serial primary key, 
    topic_name text not null,
    status_id INTEGER REFERENCES class_status (id)
);

insert into topics
    (topic_name, status_id)
values
    ('HTML', 6),
    ('CSS', 6),
    ('Javascript', 6),
    ('PostgreSQL', 6),
    ('Node', 6),
    ('Express', 6);