import { observable, action } from 'mobx';

class StepStore {
  @observable
  step: number = 1;

  @action
  setStep(newStep: number) {
    console.log('chegou aqui: ' + newStep)
    this.step = newStep;
    console.log(this.step)
  }
}

const stepStore = new StepStore();
export default stepStore;
