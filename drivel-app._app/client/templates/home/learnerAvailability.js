Template.LearnerAvailability.helpers({
	dayAvailability: function() {
		return this.availability[Template.parentData().dayOfWeek];
	}
});