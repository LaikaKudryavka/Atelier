
$(document).ready(function(){
	
	var rv = new ResetValidator(); // \form-validators\resetValidator.js
	
	$('#set-password-form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){;
			rv.hideAlert();
			if (rv.validatePassword($('#pass-tf').val()) == false){ // 새로운 패스워드 유효성 검사
				return false;
			} 	else{
				return true;
			}
		},
		success	: function(responseText, status, xhr, $form){
			$('#set-password-submit').addClass('disabled');
			$('#set-password-submit').prop('disabled', true);
			rv.showSuccess("비밀번호가 초기화 되었습니다.");
			setTimeout(function(){ window.location.href = '/'; }, 3000); // 3초뒤 첫화면으로
		},
		error : function(){
			rv.showAlert("문제가 발생하였습니다. 잠시 후 다시 시도해 주세요");
		}
	});

	$('#set-password').modal('show');
	$('#set-password').on('shown', function(){ $('#pass-tf').focus(); })

});