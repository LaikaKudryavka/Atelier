function setPortfolioController(){
    $('#pofolset').ajaxForm({
        	url: '/updata-pofol', // routes.js -> app.post('/delete', function(req, res){ 으로 연결되어 계정삭제 기능 작동
			type: 'POST',
			success: function(data){

			},
			error: function(jqXHR){
				console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
			}
		});
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') ;
		},
	});
}