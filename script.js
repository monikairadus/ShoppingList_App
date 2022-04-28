let $todoInput; // miejsce, gdzie użytkownik wpisuje treść
let $alertInfo; // info o braku zadań / konieczności dodania tekstu
let $addBtn; // przycisk ADD - dodaje nowe elementy do listy
let $ulList; // nasza lista zadań, tagi <ul></ul>
let $newTask; // nowo dodany LI, nowe zadanie
let $allTasks; // lista wszystkich dodanych LI
let $idNumber = 0; // ID dodawane do każdego nowego zadania
let $popup; //pobrany popup
let $popupInfo; // alert w popupie, jak się doda pusty tekst
let $editedTodo; // edytowany Todo
let $editedAmount;
let $editedUnit;
let $popupInput; //tekst wpisywany w inputa w popup'ie
let $popupAmount;
let $popupUnit;

let $addPopupBtn; // przycisk "zatwierdź" w popup'ie
let $closeTodoBtn //przycisk od zamykania popup'a
let $searchInput //tekst wpisywany w wyszukiwarkę
let $pAmount;
let $pUnit;

const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
}

const prepareDOMElements = () => {
    $todoInput = document.querySelector('.todo-input');
    $alertInfo = document.querySelector('.alert-info');
    $addBtn = document.querySelector('.add-btn');
    $ulList = document.querySelector('.todo-list ul');
    $allTasks = document.getElementsByTagName('li');
    $popup = document.querySelector('.popup');
    $popupInfo = document.querySelector('.popup-info');
    $popupInput = document.querySelector('.popup-input');
    $popupAmount = document.querySelector('.popup-input-amount');
    $popupUnit = document.querySelector('.popup-input-unit');
    $addPopupBtn = document.querySelector('.accept');
    $closeTodoBtn = document.querySelector('.cancel');
    $searchInput = document.querySelector(".search");
    $pAmount = document.querySelector(".amount");
    $pUnit = document.querySelector(".unit");
}

const prepareDOMEvents = () => {
    $addBtn.addEventListener('click', addNewTask);
    $todoInput.addEventListener('keyup', enterCheck);
    $ulList.addEventListener('click', checkClick);
    $addPopupBtn.addEventListener('click', changeTodo);
    $closeTodoBtn.addEventListener('click', closePopup);
    $searchInput.addEventListener('keyup', searchEngine);
}

const addNewTask = () => {
    if ($todoInput.value !== '') {
        $idNumber++;
        $newTask = document.createElement('li');
        $newTask.innerText = $todoInput.value;
        $newTask.setAttribute('id', `todo-${$idNumber}`);
        $ulList.appendChild($newTask);

        $todoInput.value = '';
        $alertInfo.innerText = '';
        // createLiInfo();
        createToolsArea();
    } else {
        $alertInfo.innerText = 'Wpisz treść zadania!'
    }
}

const enterCheck = () => {
    if (event.keyCode === 13) {
        addNewTask();
    }
}

// const createLiInfo = () => {
//     // $idNumber++;
//     const liInfo = document.createElement('div');
//     liInfo.classList.add('li-info');
//     // liInfo.setAttribute("id",`info-${$idNumber}`);
    
//     $newTask.appendChild(liInfo);

//     const pAmount = document.createElement('p');
//     pAmount.classList.add('amount');
//     pAmount.setAttribute("id",`amount-${$idNumber}`);
//     // pAmount.textContent = '4';
//     liInfo.appendChild(pAmount);

//     const pUnit = document.createElement('p');
//     pUnit.classList.add('unit');
//     pUnit.setAttribute("id",`unit-${$idNumber}`);
//     // pUnit.textContent = 'kg';
//     liInfo.appendChild(pUnit);
// }

