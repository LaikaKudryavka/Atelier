
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
/*
	레코드의 삽입 및 수정
*/

// 사용자 정보 수정하는 부분.
exports.updatePofol = function(newData, callback)
{
	let findOneAndUpdate = function(data){
		var o = {

			myphoto : data.myphoto,
			comlang : data.comlang,
			mycoment : data.mycoment
		}
		accounts.findOneAndUpdate({_id:getObjectId(data.id)}, {$set:o}, {returnOriginal : false}, callback);
	}
	findOneAndUpdate(newData);
}

var getObjectId = function(id)
{
	return new require('mongodb').ObjectID(id);
}
