


Meteor.publish('learners', function () {
  return Learners.find();
});