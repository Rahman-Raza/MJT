# MYJOBTANK WEB APP

Simple front end implementation for My Job Tank's Web services, including but not limited to Insty-Match, Resume Analyze, and Job Order Submission.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
Node
```

### Installing and dev mode

A step by step series of examples that tell you how to get a development env running

To install:

```
npm install
```

And then to run in dev mode with a concurrently running node express server: (Note this will not work for making api calls simply for font end static work)

```
npm start
```




### Production Mode

to export bundle run this command from the main directory

```
webpack --config webpack.prod.js
```

### to run production mode 


```
cd dist
npm install
node server.js
```

this will create a simple html static server to serve the code and bundled JS app.

## Structure

You will find everything in /src/ the app starts from the App component, then defaults to HomePage component which contains the upload form.
The AnalyzePage comes next after form submission.


## middleware server

There is also an express server (which is only run in prodction mode) and can be found in the /dist/ directory.

This server handles all the front end requests, processes data and sends it to the backend.  It can be found in the file Server.js


## Testing

I highly recommend doing any testing, especially for server calls in production mode by first compiling using webpack in the main directory
and then switching over to /dist/ and running node server.js 

