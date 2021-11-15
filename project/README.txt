ASteps to run UI server:Nginx
    1. docker pull nginx:1.15
    2. cd project  #where parent folder of ui
    3. docker run -d --name nginx --rm -p 80:80 -v $(pwd)/ui:/usr/share/nginx/html nginx:1.15

Steps to start the django server
    1. cd docker-api
    2. docker build . -t apiserver:latest
    3. cd ../
    4. docker run -p 8000:8000 -v $(pwd):/home/app -d --name apiserver apiserver:latest


Open the UI from http://127.0.0.1/




Steps to Stop and removing the servers

docker stop nginx apiserver
docker rm nginx apiserver


