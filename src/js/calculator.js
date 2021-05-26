import { toggleScroll as scroll } from './display-scroll.js';
import { setTheme } from './theme-switcher.js';

class Calculator {
  constructor() {
    this.getPreference();

    this.display = document.querySelector('.display input');
    this.buttons = document.querySelectorAll('.keypad button');
    this.calculated = false;
    this.regex = /[a-z]/i;
    this.secondRegex = /[÷x+-]/i;
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

  getPreference() {
    const theme = localStorage.getItem('theme');
    theme 
    ? setTheme(theme)
    : setTheme('theme-one');
  }

  error() {
    return (this.display.value = 'Bad expression');
  }

  calculate() {
    this.danger = false;

    let filter = this.display.value;
    filter = filter.replace('x', '*');
    filter = filter.replace('÷', '/');
    let test = filter.split('');

    test.forEach(char => {
      if (this.regex.test(char)) {
        this.danger = true;
      }
    });

    try {
      if (!this.danger) {
        this.display.value = eval(filter);
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

    if(this.display.value === '' || this.secondRegex.test(this.display.value[this.display.value.length - 1])) {
      if(!this.secondRegex.test(value)) {
        this.display.value += value;
      }
    }else {
      this.display.value += value;
    }
    scroll();
  }

  erase() {
    if (!this.calculated) {
      this.display.value = this.display.value.substr(
        0,
        this.display.value.length - 1
      );
    } else {
      this.eraseAll();
    }
  }

  eraseAll() {
    this.display.value = '';
    this.calculated = false;
  }
}

const calc = new Calculator();
