const User = require('../models/user');

module.exports = async function createUser(params) { // idUser, name
    let newUser;
    let result = { success: false };
    await User.findOne({ UserId: params.idUser }).then(
        (user) => {
            if (!user) {
                newUser = new User({
                    UserId: params.idUser,
                    fullName: params.name,
                });
                newUser.save((err) => { console.log(err); });
                console.log('User created');
                result = { success: true, msg: 'User created' };
                // reply({ token, user: sanitizeUser(newUser) });
            } else {
                console.log('mongo error')
                result = { success: false, msg: 'User could not be created' };
            }
            // reply(Boom.conflict('User already exists'));
        });
    return result;
}
