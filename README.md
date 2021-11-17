https://www.youtube.com/watch?v=5QEwqX5U_2M codedamn
trying to deploy through elastic beanstalk but asking for a local source code file
not github. so i just selected script.js. takes forever to build environment.
lightsail has $3.5 per month.
trying amplify with no monorepo, but webpage cant be found.
best way might be ec2. ubuntu. install node. change port to 4000. then security
group allow 4000. clone. checkout branch. npm i forever -g, then
sudo forever start script.js
to get the url todo.anhonestobserver.com, follow
https://stackoverflow.com/questions/19349287/route-53-record-set-on-different-port
buy a domain name in route 53, then create an s3 bucket for both naked and www,
then hosted zone create record type a pointing to bucket. bucket should be pointing
to todoapp.anhonestobserver.com:4000.
interesting, tried front end on amplify and crud to the backend in ec2 node
it functions but doesnt persist upon refreshing page.
to get rid of the :4000 at the end of the url, might have to set port to
process.env.port || 4000 instead of just 4000.
try elastic beanstalk next time with code pipeline
https://www.youtube.com/watch?v=b0g-FJ5Zbb8
or ec2 again but with codedeploy but might be overly complicated.
https://www.youtube.com/watch?v=Buh3GjHPmjo
next day, alias doesnt point to the url. turns out, just needed to clear chache
on local browser. best so far is amplify.

This is from a code along from https://www.youtube.com/watch?v=5QEwqX5U_2M&t=1980s
Check out my live app at http://todo.anhonestobserver.com js
Tech stack is node, express, mongodb, mongoose, ec2 ubuntu, s3
I am for hire. Email me at andrewcbuensalida@gmail.com
Trying codedeploy scripts setup
https://docs.aws.amazon.com/codedeploy/latest/userguide/tutorials-on-premises-instance-2-create-sample-revision.html

for the ec2 script to install code deploy, yum doesnt work, so exchange with apt-get, thats because the image
i picked was ubuntu, not amazon linux
felix yu method works, able to push from vs code to github to ec2, even forever. only one forever process running even
with multiple deploys, which is good. im not sure if it will work if there are major changes though. tweaked application start
a bit to do forever intead of node
https://www.youtube.com/watch?v=Buh3GjHPmjo&t=842s

learning a little about linux helped
https://www.youtube.com/watch?v=kyt1xAlXITE&list=PLT98CRl2KxKHaKA9-4_I38sLzK134p4GJ&index=10

trying docker with https://www.youtube.com/watch?v=PgR3Wc4_X1g&list=PLT98CRl2KxKECHltRib03tG8pyKEzwf9t&index=3
my docker started enabled and active though.
https://www.youtube.com/watch?v=iqqDU2crIEQ&t=1002s
with docker, no need for nginx to remove the port at the end of url.
https://www.youtube.com/watch?v=9zUHg7xjIqQ
used node as the base image
an image is the template for the container, a container is an instance of the image.
Dockerfile are the instructions to build an image.
docker-compose.yml are the instructions to run a container, it builds the image first if there are none.
tag is the name of the image. name is the name of the container.
docker images to see images, docker ps to see containers
docker build -v %cd%:/app .... didnt work so tried ${pwd} instead of %cd%
in package.json, had to do "dev": "nodemon script.js"
in dockerfile, had to do
FROM node:15
WORKDIR /app
COPY package.json .
RUN npm install
COPY . ./
EXPOSE 4000
CMD ["npm", "run", "dev"]
in shell, had to do docker run -v C:\swe\node-express-mongo-mongoose-todo-ec2\node-mongodb-todo:/app -d -p
4000:4000 --name todo andrewcbuensalida/todo:1.0
OR can do ${pwd} instead of long file path
there's a ten second delay from when you run to when it loads in the browser.
there has to be node_modules in local though. that's because it's in sync with local. to delete node_modules on local machine and still make the container work, have to run it like this docker run -v ${pwd}:/app -v /app/node_modules -d -p 4000:4000 --name todo andrewcbuensalida/todo:1.0
the extra -v /app/node_modules is anonymous and more specific, and therefore is not synchronized. called a bind mount.
to check inside container, docker exec -it <container id> bash
to install docker-compose on linux, https://docs.docker.com/compose/install/

.dockerignore is to ignore files furing the build.

install docker for ubuntu with https://get.docker.com/
sometimes have to use sudo before a docker command. if thats the case, https://stackoverflow.com/questions/48957195/how-to-fix-docker-got-permission-denied-issue to solve.
need to install docker-compose on ubuntu too, dont forget. and also docker swarm init.

build in the docker-compose refers to dockerfile. docker-compose overrides dockerfile if --build is used.
in the docker-compose command, placing of the options(aka flags) is important. the -f flag should be between docker-compose and file name, then up, then -d. when doing docker-compose up without specifying -f, default will run docker-compose.yml, even if there's docker-compose.prod.yml. can add more than one -f as long as indentation is correct.
docker stack deploy runs the deploy section in docker-compose

