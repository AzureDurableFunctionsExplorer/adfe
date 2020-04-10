import { RootStore } from "../RootStore";

export abstract class ChildStore {
  private _root: RootStore | null = null;

  protected get root(): RootStore {
    return this._root as RootStore;
  }

  setRootStore = (root: RootStore) => this._root = root;

  initialize() { };
}