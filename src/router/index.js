import Dashboard from '../pages/dashboard';

/**
 * This class is intended to handle application routing
 * TODO: Complete the implementation to support single page application
 */
class router {
  constructor() {
    this.routes = {
      '/': new Dashboard(),
    };

    this.content = document.getElementById('content');
  }

  async init() {
    const routePath = window.location.pathname;
    const page = this.routes[routePath];
    this.content.innerHTML = await page.render();
  }
}

export default router;
