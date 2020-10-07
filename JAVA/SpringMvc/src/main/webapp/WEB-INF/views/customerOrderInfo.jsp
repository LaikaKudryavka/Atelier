<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
	<title>Home</title>
	
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
			Hello World
		</h1>
	</header>

	<div class="customer-div">
		<ul>
			<li class="customer-list">${result.CUST_ID} ${result.CUST_NM} ${result.TOT_AMT}</li>
		</ul>
	</div>

	<footer>
		<p>copyright 2020</p>
	</footer>
</body>
</html>