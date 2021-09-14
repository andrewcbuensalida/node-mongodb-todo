#!/bin/bash

#give permission for everything in the express-app directory
sudo chmod -R 777 /home/ec2-user/todo

#navigate into our working directory where we have all our github files
cd /home/ec2-user/todo

#add npm and node to path
export NVM_DIR="$HOME/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)

#install node modules
npm install
npm install forever -g

# # install this for puppeteer on node on linux
# sudo amazon-linux-extras install epel -y
# sudo yum install -y chromium

#start our node app in the background
# node server.js > server.out.log 2> server.err.log < /dev/null & 
forever start script.js