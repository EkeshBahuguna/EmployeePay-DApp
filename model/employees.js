module.exports = {
  name: 'Employees',
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
      name: 'senderId',
      type: 'String',
      length: 50,
      not_null: true,
    },
    {
      name:'empName',
      type:'String',
      length: 50,
      not_null: true,
    },
    {
      name:'salary',
      type: 'Number',
      default: 0.0,
      index: true
    },
    {
      name:'age',
      type:'Number',
      default:0.0
    },
    {
      name:'ta',
      type:'Number',
      default:0.0
    },
    {
      name:'da',
      type:'Number',
      default:0.0
    },
    {
      name:'hra',
      type:'Number',
      default:0.0
    }
  ]
}