import ApplicationsList from './__mocks__/host-app-data.json';

class Services {
  static async getApplicationsList() {
    return ApplicationsList;
  }
}

export default Services;
