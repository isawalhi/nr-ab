import App from '../application/applicationView';
import { NUMBER_OF_APPS_PER_HOST_CARD } from '../../../config';

class View {
  public generateMarkup(host) {
    const { hostName } = host;
    const applications = host.getTopApplications().slice(0, NUMBER_OF_APPS_PER_HOST_CARD);
    return `
        <div id=${host.hostName} class="host-card">
          <div class="host-name">${hostName}</div>
          <div class="applications">
            ${applications.map((app) => new App().generateMarkup(app)).join('')}
          </div>
        </div>
        `;
  }

  public updateHtml(host) {
    document.getElementById(host.hostName).innerHTML = this.generateMarkup(host);
  }
}

export default View;
