# Silverback
Silverback is our admin dashbaord for monkeys. It's purpose is to provide admin controls for different services to the admin user.

## Running the project (without docker/podman)

Using Makefile
```sh
make dev
```

Manually 
```sh
python manage.py runserver
```

## Running the project (without docker/podman)
If you have either docker or podman installed you can run the container using.

NOTE: Docker and podman container deploy application with production settings, for development purpose please setup python and uv.
```sh
make run-container
```
