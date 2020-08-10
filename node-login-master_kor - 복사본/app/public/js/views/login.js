
$(document).ready(function(){

	var lv = new LoginValidator(); // \form-validators\loginValidator.js
	var lc = new LoginController(); // \controllers\loginController.js

// main login form //

	$('#login').ajaxForm({ 
		beforeSubmit : function(formData, jqForm, options){
			if (lv.validateForm() == false){
				return false;
			} 	else{
			// append 'remember-me' option to formData to write local cookie // remember-me 체크 여부를 보냄
				formData.push({name:'remember-me', value:$('#btn_remember').find('span').hasClass('fa-check-square')});
				return true;
			}
		},
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') window.location.href = '/main'; 
		},
		error : function(e){
			lv.showLoginError('로그인 실패', 'username과 password를 다시 확인해주세요.');
		}
	}); 

	$("input:text:visible:first").focus(); 
	$('#btn_remember').click(function(){ // remember 버튼 클릭시 발생 이벤트
		var span = $(this).find('span'); 
		if (span.hasClass('fa-minus-square')){ // 이 클래스가 뭘 하고 싶어하는지 모르겠음.
			span.removeClass('fa-minus-square'); // 넣다 뺏다 뭐 어쩌라는겨
			span.addClass('fa-check-square');
		}	else{
			span.addClass('fa-minus-square');
			span.removeClass('fa-check-square');
		}
	});

// login retrieval form via email //
	
	var ev = new EmailValidator(); // \form-validators\emailValidator.js
	
	$('#get-credentials-form').ajaxForm({ // forgot password
		type:"post",
		url: '/lost-password',
		beforeSubmit : function(formData, jqForm, options){
			if (ev.validateEmail($('#email-tf').val())){ // email 유효성 검사
				ev.hideEmailAlert();
				return true;
			}	else{
				ev.showEmailAlert("유효한 이메일을 입력해주세요.");
				return false;
			}
		},
		success	: function(responseText, status, xhr, $form){ // Error 400 ㅅㄱ...
			$('#cancel').html('OK');
			$('#retrieve-password-submit').hide();
			ev.showEmailSuccess("A link to reset your password was emailed to you.");
		},
		error : function(e){
			if (e.responseText == 'email-not-found'){
				ev.showEmailAlert("Email not found. Are you sure you entered it correctly?");
			}	else{
				$('#cancel').html('OK');
				$('#retrieve-password-submit').hide();
				ev.showEmailAlert("문제가 발생하였습니다. 잠시 후 다시 시도해 주세요.");
			}
		}
	});
	
});
