Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});

Router.route('/login', {
  name: 'loginPage',
  template: 'LoginPage',
  controller: 'LoginPageController'
})

Router.route('/', {
  name: 'home',
  controller: 'HomeController',
  where: 'client'
});

Router.route('learners', {
  name: 'learners',
  template: 'Learners',
  controller: 'LearnersController',
  where: 'client',
  fastRender: true
});

Router.route('learners/new/', {
  name: 'learnersNew',
  template: 'New',
  controller: 'NewController',
  where: 'client'
});

Router.route('learners/:_id', {
  name: 'learnersDetails',
  template: 'LearnersDetails',
  controller: 'LearnersDetailsController',
  where: 'client'
});

Router.plugin('auth', {
  authenticate: {
    route: 'loginPage'
  },
  except: [
    'loginPage'
  ],
  authorize: {
    allow: function() {
      if (Meteor.userId() != undefined && Meteor.userId() != null)
        return true
      else
        return false
    },
    template: 'LoginPage'
  }
});