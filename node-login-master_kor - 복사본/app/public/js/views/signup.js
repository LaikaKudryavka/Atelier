
$(document).ready(function(){
	
	var av = new AccountValidator(); // \form-validators\accountValidator.js
	var sc = new SignupController(); // \controllers\signupController.js
	
	$('#account-form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){ // 계정 유효성 검사
			return av.validateForm();
		},
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') $('.modal-alert').modal('show');
		},
		error : function(e){
			if (e.responseText == 'email-taken'){
				av.showInvalidEmail();
			}	else if (e.responseText == 'username-taken'){
				av.showInvalidUserName();
			}
		}
	});
	$('#name-tf').focus();
	
// customize the account signup form // 회원가입 폼
	
	$('#account-form h2').text('계정 생성');
	$('#account-form #sub').text('정보를 입력해 주세요.');
	$('#account-form-btn1').html('취소');
	$('#account-form-btn2').html('가입');
	$('#account-form-btn2').addClass('btn-primary');
	
// setup the alert that displays when an account is successfully created // 성공적인 계정 생성을 알리는 modal 폼

	$('.modal-alert').modal({ show:false, keyboard : false, backdrop : 'static' });
	$('.modal-alert .modal-header h4').text('계정 생성!');
	$('.modal-alert .modal-body p').html('계정이 새로 생성되었습니다.</br>OK를 누르면 로그인 화면으로 이동합니다.');

});