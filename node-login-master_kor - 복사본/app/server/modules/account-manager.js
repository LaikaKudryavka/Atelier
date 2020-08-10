
const crypto 		= require('crypto');	// 암호화 모듈
const moment 		= require('moment');	// 날짜관련 모듈(DB에 가입일자 있는거에 사용)
const MongoClient 	= require('mongodb').MongoClient;	// 몽고디비에 연결하기위한 아이

var db, accounts;
// 몽고디비에 연결하기 위한 주소인데, 이건 app.js에서 값을 가져와서 쓰는거임
MongoClient.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, function(e, client) {
	if (e){
		console.log(e);	//db에 연결 실패했을때 에러메시지 출력
	}	else{
		db = client.db(process.env.DB_NAME);	// app.js에서 설정된 db의 이름 : node-login에 접속
		accounts = db.collection('accounts');	// 어카운트는 accounts라는 컬렉션에 접속한다는 뜻
	// 두개의 인덱스 필드를 사용함으로써, 새로 만들어질 계정의 유효성을 더빨리 확인해준다는듯 //
		accounts.createIndex({user: 1, email: 1});
		console.log('mongo :: connected to database :: "'+process.env.DB_NAME+'"');
		// 연결이 모두 완료시 뜨는 창. 이때부터 서버가 오픈 된것
	}
});

// db의 passkey를 만드는 부분임
const guid = function(){
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);
	});
}

/*
	login validation methods
*/

exports.autoLogin = function(user, pass, callback)
{
	accounts.findOne({user:user}, function(e, o) {
		if (o){
			o.pass == pass ? callback(o) : callback(null);
		}	else{
			callback(null);
		}
	});
}

// 로그인 하는 부분
exports.manualLogin = function(user, pass, callback)
{
	// 컬렉션에서 입력한 값들을 받아와서 비교하고, 유효한지 아닌지를 체크
	accounts.findOne({user:user}, function(e, o) {
		if (o == null){
			callback('user-not-found');
		}	else{
			// pass : 입력한 비밀번호, o.pass : 컬렉션에서 아이디로 검색된 비밀번호
			// 비밀번호 비교해주는 메서드임
			validatePassword(pass, o.pass, function(err, res) {
				//콜백함수로 값을 리턴해주는데, 문제가 없으면 앞은 null, 뒤는 true or false로 리턴
				// res가 true일 떄
				if (res){
					// 컬렉션에서 검색한 값을 반환해준다.
					callback(null, o);
				}	else{
					callback('invalid-password');
				}
			});
		}
	});
}

exports.generateLoginKey = function(user, ipAddress, callback)
{
	// cookie 안에 ******... 처럼 만들어둔 코드를 집어넣음
	let cookie = guid();
	// 정보를 수정하는 메서드 호출
	accounts.findOneAndUpdate({user:user}, {$set:{
		ip : ipAddress,
		cookie : cookie
	}}, {returnOriginal : false}, function(e, o){ 
		callback(cookie);
	});
}

exports.validateLoginKey = function(cookie, ipAddress, callback)
{
// ensure the cookie maps to the user's last recorded ip address //
	accounts.findOne({cookie:cookie, ip:ipAddress}, callback);
}

// 쿠키값과 같은 기능으로 passkey를 만들어서 넣어줌. 단, 검색은 이메일 주소로 함.
// 비밀번호를 잃어버렸을때 요청할때 사용
exports.generatePasswordKey = function(email, ipAddress, callback)
{
	let passKey = guid();
	accounts.findOneAndUpdate({email:email}, {$set:{
		ip : ipAddress,
		passKey : passKey
	}, $unset:{cookie:''}}, {returnOriginal : false}, function(e, o){
		if (o.value != null){
			callback(null, o.value);
		}	else{
			callback(e || 'account not found');
		}
	});
}

exports.validatePasswordKey = function(passKey, ipAddress, callback)
{
// ensure the passKey maps to the user's last recorded ip address //
	accounts.findOne({passKey:passKey, ip:ipAddress}, callback);
}

/*
	레코드의 삽입 및 수정
*/

//routes.js 에서 사용합니다. login.pug에서 입력된 유저 정보값 5개를 받아옵니다.
exports.addNewAccount = function(newData, callback)
{
	//db안에서 받아온 유저이름(로그인할때 입력하는 아이디) 값을 찾아온다
	accounts.findOne({user:newData.user}, function(e, o) {
		// if => 안에서 같은 이름을 찾아내면 아이디가 있다고 오류창을 내보냄
		if (o){
			callback('username-taken');
		}	else{
			// db안에서 받아온 이메일 주소를 찾아본다. 콜백의 e는 에러, o는 찾아낸 데이터값임
			accounts.findOne({email:newData.email}, function(e, o) {
				if (o){
					callback('email-taken');
				}	else{
					// 받아온 비밀번호 값을 암호화해서 hash로 보내고, 그것을 다시 비밀번호 값에 넣어준다.
					saltAndHash(newData.pass, function(hash){
						newData.pass = hash;
					// moment 모듈을 이용해서 가입 날자와 시간을 받아와서 저장해준다. //
						newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
						// db의 accounts 컬렉션안에 추가해준다
						accounts.insertOne(newData, callback);
					});
				}
			});
		}
	});
}
// 사용자 정보 수정하는 부분.
exports.updateAccount = function(newData, callback)
{
	let findOneAndUpdate = function(data){
		var o = {
			name : data.name,
			email : data.email,
		}
		if (data.pass) o.pass = data.pass;
		accounts.findOneAndUpdate({_id:getObjectId(data.id)}, {$set:o}, {returnOriginal : false}, callback);
	}
	if (newData.pass == ''){
		findOneAndUpdate(newData);
	}	else { 
		saltAndHash(newData.pass, function(hash){
			newData.pass = hash;
			findOneAndUpdate(newData);
		});
	}
}

exports.updatePassword = function(passKey, newPass, callback)
{
	saltAndHash(newPass, function(hash){
		newPass = hash;
		accounts.findOneAndUpdate({passKey:passKey}, {$set:{pass:newPass}, $unset:{passKey:''}}, {returnOriginal : false}, callback);
	});
}

/*
	account lookup methods
*/

// 컬렉션에 저장된 값들 다 가져오기
exports.getAllRecords = function(callback)
{
	accounts.find().toArray(
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
}
// 계정지우기
exports.deleteAccount = function(id, callback)
{
	accounts.deleteOne({_id: getObjectId(id)}, callback);
}
// 모조리 지우기
exports.deleteAllAccounts = function(callback)
{
	accounts.deleteMany({}, callback);
}

/*
	private encryption & validation methods
*/

var generateSalt = function()
{
	var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
	var salt = '';
	for (var i = 0; i < 10; i++) {
		var p = Math.floor(Math.random() * set.length);
		salt += set[p];
	}
	return salt;
}

var md5 = function(str) {
	return crypto.createHash('md5').update(str).digest('hex');
}

var saltAndHash = function(pass, callback)
{
	var salt = generateSalt();
	callback(salt + md5(pass + salt));
}

var validatePassword = function(plainPass, hashedPass, callback)
{
	var salt = hashedPass.substr(0, 10);
	var validHash = salt + md5(plainPass + salt);
	callback(null, hashedPass === validHash);
}

var getObjectId = function(id)
{
	return new require('mongodb').ObjectID(id);
}

var listIndexes = function()
{
	accounts.indexes(null, function(e, indexes){
		for (var i = 0; i < indexes.length; i++) console.log('index:', i, indexes[i]);
	});
}

