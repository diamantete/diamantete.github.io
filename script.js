document.addEventListener('DOMContentLoaded', function() {
    loadHabits();
});

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
        removeHabitFromStorage(name);
    });

    habitItem.appendChild(deleteButton);
    habitList.appendChild(habitItem);

    saveHabitToStorage(name, frequency);
}

function saveHabitToStorage(name, frequency) {
    let habits = JSON.parse(localStorage.getItem('habits')) || [];
    habits.push({ name, frequency });
    localStorage.setItem('habits', JSON.stringify(habits));
}

function removeHabitFromStorage(name) {
    let habits = JSON.parse(localStorage.getItem('habits')) || [];
    habits = habits.filter(habit => habit.name !== name);
    localStorage.setItem('habits', JSON.stringify(habits));
}

function loadHabits() {
    const habits = JSON.parse(localStorage.getItem('habits')) || [];
    habits.forEach(habit => {
        addHabit(habit.name, habit.frequency);
    });
}
