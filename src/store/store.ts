import { makeAutoObservable } from "mobx";

export default class Store {
  private _fetchData: Object[];
  public _actualGist: any;
  _fetchGists: Object;

  constructor() {
    makeAutoObservable(this);
    this._fetchData = [];
    this._actualGist = {};
    this._fetchGists = {};
  }

  deleteItem = () => {
    const itemIndex = this.fetchData.findIndex((rec) => {
      return rec.owner.id === this.actualGist.owner.id;
    });
    if (itemIndex > -1) {
      this.fetchData.splice(itemIndex, 1);
    }
  };

  set fetchData(val: any[]) {
    this._fetchData = val;
  }
  get fetchData() {
    return this._fetchData;
  }

  set actualGist(val) {
    this._actualGist = val;
  }
  get actualGist() {
    return this._actualGist;
  }
  set fetchGists(val) {
    this._fetchGists = val;
  }
  get fetchGists() {
    return this._fetchGists;
  }
}
