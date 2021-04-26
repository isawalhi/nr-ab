import Event from '../../../../event';
import { NUMBER_OF_TOP_APPLICATIONS } from '../../../config';

import type { IApp } from '../../types';

interface IGroupedApps {
  [apdex: number]: IApp[]
}

class Model {
  public hostName: string

  private applications: IApp[]

  public updateApplicationsEvent: Event

  constructor(hostName: string, applications: IApp[]) {
    this.hostName = hostName;
    this.applications = applications;

    this.updateApplicationsEvent = new Event();
  }

  public setApplications(applications) {
    this.applications = applications;
  }

  public getApplications() {
    return this.applications;
  }

  addApplication(application) {
    this.applications.push(application);
    // Trigger an event to update all the hosts that have this app
    this.updateApplicationsEvent
      .trigger({ hostName: this.hostName, applications: this.getTopApplications() });
  }

  removeApplication(application) {
    const updatedApplications = this.applications.filter((app) => app.name !== application.name);

    if (updatedApplications.length === this.applications.length) {
      return false;
    }

    this.setApplications(updatedApplications);

    // Trigger an event to update all the hosts that have this app
    this.updateApplicationsEvent
      .trigger({ hostName: this.hostName, applications: this.getTopApplications() });
    return true;
  }

  /**
   *
   * @param top if number, then return only the top sorted apps as skip sorting the rest
   * @returns sorted applications
   */
  private sortApplications(top = undefined): IApp[] {
    const groupedApps: IGroupedApps = this.applications.reduce((acc, app: IApp) => {
      acc[app.apdex] = acc[app.apdex] || [];
      acc[app.apdex].push(app);
      return acc;
    }, {});

    const sortedApdex = Object.keys(groupedApps).sort((a, b) => Number(b) - Number(a));

    const sortedApps = [];

    for (let i = 0; i < sortedApdex.length; i += 1) {
      sortedApps.push(...groupedApps[sortedApdex[i]]);
      // if top is defind as number return only the top sorted apps and skip sorting the rest
      if (sortedApps.length >= top) {
        break;
      }
    }

    return sortedApps;
  }

  /**
   * @returns the top sorted applications, controlled by a config
   */
  getTopApplications() {
    return this.sortApplications(NUMBER_OF_TOP_APPLICATIONS);
  }
}

export default Model;
