const User = require('../models/user');

module.exports = async function createUser(params) { // idUser, name
    let newUser;
    await User.findOne({ UserId: params.idUser }).then(
        (user) => {
            if (!user) {
                newUser = new User({
                    UserId: params.idUser,
                    fullName: params.name,
                });
                newUser.save((err) => { console.log(err); });
                console.log('User created')
                return { succes: true }
                // reply({ token, user: sanitizeUser(newUser) });
            }
            console.log('mongo error')
            return { succes: false }
            // reply(Boom.conflict('User already exists'));
        });
}
