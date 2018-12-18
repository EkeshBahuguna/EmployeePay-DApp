var crypto = require('crypto');
var belriumJS = require('belrium-js');
var ed = require('../utils/ed.js');
var httpCall = require('../utils/httpCall.js');
var constants = require('../utils/constants.js');
var schema = require('../schema/transactions.js');
var addressHelper = require('../utils/address.js');
var z_schema = require('../utils/zschema-express.js');
var TransactionTypes = require('../utils/transaction-types.js');



app.route.get('/employee/:empName', async function (req) {
    console.log('finding employee');
    let result = await app.model.Employees.findOne({
        condition: { empName: req.params.empName }
    });
    if (!result)
        return {
            success: false,
            message: "No result found"
        };
    return result;
});

app.route.put('/employee', async function (req) {
    console.log("req: ", req);
    var ac_params = {
        secret: req.query.secret,
        countryCode: req.query.countryCode
    };
    console.log('inserting values into db')
    var response = await httpCall.call('POST', `/api/accounts/open`, ac_params);
    if (response && !response.success)
        return response;
    if (response && response.account) {
        if (!response.account.status)
            return { error: "wallet not verified!" };
        let address = req.query.address.slice(0, -2);
        let name = req.query.name;
        let empName = req.query.empName;
        let salary = req.query.salary;
        let fee = String(constants.fees.registerEmployee * constants.fixedPoint);
        console.log('fee::' + fee)
        let type = TransactionTypes.REGISTER_EMPLOYEE;
        let options = {
            fee: fee,
            type: type,
            args: JSON.stringify([address, name, empName, salary])
        };
        let secret = req.query.secret;
        let transaction = belriumJS.dapp.createInnerTransaction(options, secret);
        let dappId = req.query.dappId;
        let params = {
            transaction: transaction
        };
        console.log("test data: ", params);
        var res = await httpCall.call('PUT', `/api/dapps/${dappId}/transactions/signed`, params);
        return res;
    }
    return response;
});


app.route.get('/employee/:address', async function (req) {
    console.log("req: ", req);
    let result = await app.model.Employees.findOne({
        condition: { address: req.params.address.slice(0, -2) }
    });
    console.log("result: ", result);
    if (!result)
        return {
            success: false,
            msg: "Result not found"
        };

    return result;
});