before running docker stack deploy (aka docker swarm), image has to be built already.
running docker-compose up when there's a deploy section in docker-compose file runs the deploy. and cant have container_name if it has a deploy section. also, running deploy via docker-compose up doesnt show stack info, although it does deploy and replicate.
no such thing as 'any' for restart policy so changed it to always
dont even need to specify port in docker-compose nodeservice. actually you shouldnt if scaling via deploy replicas.
cant have restart policy in swarm mode.

trying this certbot with nginx docker container https://pentacent.medium.com/nginx-and-lets-encrypt-with-docker-in-less-than-5-minutes-b4b8a60d3a71
DID NOT WORK!
now trying https://www.youtube.com/watch?v=zJPlyjfV4C0
now trying https://www.youtube.com/watch?v=YKH2RwHqOck to get into nginx container, had to do docker exec -it 2f /bin/sh
discovered nginx docker container is runnign on alpine linux, which doesnt have apt or yum. now following https://www.cyberciti.biz/faq/how-to-install-letsencrypt-free-ssltls-for-nginx-certificate-on-alpine-linux/ didnt work so now trying https://medium.com/@agusnavce/nginx-server-with-ssl-certificates-with-lets-encrypt-in-docker-670caefc2e31
this works https://pentacent.medium.com/nginx-and-lets-encrypt-with-docker-in-less-than-5-minutes-b4b8a60d3a71
just had to follow to file naming convention, and be careful of what branch git you're on, and if the docker image is up to date. the docker-compose doesnt have to be up when running the init-letsencrypt.sh.

all working, https, proxy, except its not cicd. might need watchtower(auto pull from dockerhub to ec2) for that, or kubernetes. and paid membership in dockerhub to automate github to dockerhub.
when restarting ec2 instance, doesnt automatically restart. have to cd into app folder then docker-compose up -d but then its not working. because ip address changes. just have to go to route 53 and update. wait about 1 minute to take effect.

NOW MIGRATING TO EC2 WITH DOCTORDB

sudo cp /etc/nginx/sites-available/doctordb.anhonestobserver.com.conf /etc/nginx/sites-available/todo.anhonestobserver.com.conf
sudo nano /etc/nginx/sites-available/todo.anhonestobserver.com.conf
server {
server_name todo.anhonestobserver.com www.todo.anhonestobserver.com;

    location / {
        proxy_pass http://localhost:3500/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

}
have to do the sim link thing sudo ln -s /etc/nginx/sites-available/todo.anhonestobserver.com.conf /etc/nginx/sites-enabled/
check if it's working with sudo systemctl reload nginx
setup route 53, then certbot
sudo login to docker in ec2
set environment variables then reset docker.
for environment variables, this didnt seem to work. set it in ec2 by opening the hidden .bashrc in ~ directory with sudo nano .bashrc
then put this at the bottom
export DBPW_TODO=<passowrd>
export MONGO_INITDB_ROOT_PASSWORD=<password>
then sudo source ~/.bashrc
what worked for environment vairables is having a .env in the same folder as docker-compose.yml
install docker with sudo apt install docker.io
then sudo apt install docker-compose
sudo docker login
run the todo container and mongo container with:
create or pull from github docker-compose.yml
sudo docker-compose up -d
remove the -d if you want to see the console.logs within the containers.
to detach from container,

to list open docker containers, docker ps -a
to kill, docker rm -f <container-name> OR
to see open ports, sudo ss -tulpn | grep LISTEN
or ps aux | grep <name of process>
a means all users, u means the user of the process, x means processes not attached to a terminal
then to kill process, kill -9 <PID>

for watchtower (the container that checks docker to see if there are new images and pulls them)
docker run -d --name watchtower -e WATCHTOWER_TRACE=true -e WATCHTOWER_DEBUG=true -e WATCHTOWER_POLL_INTERVAL=1 -v /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower todo mongo
so now workflow is docker build -t andrewcbuensalida/todo:1.0 . , then docker push andrewcbuensalida/todo:1.0 no more github (unless you want people to see work).
swarm isnt really cicd thing that automatically deploys if gh or dh updates. its more of rolling deployment manually.
with watchtower, the down time was like 3 seconds.
i dont think watchtower restarts if server gets rebooted.

to check memory of linux, free -h
to check hard disk space, df -h

one day trying to build docker on local, says cannot find file and deamon not running. had to delete
C:\Users[USER]\AppData\Local\Docker
C:\Users[USER]\AppData\Roaming\Docker
C:\Users[USER]\AppData\Roaming\Docker Desktop
https://forums.docker.com/t/docker-failed-to-initialize/111341/13
and reinstall docker desktop.

now trying typescript https://www.youtube.com/watch?v=BwuLxPH8IDs
to auto compile on save and save directory, tsc --init
then tsc -w
