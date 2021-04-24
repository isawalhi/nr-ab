class Dashboard {
  constructor() {
    this.hosts = {};
  }

  render() {
    return `Apdex dashboard ${this.hosts}`;
  }
}

export default Dashboard;
