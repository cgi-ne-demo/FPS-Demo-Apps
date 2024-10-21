# See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

# This stage is used when running from VS in fast mode (Default for Debug configuration)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
ARG PORT=8080
ENV ASPNETCORE_URLS=http://+:${PORT}
EXPOSE ${PORT}
# EXPOSE 8081

# This stage is used to build the service project
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
ARG PROJECT_NAME=Contacts.API
WORKDIR /src
COPY ["src/${PROJECT_NAME}/${PROJECT_NAME}.csproj", "src/${PROJECT_NAME}/"]
RUN dotnet restore "./src/${PROJECT_NAME}/${PROJECT_NAME}.csproj"
COPY . .
WORKDIR "/src/src/${PROJECT_NAME}"
RUN dotnet build "./${PROJECT_NAME}.csproj" -c $BUILD_CONFIGURATION -o /app/build

# This stage is used to publish the service project to be copied to the final stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
ARG PROJECT_NAME=Contacts.API
RUN dotnet publish "./${PROJECT_NAME}.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# This stage is used in production or when running from VS in regular mode (Default when not using the Debug configuration)
FROM base AS final
WORKDIR /app
ARG PROJECT_NAME=Family.API
ENV PROJECT_NAME_ENV="${PROJECT_NAME}.dll"
COPY --from=publish /app/publish .
ENTRYPOINT dotnet ${PROJECT_NAME_ENV}
