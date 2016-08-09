import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { ContactController } from './components/contact/contact.controller';
import { TalksController } from './components/talks/talks.controller';
import { MozillaController } from './components/mozilla/mozilla.controller';
import { HeaderDirective } from './components/header/header.directive';
import { FooterDirective } from './components/footer/footer.directive';

angular.module('mkohlerCodes', ['ui.router', 'typer'])
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .directive('mkohlerHeader', HeaderDirective)
  .directive('mkohlerFooter', FooterDirective)
  .controller('ContactController', ContactController)
  .controller('TalksController', TalksController)
  .controller('MozillaController', MozillaController)
  .controller('MainController', MainController);
