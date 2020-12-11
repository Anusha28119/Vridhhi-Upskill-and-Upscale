/*import bcrypt from 'bcrypt';
import { PubSub } from 'graphql-subscriptions';
import _ from 'lodash';
import joinMonster from 'join-monster';
import jwt from 'jsonwebtoken';

import { requiresAuth, requiresAdmin } from './permissions';
import { refreshTokens, tryLogin } from './auth';

export const pubsub = new PubSub();

const USER_ADDED = 'USER_ADDED';
jwt.sign(
    {
      user: _.pick(user, 'id'),
    },
    EMAIL_SECRET,
    {
      expiresIn: '1d',
    },
    (err, emailToken) => {
      const url = `http://localhost:3000/confirmation/${emailToken}`;

      transporter.sendMail({
        to: req.body.email,
        subject: 'Confirm Email',
        html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
      });
    },
  );*/
  var nodemailer = require("nodemailer");

module.exports.send_email = (options) => {
      var transporter = nodemailer.createTransport({
          service:"gmail",
          host: "smtp.gmail.com",
          auth: {
            user: "vriddhiuplscale@gmail.com",
            pass: "devhxzcikqosvkrs"
          }
        });

        var mail = {
          from: "vriddhiuplscale@gmail.com",
          to: options.to,
          subject: options.subject,
          text: options.text
        };

        transporter.sendMail(mail, function(error, info){
          if (error) {
            console.log(error);
          } else {
            // console.log('Email sent: ' + info.response);
          }
        });
}
