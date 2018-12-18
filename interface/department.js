var crypto = require('crypto');
var belriumJS = require('belrium-js');
var ed = require('../utils/ed.js');
var httpCall = require('../utils/httpCall.js');
var constants = require('../utils/constants.js');
var schema = require('../schema/transactions.js');
var addressHelper = require('../utils/address.js');
var z_schema = require('../utils/zschema-express.js');
var TransactionTypes = require('../utils/transaction-types.js');

app.route.get('/department/:deptname', async function (req) {
    console.log('dept name::' + req.params.deptName)
    let result = await app.model.Departments.findOne({
        condition: { department: req.params.department }
    });
    if (!result) {
        return {
            success: false,
            message: "Can't find department with the given name"
        }
        return result;
    }
});


app.route.get('/department/:designation', async function (req){
    let info = await app.model.Departments.findOne({
        condition: { designation: req.params.designation }
    });
    if (!info) {
        return {
            success: true,
            message: "designation not available"
        }
        return info;
    }
});

app.route.put('/department', async function (req) {
    console.log("req: ", req);
    var ac_params = {
        secret: req.query.secret,
        countryCode: req.query.countryCode
    };
    var response = await httpCall.call('POST', `/api/accounts/open`, ac_params);
    if (response && !response.success)
        return response;
    if (response && response.account) {
        if (!response.account.status)
            return { error: "wallet not verified!" };
        let address = req.query.address.slice(0, -2);
        let name = req.query.name;
        let deptName = req.query.deptName;
        let designation = req.query.designation;
        let fee = String(constants.fees.registerDepartment * constants.fixedPoint);
        let type = TransactionTypes.REGISTER_DEPT;
        let options = {
            fee: fee,
            type: type,
            args: JSON.stringify([address, name, deptName, designation])
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

app.route.get('/department/:address', async function (req) {
    console.log("req: ", req);
    let result = await app.model.Departments.findOne({
        condition: { address: req.params.address.slice(0, -2) }
    });
    console.log("result: ", result);
    if (!result) {
        return {
            success: false,
            msg: "Result not found"
        };
    }
    return result;
});