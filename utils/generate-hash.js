
const bcrypt = require('bcrypt');
const saltRounds = 10;

const hash = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
              return reject(err);
            }
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) {
                return reject(err);
              }
              resolve(hash);
            });
        });

    });
};


module.exports.hashp=hash
