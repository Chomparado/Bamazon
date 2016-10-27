var prompt = require('prompt');
var mysql = require('mysql');
var connection = mysql.createConnection({
	host	: 'm7wltxurw8d2n21q.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
	user	: 'gb7es5xmh3fqrnim',
	password: 'Optionselect1!',
	database: 'rdpd4h0nf751vwtr'
});

prompt.start();


 
var query = connection.query('SELECT * FROM Products', function(err, rows){
	for (var i = 0; i<rows.length; i++){
		console.log("Item ID: "+rows[i].ItemID);
		console.log("Product Name: "+ rows[i].ProductName);
		console.log("Price: "+ rows[i].Price);
		console.log("======================")
		// console.log(rows[i])
	}


	console.log("Welcome to Amazon Storefront!");

	prompt.get(['ID', 'quantity'], function (err, res) {

			var connection = mysql.createConnection({
				host	: 'm7wltxurw8d2n21q.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
				user	: 'gb7es5xmh3fqrnim',
				password: 'Optionselect1!',
				database: 'rdpd4h0nf751vwtr'
			});


		var quantity = connection.query("SELECT * FROM Products WHERE ItemID = '" + res.ID + "'", function (err, result2, fields){
				if (err) throw err;
				var qtyNeed = res.quantity


				for (var j = 0; j<result2.length; j++){
					var itemPrice = result2[j].Price;
					var itemQuantity = result2[j].StockQuantity;


						if (itemQuantity == 0){
							console.log("I'm sorry, we are sold out of that item.");
						}else{
							var totalPrice = itemPrice * qtyNeed
							var newQty = itemQuantity - 1;



							connection.query('UPDATE Products SET StockQuantity = ? WHERE ItemID = ?', [newQty, res.ID], function (err, res2) {
								if (err) throw err;
								
								console.log("Your Total Cost: $"+totalPrice+".");
								console.log("Thank you for shopping with us!");
							});
						}

				};

		});
			


	});

 });
connection.end();