FROM busybox:1.35

RUN adduser -D typerscript
USER typerscript

WORKDIR /home/typerscript
COPY ./src .
CMD ["busybox", "httpd", "-f", "-v", "-p", "80"]
