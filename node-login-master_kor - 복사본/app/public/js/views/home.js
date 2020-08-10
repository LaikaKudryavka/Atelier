
$(document).ready(function(){

	var hc = new HomeController(); // \controllers\homeController.js
	var av = new AccountValidator(); // \form-validators\accountValidator.js
	
	$('#account-form').ajaxForm({ // 변경된 계정내용 갱신을 위한 ajax
		beforeSubmit : function(formData, jqForm, options){
			if (av.validateForm() == false){
				return false;
			} 	else{
			// push the disabled username field onto the form data array //
				formData.push({name:'user', value:$('#user-tf').val()})
				return true;
			}
		},
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') hc.onUpdateSuccess();
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

// customize the account settings form // 
// 로그인 하고나서 보이는 계정 설정	폼의 내용
	$('#account-form h2').text('계정 설정');
	$('#account-form #sub').text('현재 사용자의 계정설정 내용 입니다.');
	$('#user-tf').attr('disabled', 'disabled'); //username 비활성화
	$('#account-form-btn1').html('탈퇴');
	$('#account-form-btn1').removeClass('btn-outline-dark');
	$('#account-form-btn1').addClass('btn-danger');
	$('#account-form-btn2').html('변경');

// setup the confirm window that displays when the user chooses to delete their account //
// 계정설정에서 Delete 버튼을 눌렀을때 발생하는 Modal 폼의 내용
	$('.modal-confirm').modal({ show : false, keyboard : true, backdrop : true });
	$('.modal-confirm .modal-header h4').text('계정 탈퇴');
	$('.modal-confirm .modal-body p').html('정말로 계정 탈퇴를 하시겠습니까?');
	$('.modal-confirm .cancel').html('취소');
	$('.modal-confirm .submit').html('탈퇴');
	$('.modal-confirm .submit').addClass('btn-danger');

});