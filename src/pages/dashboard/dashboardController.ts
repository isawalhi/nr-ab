import DashboardView from './dashboardView';
import DashboardModel from './dashbaordModel';
import AppView from './components/application/applicationView';

class Controller {
  private dashboardView: DashboardView

  private dashboardModel: DashboardModel

  private appView: AppView

  constructor() {
    this.dashboardModel = new DashboardModel();
    this.dashboardView = new DashboardView();

    this.appView = new AppView();

    this.dashboardView.changeLayoutEvent
      .addListener((type) => { this.dashboardModel.setLayoutType(type); });
  }

  public async render() {
    await this.dashboardModel.initialize();

    const hosts = this.dashboardModel.getHosts();

    return this.dashboardView.generateMarkup(hosts, this.dashboardModel.getLayoutType());
  }

  public afterRender() {
    this.dashboardView.afterRender();
    this.appView.afterRender();
  }
}

export default Controller;
