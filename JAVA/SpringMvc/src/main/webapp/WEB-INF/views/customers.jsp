<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
	<title>Home</title>
	<script> <!-- 꼼수 -->
// 		var result = "${affectedCount}";
// 		if(result){
// 			alert(`${result} 건이 추가 되었습니다.`);
// 		}
		
	</script>
	
	<style>
		
		header{background:black; color:white; height:100px;}
		header h1{padding:20px; font-size:40px;}
		footer{background:gray; height:50px;}
		
		.customer-div{border:.5px solid; width:500px;}
		
		.customer-list:nth-child(2n){background-color:gray;}
	</style>
	
</head>
<body>
<header>
	<h1>
		Hello World 야옹
	</h1>
</header>

<div class="customer-div">
	<ul>
	<c:forEach var="customer" items="${customers}">
		<li class="customer-list">${customer.custId} ${customer.custNm} ${customer.address} ${customer.phone }</li>
	</c:forEach>
	</ul>
	
	<div class="customer-div">
	<form action="${pageContext.request.contextPath}/customers/registerCust" method="post">
		<input type="text" name="custId" placeholder="custid">
		<input type="text" name="custNm" placeholder="custnm">
		<input type="text" name="addresss" placeholder="address">
		<input type="text" name="phone" placeholder="phone">
		<input type="submit">
	</form>
	
	<form action="${pageContext.request.contextPath}/customers/registerCust" method="post">
		<input type="text" name="custId" placeholder="custid" value="${customerVO.custId}">
		<input type="text" name="custNm" placeholder="custnm" value="${customerVO.custNm}">
		<input type="text" name="addresss" placeholder="address" value="${customerVO.address}">
		<input type="text" name="phone" placeholder="phone" value="${customerVO.phone}">
		<input type="submit">
	</form>
	
	<sec:authorize access="isAuthenticated()">
	    <form action=<c:url value='/logout' /> method="GET">
	        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
	        <button type="submit">LOGOUT</button>
	    </form>
	</sec:authorize>

</div>
</div>

<footer>
<p>copyright 2020</p>
</footer>
</body>
</html>