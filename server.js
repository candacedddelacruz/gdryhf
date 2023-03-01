
const path = require("path");
var querystring = require('querystring');
var http = require('http');
var fs = require('fs');
const bodyParser = require('body-parser');
const requester = require('request');

const fastify = require("fastify")({
  logger: false,
});


fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
  prefix: "/", 
});

fastify.register(require("@fastify/formbody"));

fastify.register(require("@fastify/view"), {
  engine: {
    handlebars: require("handlebars"),
	bodyParser:require('body-parser')
  },
});

const seo = require("./src/seo.json");
const { json } = require("body-parser");
if (seo.url === "glitch-default") {
  seo.url = `https://${process.env.PROJECT_DOMAIN}.glitch.me`;
}

fastify.post("/",function (request, reply) {
var head=request.headers;
 var headerss=JSON.stringify(head).replace("'{","").replace("}'","").replace("host","hello").replace("content-length","content2")
  requester.post({
    headers:JSON.parse(headerss),
    url:     'http://146.59.49.67',
    body:   request.body,
    json: true
  }, function(error, response, body){
      console.log("ffff")
      console.log(body)
      reply.headers(response.headers);
      reply.send(body);
  });


});

fastify.listen(
  { port: process.env.PORT, host: "0.0.0.0" },
  function (err, address) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    console.log(`Your app is listening on ${address}`);
    fastify.log.info(`server listening on ${address}`);
  }
);

