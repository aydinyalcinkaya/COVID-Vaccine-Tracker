function Person(firstName, lastName, birthDate, sex, cardNumber, hadCovid, firstDoseDate, secondDoseDate, email, phoneNumber) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate;
    this.sex = sex;
    this.cardNumber = cardNumber;
    this.hadCovid = hadCovid;
    this.firstDoseDate = firstDoseDate;
    this.secondDoseDate = secondDoseDate;
    this.email = email;
    this.phoneNumber = phoneNumber;
}

module.exports = Person;