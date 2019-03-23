module.exports = {
    hello: function(req, res) {
        if (!req.body.name) {
            res.send('An error occurred: Name is a required paramter');
        }
    }
};


module.exports = {
    hello: function(req, res) {
        if (!req.body.name) {
            return res.send('An error occurred: Name is a required paramter');
        }

        const name = req.body.name;
        const lang = req.body.language || 'en';
        switch(lang) {
            case 'en':
                return res.send('Hello, ' + name)
            break;
            case 'es':
                return res.send('Hola, ' + name)
            break;
            case 'de':
                return res.send('Hallo, ' + name)
            break;
            default:
                return res.send('Error: Invalid Language')
        }
    }
};
