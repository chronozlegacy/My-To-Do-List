var toDoEntryBox=document.getElementById("todo-entry-box");
var toDoList=document.getElementById("todo-list");
var addbut=document.getElementById("add-button");
addbut.addEventListener("click",addToDoItem);
var toDoInfo={
	"task":"Think I need to do",
	"completed":false,
}
loadList();
function prevDef(e){
	event.preventDefault();
}
function newToDoItem(itemText,completed){
	var toDoItem=document.createElement("li");
	var toDoText=document.createTextNode(itemText);
	toDoItem.appendChild(toDoText);

	if(completed){
		toDoItem.classList.add("completed");
	}
	toDoList.appendChild(toDoItem);
	toDoItem.addEventListener("dblclick",toggleToDoItemState);
}

function addToDoItem(){
	var itemText=toDoEntryBox.value;
	newToDoItem(itemText,false);
}

function toggleToDoItemState(event){
	prevDef(event);
	if(this.classList.contains("completed")){
		this.classList.remove("completed");
	}
	else{
		this.classList.add("completed");
	}
}
function clearCompletedToDoitem(){
	var completedItems=toDoList.getElementsByClassName("completed");
	while(completedItems.length>0){
		completedItems.item(0).remove();
	}
}

function emptyList(){
	var toDoItem=toDoList.children;
	while(toDoItem.length > 0){
		toDoItem.item(0).remove();
	}
}
function saveList(){
	var toDos=[];
	for(var i=0; i<toDoList.children.length; i++){
		var toDo=toDoList.children.item(i);
		var toDoInfo={
			"task":toDo.innerText,
			"completed":toDo.classList.contains("completed"),
		};
		toDos.push(toDoInfo);
	}
	localStorage.setItem("toDos",JSON.stringify(toDos));
	console.log("masuk kesini ya");
}

function loadList(){
	if(localStorage.getItem("toDos") != null){
		var toDos=JSON.parse(localStorage.getItem("toDos"));
		for(var i=0; i<toDos.length; i++){
			var toDo=toDos[i];
			newToDoItem(toDo.task,toDo.completed);
		}
	}
}