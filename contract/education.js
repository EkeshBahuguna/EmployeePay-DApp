module.exports = {
  registerResults: async function(address, name, physics, chemistry, math) {
    console.log("calling contract registerResults: ", this);
    console.log("total: ", parseInt(physics) + parseInt(chemistry) + parseInt(math));
    app.sdb.lock('education.registerResult@' + address);
    let exists = await app.model.Education.exists({address: address});
    console.log("exists: ", exists);
    if (exists) return 'Address already registered';
    app.sdb.create('Education', {
      address: address,
      name: name,
      senderId: this.trs.senderId,
      physics: physics,
      chemistry: chemistry,
      math: math,
      total: (parseInt(physics) + parseInt(chemistry) + parseInt(math))
    });
  }
}
