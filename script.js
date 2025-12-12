const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const workoutForm = document.getElementById('workoutForm');
const contactForm = document.getElementById('contactForm');
const workoutTableBody = document.getElementById('workoutTableBody');
const clearHistoryBtn = document.getElementById('clearHistory');
const totalWorkoutsElem = document.getElementById('totalWorkouts');
const totalMinutesElem = document.getElementById('totalMinutes');
const currentStreakElem = document.getElementById('currentStreak');
const totalWorkoutsCountElem = document.getElementById('totalWorkoutsCount');
const toast = document.getElementById('toast');

let workouts = [];

// Workout Form Submission
workoutForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const workout = {
        id: Date.now(),
        date: document.getElementById('workoutDate').value,
        type: document.getElementById('workoutType').value,
        exercise: document.getElementById('exerciseName').value,
        duration: parseInt(document.getElementById('duration').value),
        sets: document.getElementById('sets').value || '-',
        reps: document.getElementById('reps').value || '-',
        weight: document.getElementById('weight').value || '-',
        notes: document.getElementById('notes').value
    };
    
    // Add workout to array
    workouts.push(workout);
    
    // Save to localStorage
    saveWorkoutsToLocalStorage();
    
    // Update display
    renderWorkouts();
    updateStats();
    
    // Show success message
    showMsg('Workout added successfully! 💪');
    
    // Reset form
    workoutForm.reset();
    
    // Set today's date as default
    setTodayDate();
});

// Contact Form Submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const contactData = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        subject: document.getElementById('contactSubject').value,
        message: document.getElementById('contactMessage').value
    };
    
    // Logging in console
    console.log('Contact Form Submitted:');
    console.log(contactData);
    
    // Show success message
    showMsg('Message sent successfully! We\'ll get back to you soon.');
    
    // Reset form
    contactForm.reset();
});

// Clear All Workouts
clearHistoryBtn.addEventListener('click', function() {
    if (workouts.length === 0) {
        showMsg('No workouts to clear!');
        return;
    }
    
    const confirmed = confirm('Are you sure you want to clear all workout history?');
    
    if (confirmed) {
        workouts = [];
        saveWorkoutsToLocalStorage();
        renderWorkouts();
        updateStats();
        showMsg('All workouts cleared!');
    }
});


// ===== FUNCTIONS =====

// Set today's date as default in date input
function setTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = year + '-' + month + '-' + day;
    
    document.getElementById('workoutDate').value = formattedDate;
}

// Save workouts to localStorage
function saveWorkoutsToLocalStorage() {
    localStorage.setItem('fitForgeWorkouts', JSON.stringify(workouts));
}

// Load workouts from localStorage
function loadWorkoutsFromLocalStorage() {
    const storedWorkouts = localStorage.getItem('fitForgeWorkouts');
    if (storedWorkouts) {
        workouts = JSON.parse(storedWorkouts);
        renderWorkouts();
        updateStats();
    }
}

// Render workouts to table
function renderWorkouts() {
    workoutTableBody.innerHTML = '';
    if (workouts.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = '<td colspan="6" style="text-align: center; padding: 30px;">No workouts logged yet. Start tracking your progress!</td>';
        workoutTableBody.appendChild(emptyRow);
        totalWorkoutsCountElem.textContent = '0 workouts logged';
        return;
    }
    
    // Sort workouts by date (newest first)
    const sortedWorkouts = workouts.sort(function(a, b) {
        return new Date(b.date) - new Date(a.date);
    });
    
    // Create table rows
    sortedWorkouts.forEach(function(workout) {
        const row = document.createElement('tr');
        
        // Format date
        const date = new Date(workout.date);
        const formattedDate = date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        });
        
        // Create details string
        let details = '';
        if (workout.sets !== '-') details += workout.sets + ' sets';
        if (workout.reps !== '-') {
            if (details) details += ', ';
            details += workout.reps + ' reps';
        }
        if (workout.weight !== '-') {
            if (details) details += ', ';
            details += workout.weight + 'kg';
        }
        if (!details) details = '-';
        
        row.innerHTML = '<td>' + formattedDate + '</td>' +
                       '<td>' + workout.type + '</td>' +
                       '<td>' + workout.exercise + '</td>' +
                       '<td>' + workout.duration + ' min</td>' +
                       '<td>' + details + '</td>' +
                       '<td><button class="delete-btn" data-id="' + workout.id + '">Delete</button></td>';
        
        workoutTableBody.appendChild(row);
    });
    
    // Update total count
    totalWorkoutsCountElem.textContent = workouts.length + ' workout' + (workouts.length !== 1 ? 's' : '') + ' logged';
    
    // Add delete event listeners
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const workoutId = parseInt(this.getAttribute('data-id'));
            deleteWorkout(workoutId);
        });
    });
}

// Delete workout
function deleteWorkout(id) {
    workouts = workouts.filter(function(workout) {
        return workout.id !== id;
    });
    
    saveWorkoutsToLocalStorage();
    renderWorkouts();
    updateStats();
    showMsg('Workout deleted!');
}

// Update stats
function updateStats() {
    // Total workouts
    totalWorkoutsElem.textContent = workouts.length;
    
    // Total mins
    let totalMinutes = 0;
    workouts.forEach(function(workout) {
        totalMinutes += workout.duration;
    });
    totalMinutesElem.textContent = totalMinutes;
    
    // Calculate streak
    const streak = calculateStreak();
    currentStreakElem.textContent = streak;
}

// Calculate workout streak
function calculateStreak() {
    if (workouts.length === 0) return 0;
    
    // Get unique dates
    const uniqueDates = [];
    workouts.forEach(function(workout) {
        const dateStr = workout.date;
        if (uniqueDates.indexOf(dateStr) === -1) {
            uniqueDates.push(dateStr);
        }
    });
    
    // Sort dates
    uniqueDates.sort(function(a, b) {
        return new Date(b) - new Date(a);
    });
    
    // Calculate streak
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < uniqueDates.length; i++) {
        const workoutDate = new Date(uniqueDates[i]);
        workoutDate.setHours(0, 0, 0, 0);
        
        const daysDiff = Math.floor((today - workoutDate) / (1000 * 60 * 60 * 24));
        
        if (daysDiff === i) {
            streak++;
        } else {
            break;
        }
    }
    
    return streak;
}

// Show notification
function showMsg(message) {
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(function() {
        toast.classList.remove('show');
        toast.classList.add('hidden')
    }, 3000);
    toast.classList.remove('hidden')
}


//WHEN DOC GETS LOADED...DYNAMIC DATA//
document.addEventListener('DOMContentLoaded', function() {
    setTodayDate();
    
    loadWorkoutsFromLocalStorage();
    
    initScrollAnimation();
    
    console.log('Fit Forge Workout Tracker Initialized');
    console.log('Total Workouts:', workouts.length);
});





