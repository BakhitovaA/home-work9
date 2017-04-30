var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/users';

MongoClient.connect(url, function (err, db) {
	if (err) {
		console.log('Невозможно подключиться к серверу MongoBD. Ошибка: ', err);
	} else {
		console.log('Подключение к: ', url);
		
		var collection = db.collection('users');
		
		var user1 = {name : 'Anya'};
		var user2 = {name : 'Alex'};
		var user3 = {name : 'Anastasiya'};
		var user4 = {name : 'Kate'};
		var user5 = {name : 'Luke'};
		
		collection.insert([user1, user2, user3, user4, user5], function (err, result) {
			if (err) {
				console.log(err);
			} else {
				collection.find({}).toArray(function (err, result) {
					if (err) {
						console.log(err);
					} else  {
						if (result.length) {
							console.log('Список имен в коллекции: ', result)
						} else {
							console.log('Результатов не найдено');
						}
					}
				});
				
				collection.update({name : 'Alex'},{'$set':{name : 'Alexey'}});
				collection.update({name : 'Kate'},{'$set':{name : 'Ekaterina'}})

				collection.find({}).toArray(function (err, result) {
					if (err) {
						console.log(err);
					} else  {
						console.log('Список имен в новой коллекции: ', result);
					}
				});

				collection.remove({name : 'Alexey'});
				collection.remove({name : 'Ekaterina'})
				
				collection.find({}).toArray(function (err, result) {
					if (err) {
						console.log(err);
					} else  {
						console.log('Список имен в коллекции после удаления: ', result);
					}
				});
			}
			
			db.close();
		})	
	}
})