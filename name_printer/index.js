class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  printFullName() {
    console.log(`${this.firstName} ${this.lastName}`);
  }
}

const owen = new Person("Owen", "Ikhena");
owen.printFullName();
