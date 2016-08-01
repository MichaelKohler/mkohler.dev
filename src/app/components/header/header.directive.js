export function HeaderDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/components/header/header.html',
    controller: HeaderController,
    controllerAs: 'vm'
  };

  return directive;
}

class HeaderController {
  constructor () {
    'ngInject';
  }
}
