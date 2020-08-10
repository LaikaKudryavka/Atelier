
function LoginController()
{
// bind event listeners to button clicks // 
	$('#retrieve-password-submit').click(function(){ $('#get-credentials-form').submit();}); 
	// forgot password 눌렀을 때 발생한 Retrieve Password Modal의 email 전송 submit 버튼
	$('#login #forgot-password').click(function(){  // Login창의 Forgot Your Password 를 눌렀을 때
		$('#cancel').html('Cancel');
		$('#retrieve-password-submit').show();
		$('#get-credentials').modal('show');
	});
	$('#login .button-rememember-me').click(function(e) { // 로그인 유지여부 버튼
		var span = $(this).find('span');
		if (span.hasClass('glyphicon-unchecked')){ // 클래스 존재여부 확인
			span.addClass('glyphicon-ok'); 
			span.removeClass('glyphicon-unchecked');
		}	else{
			span.removeClass('glyphicon-ok');
			span.addClass('glyphicon-unchecked');
		}
	});

// automatically toggle focus between the email modal window and the login form // 자동 포커싱
	$('#get-credentials').on('shown.bs.modal', function(){ $('#email-tf').focus(); });
	$('#get-credentials').on('hidden.bs.modal', function(){ $('#user-tf').focus(); });
}