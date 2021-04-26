import Dashboard from '../dashboardController'
import DashboardView from '../dashboardView'

describe('Dashboard', () => {
    it('generates html when dashboard is provided correctly', () => {
        expect(new Dashboard().render()).toMatchSnapshot()
    })
})