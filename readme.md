Licensed under an AGPL open source licence

# Junto Web Application #

discover and connect with others with similar intent

## GETTING ON THE SAME PAGE ABOUT THE PROJECT ##

https://github.com/metamaps/junto/wiki

## GETTING SET UP TO DEV ##

To get this going::

clone this directory, enter the directory
```
git clone git@github.com:metamaps/junto.git
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

Navigate your browser to `http://localhost:4000`

Changing code within `lib` or within `less` or within `server` will all restart the server or refresh the page automagically. 

Once you've made your changes, from your computer terminal run
```
git add .
git commit -m "write an overview of what you changed here"
git pull --rebase origin master
git push origin master
```

Talk to Connor about deploying juntolive

