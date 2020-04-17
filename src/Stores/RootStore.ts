import { ChildStore } from "./Core/ChildStore";
import { FunctionAppsStore } from "./FunctionApps.store";
import { FunctionExecutionsStore } from "./FunctionExecutions.store";
import { ExecutionPartsStore } from "./ExecutionParts.store";

export class RootStore {

  functionApps: FunctionAppsStore = new FunctionAppsStore();
  executions: FunctionExecutionsStore = new FunctionExecutionsStore();
  executionParts: ExecutionPartsStore = new ExecutionPartsStore();

  constructor() {
    const childStores: ChildStore[] = Object.keys(this)
      .map(key => Reflect.get(this, key))
      .filter(value => value instanceof ChildStore);

    childStores.forEach(store => store.setRootStore(this));
    childStores.forEach(store => store.initialize());
  }
}