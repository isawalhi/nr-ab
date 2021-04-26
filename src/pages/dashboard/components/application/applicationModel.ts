import type { IApp } from '../../types';

class Model {
   public name: string

  public contributors: string[]

  public version: number

  public apdex: number

  constructor(data: IApp) {
    const {
      name, contributors, version, apdex,
    } = data;
    this.name = name;
    this.contributors = contributors;
    this.version = version;
    this.apdex = apdex;
  }
}

export default Model;
