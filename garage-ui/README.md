# garageOwnerUi
Insert the purpose of this project and some intersting infos here


# Using Docker
To use ui5 serve in docker will need to edit the start script to allow remote connections. Open Package.json and modify the line of npm start script, from this
~~~
"start": "ui5 serve --config=uimodule/ui5.yaml  --open index.html",
~~~
to this.( This step was already done for this project)
~~~
"start": "ui5 serve --config=uimodule/ui5.yaml -o index.html --accept-remote-connections",
~~~

## Building the container and running the project

Now we will need to build the image and use docker-compose to start the container.
~~~
docker-compose up -–build
~~~

Open the application in your browser.

~~~
http://localhost:8080/index.html
~~~


## Credits
This project has been generated with 💙 and [easy-ui5](https://github.com/SAP)
