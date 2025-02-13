document.getElementById('new-habit-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const habitName = document.getElementById('habit-name').value;
    const habitFrequency = document.getElementById('habit-frequency').value;

    if (habitName && habitFrequency) {
        addHabit(habitName, habitFrequency);
        document.getElementById('new-habit-form').reset();
    }
});

function addHabit(name, frequency) {
    const habitList = document.getElementById('habits');

    const habitItem = document.createElement('li');
    habitItem.textContent = `${name} - ${frequency} días/semana`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', function() {
        habitList.removeChild(habitItem);
    });

    habitItem.appendChild(deleteButton);
    habitList.appendChild(habitItem);
}

