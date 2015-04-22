Licensed under an AGPL open source licence

# Junto JS Library #

## GETTING SET UP TO DEV ##

To get this going::

clone this directory, enter the directory
```
cd junto
```

Install node v0.10.35 via the website http://nodejs.org/

or via cmd line
```
sudo apt-get install nodejs -y
sudo apt-get install npm -y
ln -fs /usr/bin/nodejs /usr/bin/node
```

Install bower for front-end dependencies, grunt for a local server
```
npm install -g bower grunt-cli
```

Actually download the front-end, and server dependencies, and move some of them (grunt init)
```
npm install && bower install && grunt init
```

Run the development servers
```
grunt serveReload
```
