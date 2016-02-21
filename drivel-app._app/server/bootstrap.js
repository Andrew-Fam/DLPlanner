Meteor.startup(function () {
	if(!Accounts.findUserByUsername('jtran')) {
		Accounts.createUser({
			username: 'jtran',
			password: 'jason1234'
		});
	}

	console.log(Accounts.findUserByUsername('jtran'));
});
