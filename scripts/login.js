function validation(event) {
  const errMsg = document.querySelector('.empty' + '-' + this.name);
  if (errMsg) errMsg.remove();

  if (form[this.name].value.length == 0) {
    const no = event.currentTarget.parentNode;
    const err = document.createElement('div');
    err.setAttribute('class', 'error' + ' empty' + '-' + this.name);
    err.textContent = 'Inserire ' + this.name;
    no.appendChild(err);
    return;
  }

  if (this.name == 'username') {
    fetch("http://localhost/hw1/is_in_db.php/?username=" + form[this.name].value)
      .then(response => response.json())
      .then(json => {
        if (!json.there_is) {
          const no = form[this.name].parentNode;
          const err = document.createElement('div');
          err.setAttribute('class', 'error' + ' empty' + '-' + this.name);
          err.textContent = 'Username non trovato';
          no.appendChild(err);
          return;
        }
      })
  }
  if (this.name == 'password') {
    if (form[this.name].value.length < 8 || form[this.name].value.length > 20) {
          const no = form[this.name].parentNode;
          const err = document.createElement('div');
          err.setAttribute('class', 'error' + ' empty' + '-' + this.name);
          err.textContent = 'La password deve contenere tra gli 8 e i 20 caratteri';
          no.appendChild(err);
          return;
    }
  }
}

function vali(event) {
  event.preventDefault();
  if (form.username.value.length == 0|| form.password.value.length == 0) {
    for (let inputBox of inputBoxs) {
      if (!document.querySelector('.empty-' + inputBox.name)
        && form[inputBox.name].value.length == 0) {
        const no = inputBox.parentNode;
        const err = document.createElement('div');
        err.setAttribute('class', 'error' + ' empty' + '-' + inputBox.name);
        err.textContent = 'Inserire ' + inputBox.name;
        no.appendChild(err);
      }
    }
  } else {
    const form = document.querySelector("form");
    const form_data = {method: 'post', body: new FormData(form)};
    fetch("http://localhost/hw1/check_credential.php", form_data)
      .then(response => response.json())
      .then(json => {
        if (json.success) {
          window.location.href = json.message;
        } else {
          const input = document.querySelector('input[type="submit"]')
          const msg = document.createElement('div');
          msg.setAttribute('class', 'error');
          msg.textContent = 'Credenziali non valide!';
          input.parentElement.appendChild(msg, input);
        }
      });
  }

}

const form = document.forms['login'];
form.addEventListener('submit', vali);

const inputBoxs = document.querySelectorAll("input[type='text'], input[type='password']");
for (let inputBox of inputBoxs)
  inputBox.addEventListener('blur', validation);
