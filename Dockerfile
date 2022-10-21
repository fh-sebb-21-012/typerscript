FROM busybox:1.35

RUN adduser -D typerscript
USER typerscript

WORKDIR /home/typerscript
COPY . .
CMD ["busybox", "httpd", "-f", "-v", "-p", "80"]
