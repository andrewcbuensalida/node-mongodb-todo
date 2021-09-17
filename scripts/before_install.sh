#!/bin/bash

#download node and npm
# curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
# . ~/.nvm/nvm.sh
# nvm install node

#create our working directory if it doesnt exist
export FOLDER=/tmp/todo
if [ -d $FOLDER ]
then
  rm -rf $FOLDER
fi

mkdir -p $FOLDER