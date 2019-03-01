const Saml2js = require('saml2js');

//After SSO login success it will redirect to the URL you sent to GTS 

//Get request SAMLResponse
const samlResponse = ctx.request.body.SAMLResponse;
const parser = new Saml2js(samlResponse);

//Get response data and do the logic
console.log(parser.parsedSaml)