Meteor.startup(function () {
	LearnersPages = new Meteor.Pagination(Learners,{
		itemTemplate: 'Learner',
		templateName: 'Learners',
		navShowEdges: false,
		navShowFirst: false,
		navShowLast: false,
		onReloadPage1: true,
		perPage: 6
	});
});
