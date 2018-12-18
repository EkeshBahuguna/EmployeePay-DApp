module.exports = async function () {
  console.log('enter dapp init')
  console.log('calling dept contract')

  app.registerContract(1330, 'department.department');
  console.log('calling employee contract')

  app.registerContract(1551, 'employee.employee');
  console.log('employee contract registered');
  console.log("calling country contract");

  console.log("app.contract: ", app.contract);
  app.events.on('newBlock', (block) => {
    console.log('new block received', block.height)
  })
}