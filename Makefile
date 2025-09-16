dev:
	python manage.py runserver

migrate:
	python manage.py migrate

# Check if podman is present, if not default to docker
ifeq (, $(shell which podman))
CONTAINER_CMD=docker
else
CONTAINER_CMD=podman
endif

run-container:
	$(CONTAINER_CMD) compose up

