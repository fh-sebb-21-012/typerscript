# Development

## Prerequisites

### Cloning the Project

Get the source files with `git clone https://github.com/h45h74x/typerscript` or the download button and `cd` into the
project directory.

## Hosting the webpage

### Host using docker

1. Build the image with `docker build -t typerscript:latest .`
2. Run the image using `docker run --rm --init -p 8080:80 typerscript:latest`

### Host using docker-compose

The webserver is configured to run at port 80 internally.
You can bind any port to the container by changing the binding in the `docker-compose.yml` file.

1. Build and run the image with `docker-compose up`

### Host with a webserver

TyperScript can also be hosted using any webserver.

For example, it can be hosted with busybox's httpd server:

```shell
cd ./src
busybox httpd -fvp 8080
```

## Accessing the webpage

Once the webserver is up, the page can be accessed by browsing to [http://localhost:8080](http://localhost:8080),
depending on the port you specified
