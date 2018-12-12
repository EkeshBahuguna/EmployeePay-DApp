module.exports = {
    registerResults: async function(address, name,empName,salary,age,ta,da,hra) {
      console.log("calling contract registerResults: ", this);
      app.sdb.lock('payroll.registerResult@' + address);
      let exists = await app.model.Employees.exists({address: address});
      console.log("exists: ", exists);
      if (exists) return 'Address already registered';
      app.sdb.create('Employees', {
        address: address,
        name: name,
        senderId: this.trs.senderId,
        empName:empName,
        salary:salary,
        age:age,
        ta:ta,
        da:da,
        hra:hra,
        finalSalary: 123
      });
    }
  }
  