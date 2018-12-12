module.exports = async function () {
  console.log('enter dapp init')

  app.registerContract(1000, 'domain.register')
  app.registerContract(1001, 'domain.set_ip')


  app.registerContract(2000, 'education.registerResults');

  app.registerContract(2001,'payroll.registerResult');
  console.log("app.contract: ", app.contract);

  app.events.on('newBlock', (block) => {
    console.log('new block received', block.height)
  })
}