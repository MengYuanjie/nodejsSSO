const saml2 = require('saml2-js');
let SSO_SP_assert_endpoint = 'https://sso.connect.pingidentity.com/sso/SLO.saml2', 
    SSO_IDP_login_url = 'https://sso.connect.pingidentity.com/sso/idp/SSO.saml2', 
    SSO_IDP_logout_url = 'https://sso.connect.pingidentity.com/sso/SLO.saml2',
    //Apply for GTS
    SSO_SP_entity_id = 'domain or any string you applied',
    SSO_IDP_idpid = "12345678-abcd-1234-xxxx-xxxxxxxxxxxx",

const sp_options = {
  entity_id: SSO_SP_entity_id,
  //Generate command: openssl genrsa -out rsaprivkey.pem 2048
  private_key: fs.readFileSync("./key.pem").toString(),
   //openssl req -new -x509 -key rsaprivkey.pem -out cert.pem
  certificate: fs.readFileSync("./cert.pem").toString(),
  assert_endpoint: SSO_SP_assert_endpoint,
  nameid_format: "urn:oasis:names:tc:SAML:2.0:nameid-format:transient"
}

// Call service provider constructor with options
const sp = new saml2.ServiceProvider(sp_options);

//Initialize options object
const idp_options = {
  sso_login_url: SSO_IDP_login_url + '?idpid=' + SSO_IDP_idpid,
  sso_logout_url: SSO_IDP_logout_url,
  //Apply for GTS
  certificates: fs.readFileSync("./config/sso/x509.crt").toString(),
  force_authn: true,
  sign_get_request: false,
  allow_unencrypted_assertion: false
};

//Call identity provider constructor with options
const idp = new saml2.IdentityProvider(idp_options);

// Pass identity provider into a service provider function with options and a callback.
const ssourl = await new Promise(function(resolve, reject) {
    sp.create_login_request_url(idp, {}, (err, login_url, request_id)=> resolve(login_url));
});

console.log(ssourl);