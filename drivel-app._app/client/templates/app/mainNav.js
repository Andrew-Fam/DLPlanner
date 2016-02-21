Template.mainNav.events({
    'click #logout': function(event) {

        console.log('logout clicked');

        Meteor.logout(function(error){
        	if(error) {

     			console.log(error);

				$('#error').html(error);
			} else {
				Router.go('home');
			}
        });
    }
});