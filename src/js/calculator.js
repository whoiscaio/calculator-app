class Calculator {
  constructor() {
    this.display = document.querySelector('.display span');
    this.buttons = document.querySelectorAll('.keypad button');
    this.calculated = false;
    this.regex = /[a-z]/i;


    this.buttons.forEach(el => {
      el.addEventListener('click', ({ target }) => {
        target.classList.contains('alphanumeric') && this.write(target.value);

        target.classList.contains('equal-button') && this.calculate();

        target.classList.contains('reset-button') && this.eraseAll();

        target.classList.contains('delete-button') && this.erase();
      });
    });
  }

  calculate() {
    try {
      this.display.innerHTML = eval(this.display.innerHTML);
    } catch (error) {
      this.display.innerHTML = "Bad expression";
    }

    this.calculated = true;
  }

  write(value) {
    this.calculated && this.eraseAll();

    this.display.innerHTML += value;
  }

  erase() {
    this.display.innerHTML = this.display.innerHTML.substr(0, this.display.innerHTML.length - 1);
  }

  eraseAll() {
    this.display.innerHTML = '';
    this.calculated = false;
  }
}

const calc = new Calculator();
