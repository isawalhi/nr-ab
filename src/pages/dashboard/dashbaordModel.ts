import Services from '../../services/services';
import App from './components/application/applicationModel';
import Host from './components/host/hostModel';
import type { IApp, DashboardLayoutType } from './types';

interface IHosts {
  [hostName: string]: Host
}

class Model {
  private hosts: IHosts

  private layoutType: DashboardLayoutType

  constructor() {
    this.hosts = {};
    this.layoutType = 'grid';
  }

  public async initialize() {
    const applications = await Services.getApplicationsList();

    this.hosts = this.parseApplications(applications);
  }

  public getHosts() {
    return this.hosts;
  }

  public getTopAppsByHost(hostName) {
    return this.hosts[hostName].getTopApplications();
  }

  public addAppToHosts(app: IApp, hosts) {
    hosts.forEach((hostName) => {
      this.hosts[hostName] = this.hosts[hostName] || new Host(hostName, []);
      this.hosts[hostName].addApplication(app);
    });
  }

  public removeAppFromHosts(app: IApp) {
    Object.values(this.hosts).forEach((host: any) => host.removeApplication(app));
  }

  public getLayoutType() {
    return this.layoutType;
  }

  public setLayoutType(type) {
    this.layoutType = type;
  }

  private parseApplications(applications): IHosts {
    return applications?.reduce((acc, appData) => {
      const app = new App(appData);
      appData.host.forEach((hostName) => {
        acc[hostName] = acc[hostName] || new Host(hostName, []);
        acc[hostName].applications.push(app);
      });
      return acc;
    }, {});
  }
}

export default Model;
