# Race Data Website

This project displays data from a hypothetical race, and continually updates the
data using jQuery's update and load methods. Users can add new racer data to be
added to the database and the display.

The project originated from code found in [Head First jQuery](http://www.headfirstlabs.com/books/hfjquery/),
chapters 8 and 9. This was a good opportunity to use those methods and to customize
the look of the resulting site. I also appreciated the opportunity to try out mySQL.

-------------------------
To run this project:

1. Check out the repository:

  ```bash
  $> git clone https://github.com/ethyl2/race-site
  ````

2. Run a local server. Normally, I like using the python SimpleHTTPServer, but
it is not configured to run php files by default. Instead, you can use the php
webserver instead.

  PHP 5.4 or greater is needed. To see what version you have installed:

  ```bash
  $> php -v
  ```
  If you need to install PHP 7.1:

  ```bash
  $> sudo apt-get install python-software-properties
  $> sudo add-apt-repository ppa:ondrej/php
  $> sudo apt-get update
  $> sudo apt-get install -y php7.1
  $> php -v
  ```
  Now you are ready:

  ```bash
  $> cd /path/to/your-project-folder
  $> php -S localhost:8080
  ```

3.  Open a browser and visit localhost:8080.

  Alternatively:

  ```bash
  $> open "http://localhost:8080"
  ```
4. Set up your database, table, and users.

In the terminal, log in as the root user:
  ```bash
  $> mysql -u root -p
  ```
Run the following SQL:
  ```bash
  create database hfjq_race_info;
  CREATE USER 'runner_db_user'@'localhost' IDENTIFIED BY 'runner_db_password';
  GRANT SELECT,INSERT,UPDATE,DELETE ON hfqu_race_info.* TO 'runner_db_user'@'localhost';

  use hfjq_race_info;

  CREATE TABLE runners(
    runner_id INT not null AUTO_INCREMENT,
    first_name VARCHAR(100) not null,
    last_name VARCHAR(100) not null,
    gender VARCHAR(1) not null,
    finish_time VARCHAR(10),
    PRIMARY KEY (runner_id)
  );
  ```
5. Add the data you already have for the runners into the database. Insert one record at a time.
  Here's an example:

  ```bash
  insert into runners (first_name, last_name, gender, finish_time) values ('John', 'Smith', 'm', '25:54');
  ```
