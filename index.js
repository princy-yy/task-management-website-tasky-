const taskContainer = document.querySelector(".task__container");
let globalStore = [];         //some values [{},{}.....]

const generateNewCard = (taskData) => `
<div class="col-md-6 col-lg-4">
<div class="card">
  <div class="card-header d-flex justify-content-end gap-2">
    <button type="button" class="btn btn-outline-success">
      <i class="fas fa-pencil-alt"></i>
    </button>
    <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this, arguments)">
      <i class="fas fa-trash-alt" id=${taskData.id} onclick="deleteCard.apply(this, arguments)"></i>
    </button>
  </div>
  <img
    src=${taskData.imageUrl}
    class="card-img-top"
    alt="..."
  />
  <div class="card-body">
    <h5 class="card-title">${taskData.taskTitle}</h5>
    <p class="card-text">
      ${taskData.taskDescription}
    </p>
    <a href="#" class="btn btn-primary">${taskData.taskType}</a>
  </div>
  <div class="card-footer">
    <button type="button" class="btn btn-outline-primary float-end">
      Open Task
    </button>
  </div>
</div>
</div>

`;
const loadIntialCardData = () => {
    //local storage to get tasky card data
    const getCardData = localStorage.getItem("tasky");
    if(!getCardData) return;
    //convert  string to normal object
    const {cards} = JSON.parse(getCardData);

    //loop over hose araay of  card objet to create html card and inject it to DOM
    cards.map((cardObject) => {
        taskContainer.insertAdjacentHTML("beforeend",generateNewCard(cardObject));
       

  
    //update global storage
    globalStore.push(cardObject);

});

};


const saveChanges = () => {
    const taskData = {
        id: `${Date.now}`, //1398849834 return unique number every sec
        imageURL:document.getElementById("imageurl").value,
        taskTitle:document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDescription: document.getElementById("taskdescription").value,
    };


    const newCard =`
    <div class="col-md-6 col-lg-4 " id=${taskData.id}>
    <div class="card">
        <div class="card-header d-flex justify-content-end gap-2">
            <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
            <button type="button" class="btn btn-outline-danger" ><i class="fas fa-trash-alt"></i></button>
        </div>

        <img src="${taskData.imageURL}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${taskData.taskTitle}</h5>
          <p class="card-text">${taskData.taskType}</p>
          <a href="#" class="btn btn-primary">${taskData.taskDescription}</a>
        </div>
        <div class="card-footer text-muted">
            <button type="button" class="btn btn-outline-primary float-end">Open-task</button>
        </div>
      </div>
 </div> 
 `;

 taskContainer.insertAdjacentHTML("beforeend",newCard);
 globalStore.push(taskData);

 localStorage.setItem("tasky",JSON.stringify({cards:globalStore})); 
 //tasky is id we can use taskdata but if we do so it will replace our existing data



};

const deleteCard = (event) => {
 //id of element which will be clicked and card will be deleted
event = window.event;
//id
const targetId = event.target.id;
const tagname = event.target.tagName;


 //match the id of element and id inside global object



 //if match found delete
 globalStore = globalStore.filter((cardObject) => cardObject.id !== targetId);
 localStorage.setItem("tasky", JSON.stringify({cards:globalStore})); 

 

 if(tagname === "BUTTON"){
     return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
 }
 else{
     return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
 }
};

//issues resolved
//page refresh data lost--> LOCAL STORAGE-->5MB(IN SYSTEM MAX LIMIT)
//localStorage-->API
//LOCAL STORAGE-->APPLICATION
//ACCESS APPLICATION VIA INTERFACE
//INTERFAACE IS A MIDDLE MAN 

//edit card
//delete card
//open card
