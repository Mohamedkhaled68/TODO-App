const input = document.querySelector('.todo-input input');
const form = document.querySelector('form');
const brightness = document.querySelector('.heading img');
const tasksDiv = document.querySelector('.tasks')
const pannle = document.querySelector('.pannle')

//empty all inputs in location
window.addEventListener('load', () => {
    emptyInput()
});


// empty array to store tasks
let tasksArray = [];


// counter to count tasks
let taskNum = 0;

// check if tasks are exist so no delete my tasks on relode
if(localStorage.getItem('tasks')){
    tasksArray = JSON.parse(localStorage.getItem('tasks'))
}

getDataFromLocalStorage();


form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value !== '') {
        addTaskToArray(input.value)
        emptyInput();
    }
});

function addTaskToArray(taskTxt){
    const task = {
        id : Date.now(),
        title : taskTxt,
        complete : false
    }
    tasksArray.push(task)
    addTasktoPage(tasksArray)
    addToLocalStorage(tasksArray)
}

function addTasktoPage (tasksArray){
    tasksDiv.innerHTML = '';

    pannle.classList.add('active')
    tasksArray.forEach((task) => {

        let taskDiv = document.createElement('div')
        taskDiv.className = 'task';
        taskDiv.setAttribute('data-id', task.id)
        if (task.complete){
            taskDiv.classList.add('checked')
        }


        let titleDiv = document.createElement('div')
        titleDiv.className = 'title'

        let checkBox = document.createElement('i')
        checkBox.className = 'check'

        
        let txt = document.createElement('h2')
        txt.appendChild(document.createTextNode(task.title))

        titleDiv.appendChild(checkBox)
        titleDiv.appendChild(txt)

        let delImage = document.createElement('img')
        delImage.setAttribute('src', '../images/icon-cross.svg')
        delImage.className = 'delImage'

        taskDiv.appendChild(titleDiv)
        taskDiv.appendChild(delImage)
        tasksDiv.appendChild(taskDiv)
    })
    taskNum = tasksArray.length
    pannle.querySelector('.counter p').innerHTML = `${taskNum} items left`
}

function addToLocalStorage(tasksArray){
    localStorage.setItem('tasks', JSON.stringify(tasksArray))
}

function getDataFromLocalStorage(){
    let data = localStorage.getItem('tasks')
    if(data && JSON.parse(data).length != 0){
        let tasks = JSON.parse(data)
        addTasktoPage(tasks)
    }
}

//click on tasks div
tasksDiv.addEventListener('click', (e) => {
    if(e.target.classList.contains('delImage')){
        //function to remove task from localstorage with id
        removeFromLocal(e.target.parentElement.getAttribute('data-id'))

        //remove from page
        e.target.parentElement.remove();
        if (tasksArray.length < 1) {
            pannle.classList.remove('active')
        }
    }
    
    if(e.target.classList.contains('check')){
        e.target.parentElement.parentElement.classList.toggle('checked')

        // function to change task status complete to true or false
        changeStatusInLocal(e.target.parentElement.parentElement.getAttribute('data-id'))
    }
})


function removeFromLocal (taskId) {
    tasksArray = tasksArray.filter((task) => task.id != taskId);
    taskNum = tasksArray.length
    pannle.querySelector('.counter p').innerHTML = `${taskNum} items left`
    addToLocalStorage(tasksArray)
}


function changeStatusInLocal(taskId){
    for ( let i = 0; i < tasksArray.length; i++){
        if(tasksArray[i].id == taskId){
            tasksArray[i].complete == false ? tasksArray[i].complete = true : tasksArray[i].complete = false;
        }
    }
    taskNum = tasksArray.length
    pannle.querySelector('.counter p').innerHTML = `${taskNum} items left`
    addToLocalStorage(tasksArray)
}


pannle.addEventListener('click', (e) => {
    if(e.target.classList.contains('activeAll')){
        for (let i = 0; i < tasksArray.length; i++) {
            tasksArray[i].complete = false;
            addToLocalStorage(tasksArray)

            const allTasks = document.querySelectorAll('.tasks .task')
            allTasks.forEach((el) => {
                el.classList.remove('checked')
            })
        }
    }
    if(e.target.classList.contains('completeAll')){
        for (let i = 0; i < tasksArray.length; i++) {
            tasksArray[i].complete = true;
            addToLocalStorage(tasksArray)
            const allTasks = document.querySelectorAll('.tasks .task')
            allTasks.forEach((el) => {
                el.classList.add('checked')
            })
        }
    }
    if(e.target.classList.contains('cls')){
        tasksArray.forEach((el) => {
            if (el.complete == true) {
                removeFromLocal(el.id)
                if (tasksArray.length < 1) {
                    pannle.classList.remove('active')
                }
            }
        })
        const allTasks = document.querySelectorAll('.tasks .task')
        allTasks.forEach((el) => {
            if (el.classList.contains('checked')) {
                el.remove();
            }
        })
    }
})






// Change mode (Dark <==> Light)
brightness.addEventListener('click', () => {
    document.body.classList.toggle('light');
    if(document.body.classList.contains('light')){
        brightness.setAttribute('src', '../images/icon-moon.svg')
    }else{
        brightness.setAttribute('src', '../images/icon-sun.svg')
    }
})



//empty the input
function emptyInput(){
    document.querySelector('input').value = ''
}

