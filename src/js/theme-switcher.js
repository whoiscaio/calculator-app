const body = document.querySelector('body');
const texts = document.querySelectorAll('.changer span');
const options = document.querySelectorAll('.changer div div');

function reset() {
  body.classList.remove('theme-one');
  body.classList.remove('theme-two');
  body.classList.remove('theme-three');
}

function setPreference(item) {
  localStorage.setItem('theme', item);
}

export function setTheme(theme) {
  reset();
  body.classList.add(theme);
  setPreference(theme);
}

function mouseOverSpanBehavior(target) {
  if (target.classList.contains('option-one')) {
    texts[0].classList.add('bold');
  } else if (target.classList.contains('option-two')) {
    texts[1].classList.add('bold');
  } else if (target.classList.contains('option-three')) {
    texts[2].classList.add('bold');
  } else if(target.classList.contains('pointer')) {
    if(body.classList.contains('theme-one')) {
      texts[0].classList.add('bold');
    }else if(body.classList.contains('theme-two')) {
      texts[1].classList.add('bold');
    }else if(body.classList.contains('theme-three')) {
      texts[2].classList.add('bold');
    }
  }
}

function mouseOutSpanBehavior(target) {
  if (target.classList.contains('option-one')) {
    texts[0].classList.remove('bold');
  } else if (target.classList.contains('option-two')) {
    texts[1].classList.remove('bold');
  } else if (target.classList.contains('option-three')) {
    texts[2].classList.remove('bold');
  } else if(target.classList.contains('pointer')) {
    if(body.classList.contains('theme-one')) {
      texts[0].classList.remove('bold');
    }else if(body.classList.contains('theme-two')) {
      texts[1].classList.remove('bold');
    }else if(body.classList.contains('theme-three')) {
      texts[2].classList.remove('bold');
    }
  }
}

function toggleTheme(target) {
  if (target.classList.contains('option-one')) {
    setTheme('theme-one');
  } else if (target.classList.contains('option-two')) {
    setTheme('theme-two');
  } else if (target.classList.contains('option-three')) {
    setTheme('theme-three');
  }
}

options.forEach(item => {
  item.addEventListener('mouseover', ({ target }) => mouseOverSpanBehavior(target));
  item.addEventListener('mouseout', ({ target }) => mouseOutSpanBehavior(target));

  item.addEventListener('click', ({target}) => toggleTheme(target));
});