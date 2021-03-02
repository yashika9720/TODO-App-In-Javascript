// notes fetch function
const fetch = ()=>{
  const storage = localStorage.getItem('notes');
  if (storage != null) {
    const storageObj = JSON.parse(storage);
    let html = "";
    storageObj.forEach((element, index) => {
      html += `<div class="item">
                  <p>${element}</p>
                  <button id='${index}' onclick='deleteNote(this.id, this.parentElement);'><i class="fa fa-trash" aria-hidden="true"></i></button>
                </div>`;
    });
    const itemContainer = document.querySelector('.items-container');
    itemContainer.innerHTML = html;
  }
};

fetch(); // invoke a fetch function

// notes insert function
const insert = (input)=>{
  const storage = localStorage.getItem('notes');
  let storageObj;
  if (storage == null) {
    storageObj = [];
  }else{
    storageObj = JSON.parse(storage);
  }
  storageObj.push(input.value);
  localStorage.setItem('notes', JSON.stringify(storageObj));
  input.value = '';

  fetch(); // invoke a fetch function
};

const deleteNote = (index, parent)=>{
  const direction = ['left', 'right'];
  const ramdomDirection = Math.floor(Math.random() * direction.length);
  parent.classList.add(direction[ramdomDirection]);

  setTimeout(()=>{
    const storage = localStorage.getItem('notes');
    const storageObj = JSON.parse(storage);
    storageObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(storageObj));
    fetch();
  }, 1000);
};

const addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', ()=>{
  const inputField = document.getElementById('field');

  if (inputField.value == "") {
    inputField.parentElement.classList.add('errorAnim');
    setTimeout(()=>{
      inputField.parentElement.classList.remove('errorAnim');
    }, 200);
  }else{
    insert(inputField); // invoke a insert function
  }

});