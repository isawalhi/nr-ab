class View {
  public generateMarkup(application) {
    return application?.name ? `
        <div key="${application.name}" release-version="${application.version}" class="application">
            <div class="app-apdex">${application.apdex}</div>
            <div class="app-name">${application.name}</div>
        </div>
        ` : '';
  }

  public afterRender() {
    document.querySelectorAll('.host-card').forEach((el) => el.addEventListener('click', (event) => {
      const target = <HTMLElement>event.target;
      // event.target.matches doesn't exist in Internet Explorer.
      // Starting with IE 9 this method is available,
      // but with the non-standard name msMatchesSelector
      const matches = target.matches
        ? target.matches('.app-apdex, .app-name')
      // @ts-ignore
        : target.msMatchesSelector('.app-apdex, .app-name');

      if (matches) {
        event.stopPropagation();

        const version = (<HTMLElement>target.parentNode).getAttribute('release-version');
        alert(`Release version: ${version}`);
      }
    }));
  }
}

export default View;
