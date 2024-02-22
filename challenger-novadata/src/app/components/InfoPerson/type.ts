export interface InfoPersonData {
    name: string;
    emailAddress: string;
    phoneNumber: string;
}
  
export interface Errors {
    [key: string]: string;
}
  
export interface IInfoPerson {
    nextStep: () => void
}