Template.LoginPage.helpers({

});

Template.LoginPage.events({
	'click #login' : function() {

		$('#error').html();

		console.log('login clicked');

		Meteor.loginWithPassword($('#username').val(), $('#password').val(), function(error){
     		if(error) {

     			console.log(error);

				$('#error').html(error);
			} else {
				Router.go('home');
			}
   		});
	}
});