
function HomeController()
{
// bind event listeners to button clicks //
	var that = this;

// handle user logout // 로그아웃(Sign Out) 버튼
	$('#btn-logout').click(function(){ that.attemptLogout(); });

// confirm account deletion // 계정삭제(delete) 버튼
	$('#account-form-btn1').click(function(){$('.modal-confirm').modal('show')});

// handle account deletion // madal 경고문 계정삭제(delete) 버튼
	$('.modal-confirm .submit').click(function(){ that.deleteAccount(); });

	this.deleteAccount = function() //계정삭제
	{
		$('.modal-confirm').modal('hide');
		var that = this;
		$.ajax({
			url: '/delete', // routes.js -> app.post('/delete', function(req, res){ 으로 연결되어 계정삭제 기능 작동
			type: 'POST',
			success: function(data){
	 			that.showLockedAlert('계정삭제 완료.<br>로그인 페이지로 이동합니다.');
			},
			error: function(jqXHR){
				console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
			}
		});
	}

	this.attemptLogout = function() // 로그아웃
	{
		var that = this;
		$.ajax({
			url: '/logout', // routes.js -> app.post('/logout', function(){}) 으로 연결되어 로그아웃 진행
			type: 'POST',
			data: {logout : true},
			success: function(data){
	 			that.showLockedAlert('로그아웃 완료.<br>로그인 페이지로 이동합니다.');
			},
			error: function(jqXHR){
				console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
			}
		});
	}

	this.showLockedAlert = function(msg){ // modal 알림 생성
		$('.modal-alert').modal({ show : false, keyboard : false, backdrop : 'static' });
		// modal option : show - 보임? (true/false) keyboard - 키보드 esc 가능?(true/false) backdrop - 외부 어두움? (true/false, "static")
		$('.modal-alert .modal-header h4').text('Success!'); //$( ) 내용 Success!
		$('.modal-alert .modal-body p').html(msg); // $( ) 내용을 "msg" 로 넣음 
		$('.modal-alert').modal('show');
		$('.modal-alert button').click(function(){window.location.href = '/';}) // 클릭시 '/'로 이동
		setTimeout(function(){window.location.href = '/';}, 3000); // 3초뒤 '/' 로 이동
	}
}

HomeController.prototype.onUpdateSuccess = function() //update 성공시 출력되는 modal 구현
{
	$('.modal-alert').modal({ show : false, keyboard : true, backdrop : true });
	$('.modal-alert .modal-header h4').text('Success!');
	$('.modal-alert .modal-body p').html('계정 업데이트 완료.');
	$('.modal-alert').modal('show');
	$('.modal-alert button').off('click');
}
