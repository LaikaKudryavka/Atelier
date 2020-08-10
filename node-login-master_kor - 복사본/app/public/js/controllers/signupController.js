
function SignupController()
{
// redirect to homepage when cancel button is clicked // Signup 페이지에서 Cancel 버튼 구현 { 클릭시 '/' 로 이동 } 
	$('#account-form-btn1').click(function(){ window.location.href = '/';});

// redirect to homepage on new account creation, add short delay so user can read alert window // Signup 페이제이서 submit 으로 성공적인 계정생성에 의해 발생되는 modal의 ok 버튼 {3초 후 '/' 로 이동}
	$('.modal-alert #ok').click(function(){ setTimeout(function(){window.location.href = '/';}, 300)});
}