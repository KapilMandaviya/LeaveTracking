# Use the official .NET image as a base for runtime
FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
ENV ASPNETCORE_ENVIRONMENT=Development
WORKDIR /app
EXPOSE 80
EXPOSE 443  

# Use the official .NET SDK image for building
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src

# Copy the .csproj files first to leverage Docker's cache and restore dependencies
COPY ["LeaveTrackingApp/LeaveTrackingApp.csproj", "LeaveTrackingApp/"]
COPY ["LeaveTracking.Data/LeaveTracking.Data.csproj", "LeaveTracking.Data/"]
COPY ["LeaveTracking.Repository/LeaveTracking.Repository.csproj", "LeaveTracking.Repository/"]

# Restore dependencies (via 'dotnet restore')
RUN dotnet restore "LeaveTrackingApp/LeaveTrackingApp.csproj"

# Copy the entire source code into the container
COPY . .

# Set the working directory to the application folder
WORKDIR "/src/LeaveTrackingApp"

# Build the application
RUN dotnet build "LeaveTrackingApp.csproj" -c Release -o /app/build

# Publish the application
FROM build AS publish
RUN dotnet publish "LeaveTrackingApp.csproj" -c Release -o /app/publish

# Set up the runtime image to serve the app
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Set the entry point to run the application
ENTRYPOINT ["dotnet", "LeaveTrackingApp.dll"]
