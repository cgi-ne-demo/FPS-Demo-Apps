To build a Docker image for each project under the `src` directory in your workspace, you can use the following command: Use different ports for each api project

```shell
docker build --build-arg PORT=<port> --build-arg PROJECT_NAME=<project_name> -t <image_name>:<tag> .
```

e.g for building Family.API project under the src directory from the root of the project 
```shell
docker build --no-cache  --build-arg PORT=7080 --build-arg PROJECT_NAME=Family.API -t eec-demo/family-api .
```

Replace `<project_name>` with the name of the project you want to build, `<image_name>` with the desired name for your Docker image, and `<tag>` with the desired tag (e.g., `latest`).

Login to retrieve an authentication token and authenticate your Docker client to your registry, use the AWS CLI:

```shell
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin XXXXXXXXX.dkr.ecr.us-east-1.amazonaws.com
```

Note: If you receive an error using the AWS CLI, make sure that you have the latest version of the AWS CLI and Docker installed.

After the build completes, tag your image so you can push it to the repository:

```shell
docker tag eec-demo/<project_name>:latest XXXXXXXXX.dkr.ecr.us-east-1.amazonaws.com/eec-demo/<project_name>:latest
```

To push the image to your newly created AWS repository, run the following command:

```shell
docker push XXXXXXXXX.dkr.ecr.us-east-1.amazonaws.com/eec-demo/<project_name>:latest
```
