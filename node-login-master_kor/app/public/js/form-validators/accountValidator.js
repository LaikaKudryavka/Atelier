
function AccountValidator() //계정 유효성 검사
{
// build array maps of the form inputs & control groups //

	this.formFields = [$('#name-tf'), $('#email-tf'), $('#user-tf'), $('#pass-tf')];
	this.controlGroups = [$('#name-cg'), $('#email-cg'), $('#user-cg'), $('#pass-cg')];
	
// bind the form-error modal window to this controller to display any errors //
	
	this.alert = $('.modal-form-errors');
	this.alert.modal({ show : false, keyboard : true, backdrop : true});
	// 경고 Modal 보임 여부 : false Keyboard로 종료 가능, 외부 어두움
	
	this.validateName = function(s) // 이름 유효성 검사 (길이가 3보다 커야 true)
	{
		return s.length >= 3;
	}
	
	this.validatePassword = function(s) // 비밀번호 유효성 검사
	{
	// if user is logged in and hasn't changed their password, return ok
		if ($('#userId').val() && s===''){ //id가 존재하며, password를 변경하지 않을시
			return true;
		}	else{
			return s.length >= 6; // 비밀번호가 6자리 이상이어야함
		}
	}
	
	this.validateEmail = function(e) // 이메일 유효성 검사
	{
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(e); // 해당 정규식이 맞을시 true
	}
	
	this.showErrors = function(a) // error 내용 출력
	{
		$('.modal-form-errors .modal-body p').text('Please correct the following problems :');
		var ul = $('.modal-form-errors .modal-body ul');
			ul.empty();
		for (var i=0; i < a.length; i++) ul.append('<li>'+a[i]+'</li>');
		this.alert.modal('show');
	}

}

AccountValidator.prototype.showInvalidEmail = function() // email 에러창
{
	this.controlGroups[1].addClass('error');
	this.showErrors(['That email address is already in use.']);
}

AccountValidator.prototype.showInvalidUserName = function() //username 에러창
{
	this.controlGroups[2].addClass('error');
	this.showErrors(['That username is already in use.']);
}

AccountValidator.prototype.validateForm = function() // 유효성 검사폼
{
	var e = [];
	for (var i=0; i < this.controlGroups.length; i++) this.controlGroups[i].removeClass('error');
	if (this.validateName(this.formFields[0].val()) == false) {
		this.controlGroups[0].addClass('error'); e.push('Please Enter Your Name');
	}
	if (this.validateEmail(this.formFields[1].val()) == false) {
		this.controlGroups[1].addClass('error'); e.push('Please Enter A Valid Email');
	}
	if (this.validateName(this.formFields[2].val()) == false) {
		this.controlGroups[2].addClass('error');
		e.push('Please Choose A Username');
	}
	if (this.validatePassword(this.formFields[3].val()) == false) {
		this.controlGroups[3].addClass('error');
		e.push('Password Should Be At Least 6 Characters');
	}
	if (e.length) this.showErrors(e);
	return e.length === 0;
}

