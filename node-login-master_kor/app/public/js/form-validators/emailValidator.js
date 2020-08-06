
function EmailValidator() // Email 유효성 검사
{
	let modal = $('#get-credentials'); 
	let alert = $('#get-credentials .alert');

	this.modal = modal;
	this.alert = alert;
	this.modal.on('show.bs.modal', function(){ $('#get-credentials-form').resetForm(); alert.hide();});
}

EmailValidator.prototype.validateEmail = function(e) 
{
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(e); // 정규식과 동일하면 true
}

EmailValidator.prototype.showEmailAlert = function(m) // Email Error Alert 출력
{
	this.alert.attr('class', 'alert alert-danger'); // class 값을 alert alert-danger
	this.alert.html(m); 
	this.alert.show(); 
}

EmailValidator.prototype.hideEmailAlert = function() // Email Error Alert 숨김
{
	this.alert.hide();
}

EmailValidator.prototype.showEmailSuccess = function(m) // Email 성공 메세지 출력
{
	this.alert.attr('class', 'alert alert-success'); // class 값을 alert alert-success
	this.alert.html(m);
	this.alert.fadeIn(500);
}