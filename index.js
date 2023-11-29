// console.log("Hello World!");

// var state = {
//     taskList: [
//         {
//             imageUrl: "",
//             taskTitle: "",
//             taskType: "",
//             taskDescription: ""
//         },
//           {
//             imageUrl: "",
//             taskTitle: "",
//             taskType: "",
//             taskDescription: ""
//         },
//           {
//             imageUrl: "",
//             taskTitle: "",
//             taskType: "",
//             taskDescription: ""
//         }
//     ]
// }

var state = {
  taskList: [],
};

// DOM Objects
var taskContents = document.querySelector(".task__contents");
var taskModal = document.querySelector(".task__modal__body");

// console.log(taskModal);

var htmlTaskContent = ({ id, title, description, type, url }) => `
   <div class='col-md-6 col-lg-4 mt-3' id=${id} key=${id}>
        <div class='card shadow-sm task__card'>
            <div class='card-header d-flex justify-content-end task__card__header'>
              <button type="button" class="btn btn-outline-info mr-2" name="${id}">
                <i class="fas fa-pencil-alt" name=${id}></i>
              </button>
               <button type="button" class="btn btn-outline-danger mr-2" name="${id}">
                <i class="fas fa-trash-alt" name=${id}></i>
              </button>
            </div>
            <div class="card-body">
               ${
                 url &&
                 `<img width='100%' src=${url} alt='card image cap' class='card-img-top md-3 rounded-lg' />`
               }
            <h4 class="card-title">${title}</h4>
            <p class="description trim-3-lines text-muted data-gram_editor='false'">${description}</p>
            <div class="tags text-white d-flex flex-wrap">
              <span class="badge bg-primary m-1">${type}</span>
            </div>
            </div>
            <div class="card-footer">
              <button type="button" class="btn btn-outline-primary float-right" data-bs-toggle="modal" data-bs-target="#showTask">Open Task</button>
            </div>
        </div>
    </div>
`;

var htmlModalContent = ({ id, title, description, url }) => {
  var date = new Date(parseInt(id));
  return `
  <div id=${id}>
     ${
       url &&
       `<img width='100%' src=${url} alt='card image cap' class='card-img-top md-3 rounded-lg' />`
     }
     <strong class='text-sm text-muted'>Created on ${date.toDateString()}</strong>
     <h2 class='my-3'>${title}</h2>
     <p class='lead'>${description}</p>
  </div>
  `;
};




var updateLocalStorage = () => {
  localStorage.setItem('task', JSON.stringify({
    tasks: state.taskList,
  }))
}


var loadInitialData = () => {
  var localStorageCopy = JSON.parse(localStorage.tasks);

  if(localStorageCopy) state.taskList = localStorageCopy.tasks;

  state.taskList.map((cardDate)=>{
    taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardDate));
  })
}


var handleSubmit = (event) => {
  const id = `${Date.now()}`;
  const input = {
    url: document.getElementById("imageUrl").value,
    title: document.getElementById("taskTitle").value,
    type: document.getElementById("tags").value,
    description: document.getElementById("taskDescription").value,
  };
}