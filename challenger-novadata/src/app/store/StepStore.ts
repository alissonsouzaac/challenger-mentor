import { makeAutoObservable } from 'mobx';

class StepStore {
  currentStep = 1;

  constructor() {
    makeAutoObservable(this);
  }

  setCurrentStep(step: number) {
    this.currentStep = step;
  }
}

const stepStore = new StepStore();

export default stepStore;
