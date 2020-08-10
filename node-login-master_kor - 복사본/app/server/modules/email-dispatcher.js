
var EM = {};
module.exports = EM;
// EM이라는 변수를 하나의 모듈로 만든다.
// var EM = require('./modules/email-dispatcher'); 라우터에서 이것을 모듈로써 받아올 수 있게 합니다.
// 이렇게 함으로써 다른 js파일에서 또 다른 js 파일을 읽어오는것이 가능합니다.



EM.server = require("emailjs/email").server.connect(
{
	host 	    : process.env.NL_EMAIL_HOST || 'smtp.gmail.com',
	user 	    : process.env.NL_EMAIL_USER || 'flyingship0421@gmail.com',
	password    : process.env.NL_EMAIL_PASS || 'qlrhdwjd',
	ssl		    : true
});

// 이메일을 보내주는 메서드
// 계정값과 콜백을 가져옴. 여기서의 콜백은 에러가 뜨는지 안뜨는지를 보여줌
EM.dispatchResetPasswordLink = function(account, callback)
{
	EM.server.send({
		from         : process.env.NL_EMAIL_FROM || 'Node Login <do-not-reply@gmail.com>',
		to           : account.email,
		subject      : 'Password Reset',
		text         : 'something went wrong... :(',
		attachment   : EM.composeEmail(account)
	}, callback );
}

// 비밀번호를 변경할수 있는 패스키를 보내줌
EM.composeEmail = function(o)
{
	let baseurl = process.env.NL_SITE_URL || 'http://localhost:3000';
	var html = "<html><body>";
		html += "Hi "+o.name+",<br><br>";
		html += "Your username is <b>"+o.user+"</b><br><br>";
		html += "<a href='"+baseurl+'/reset-password?key='+o.passKey+"'>Click here to reset your password</a><br><br>";
		html += "Cheers,<br>";
		html += "<a href='https://braitsch.io'>braitsch</a><br><br>";
		html += "</body></html>";
	return [{data:html, alternative:true}];
}