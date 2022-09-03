const billInput = document.getElementById('billInput');
const selectButtons = document.querySelectorAll('.select');
let selectedTip = document.querySelector('.selected');
const customTipInput = document.getElementById('customTipInput');
const numderOfPeopleInput = document.getElementById('numderOfPeopleInput');

const billError = document.getElementById('billError');
const numberError = document.getElementById('numberError');

const outputTip = document.getElementById('outputTip');
const outputTotal = document.getElementById('outputTotal');

billInput.addEventListener('change', calculate);

selectButtons.forEach(button => {
    button.addEventListener('click', select)
})

customTipInput.addEventListener('change', () => {
    selectedTip.classList.remove('selected');

    calculate();
});
numderOfPeopleInput.addEventListener('change', calculate);

function calculate() {
    const bill = billInput.value;
    const tip = selectedTip?.value || 15;
    const customTip = customTipInput.value;
    const numberOfPeople = numderOfPeopleInput.value;

    if (bill && bill <= 0) {
        billError.dataset.visible = 'true';
        billInput.closest('.input-wrapper').classList.add('input-error');

        return;
    } else {
        billError.dataset.visible = 'false';
        billInput.closest('.input-wrapper').classList.remove('input-error');
    }

    if ((numberOfPeople && numberOfPeople <= 0) || !numberOfPeople) {
        numberError.dataset.visible = 'true';
        numderOfPeopleInput.closest('.input-wrapper').classList.add('input-error');

        return;
    } else {
        numberError.dataset.visible = 'false';
        numderOfPeopleInput.closest('.input-wrapper').classList.remove('input-error');
    }

    const tipAmount = (bill * (customTip || tip / 100)) / numberOfPeople;

    const totalAmount = (bill * ((customTip || tip / 100) + 1)) / numberOfPeople;

    outputTip.innerText = `$${Math.round(tipAmount).toFixed(2)}`;
    outputTotal.innerText = `$${Math.round(totalAmount).toFixed(2)}`;

}

function select(e) {
    selectedTip = document.querySelector('.selected');

    customTipInput.value = "";

    if (selectedTip) selectedTip.classList.remove('selected');

    e.currentTarget.classList.add('selected');
    selectedTip = e.currentTarget;
    calculate();
}