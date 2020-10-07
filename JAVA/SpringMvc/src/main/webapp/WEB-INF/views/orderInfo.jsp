<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script>
document.addEventListener("DOMContentLoaded", function(){
	
   document.getElementById("ajaxBtn").addEventListener("click", function(){
      var httpRequest = new XMLHttpRequest();
      httpRequest.onreadystatechange = function(){
         if( httpRequest.readyState == XMLHttpRequest.DONE){
            if(httpRequest.status == '200'){
               console.log(JSON.parse(httpRequest.responseText)); 
               container.innerText = "ID : " + JSON.parse(httpRequest.responseText).result.CUST_ID + "\nName : " + JSON.parse(httpRequest.responseText).result.CUST_NM + "\nTOT_AMT : " + JSON.parse(httpRequest.responseText).result.TOT_AMT;
            }
         }
      };
      var custId = document.querySelector("#custId");
      var params = 'custId=' + custId.value;
      httpRequest.open('post', 'orderInfo.ajax');
      httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      httpRequest.send(params);
      
      var container = document.getElementById("container");
      
   });
});
</script>
</head>
<body>
   <form>
      <input type="text" name="custId" id="custId" value="">
      <input type="button" value="ajax 요청" id="ajaxBtn">
   </form>
   <div id="container">
      
   </div>
</body>
</html>