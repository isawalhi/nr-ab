import HostController from './components/host/hostController';
import { DASHBOARD_LAYOUT } from '../constants';
import Event from '../../event';

class View {
  public changeLayoutEvent: Event

  constructor() {
    this.changeLayoutEvent = new Event();
  }

  public async generateMarkup(hosts, layoutType, user = { email: 'averylongemailaddress@companyname.com' }) {
    const hostCards = Object.values(hosts).map((host) => new HostController(host).render());

    return `
      <div id="dashboard-wrapper">
        <div class="header-wrapper">
            <div class="header-title">Apps by Host</div>
            <div class="user-info">for user ${user.email}</div>
            <div id="layout-toggel-wrapper">
                <input type="checkbox" id="layout-type-checkbox" value="${layoutType}" />
                <label id="layout-type-checkbox-label" for="layout-type-checkbox">${DASHBOARD_LAYOUT[layoutType].label}</label>
            </div>
        </div>
        <div id="hosts-wrapper" class="${layoutType}">${hostCards.join('')}</div>
      </div>
      `;
  }

  public afterRender() {
    document.getElementById('layout-type-checkbox').addEventListener('click', (event: any) => {
      const hostsWrapper = document.getElementById('hosts-wrapper');
      const checkboxLabel = document.getElementById('layout-type-checkbox-label');

      const checkboxEl = event.target;

      const currentCheckBoxValue = event.target.value;
      const newCheckBoxValue = DASHBOARD_LAYOUT[currentCheckBoxValue].toggleValue;

      hostsWrapper.classList.remove(currentCheckBoxValue);
      checkboxLabel.innerText = DASHBOARD_LAYOUT[newCheckBoxValue].label;
      checkboxEl.value = newCheckBoxValue;

      hostsWrapper.classList.add(DASHBOARD_LAYOUT[currentCheckBoxValue].toggleValue);
      this.changeLayoutEvent.trigger(event.target.value);
    });
  }
}

export default View;
