# TyperScript

## Serve instructions

### Serve using docker

The webserver is configured to run at port 80 internally.
You can bind any port to the container by using `-p xxxx:80` like in the example below.

#### Cloning the Project
Get the source files with `git clone https://github.com/h45h74x/typerscript` or the download button.

Then `cd` into the project directory.

#### Building the image
`docker build -t typerscript:latest .`

#### Running the image
`docker run --rm --init -p 8080:80 typerscript:latest`

#### Accessing the webpage
Once the webserver is up, the page can be accessed by browsing to [http://localhost:8080](http://localhost:8080)


### Serve using docker-compose

The webserver is configured to run at port 80 internally.
You can bind any port to the container by changing the binding in the `docker-compose.yml` file.

#### Cloning the Project
Get the source files with `git clone https://github.com/h45h74x/typerscript` or the download button.

Then `cd` into the project directory.

#### Building and running the image
Run `docker-compose up` in the project directory.

#### Accessing the webpage
Once the webserver is up, the page can be accessed by browsing to [http://localhost:8080](http://localhost:8080)

