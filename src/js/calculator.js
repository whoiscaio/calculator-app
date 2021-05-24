import {toggleScroll as scroll} from './display-scroll.js'; 

class Calculator {
  constructor() {
    this.display = document.querySelector('.display input');
    this.buttons = document.querySelectorAll('.keypad button');
    this.calculated = false;
    this.crucial = 'rofl123';
    this.regex = /[a-z]/i;
    this.danger = false;

    this.buttons.forEach(el => {
      el.addEventListener('click', ({ target }) => {
        target.classList.contains('alphanumeric') && this.write(target.value);

        target.classList.contains('equal-button') && this.calculate();

        target.classList.contains('reset-button') && this.eraseAll();

        target.classList.contains('delete-button') && this.erase();
      });
    });
  }

  error() {
    return (this.display.value = 'Bad expression');
  }

  calculate() {
    let test = this.display.value.split('');

    test.forEach(char => {
      if (this.regex.test(char)) {
        this.danger = true;
      }
    });

    try {
      if (!this.danger) {
        this.display.value = eval(this.display.value);
      } else {
        throw 'error';
      }
    } catch (error) {
      this.error();
    }

    this.calculated = true;
  }

  write(value) {
    this.calculated && this.eraseAll();

    this.display.value += value;
    scroll();
  }

  erase() {
    if (!this.calculated) {
      this.display.value = this.display.value.substr(
        0,
        this.display.value.length - 1
      );
    }else{
      this.eraseAll();
    }
  }

  eraseAll() {
    this.display.value = '';
    this.calculated = false;
  }
}

const calc = new Calculator();
