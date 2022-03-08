const card = document.querySelector('#card'),
    btnOpenForm = document.querySelector('#btn-open-form'),
    form = document.querySelector('#form-card'),
    numberCard = document.querySelector('#card .number'),
    nameCard = document.querySelector('#card .name'),
    logoBrand = document.querySelector('#logo-brand'),
    firmCard = document.querySelector('#card .firm p'),
    monthExpiration = document.querySelector('#card #expiration .month'),
    yearExpiration = document.querySelector('#card #expiration .year'),
    ccvCard = document.querySelector('#card .ccv');


// giramos la tarjeta para mostrar el frente
const mostrarFrente = () => {
    if (card.classList.contains('active')) {
        card.classList.remove('active');
    }
}

// Rotacion de la tarjeta
card.addEventListener('click', () => {
    card.classList.toggle('active');
})

// Abrir formulario
btnOpenForm.addEventListener('click', () => {
    btnOpenForm.classList.toggle('active');
    form.classList.toggle('active');
})

// Select del mes generado dinamicamente
for(let i = 1; i <= 12; i++) {
    let option = document.createElement('option');
    option.value = i;
    option.innerText = i;
    form.selectMonth.appendChild(option);
}

// Select del año generado dinamicamente
const yearCurrent = new Date().getFullYear(); 

for(let i = yearCurrent; i <= yearCurrent+8; i++) {
    let option = document.createElement('option');
    option.value = i;
    option.innerText = i;
    form.selectYear.appendChild(option);
}


// Input num tarjeta
form.inputNumber.addEventListener('keyup', (e) => {
    let valueInput = e.target.value;

    form.inputNumber.value = valueInput
    // elimina espacios en blanco
    .replace(/\s/g, '')
    // elimina letras
    .replace(/\D/g, '')
    // espacio cada cuatro numeros
    .replace(/([0-9]{4})/g, '$1 ')
    // elimina el ultimo espacio
    .trim();
    //agregar el valor a la tarjeta
    numberCard.textContent = valueInput;

    if(valueInput == '') {
        numberCard.textContent = '#### #### ### #### ####';
        logoBrand.innerHTML = '';
    }

    if(valueInput[0] == 4) {
        logoBrand.innerHTML = '';
        const imagen = document.createElement('img');
        imagen.src = 'img/logos/visa.png';
        logoBrand.appendChild(imagen);
    } else if(valueInput[0] == 5) {
        logoBrand.innerHTML = '';
        const imagen = document.createElement('img');
        imagen.src = 'img/logos/mastercard.png';
        logoBrand.appendChild(imagen);
    }

    // giramos la tarjeta para que el usuario vea el frente
    mostrarFrente();
});


// Input nombre tarjeta
form.inputName.addEventListener('keyup', (e) => {
    let valueInput = e.target.value;

    form.inputName. value = valueInput.replace(/[0-9]/g, '');
    nameCard.textContent = valueInput;
    firmCard.textContent = valueInput;

    if(valueInput == '') {
        nameCard.textContent = 'Nombre Apellido';
    }
});

// Select del mes
form.selectMonth.addEventListener('change', (e) => {
    monthExpiration.textContent = e.target.value;
    mostrarFrente();
});

// Select del año
form.selectYear.addEventListener('change', (e) => {
    yearExpiration.textContent = e.target.value.slice(2);
    mostrarFrente();
});


// Codigo de CCV
form.inputCVV.addEventListener('keyup', (e) => {
    if (!card.classList.contains('active')) {
        card.classList.toggle('active');
    }
    form.inputCVV.value = form.inputCVV.value
    //eliminar los espacios en blanco
    .replace(/\s/g, '')
    // elimina letras
    .replace(/\D/g, '');

    ccvCard.textContent = form.inputCVV.value;
    
    if(form.inputCVV.value == '') {
        ccvCard.textContent = '';
    }
});