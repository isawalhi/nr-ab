import { DASHBOARD_LAYOUT } from '../constants';

export type DashboardLayoutType = keyof typeof DASHBOARD_LAYOUT

export interface IApp {
    name: string
    contributors: string[]
    version: number
    apdex: number
    host?: string[]
}
