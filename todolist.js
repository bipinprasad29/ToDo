//   id selector function
const getId = (id) => document.getElementById(id);

// for background color
let i = 1;
let save = getId("save"),
  discard = getId("discard"),
  toDo = getId("to-do"),
  add = getId("add");

let arr = [save, discard, toDo];
let todoList = [];

const currentDayTime = document.querySelector(".dayAndDate");
setInterval(()=> currentDayTime.innerHTML = getDate(), 1000)



const showToDoEditor = () => {
  arr.forEach((e) => {
    e.classList.remove("hide");
    add.classList.add("hide");
    toDo.focus()
  });
};

const hideShowToDoEditor = () => {
  arr.forEach((e) => {
    e.classList.add("hide");
    add.classList.remove("hide");
  });
};

// time and date function
const getDate = () => {
  const today = new Date();
  let hour = today.getHours(),
    minute = today.getMinutes(),
    dates = today.getDate(),
    months = today.getMonth(),
    years = today.getFullYear();

  if (months < 12 ? (months = months + 1) : (months = 1));

  let prepand = hour >= 12 ? " PM " : " AM ";
  hour = hour >= 12 ? hour - 12 : hour;
  minute = minute < 10 ? "0" + minute : minute;

  return (currentTime = `${hour} : ${minute}${prepand} ${dates}/${months}/${years}`);
};

const populateTodos=()=>{

}

// getting from local Stoage
window.onload = () => {
  let downloadData = JSON.parse(localStorage.getItem("data"));

  if (downloadData && downloadData.length >0 && todoList.length < 1) {
    downloadData.forEach((item)=>{
      let tolocalStorage = false
       TodoMsgBody(item.message,item.id, item.time, tolocalStorage)
    });
  downloadData =[]
  }
};



// setting to local storage
const setInlocatStorage =(msgvalue, msgid, time)=>{
let newtodos = JSON.parse(localStorage.getItem("data"));
todoList = newtodos && [...newtodos,{id: msgid ,message: msgvalue, time: time}] || [{id: msgid ,message: msgvalue, time: time}]
localStorage.setItem("data", JSON.stringify(todoList))
todoList=[]
newtodos=[]
}


const updateTodos =(message, msgid,time)=>{
  let localData = JSON.parse(localStorage.getItem("data"));
  let newlocalData = localData.map((elm)=>elm.id === msgid ? {...elm, message: message.value, time:getDate()} : elm)
  console.log(newlocalData)
  localStorage.setItem("data", JSON.stringify(newlocalData))
  localData =[]
}


const DeletingMessage =(msgid, message)=>{
  message.remove()
  let localData = JSON.parse(localStorage.getItem("data"));
  localData = localData.filter((item)=>item.id != msgid)
  localStorage.setItem("data", JSON.stringify(localData))
  localData =[]
}



const TodoMsgBody =(msgvalue, msgid, time =getDate(), tolocalStorage = true)=>{
  let message = document.createElement("div");
  
  message.classList.add("message");
  // html data for generating message
  const htmlData = `<input class="smsg" disabled=true value='${msgvalue}'>
  <i class="fa-solid fa-pen-to-square miconEdit"></i>
  <i class="fa-solid fa-trash miconDelete"></i>
  <div class ="time">${time}</div>`;
  
  //  for different background color
  i > 3 ? (i = 1) : i;
  message.classList.add(`m${i}`);
  i++;

  // for entring html code afterbegin, beforeend etc
  message.insertAdjacentHTML("afterbegin", htmlData);
  
 
  const savedMsg = message.querySelector(".smsg")
  const editBtn = message.querySelector('.miconEdit')
  const removeBtn = message.querySelector('.miconDelete')

  editBtn.addEventListener('click',(e)=>{ 
  if (savedMsg.disabled === false) {
    savedMsg.disabled = true;
    savedMsg.style.color = "#000";
    updateTodos(savedMsg, msgid,time)
  } else {
    savedMsg.disabled = false;
    savedMsg.style.color = "#fff"
    savedMsg.focus()
  }
})

tolocalStorage && setInlocatStorage(msgvalue,msgid, time)
  
  // the remove() method removes an element (or node) from the document
  removeBtn.addEventListener('click',(e)=>DeletingMessage(msgid,message))
  
  document.body.appendChild(message);

}

// populate todos data 
const savingTodos = () => {
   let msgValue = toDo.value
   let msgid = Date.now().toLocaleString()
   TodoMsgBody(msgValue,msgid)
   hideShowToDoEditor();
   toDo.value=""
  };


save.addEventListener("click", () => {
  if(toDo.value) {
    savingTodos();
  }
});



window.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && toDo.value) {
    savingTodos();
  }
});

discard.addEventListener("click", (e) => {
  toDo.value = "";
  hideShowToDoEditor();
});

