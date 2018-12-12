/*{
	"secret":"reason demise stick bullet reject cattle cash gloom certain security quarter holiday",
	"fee":"10000000",
	"type":2000,
	"args":"[\"A9TJcngGMePGCwrnHHMSS6uFrHraTkMMhi\", \"Rajat\", \"60\", \"70\", \"80\"]"
}*/
/*http://localhost:9305/api/dapps/1e1b3a548d62cb71673b7e967c3c3f913373036ff3e6d1e9e4ed35fe628f2cb1/transactions/unsigned*/

var crypto = require('crypto');
var belriumJS = require('belrium-js');
var ed = require('../utils/ed.js');
var httpCall = require('../utils/httpCall.js');
var constants = require('../utils/constants.js');
var schema = require('../schema/transactions.js');
var addressHelper = require('../utils/address.js');
var z_schema = require('../utils/zschema-express.js');
var TransactionTypes = require('../utils/transaction-types.js');

app.route.put('/education',  async function (req) {
    console.log("req: ", req);
    var ac_params = {
        secret: req.query.secret,
        countryCode: req.query.countryCode
    };
    var response = await httpCall.call('POST', `/api/accounts/open`, ac_params);

    if(response && !response.success) {
        return response;
    }

    if(response && response.account) {

        if(!response.account.status) {
            return {error: "wallet not verified!"};
        }

        let address = req.query.candidateDetails.address.slice(0, -2);
        let name = req.query.candidateDetails.name;
        let physics = req.query.candidateDetails.subject.physics;
        let chemistry = req.query.candidateDetails.subject.chemistry;
        let math = req.query.candidateDetails.subject.math;
        let fee = String(constants.fees.registerResult * constants.fixedPoint);
        let type = TransactionTypes.REGISTER_RESULT; // withdraw money to mainchain
        let options = {
            fee: fee,
            type: type,
            args: JSON.stringify([address, name, physics, chemistry, math])
        };
        let secret = req.query.secret;

        let transaction = belriumJS.dapp.createInnerTransaction(options, secret);

        let dappId = req.query.dappId;

        let params = {
            transaction: transaction
        };

        console.log("registerResult data: ", params);
        var res = await httpCall.call('PUT', `/api/dapps/${dappId}/transactions/signed`, params);

        return res;

    } else {
        return response;
    }
});

app.route.get('/education/:address',  async function (req) {
    let result = await app.model.Education.findOne({
        condition: { address: req.params.address.slice(0, -2) }
    })
    return result
});