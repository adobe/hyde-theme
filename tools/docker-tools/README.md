# Using the docker image

## Setup

### Install Docker

If you don't already have docker installed, [install Docker](https://docs.docker.com/get-docker/).

## Updating the docker image

To build the docker image, first update the VERSION variable below (please use semantic versioning). Add a [release note](#release-notes).

```
VERSION="1.0.1"
echo $VERSION > ./tools/docker-tools/VERSION

# build the base image, no-cache is used so the latest tools are installed
docker build --no-cache --file ./tools/docker-tools/Dockerfile --target base \
    --tag hyde-theme-tools .

# update the docs environment
docker run --mount type=bind,source="$(pwd)",target=/mnt/host \
    --tty --interactive hyde-theme-tools bash

# from docker prompt
cd /mnt/host
./tools/update.sh --lock
exit

# build the final image
docker build --file ./tools/docker-tools/Dockerfile --target full --tag hyde-theme-tools .

```

## Running the Docker image

To run the docker image, execute the following.

```
docker run --mount type=bind,source="$(pwd)",target=/mnt/host \
    --tty --interactive  \
    hyde-theme-tools bash
```

This should leave you at bash prompt that looks like:

```
app@fc7590a63ba3:~$
```

The hex number is the docker image container ID and may be different. Going forward I refer to this as the _docker_ prompt to distinguish it from the _local_ promt.

## Building the gem

Update the version number in the `.gemspec` file.

```bash
cd /mnt/host
bundle update
gem build jekyll-theme-adobe-hyde
```

To build or rebuild the complete documentation site locally execute the following from the docker prompt:

```
cd /mnt/host
./tools/start.sh
```

To push the theme (replace <version> with .gem version).

```bash
gem push jekyll-theme-adobe-hyde-1.0.0.gem
```

## Run a local server for the site

Once the site has been prepared, you can run it to see how it looks. From the docker promt enter:

```
cd /mnt/artemis
./tools/docs/start.sh
```

To view the site, open a browser to `http://localhost:3000`. The site will auto rebuild and refresh as files are changed. The [Atom editor](https://atom.io/) has a nice [language package for markdown](https://atom.io/packages/language-markdown) that understand the YAML front matter that Jekyll uses, as well as a core package for markdown previews that uses the github style (great for editing readme files).

### Release Notes

- 1.0.0 - Initial release for jekyll
- 1.0.1 - Update to bring gem to 1.0
