/*****************************************************************************/
/*  Server Methods */
/*****************************************************************************/

Meteor.methods({
  'server/method_name': function () {
    // server method logic
  },
  'saveNewLearner' : function(learnerItem) {

    if(Meteor.userId()) {
      learnerItem.created_on = new Date().getTime();

      var learnerId = Learners.insert(learnerItem);

      learnerItem._id = learnerId;

      return learnerItem;
    } else {
      throw new Meteor.error( 403, 'You need to login to execute this');
    }

  	

  },
  'saveCurrentLearner' : function(learnerItem) {

    if(Meteor.userId()) {
      

    	learnerItem.updated_on = new Date().getTime();

    	console.log(learnerItem);

    	var updatedId = Learners.update(learnerItem._id,learnerItem);

  	   return learnerItem;
    } else {
      throw new Meteor.error( 403, 'You need to login to execute this');
    }

  },
  'customLogout' : function() {
    ServerSession.set('authenticated',undefined);
    return true;
  }
});
