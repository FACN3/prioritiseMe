# prioritiseMe
Prioritise Me is a To-Do app which implements a database.

## How to use the site:

1) Clone the repository:

```git clone https://github.com/FACN3/prioritiseMe.git```

2) To open the site type inside the directory of the cloned repository:

```npm run dev```

3) The site should reply with a link and a message that it has opened on port 3000.

4) Enjoy!

## WHO
Sami

Idan

Neil

## USER STORIES
As a user I want to write an entry in a todo app

As a user I want to set a priority for my entry

As a user I want to know how long I have been in the process of doing the todo entry

As a user I want the ability to delete entries

As a user I want to select my username and see previously entered todos

## HOW
Prioritise Me will create a database, which will contain a schema seperating tables into a user table and a task table.

A server will connect to the database and via queries, pull data from the database and display it via a DOM function.



## ARCHITECTURE MAP
### Frontend Design
![alt text](https://user-images.githubusercontent.com/26359601/33603904-d4d5f418-d9bc-11e7-8560-059b2a9648a2.jpeg)
### Architecture Map
![alt text](https://user-images.githubusercontent.com/26359601/33603911-da18bc08-d9bc-11e7-9f5d-766948c8580f.jpeg)
### Schema
![alt text](https://user-images.githubusercontent.com/26359601/33603919-e223dae0-d9bc-11e7-8be4-c4c6fc49d2eb.png)

## PLAN
* Write readme
* Write skeleton files and folders
* Write index.html
* Write all functions (server, router, fetch, handler, queries, build_script, dom)
* Server testing
* Script injection protection
* Db testing
* Heroku db implementation
* Travis
* Mobile first css



## STRETCH GOALS

Implement a start/stop button on the website which will modify the task table in the database and create a value which shows how long the tasks has been in process for. 

## LESSONS LEARNT
