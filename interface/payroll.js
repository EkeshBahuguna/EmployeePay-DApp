var crypto = require('crypto');
var belriumJS = require('belrium-js');
var ed = require('../utils/ed.js');
var httpCall = require('../utils/httpCall.js');
var constants = require('../utils/constants.js');
var schema = require('../schema/transactions.js');
var addressHelper = require('../utils/address.js');
var z_schema = require('../utils/zschema-express.js');
var TransactionTypes = require('../utils/transaction-types.js');

app.route.put('/payroll',  async function (req) {
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
        let empName=req.query.candidateDetails.empName;
        let salary=req.query.candidateDetails.salary;
        let age=req.query.candidateDetails.age;
        let ta=req.query.candidateDetails.ta;
        let da=req.query.candidateDetails.da;
        let hra=req.query.candidateDetails.hra;
        let fee = String(constants.fees.payroll * constants.fixedPoint);
        let type = TransactionTypes.PAY_ROLL; // withdraw money to mainchain
        let options = {
            fee: fee,
            type: type,
            args: JSON.stringify([address, name,empName,salary,age,ta,da,hra])
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

app.route.get('/payroll/:address',  async function (req) {
    let result = await app.model.Employees.findOne({
        condition: { address: req.params.address.slice(0, -2) }
    })
    return result
});