#!/bin/bash
#INSTRUCTIONS: 
# 1. $ chmod u+x init.sh 
# 2. $ ./init.sh
# 3. $ sudo npm install  $ bower install  $ git init
mkdir public
mkdir public/libs
mkdir public/styles
mkdir public/views
mkdir public/js
mkdir app
touch public/index.html
touch server.js

echo '# README.md' > README.md
echo '{
  "directory": "public/libs"
}' > .bowerrc

echo '.DS_STORE
public/libs
node_modules
npm-debug.log
tests' > .gitignore

echo '{
  "name": "ratingSystem",
  "description": "",
  "version": "0.0.1",
  "private": true,
  "dependencies": {
    "express": "3.x"
  },
  "authors": [
    "Michael Tseng"
  ]
}' > package.json

echo '{
  "name": "ratingSystem",
  "version": "0.0.1",
  "authors": [
    "Michael Tseng"
  ],
  "main": "index.html",
  "license": "MIT",
  "private": true,
  "dependencies": {
    "backbone": "latest" 
  }
}' > bower.json

