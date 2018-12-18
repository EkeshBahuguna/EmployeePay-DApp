module.exports = {
  name: 'departments',
  fields: [
    {
      name: 'address',
      type: 'String',
      length: 256,
      not_null: true,
      index: true
    },
    {
      name: 'name',
      type: 'String',
      length: 30
    },
    {
      name: 'deptName',
      type: 'String',
      length: 50,
      not_null: true,
    },
    {
      name: 'designation',
      type: 'String',
      length: 50,
      not_null: true,
      index: true
    }
  ]
}