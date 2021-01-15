export default class Person {
    constructor(firstName, lastName, birthDate, sex, _id, hadCovid, recievedFirstDose, recievedSecondDose, firstDoseDate, secondDoseDate) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.sex = sex;
        this._id = _id;
        this.hadCovid = hadCovid;
        this.recievedFirstDose = recievedFirstDose;
        this.recievedSecondDose = recievedSecondDose;
        this.firstDoseDate = firstDoseDate;
        this.secondDoseDate = secondDoseDate;
    }
}