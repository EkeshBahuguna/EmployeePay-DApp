module.exports = {
    department: async function (address, name) {
        console.log("calling contract dept: ", this);
        app.sdb.lock('department.department@' + address);
        let exists = await app.model.Departments.exists({ address: address });
        console.log("exists: ", exists);
        if (exists) return 'Address already registered';
        app.sdb.create('Departments', {
            address: address,
            name: name,
            deptName: deptName,
            designation: designation
        });
    }
}
