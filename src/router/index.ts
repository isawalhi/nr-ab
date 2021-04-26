import Dashboard from '../pages/dashboard/dashboardController';

/**
 * This class is intended to handle application routing
 * TODO: Complete the implementation to support single page application
 */
class router {
  private routes: { [path: string]: any}

  private content: HTMLElement

  constructor() {
    this.routes = {
      '/': new Dashboard(),
    };

    this.content = document.getElementById('content');
  }

  public async init() {
    const routePath = window.location.pathname;
    const page = this.routes[routePath] || this.routes['/'];
    this.content.innerHTML = await page.render();
    await page.afterRender();
  }
}

export default router;
