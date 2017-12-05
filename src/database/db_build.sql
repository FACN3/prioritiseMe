BEGIN;

DROP TABLE IF EXISTS tasks, users cascade;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  description TEXT NOT NULL,
  priority INTEGER,
  time_started TIMESTAMP,
  time_finished TIMESTAMP,
  user_id INTEGER REFERENCES users(id)
);


INSERT INTO users (name) VALUES
('Idan'),
('Sami'),
('Neil');

INSERT INTO tasks (description, priority, time_started, time_finished, user_id)
VALUES ('wash the dog', 1, '2017-12-16 06:00:00', '2017-12-16 06:00:00',  1),
('working out', 2, '2017-12-16 06:00:00', '2017-12-16 06:00:00', 1),
('do my homework', 2, '2017-12-16 06:00:00', '2017-12-16 06:00:00', 2),
('play guitar', 3, '2017-12-16 06:00:00', '2017-12-16 06:00:00', 3);



COMMIT;
