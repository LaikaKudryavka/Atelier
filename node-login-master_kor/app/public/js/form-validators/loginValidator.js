
function LoginValidator() // 로그인 유효성 검사
{
// bind a simple alert window to this controller to display any errors //
	this.loginErrors = $('.modal-alert');
	
	this.showLoginError = function(t, m) // Login Error 출력
	{
		$('.modal-alert .modal-header h4').text(t);
		$('.modal-alert .modal-body').html(m);
		this.loginErrors.modal('show');
	}
}

LoginValidator.prototype.validateForm = function()
{
	if ($('#user-tf').val() == ''){ // 입력칸에 username이 없을 때
		this.showLoginError('Whoops!', 'Please enter a valid username');
		return false;
	}	else if ($('#pass-tf').val() == ''){ // 입력칸에 password가 없을 때
		this.showLoginError('Whoops!', 'Please enter a valid password');
		return false;
	}	else{
		return true; // 성공
	}
}