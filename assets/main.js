/* Значения из текстовых инпутов */
const totalCost = document.getElementById("total-price"),
   anInititalFee = document.getElementById("initial-fee"),
   anInititalFeeProcent = document.getElementById("initial-fee-procent"),
   leasingTerm = document.getElementById("leasing-term");

/* Значение из range инпутов */
const totalCostRange = document.getElementById("total-price-range"),
   anInititalFeeRange = document.getElementById("initial-fee-range"),
   leasingTermRange = document.getElementById("leasing-term-range");

/* Значения расчётов */
const totalAmountOfLeasing = document.getElementById("amount-of-leasing"),
   totalMonthlyPayment = document.getElementById("monthly-payment");

/* Все range */
const inputsRange = document.querySelectorAll('.input-range');

/* Итоговые рассчёты */
const totalLeasingSumm = document.getElementById("amount-of-leasing");
const monthlyPayment = document.getElementById("monthly-payment");

/* Назначение значений от range к обычным input */
const assignValue = () => {
   totalCost.value = totalCostRange.value; // Стоимость автомобиля
   anInititalFeeProcent.innerHTML = anInititalFeeRange.value; // Процент взноса
   anInititalFee.value = Math.round(Number(anInititalFeeProcent.innerHTML) / 100 * totalCost.value) // Первоначальный взнос
   leasingTerm.value = leasingTermRange.value; // Срок лизинга

}

/* Вызов функции для автоматической подстановки */
assignValue();

for (let input of inputsRange) {
   input.addEventListener('input', () => {
      assignValue();
      calculation(totalCost.value, anInititalFee.value, anInititalFeeProcent.innerHTML, leasingTerm.value);
   });
}

const calculation = (price = 1000000, initialFee = 420000, percent = 10, months = 20) => {
   /* Размер первоначального взноса(ПВ) */
   initialFee = Math.round(Number(percent) / 100 * price);

   /* Размер Ежемесячного платежа(ЕП) */
   const monthPay = Math.round((price - initialFee) * ((0.035 * Math.pow((1 + 0.035), months)) / (Math.pow((1 + 0.035), months) - 1)));

   /* Рассчёт суммы договора лизинга(СД) */
   let leasingSumm = initialFee + months * monthPay;

   if (monthPay < 0) {
      return false;
   } else {
      totalLeasingSumm.innerHTML = `${leasingSumm} ₽`;
      totalMonthlyPayment.innerHTML = `${monthPay} ₽`;
   }
};

/* Обработчик нажатия по кнопке */
const button = document.querySelector('button');

button.addEventListener('click', () => {
   if (button.disabled) {
      return false;
   } else {
      button.disabled = true;
      sendJSON(
         totalCost.value,
         anInititalFee.value,
         anInititalFeeProcent.innerHTML,
         leasingTerm.value,
         totalLeasingSumm.innerHTML,
         totalMonthlyPayment.innerHTML
      );
   }
});

function sendJSON(price, initialFee, percent, months, totalSumm, monthPay) {
   setTimeout(50000);
   let xhr = new XMLHttpRequest();
   let url = "https://hookb.in/eK160jgYJ6UlaRPldJ1P";
   // открываем соединение
   xhr.open("POST", url, true);
   // устанавливаем заголовок — выбираем тип контента, который отправится на сервер, в нашем случае мы явно пишем, что это JSON
   xhr.setRequestHeader("Content-Type", "application/json");
   // когда придёт ответ на наше обращение к серверу, мы его обработаем здесь
   xhr.onreadystatechange = function () {
      // если запрос принят и сервер ответил, что всё в порядке
      if (xhr.readyState === 4 && xhr.status === 200) {
         // выводим то, что ответил нам сервер — так мы убедимся, что данные он получил правильно
         console.log(alert(this.responseText));
      }
   };
   // преобразуем наши данные JSON в строку
   var data = JSON.stringify(
      {
         "car_coast": price,
         "initail_payment": initialFee,
         "initail_payment_percent": percent,
         "lease_term": months,
         "total_sum": totalSumm,
         "monthly_payment_from": monthPay
      });
   // когда всё готово, отправляем JSON на сервер
   xhr.send(data);
}