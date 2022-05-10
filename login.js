function validation(event) {
  const errMsg = document.querySelector('.empty' + '-' + this.name);
  if (errMsg) errMsg.remove();

  if (form[this.name].value.length == 0) {
    const no = event.currentTarget.parentNode;
    const err = document.createElement('div');
    err.setAttribute('class', 'error' + ' empty' + '-' + this.name);
    err.textContent = 'Inserire ' + this.name;
    no.appendChild(err);
    // event.preventDefault();
  }
}

function vali(event) {
  if (form.username.value.length == 0|| form.password.value.length == 0)
    for (let inputBox of inputBoxs) {
      if (!document.querySelector('.empty-' + inputBox.name)) {
        const no = inputBox.parentNode;
        const err = document.createElement('div');
        err.setAttribute('class', 'error' + ' empty' + '-' + inputBox.name);
        err.textContent = 'Inserire ' + inputBox.name;
        no.appendChild(err);
      }
    }

    event.preventDefault();
}

const form = document.forms['login'];
form.addEventListener('submit', vali);

const inputBoxs = document.querySelectorAll("input[type='text'], input[type='password']");
for (let inputBox of inputBoxs)
  inputBox.addEventListener('blur', validation);
