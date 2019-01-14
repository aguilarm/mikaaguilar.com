FROM alpine:latest

COPY . /mnt/project

RUN cd /mnt && tar -czf project.tar.gz project && rm -rf /mnt/project

# Init container will add mnt to srv where an emptydir volume mount is created
CMD ["time", "/bin/sh", "-c", "time mv /mnt/project.tar.gz /srv/project.tar.gz && time mkdir -p /srv/project && time tar -xzf /srv/project.tar.gz -C /srv && time rm -rf /srv/project.tar.gz"]