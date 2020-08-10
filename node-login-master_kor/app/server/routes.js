var AM = require('./modules/account-manager');
var EM = require('./modules/email-dispatcher');
var UP = require('./modules/update-pofol');

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
		console.log('mongo :: connected to database :: "'+process.env.DB_NAME+'"'+'router');
		// 연결이 모두 완료시 뜨는 창. 이때부터 서버가 오픈 된것
	}
});
module.exports = function(app) {

/*
	login & logout
*/

	app.get('/', function(req, res){
	// check if the user has an auto login key saved in a cookie //
		if (req.cookies.login == undefined){
			res.render('login', { title: 'Hello - Please Login To Your Account' });
		}	else{
	// attempt automatic login //
			AM.validateLoginKey(req.cookies.login, req.ip, function(e, o){
				if (o){
					AM.autoLogin(o.user, o.pass, function(o){
						req.session.user = o;
						res.redirect('/main');
					});
				}	else{
					res.render('login', { title: 'Hello - Please Login To Your Account' });
				}
			});
		}
	});
	
	app.post('/', function(req, res){
		AM.manualLogin(req.body['user'], req.body['pass'], function(e, o){
			if (!o){
				res.status(400).send(e);
			}	else{
				req.session.user = o;
				if (req.body['remember-me'] == 'false'){
					res.status(200).send(o);
				}	else{
					AM.generateLoginKey(o.user, req.ip, function(key){
						res.cookie('login', key, { maxAge: 900000 });
						res.status(200).send(o);
					});
				}
			}
		});
	});

	app.post('/logout', function(req, res){
		res.clearCookie('login');
		req.session.destroy(function(e){ res.status(200).send('ok'); });
	})
	
/*
	control panel
*/
	
	app.get('/main', function(req, res){
		if(req.session.user == null){
			res.redirect('/');
		}else{
			console.log(accounts.mycoment);
			res.render('main', {
				title : 'Control Panel',
				udata : req.session.user,
				mycoment : accounts.mycoment,
			});

		}
	})

	app.get('/home', function(req, res) {
		if (req.session.user == null){
			res.redirect('/');
		}	else{
			res.render('home', {
				title : 'Control Panel',
				udata : req.session.user
			});
		}
	});
	
	app.post('/home', function(req, res){
		if (req.session.user == null){
			res.redirect('/');
		}	else{
			AM.updateAccount({
				id		: req.session.user._id,
				name	: req.body['name'],
				email	: req.body['email'],
				pass	: req.body['pass'],
			}, function(e, o){
				if (e){
					res.status(400).send('error-updating-account');
				}	else{
					req.session.user = o.value;
					res.status(200).send('ok');
				}
			});
		}
	});

/*
	new accounts
*/

	app.get('/signup', function(req, res) {
		res.render('signup', {  title: 'Signup'});
	});
	
	app.post('/signup', function(req, res){
		AM.addNewAccount({
			name 	: req.body['name'],
			email 	: req.body['email'],
			user 	: req.body['user'],
			pass	: req.body['pass'],
		}, function(e){
			if (e){
				res.status(400).send(e);
			}	else{
				res.status(200).send('ok');
			}
		});
	});

/*
	여기서부터 비밀번호 잃어버렸을때 사용하는거.
	login.pug에서 불러옴
*/

	app.post('/lost-password', function(req, res){
		// email = 입력된 이메일값
		let email = req.body['email'];
		AM.generatePasswordKey(email, req.ip, function(e, account){
			if (e){
				// 에러가 터지면 에러내용을 에러창에 추가해줌
				res.status(400).send(e);
			}	else{
				// 메일을 보내는 메서드
				EM.dispatchResetPasswordLink(account, function(e, m){
			// TODO this callback takes a moment to return, add a loader to give user feedback //
					if (!e){
						// 에러가 안터지면 메일이 보내졌다고 알려줌
						res.status(200).send('ok');
					}	else{
						//에러값을 하나하나 띄워주는 부분
						for (k in e) console.log('ERROR : ', k, e[k]);
						res.status(400).send('unable to dispatch password reset');
					}
				});
			}
		});
	});

	app.get('/reset-password', function(req, res) {
		AM.validatePasswordKey(req.query['key'], req.ip, function(e, o){
			if (e || o == null){
				res.redirect('/');
			} else{
				req.session.passKey = req.query['key'];
				res.render('reset', { title : 'Reset Password' });
			}
		})
	});
	
	app.post('/reset-password', function(req, res) {
		let newPass = req.body['pass'];
		let passKey = req.session.passKey;
	// destory the session immediately after retrieving the stored passkey //
		req.session.destroy();
		AM.updatePassword(passKey, newPass, function(e, o){
			if (o){
				res.status(200).send('ok');
			}	else{
				res.status(400).send('unable to update password');
			}
		})
	});
	
/*
	view, delete & reset accounts
*/
	
	app.get('/print', function(req, res) { // 모든 계정 정보 출력
		AM.getAllRecords( function(e, accounts){
			res.render('print', { title : 'Account List', accts : accounts });
		})
	});
	
	app.post('/delete', function(req, res){ // 계정 삭제
		AM.deleteAccount(req.session.user._id, function(e, obj){
			if (!e){
				res.clearCookie('login');
				req.session.destroy(function(e){ res.status(200).send('ok'); });
			}	else{
				res.status(400).send('record not found');
			}
		});
	});
	
	app.get('/reset', function(req, res) { // 계정 전체 삭제
		AM.deleteAllAccounts(function(){
			res.redirect('/print');
		});
	});

	app.get('/setpofol', function(req, res){
		if(req.session.user == null){
			res.redirect('/');
		}else{
			res.render('setpofol',{title : "Setting Portfolio"});
		}
	})

	app.post('/updatepofol', function(req,res){
		UP.updatePofol({
			id: req.session.user._id,
			myphoto: req.body['myphoto'],
			comlang: req.body['comlang'],
			mycoment: req.body['mycoment'],
		}, function(e,o){
			if (e){
				console.log(e);
			}else{
				req.session.user = o.value;
				res.redirect('/print');
			}
		})
	})
	
	app.get('*', function(req, res) { res.render('404', { title: 'Page Not Found'}); });

};
