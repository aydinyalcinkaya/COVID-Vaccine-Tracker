function Person(firstName, lastName, birthDate, sex, cardNumber, hadCovid, firstDoseDate, secondDoseDate) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate;
    this.sex = sex;
    this.cardNumber = cardNumber;
    this.hadCovid = hadCovid;
    this.firstDoseDate = firstDoseDate;
    this.secondDoseDate = secondDoseDate;
}

module.exports = Person;