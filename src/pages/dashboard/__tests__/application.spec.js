import Application from '../components/application/applicationModel'
import ApplicationView from '../components/application/applicationView'

describe('Application', () => {
    const data = {
        name: 'test-app',
        contributors: ['test-cont-1'],
        version: 1,
        apdex: 89,
    }
    const application = new Application(data);

    it('assigns constructor values correctly', () => {
        expect(application.name).toBe(data.name)
        expect(application.contributors).toBe(data.contributors)
        expect(application.version).toBe(data.version)
        expect(application.apdex).toBe(data.apdex)
    })

    it('generates html when application is provided correctly', () => {
        expect(new ApplicationView().generateMarkup(application)).toMatchSnapshot()
    })

    it('return empty html when application is not provided correctly', () => {
        expect(new ApplicationView().generateMarkup(null)).toMatchSnapshot()
    })
})