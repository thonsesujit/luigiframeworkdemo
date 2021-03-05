# Demo Luigi application written in OpenUI5

## Overview

This is the OpenUI5-based sample application which runs with the Luigi framework.


## Development
This demo is ment to be run in a docker container. Follow folling steps
1.  Dockerize main application. So on the root folder run following commands.
~~~
cd luigi-example-openui5
~~~

~~~
docker build -t luigi/luigi-mainapplication:latest .
~~~

~~~
docker run --name luigi-demo-mainapplication-ui5 -p 8081:8080 -d luigi/mainapplication
~~~

2.  Dockerize 'oder details' application. So on the root folder run following commands.
~~~
cd ui5-mf
~~~

~~~
docker build -t luigi/luigi-oderdetails:latest .
~~~

~~~
docker run --name order-details-ui5 -p 8082:8080 -d luigi/luigi-oderdetails
~~~

3.  Dockerize garage-app application. So on the root folder run following commands.
~~~
cd garage-ui
~~~

~~~
docker build -t luigi/luigi-garage-app:latest .
~~~

~~~
docker run --name garage-app-ui5 -p 8083:8080 -d luigi/luigi-garage-app
~~~

4.  Dockerize supplier-ui application. So on the root folder run following commands.
~~~
cd supplier-ui
~~~

~~~
docker build -t luigi/luigi-supplier-ui:latest .
~~~

~~~
docker run --name suppleir-app-ui5 -p 8084:8080 -d luigi/luigi-supplier-ui
~~~

Now the core application will be accessible via http://localhost:8180/index.html

It also possible to run individual application using node. Open individual folders, i.e, garage-ui, luigi-example-openui5, supplier-ui and ui5-mf. And follow folling steps. note: Here additional configurations is required for running the microfrontends. ref : https://luigi-project.io/

1. Install Dependencies
    ```bash
    npm install
    ```

2. Run the server with the following command:
    ```bash
    npm start
    ```

### Build

1. Build your application
    ```bash
    npm run build
    ```

2. Serve your application
    ```bash
    npm run serve
    ```

3. Open it in your browser by going to [http://localhost:8000/index.html](http://localhost:8000/index.html).

The build compiles and minimizes the source files for production usage.
The build generates a `dist` folder which you can serve using a web server.
