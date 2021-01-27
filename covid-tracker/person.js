/**
 * @param {String} firstName        Person's first name.
 * @param {String} lastName         Person's last name.
 * @param {Number} birthDate        Person's date of birth.
 * @param {String} sex              Person's sex/gender. Either 'male' or 'female' due to the site's dropdown.
 * @param {Number} cardNumber       Person's Ontario Health Insurance Plan card number. 10 digits long.
 * @param {String} firstDoseDate    Person's scheduled date to receive first dose of the COVID-19 vaccine. 
 * @param {String} secondDoseDate   Person's scheduled date to receive second dose of the COVID-19 vaccine. 
 * @param {String} email            Person's email address. Optional, can be used to contact user about updates on their appointments.
 * @param {String} phoneNumber      Person's phone number. Required, can be used to contact user about updates on their appointments.
 * @param {Number} priority         Person's priority in the queue to recieve the vaccine. 
 * @param {Boolean} isVaccinated    Person's status of receiving both doses of the COVID-19 vaccine. Automatically updated based off of their scheduled appointment dates.
 */
function Person(firstName, lastName, birthDate, sex, cardNumber, firstDoseDate, secondDoseDate, email, phoneNumber, priority, isVaccinated) {
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
    this.isVaccinated = isVaccinated;
}

module.exports = Person;