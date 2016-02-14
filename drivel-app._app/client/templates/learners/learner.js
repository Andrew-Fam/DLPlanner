/*****************************************************************************/
/* Learner: Event Handlers */
/*****************************************************************************/
Template.Learner.events({
	'click .learner-item--view-profile-btn' : function(e){
		Router.go('learnersDetails',{ _id: this._id});
	},
	'click .learner-item--update-profile-btn' : function(e){
		Router.go('learnersDetails',{ _id: this._id});
	}
});

/*****************************************************************************/
/* Learner: Helpers */
/*****************************************************************************/
Template.Learner.helpers({
	needMoreDetails : function() {
		var requiredFields = [
			this.dob,
			this.fullName,
			this.license.number,
			this.license.expiry
		];

		var missingFields = false;

		for (var i = 0; i<requiredFields.length;i++ ) {
			if(requiredFields[i]=='') {

				missingFields = true;

				break;
			}
		}

		return missingFields;
	},
	updated_on_readable : function() {
		return moment(this.updated_on).fromNow();
	},
	at : function() {
		return moment(this.created_on).fromNow();
	}
});

/*****************************************************************************/
/* Learner: Lifecycle Hooks */
/*****************************************************************************/
Template.Learner.onCreated(function () {
});

Template.Learner.onRendered(function () {
});

Template.Learner.onDestroyed(function () {
});
