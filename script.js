let addCardBtn = document.querySelector('.add-card');
const cards = document.querySelector('.cards');
const modalTaskContainer = document.querySelector('.modal-task__container');
const modalCardContainer = document.querySelector('.modal-card__container');
const closeTask = document.querySelector('.close__task');
const closeCard = document.querySelector('.close__card');
const nextTask = document.querySelector('.btn-next__task');
const nextCard = document.querySelector('.btn-next__card');
const inputTask = document.querySelector('.input-task');
const inputTime = document.querySelector('.input-time');
const inputDate = document.querySelector('.input-date');
const inputMonth = document.querySelector('.input-month');

const cardList = [];
let currentCard;

class Card {
  constructor() {
    const date = inputDate;
    const month = inputMonth;

    if (!date.value || !month.value) {
      alert('Put in the fields correctly');
      date.value = '';
      month.value = '';
      return;
    }

    const html = `
      <div class="card">
      <div class="header-card">
        <div>
          <p class="date">${date.value} ${month.value}</p>
          <p class="tasks-number hidden">
            <span class="tasks-number__value">0</span>
            <span class="tasks-number__content">tasks</span>
          </p>
        </div>
        <a><ion-icon class="add" name="add-sharp"></ion-icon></a>
      </div>
      <div class="tasks">
        <ul class="tasks-ul">
          <li>
            <i class="ph-trash delete__card"></i>
          </li>
        </ul>
      </div>
    </div>
  `;

    cards.insertAdjacentHTML('afterbegin', html);

    date.value = '';
    month.value = '';
  }
}

// Closing modals
_closeTaskModal = function () {
  modalTaskContainer.classList.add('hidden');
};

_closeCardModal = function () {
  modalCardContainer.classList.add('hidden');
};

// Showing modals
_showTaskModal = function () {
  modalTaskContainer.classList.remove('hidden');
};

_showCardModal = function () {
  modalCardContainer.classList.remove('hidden');
};

// Create new Task
_createNewTask = function (e) {
  const task = inputTask.value;
  const time = inputTime.value;

  if (!task || !time) {
    alert('Put in the fields correctly');
    inputTask.value = '';
    inputTime.value = '';
    return;
  }

  const newTask = document.createElement('li');
  newTask.innerHTML = `
    <p>${task}</p>
    <span>${time}</span>
    <i class="ph-trash delete"></i>
      `;

  currentCard
    .querySelector('.tasks-ul')
    .insertAdjacentElement('afterbegin', newTask);

  inputTask.value = '';
  inputTime.value = '';

  _updateLocalStorage();
};

// Create new Card
_createNewCard = function () {
  const card = new Card();

  cardList.push(card);
  currentCard = cards.querySelector('.card');

  currentCard.addEventListener('click', e => {
    if (e.target.classList.contains('add')) {
      _showTaskModal();
      currentCard = e.target.closest('.card');
    } else if (e.target.classList.contains('delete')) {
      currentCard = e.target.closest('.card');
      _deleteTask(e);
    } else if (e.target.classList.contains('delete__card')) {
      currentCard = e.target.closest('.card');
      _deleteCard(currentCard);
    } else {
      console.log(e.target);
    }
  });

  _updateLocalStorage();
};

// Delete task
_deleteTask = function (e) {
  const task = e.target.closest('li');
  currentCard.querySelector('.tasks-ul').removeChild(task);
  console.log(e.target);
  _updateLocalStorage();
};

// Delete card
_deleteCard = function (currentCard) {
  cards.removeChild(currentCard);
  _updateLocalStorage();
};

// Handling event listeners
addCardBtn.addEventListener('click', _showCardModal);
nextCard.addEventListener('click', e => {
  e.preventDefault();
  _createNewCard();
});
nextCard.addEventListener('click', _closeCardModal);
closeTask.addEventListener('click', _closeTaskModal);
closeCard.addEventListener('click', _closeCardModal);
nextTask.addEventListener('click', _closeTaskModal);
nextTask.addEventListener('click', e => {
  e.preventDefault();
  _createNewTask(currentCard);
});

_addEventListeners = function () {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.classList.contains('add')) {
        _showTaskModal();
        currentCard = e.target.closest('.card');
      } else if (e.target.classList.contains('delete')) {
        currentCard = e.target.closest('.card');
        _deleteTask(e);
      } else if (e.target.classList.contains('delete__card')) {
        currentCard = e.target.closest('.card');
        _deleteCard(currentCard);
      } else {
        console.log(e.target);
      }
    });
  });
  addCardBtn = document.querySelector('.add-card');
  addCardBtn.addEventListener('click', _showCardModal);
};

// Handling Local Storage
_setLocalStorage = function () {
  localStorage.setItem('cards', JSON.stringify(cards.innerHTML));
};

_updateLocalStorage = function () {
  localStorage.clear();
  _setLocalStorage();
};

_getLocalStorage = (function () {
  const html = JSON.parse(localStorage.getItem('cards'));

  if (!html) {
    _addEventListeners();
    return;
  } else {
    cards.innerHTML = html;
    _addEventListeners();
  }
})();

// localStorage.clear();
