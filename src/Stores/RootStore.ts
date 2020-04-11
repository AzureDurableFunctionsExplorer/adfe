import { ChildStore } from "./Core/ChildStore";
import { FunctionAppsStore } from "./FunctionAppsStore";
import { FunctionExecutionsStore } from "./FunctionExecutionsStore";

export class RootStore {

  functionApps: FunctionAppsStore = new FunctionAppsStore();
  executions: FunctionExecutionsStore = new FunctionExecutionsStore();

  constructor() {
    const childStores: ChildStore[] = Object.keys(this)
      .map(key => Reflect.get(this, key))
      .filter(value => value instanceof ChildStore);

    childStores.forEach(store => store.setRootStore(this));
    childStores.forEach(store => store.initialize());
  }
}