var jwt = require('jsonwebtoken')

/*Set token for this apps*/
class Token {
	constructor() {
		this.secretKey = 'Ingetin';
	}
	setupToken(data, role) {
		return jwt.sign({token:data, role:role}, this.secretKey, {expiresIn: '24h'});
	}
	checkingToken(data, res, next) {
		jwt.verify(data, this.secretKey, function(err, decode){
			if(err != null) {
				res.json({status: false, message: "Sorry It doesn't my token, please make new request"});
			}
		}) 
	}
	decodeToken(data) {
		try{
            var decoded = jwt.verify(data, this.secretKey);
            return decoded;
        }catch(err){
            return null;
        }
	}
}

module.exports = new Token