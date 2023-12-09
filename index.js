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

// dynamic card creations
var htmlTaskContent = ({ id, title, description, type, url }) => `
   <div class='col-md-6 col-lg-4 mt-3' id=${id} key=${id}>
        <div class='card shadow-sm task__card'>
            <div class='card-header d-flex justify-content-end task__card__header'>
              <button type="button" class="btn btn-outline-info mr-2" name="${id}" onclick="editTask.apply(this, arguments)">
                <i class="fas fa-pencil-alt" name=${id}></i>
              </button>
               <button type="button" class="btn btn-outline-danger mr-2" name="${id}" onclick="deleteTask.apply(this, arguments)">
                <i class="fas fa-trash-alt" name=${id}></i>
              </button>
            </div>
            <div class="card-body">
               ${
                 url
                   ? `<img width='100%' src=${url} alt='card image cap' class='card-img-top md-3 rounded-lg' />`
                   : `<img width='100%' src="https://tse3.mm.bing.net/th?id=OIP.gfPiEBkEoh2CVhk8yV8HLwAAAA&pid=Api&P=0&h=180" alt='card image cap' class='card-img-top md-3 rounded-lg' />`
               }
            <h4 class="card-title">${title}</h4>
            <p class="description trim-3-lines text-muted data-gram_editor='false'">${description}</p>
            <div class="tags text-white d-flex flex-wrap">
              <span class="badge bg-primary m-1">${type}</span>
            </div>
            </div>
            <div class="card-footer">
              <button type="button" class="btn btn-outline-primary float-right" data-bs-toggle="modal" data-bs-target="#showTask" id=${id}
              onclick='openTask.apply(this, arguments)'
              >Open Task</button>
            </div>
        </div>
    </div>
`;

// dynamic openTask modal contents
var htmlModalContent = ({ id, title, description, url }) => {
  var date = new Date(parseInt(id));
  return `
  <div id=${id}>
     ${
       url
         ? `<img width='100%' src=${url} alt='card image cap' class='card-img-top md-3 rounded-lg' />`
         : `<img width='100%' src="https://tse3.mm.bing.net/th?id=OIP.gfPiEBkEoh2CVhk8yV8HLwAAAA&pid=Api&P=0&h=180" alt='card image cap' class='card-img-top md-3 rounded-lg' />`
     }
     <strong class='text-sm text-muted'>Created on ${date.toDateString()}</strong>
     <h2 class='my-3'>${title}</h2>
     <p class='lead'>${description}</p>
  </div>
  `;
};

// func is called whenever we need to update browsers local storage from the taskList array
var updateLocalStorage = () => {
  localStorage.setItem(
    "task",
    JSON.stringify({
      tasks: state.taskList,
    })
  );
};

var loadInitialData = () => {
  var localStorageCopy = JSON.parse(localStorage.task);

  if (localStorageCopy) state.taskList = localStorageCopy.tasks;

  state.taskList.map((cardDate) => {
    taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardDate));
  });
};

var handleSubmit = (event) => {
  const id = `${Date.now()}`;
  const input = {
    url: document.getElementById("imageUrl").value,
    title: document.getElementById("taskTitle").value,
    type: document.getElementById("tags").value,
    description: document.getElementById("taskDescription").value,
  };

  if (input.title === "" || input.type === "" || input.description === "") {
    return alert("Please fill all the required fields");
  }

  // spread operator
  taskContents.insertAdjacentHTML(
    "beforeend",
    htmlTaskContent({
      ...input,
      id,
    })
  );

  state.taskList.push({ ...input, id });
  updateLocalStorage();
};

var openTask = (e) => {
  if (!e) e = window.event;

  var getTask = state.taskList.find(({ id }) => id === e.target.id);
  taskModal.innerHTML = htmlModalContent(getTask);
};

var deleteTask = (e) => {
  if (!e) e = window.event;

  // 12345
  // id=4
  // removeTask= 1235

  var targetID = e.target.getAttribute("name");
  var type = e.target.tagName;
  // console.log(type);
  var removeTask = state.taskList.filter(({ id }) => id !== targetID);
  // console.log(removeTask);

  state.taskList = removeTask;
  updateLocalStorage();

  if (type === "BUTTON") {
    console.log(e.target.parentNode.parentNode.parentNode);
    return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
      e.target.parentNode.parentNode.parentNode
    );
  }
  return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
    e.target.parentNode.parentNode.parentNode.parentNode
  );
};

var editTask = (e) => {
  if (!e) e = window.event;
  var targetID = e.target.id;
  var type = e.target.tagName;

  var parentNode;
  let taskTitle;
  var taskDescription;
  var taskType;
  let submitButton;

  if (type === "BUTTON") {
    parentNode = e.target.parentNode.parentNode;
  } else {
    parentNode = e.target.parentNode.parentNode.parentNode;
  }

  taskTitle = parentNode.childNodes[3].childNodes[3];
  // console.log(taskTitle);
  taskDescription = parentNode.childNodes[3].childNodes[5];
  taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];
  console.log(taskTitle, taskDescription, taskType);
  submitButton = parentNode.childNodes[5].childNodes[1];

  taskTitle.setAttribute("contenteditable", "true");
  taskDescription.setAttribute("contenteditable", "true");
  taskType.setAttribute("contenteditable", "true");

  submitButton.setAttribute("onclick", "saveEdit.apply(this, arguments)");
  submitButton.removeAttribute("data-bs-toggle");
  submitButton.removeAttribute("data-bs-target");
  submitButton.innerHTML = "Save Changes";
};

var saveEdit = (e) => {
  if (!e) e = window.event;

  var targetID = e.target.id;
  var parentNode = e.target.parentNode.parentNode;
  // console.log(parentNode);

  var taskTitle = parentNode.childNodes[3].childNodes[3];
  var taskDescription = parentNode.childNodes[3].childNodes[5];
  var taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];
  var submitButton = parentNode.childNodes[5].childNodes[1];

  var updateData = {
    taskTitle: taskTitle.innerHTML,
    taskDescription: taskDescription.innerHTML,
    taskType: taskType.innerHTML,
  };

  var stateCopy = state.taskList;
  stateCopy = stateCopy.map((task) =>
    task.id === targetID
      ? {
          id: task.id,
          title: updateData.taskTitle,
          description: updateData.taskDescription,
          type: updateData.taskType,
          url: task.url,
        }
      : task
  );

  state.taskList = stateCopy;
  updateLocalStorage();

  taskTitle.setAttribute("contenteditable", "false");
  taskDescription.setAttribute("contenteditable", "false");
  taskType.setAttribute("contenteditable", "false");

  submitButton.setAttribute("onclick", "openTask.apply(this, arguments)");
  submitButton.setAttribute("data-bs-toggle", "modal");
  submitButton.setAttribute("data-bs-target", "#showTask");
  submitButton.innerHTML = "Open Task";
};

// var searchTask = (e) => {
//   if (!e) e = window.event;

//   while (taskContents.firstChild) {
//     taskContents.removeChild(taskContents.firstChild);
//   }

//   var resultData = state.taskList.filter(({ title }) => {
//     title.includes(e.target.value);
//   });

//   console.log(resultData);

//   resultData.map((cardData) => {
//     taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardData));
//   });
// };

// guys will start 20 mins late pls, pls join by 7:30


// Search Functionality
const searchTask = (e) =>{
    if(!e) e = window.event;
    
    while(taskContents.firstChild){
        taskContents.removeChild(taskContents.firstChild);
    }

    const resultData = state.taskList.filter(({title})=>  title.includes(e.target.value));

    console.log(resultData);
    resultData.map((cardData) => {
        taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardData));
    });
}