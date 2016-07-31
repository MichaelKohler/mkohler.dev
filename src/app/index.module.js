import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { HeaderDirective } from './components/header/header.directive';
import { FooterDirective } from './components/footer/footer.directive';

angular.module('mkohlerCodes', ['ui.router', 'typer'])
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .directive('mkohlerHeader', HeaderDirective)
  .directive('mkohlerFooter', FooterDirective)
  .controller('MainController', MainController);
