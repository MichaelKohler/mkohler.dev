import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { HeaderDirective } from './components/header/header.directive';

angular.module('mkohlerCodes', ['ui.router'])
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .directive('mkohlerHeader', HeaderDirective)
  .controller('MainController', MainController);