const createToolsArea = () => {
    const toolsPanel = document.createElement('div');
    toolsPanel.classList.add('tools');
    $newTask.appendChild(toolsPanel);

    const liInfo = document.createElement('div');
    liInfo.classList.add('li-info');
    liInfo.setAttribute("id",`info-${$idNumber}`);
    toolsPanel.appendChild(liInfo);

    const pAmount = document.createElement('p');
    pAmount.classList.add('amount');
    pAmount.setAttribute("id",`amount-${$idNumber}`);
    liInfo.appendChild(pAmount);


    const pUnit = document.createElement('p');
    pUnit.classList.add('unit');
    pUnit.setAttribute("id",`unit-${$idNumber}`);
    liInfo.appendChild(pUnit);

    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete');
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    editBtn.innerHTML = 'EDIT';

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

   
    
    
    toolsPanel.appendChild(completeBtn);
    toolsPanel.appendChild(editBtn);
    toolsPanel.appendChild(deleteBtn);
    
}

const checkClick = e => {
    if (e.target.classList.value !== '') {
        if (e.target.closest('button').classList.contains('complete')) {
            e.target.closest('li').classList.toggle('completed');
            e.target.closest('button').classList.toggle('completed');
        } else if (e.target.closest('button').classList.contains('edit')) {
            editTask(e);
            // editAmountAndUnit(e);
        } else if (e.target.closest('button').classList.contains('delete')) {
            deleteTask(e);
        }
    }
}

const editTask = e => {
    // $popupAmount.value = "";
    // $popupUnit.value = "";
    const oldTodo = e.target.closest('li').id;
    $editedTodo = document.getElementById(oldTodo);
    $popupInput.value = $editedTodo.firstChild.textContent;
    
    const oldAmount = e.target.parentElement.querySelector('.amount').id;
    console.log(e.target.parentElement);
    console.log(oldAmount);
    $editedAmount = document.getElementById(oldAmount);
    console.log($editedAmount);
    $popupAmount.value = $editedAmount.textContent;
    console.log($editedAmount.textContent);
    const oldUnit = e.target.parentElement.querySelector('.unit').id;
    console.log(oldUnit);
    $editedUnit = document.getElementById(oldUnit);
    $popupUnit.value = $editedUnit.textContent;
    console.log($editedUnit.textContent);

    $popup.style.display = 'flex';
}

// const editAmountAndUnit = e => {
    
//     const oldAmount = e.target.parentElement.querySelector('.amount').id;
//     console.log(oldAmount);
//     $editedAmount = document.getElementById(oldAmount);
//     console.log($editedAmount);
//     $popupAmount.value = $editedAmount.textContent;
//     console.log($editedAmount.textContent);
//     const oldUnit = e.target.parentElement.querySelector('.unit').id;
//     console.log(oldUnit);
//     $editedUnit = document.getElementById(oldUnit);
//     console.log($editedUnit.textContent);
// }

const changeTodo = () => {
    
    if ($popupInput.value !== '') {
        $editedTodo.firstChild.textContent = $popupInput.value;
        $editedAmount.textContent = $popupAmount.value;
        $editedUnit.textContent = $popupUnit.value;
        $popup.style.display = 'none';
        $popupInfo.innerText = '';
    } else {
        $popupInfo.innerText = 'Musisz podać jakąś treść!';
    }
}

const deleteTask = e => {
    const deleteTodo = e.target.closest('li');
    deleteTodo.remove();

    if ($allTasks.length === 0) {
        $alertInfo.innerText = 'Brak zadań na liście.';
    }
}

const closePopup = () => {
    $popup.style.display = 'none';
    $popupInfo.innerText = '';
}

const searchEngine = (e) => {
    const text = e.target.value.toLowerCase();
    const allTasksTab = [...$allTasks];

   allTasksTab.forEach(el => {
        if (el.textContent.toLowerCase().indexOf(text) !== -1) {
            el.style.display = 'flex'
        } else {
            el.style.display = 'none'
        }
    })
}

document.addEventListener('DOMContentLoaded', main);