import { makeAutoObservable } from "mobx";

export default class Store {
  private _actualGist: any;
  private _fetchGists: Object;
  private _gistForDel: Object;

  constructor() {
    makeAutoObservable(this);
    this._actualGist = {};
    this._fetchGists = {};
    this._gistForDel = {};
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
  set gistForDel(val) {
    this._gistForDel = val;
  }
  get gistForDel() {
    return this._gistForDel;
  }
}
