<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Book Market Place</title>
<style>
	.customerListSection {border:0.5px solid; width:400px;}}
	.buyBookListBox {border:0.5px solid; width: 500px;}
	
	.content-body{
		display: flex;
		flex-direction: row;
		background-color: grey;
	}
	.content-body > .customerListSection, .content-body > .buyBookListBox {
		border: 1px solid;
	}
	
	.customer-table-tr:hover{background-color:white;}
	.customer-table-tr:active{background-color:black; color:white;}
	
	
</style>

<script>
document.addEventListener("DOMContentLoaded", function(){
	var custId = document.getElementById("custId");
	var custNm = document.getElementById("custNm");
	
	document.querySelector("#custTbl > tbody").addEventListener("click",function(e){
		var src = e.target;

		if(!(src.nodeType === 1 && src.nodeName === "TD")) return;
		
		console.log(src);
		
		custId.value = src.parentElement.firstElementChild.innerText;
		custNm.value = src.parentElement.firstElementChild.nextElementSibling.innerText;
	})	
	
	//when add item click
	document.getElementById("addOrder").addEventListener("click",function(){
		addItem("orderContainer");
	});
});

(function (global){
	var seq = 0;
	var optionHtml = '';
	var unitPriceArr = [];
	
	<c:forEach var = "book" items="${books}">
		optionHtml += '<option value=${book.bookId}>${book.bookNm}</option>'
		unitPriceArr.push({bookId:'${book.bookId}', unitPrice:'${book.price}'});
	</c:forEach>
	
	function increment(){
		return seq++;
	}
	
	function addItem(containerId){
		var quantity = 1, seq = increment(), outerDiv = document.createElement("div");
		var firstInnerDiv = document.createElement("div"), secondInnerDiv = document.createElement("div");
		outerDiv.appendChild(firstInnerDiv);
		outerDiv.appendChild(secondInnerDiv);
		var productObj = document.createElement("select");
		productObj.innerHTML = optionHtml;
		productObj.name = `details[\${seq}].bookId`;
		productObj.addEventListener("change", function(){
			var bookPrice = unitPriceArr.filter( item => item.bookId === this.value )[0];
			document.getElementById(`details[\${seq}].unitPrice`).value = bookPrice.unitPrice;
		});
		firstInnerDiv.appendChild(productObj);
		var quantityObj = document.createElement("input");
		quantityObj.name = `details[\${seq}].qty`;
		quantityObj.type = "text";
		quantityObj.value = quantity;
		
		let priceObj = document.createElement("input");
		priceObj.name = `details[\${seq}].unitPrice`;
		priceObj.id = `details[\${seq}].unitPrice`;		
		priceObj.type = "text";
		priceObj.value = unitPriceArr[0].unitPrice;
		
		var incrementBtn = document.createElement("input");
		incrementBtn.type = "button";
		incrementBtn.value = "+";
		incrementBtn.addEventListener("click", function(){
			quantity++;
			quantityObj.value = quantity;
		});
		var decrementBtn = document.createElement("input");
		decrementBtn.type = "button";
		decrementBtn.value = "-";
		decrementBtn.addEventListener("click", function(){
			quantity--;
			quantityObj.value = quantity;
		});
		secondInnerDiv.appendChild(priceObj);
		secondInnerDiv.appendChild(quantityObj);
		secondInnerDiv.appendChild(incrementBtn);
		secondInnerDiv.appendChild(decrementBtn);
		
		document.getElementById(containerId).appendChild(outerDiv);
	}
	global.addItem = addItem;
})(this);
</script>

</head>
<body>
	<header>
		<h1>Online Book Market Place !</h1>
		<h2>온라인 서점</h2>
		<hr>
	</header>

	<article class="content-body">
		<section class="customerListSection">
			<div>
				<table id="custTbl">
				<thead>
					<tr>
						<th>고객ID</th>
						<th>고객NM</th>
						<th>주소</th>
						<th>전화번호</th>
					</tr>
				</thead>
				
					<tbody>
						<c:forEach var="customer" items="${customers}">
						<tr class = "customer-table-tr">
							<td id="customer_id" class="customer-td">${customer.custId}</td>
							<td id="customer_nm" class="customer-td">${customer.custNm}</td>
							<td id="customer_nm" class="customer-td">${customer.address}</td>
							<td id="customer_nm" class="customer-td">${customer.phone}</td>
							
						</tr>
					</c:forEach>
					</tbody>
				</table>
			
			</div>
		</section>
		
		<section class="buyBookListBox">
			<form action="" method="post">
				<div id="customerInfo" class="customerInfo">
					<input type="text" name="custId" id="custId">
					<input type="text" name="custNm" id="custNm">
					<input type="submit" value="주문">
				</div>
				
				<div>
					<input type="button" id="addOrder" value="+">
				</div>
				
				<div id = "orderContainer">
					
				</div>
			</form>			
			

		</section>
	</article>

	<footer>
		<hr>
		<h6>copyright 2020...</h6>
	</footer>
</body>
</html>