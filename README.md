# How to run client

This will needs a `server` to run, so consider provide one. Here is the server repository [https://github.com/dadanisme/handwriting-recognition-server](https://github.com/dadanisme/handwriting-recognition-server)

## Clone this repository

```
git clone https://github.com/dadanisme/handwriting-recongition-client.git
```

```
cd handwriting-recongition-client
```

## Install required dependencies

    npm install

## Change the server location

In `src/App.js` on `line 6`, change the server location

```javascript
const server = "https://dadanisme.pythonanywhere.com"; //change this
```

You can use your local server or deployed server, see [https://github.com/dadanisme/handwriting-recognition-server](https://github.com/dadanisme/handwriting-recognition-server) for more details

## Run on localhost

```
npm start
```

## Deploy client

It's up to you, just deploy anywhere you want. But i'm using `Firebase`. See [https://firebase.google.com](https://firebase.google.com/)
