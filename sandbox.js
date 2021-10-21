var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(1);
var hash = bcrypt.hashSync("abcde123", salt);

console.log(hash);

console.log(bcrypt.compareSync("abcde123", hash)); // true
// console.log(bcrypt.compareSync("not_bacon", hash)); // false