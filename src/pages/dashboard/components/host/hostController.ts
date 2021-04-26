import View from './hostView';
import type Model from './hostModel';

class Host {
  private view: View

  private model: Model

  constructor(model) {
    this.model = model;
    this.view = new View();

    this.model.updateApplicationsEvent.addListener((params) => { this.view.updateHtml(params); });
  }

  public render() {
    return this.view.generateMarkup(this.model);
  }
}

export default Host;
