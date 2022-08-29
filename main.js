const tasksNode = document.querySelector('.js-tasks');
const inputNode = document.querySelector('.js-add-input');
const btnNode = document.querySelector('.js-add-btn');

let tasks = [];

//---------------------------------------------------------

function addTask(text) {
	const task = {
		text,
		done: false,
		id: `${ Math.random().toFixed(3) * 1e3 }`
	};

	tasks.push(task);
}

function deleteTask(id) {
	for( let i = 0; i < tasks.length; i++ ) {
		if( tasks[i].id == id ) tasks.splice(i, 1);
	}
}

function doTask(id) {
	for( let i = 0; i < tasks.length; i++ ) {
		if( tasks[i].id == id ) {
			if( tasks[i].done == false ) {
				tasks[i].done = true;
				return;
			}
			if( tasks[i].done == true )	{
				tasks[i].done = false;
				return;
			}
		}
	}
}

//---------------------------------------------------------

function render() {
	console.log(tasks);
	let html = '';

	tasks.forEach(task => {
		if(task.done) {
			html += `
			<div class="task-wrapper" id="${task.id}">
				<button class="btn" id="done-btn" data-id="${task.id}">Done</button>
				<button class="btn" id="delete-btn" data-id="${task.id}">Delete</button>
				<span><s>${task.text}</s></span>
			</div>
		`;
		return;
		}

		html += `
			<div class="task-wrapper" id="${task.id}">
				<button class="btn" id="done-btn" data-id="${task.id}">Done</button>
				<button class="btn" id="delete-btn" data-id="${task.id}">Delete</button>
				<span>${task.text}</span>
			</div>
		`;
	})

	tasksNode.innerHTML = html;
}

btnNode.addEventListener('click', () => {
	const text = inputNode.value;
	addTask(text);
	inputNode.value = '';
	render();
});

tasksNode.addEventListener('click', (event) => {
	if(event.target.innerHTML == 'Done') {
		const id = event.target.getAttribute('data-id');
		doTask(id);
		render();
	}

	if(event.target.innerHTML == 'Delete') {
		const id = event.target.getAttribute('data-id');
		deleteTask(id);
		render();
	}
})