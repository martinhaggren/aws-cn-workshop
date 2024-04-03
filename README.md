# Edument AWS Workshop
This is the repository for the sample application implemented during the Edument workshop __Cloud Native Application Development with AWS Container Services__.

See `EXERCISES.md` for the list of exercises.

## Further reading

### Cloud native

[The twelve-factor app](https://12factor.net/)

[CNCF Cloud Native Glossay](https://glossary.cncf.io/cls)

### Docker
[docker.com](https://www.docker.com/)

[Documentation](https://docs.docker.com/)

[Docker Hub](https://hub.docker.com)

### AWS Copilot

[On AWS](https://aws.amazon.com/containers/copilot/)

[On GitHub](https://github.com/aws/copilot-cli)


### Axios
[Axios request example](https://github.com/axios/axios?tab=readme-ov-file#example)


## Useful commands

### Docker
```
# List all images
docker image ls

# List all containers
docker ps -a

# Remove all containers 
docker rm $(docker ps -a -q)

# Remove all images
docker rmi $(docker images -q)

```

### curl
```
# POST request
curl -X POST http://__HOST__/content

# POST request
curl http://__HOST__/healthz

```


