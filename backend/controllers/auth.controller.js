var bcrypt = require('bcrypt');

class Auth {
    constructor() {
        this.token;
    }

    checkingAuth(role, hakAkses) {
        if(role == hakAkses) {
            return true;
        } else {
            return false;
        }
    }

    setPassword(data) {
        return bcrypt.hashSync(data, 10);
    }

    comparePassword(passwordInput, passwordDB) {
        return bcrypt.compareSync(passwordInput, passwordDB);
    }
    
}

module.exports = new Auth;