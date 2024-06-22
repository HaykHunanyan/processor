const { Schema,model} =require('mongoose');
const { isEmail } = require('validator');

const schema = new Schema({
    email:{type:String,unique: false,validate: [ isEmail, 'invalid email' ]},
    phone:{type:String},
    card:{type:Object}, 
    address: {type:String},
    zipCode: {type:String},
}, {
    timestamps: true,
})


module.exports = model('users', schema);