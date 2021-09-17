#!/bin/bash

# #give permission for everything in the express-app directory
# sudo chmod -R 777 /tmp/todo

# #navigate into our working directory where we have all our github files
# cd /tmp/todo

# #add npm and node to path
# export NVM_DIR="$HOME/.nvm"	
# [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
# [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)


#Stopping existing node servers
echo "Stopping any existing node servers new from vs code"
pkill node

# echo "stopping forever 1"
# npm install forever -g
forever stopall