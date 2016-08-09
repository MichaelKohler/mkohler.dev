export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .state('contact', {
      url: '/contact',
      templateUrl: 'app/components/contact/contact.html',
      controller: 'ContactController',
      controllerAs: 'contact'
    })
    .state('talks', {
      url: '/talks',
      templateUrl: 'app/components/talks/talks.html',
      controller: 'TalksController',
      controllerAs: 'talks'
    })
    .state('mozilla', {
      url: '/mozilla',
      templateUrl: 'app/components/mozilla/mozilla.html',
      controller: 'MozillaController',
      controllerAs: 'mozilla'
    });

  $urlRouterProvider.otherwise('/');
}
