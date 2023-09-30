import { environment } from '@env/environment';
import { MenuStatus } from '@app/shell/menu-status';
export abstract class Menu {
  get hideProductionNotReadyMenu() {
    if (environment?.hideProductionNotReadyMenu) {
      return true;
    } else {
      return false;
    }
  }

  get hideStagingNotReadyMenu() {
    if (environment?.hideStagingNotReadyMenu) {
      return true;
    } else {
      return false;
    }
  }

  menuDisabled(menuStat: MenuStatus) {
    switch (environment.site.toLowerCase()) {
      case 'devp': {
        return false;
        break;
      }
      case 'stg': {
        return !this.readyForStaging(menuStat);
        break;
      }
      case 'prod': {
        return !this.readyForProduction(menuStat);
        break;
      }
      default: {
        return true;
        break;
      }
    }
  }

  menuVisible(menuStat: MenuStatus) {
    switch (environment.site.toLowerCase()) {
      case 'devp': {
        return true;
        break;
      }
      case 'stg': {
        if (this.hideStagingNotReadyMenu) {
          return this.readyForStaging(menuStat);
        } else {
          return true;
        }
        break;
      }
      case 'prod': {
        if (this.hideProductionNotReadyMenu) {
          return this.readyForProduction(menuStat);
        } else {
          return true;
        }
        break;
      }

      default: {
        return false;
        break;
      }
    }
  }

  readyForProduction(menuStat: MenuStatus): boolean {
    switch (menuStat) {
      case MenuStatus.NotReady: {
        //statements;
        return false;
        break;
      }
      case MenuStatus.ReadyForUAT: {
        //statements;
        return false;
        break;
      }
      case MenuStatus.UatPassed: {
        //statements;
        return true;
        break;
      }
      case MenuStatus.ProductionPassed: {
        return true;
        break;
      }

      default: {
        //statements;
        return false;
        break;
      }
    }
  }

  readyForStaging(menuStat: MenuStatus): boolean {
    switch (menuStat) {
      case MenuStatus.NotReady: {
        //statements;
        return false;
        break;
      }
      case MenuStatus.ReadyForUAT: {
        //statements;
        return true;
        break;
      }
      case MenuStatus.UatPassed: {
        //statements;
        return true;
        break;
      }
      case MenuStatus.ProductionPassed: {
        return true;
        break;
      }

      default: {
        //statements;
        return false;
        break;
      }
    }
  }
}
