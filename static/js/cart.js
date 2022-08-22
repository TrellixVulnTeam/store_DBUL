var updateBtns = document.getElementsByClassName('update-cart')

for (var i = 0; i < updateBtns.length; i++){
	updateBtns[i].addEventListener('click', function(){
		var productId = this.dataset.product
		var action = this.dataset.action
		console.log('productId: ', productId, 'action: ', action)

		console.log('USER:', user)
		if (user === 'AnonymousUser'){
			addCokkieItem(productId, action)
		}else{
			updateUserOrder(productId, action)
		}
	})
}

/*this function action when user is logged in
*/
function addCokkieItem(productId, action){
	console.log("Not logged in..")

	if(action == 'add'){
		if (cart[productId] == undefined){
			cart[productId] = {'quantitiy':1}
		}else{
			cart[productId]['quantitiy'] += 1
		}
	} 
	if (action == 'remove'){
		cart[productId]['quantity'] -= 1

		if (cart[productId]['qiantity'] <= 0){
			console.log("Remove Item")
			delete cart[productId]
		}
	}
	console.log('Cart:', cart)
	document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/"

}
/* fetch is the way to send data to backend by useing the Token and past it in headers 'X-CSRFToken */
function updateUserOrder(productId, action){
	var url = '/update_item/'
	fetch( url, {
		method:'POST',
		headers: {
			'Content-Type':'application/json',
			'X-CSRFToken': csrftoken,
		},
		body:JSON.stringify({'productId': productId, 'action':action})
	})
	.then((response)=>{
		return response.json()
	})
	.then((data)=>{
		console.log('data:', data)
		location.reload()
	})
}