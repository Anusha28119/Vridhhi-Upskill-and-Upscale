const mongoose = require('mongoose');
const admin = require('./models/admin');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost/Vriddhi_newUser', { useNewUrlParser: true }).then(() => {
    console.log("Mongo connection open!")
}).catch(err => {
    console.log("Mongo connection error")
    console.log(err)
});


//const hash_pwd =   bcrypt.hash("Gurmeisha01",12);

const admins = [
    {
    name: "Gurmeisha",
    phoneNo: 988156789,
    email: "meisha@hotmail.com",
    password: "Gurmeisha01"
    }
]

admin.insertMany(admins).then(res => {
    console.log(res)
    console.log("admin data insertion successful")
}).catch(e => {
    console.log(e)
})