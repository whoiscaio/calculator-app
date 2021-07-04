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
    theme && setTheme(theme);
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
        let octalVerification = true;
        let counter = 0;

        // 10 + 001

        while(octalVerification) {
          octalVerification = false;

          if(filter[0] === '0') {
            filter = filter.substr(1, filter.length);
            octalVerification = true;
          } else {
            for(let i = 0; i < filter.length; i++) {
              if(filter[i] === '0') {
                counter++;
              }

              if(this.secondRegex.test(filter[i])) {
                if(filter[i + 1] === '0') {
                  filter = filter.replace('0', '', counter);
                  octalVerification = true;
                  counter = 0;
                }
              }
            }
          }
        }

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
