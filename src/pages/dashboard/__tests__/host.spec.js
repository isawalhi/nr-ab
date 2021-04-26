import Host from '../components/host/hostModel'
import HostView from '../components/host/hostView'
import Application from '../components/application/applicationModel';

describe('Host', () => {
    let host;
    const data = {
        name: 'test-app',
        contributors: ['test-cont-1'],
        version: 1,
        apdex: 89,
    }

    const app1 = new Application(data);
    const app2 = new Application({ ...data, name: 'test-app2', apdex: 99 })
    const app3 = new Application({ ...data, name: 'test-app3', apdex: 99 })

    const applications = [app1, app2]
    const hostName = 'test-host'

    beforeEach(() => {
        host = new Host(hostName, [...applications]);
    });

    it('assigns constructor values correctly', () => {
        expect(host.hostName).toBe(hostName)
        expect(host.applications).toStrictEqual(applications)
    })

    it('sets and gets applications correctly', () => {
        host.setApplications([app1])
        expect(host.getApplications()).toStrictEqual([app1])
    })

    it('adds new application correctly', () => {
        host.addApplication(app3)

        expect(host.getApplications()).toStrictEqual([app1, app2, app3])
    })

    it('removes application correctly', () => {
        host.removeApplication(app1)

        expect(host.getApplications()).toStrictEqual([app2])
    })

    it('sorts application correctly', () => {
        host.addApplication(app3)
        expect(host.sortApplications()).toStrictEqual([app2, app3, app1])
    })

    it('gets the first top sorted application when top is defined', () => {
        host.addApplication(app3)
        expect(host.sortApplications(2)).toStrictEqual([app2, app3])
    })

    it('gets the top sorted apps', () => {
        host.addApplication(app3)
        expect(host.getTopApplications()).toStrictEqual([app2, app3, app1])
    })

    it('generates html when host is provided correctly', () => {
        expect(new HostView().generateMarkup(host)).toMatchSnapshot()
    })
})