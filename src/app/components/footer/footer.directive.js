export function FooterDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    scope: {},
    templateUrl: '/app/components/footer/footer.html',
    controller: FooterController,
    controllerAs: 'vm'
  };

  return directive;
}

class FooterController {
  constructor () {
    'ngInject';
  }
}
