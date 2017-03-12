#Race Data Website

This project displays data from a hypothetical race, and continually updates the
data using jQuery's update and load methods.

The project originated from code found in [Head First jQuery](http://www.headfirstlabs.com/books/hfjquery/),
chapter 8. This was a good opportunity to use those methods and to customize
the look of the resulting site.

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
