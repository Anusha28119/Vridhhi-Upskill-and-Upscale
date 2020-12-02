var express = require('express');
var router = express.Router();
var db=require('C:/Users/mmsac/OneDrive/Documents/empty.sql');

router.get('/form', function(req, res, next) { 
res.render('users'); 
});

router.post('/create', function(req, res, next) {
    
      var firstName     = req.body.firstName; 
      var lastName     = req.body.lastName;
      var phoneNo  =req.body.phoneNo;
      var emailAddress = req.body.emailAddress;
      var investmentBudget         = req.body.investmentBudget;
      var expectedReturn      = req.body.expectedReturn;
      var profitSharing = req.body.profitSharing;
      var preferredField1 = req.body.preferredField1;
      var preferredField2 = req.body.preferredField2;
      var preferredQualification = req.body.preferredQualification;
      
     var sql = "INSERT INTO Vriddhi.`Vriddhi.investor` (first_name, last_name, phone_no, Email_id, Investment_budget, expected_return, profit_sharing, preferred_field_first, preferred_field_second, preferred_qualification ) VALUES ('${firstName}', '${lastName}', '${phoneNo}', '${emailAddress}', '${investmentBudget}', '${expectedReturn}', '${profitSharing}', '${preferredField1}', '${preferredField2}', '${preferredQualification}' )";
     db.query(sql,function (err, data) {
        if (err) throw err;
             console.log("record inserted");
         });
     res.redirect('/users/form');
});

