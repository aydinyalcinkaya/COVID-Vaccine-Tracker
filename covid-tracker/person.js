function Person(firstName, lastName, birthDate, sex, cardNumber, firstDoseDate, secondDoseDate, email, phoneNumber, priority) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate;
    this.sex = sex;
    this.cardNumber = cardNumber;
    this.firstDoseDate = firstDoseDate;
    this.secondDoseDate = secondDoseDate;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.priority = priority;
}

module.exports = Person;