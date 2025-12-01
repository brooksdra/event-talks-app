document.addEventListener('DOMContentLoaded', () => {
    const scheduleContainer = document.getElementById('scheduleContainer');
    const searchInput = document.getElementById('searchInput');
    let talksData = [];

    fetch('/api/talks')
        .then(response => response.json())
        .then(data => {
            talksData = data;
            renderSchedule(talksData);
        });

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredTalks = talksData.filter(talk => 
            talk.category.some(cat => cat.toLowerCase().includes(searchTerm)) ||
            talk.speakers.some(speaker => speaker.toLowerCase().includes(searchTerm))
        );
        renderSchedule(filteredTalks);
    });

    function renderSchedule(talks) {
        scheduleContainer.innerHTML = '';
        let currentTime = new Date();
        currentTime.setHours(10, 0, 0, 0); // Event starts at 10:00 AM

        talks.forEach((talk, index) => {
            // Add talk to schedule
            const talkElement = document.createElement('div');
            talkElement.classList.add('schedule-item');
            
            const startTimeStr = formatTime(currentTime);
            currentTime.setHours(currentTime.getHours() + 1);
            const endTimeStr = formatTime(currentTime);

            talkElement.innerHTML = `
                <div class="time">${startTimeStr} - ${endTimeStr}</div>
                <div class="talk-details">
                    <h2>${talk.title}</h2>
                    <p class="speakers">By: ${talk.speakers.join(', ')}</p>
                    <p>${talk.description}</p>
                    <div>${talk.category.map(cat => `<span class="category">${cat}</span>`).join('')}</div>
                </div>
            `;
            scheduleContainer.appendChild(talkElement);

            // Add break after talk, except for the last one
            if (index < talks.length - 1) {
                if (index === 2) { // Lunch break after the 3rd talk
                    const breakElement = document.createElement('div');
                    breakElement.classList.add('break-item');
                    const breakStartTimeStr = formatTime(currentTime);
                    currentTime.setHours(currentTime.getHours() + 1);
                    const breakEndTimeStr = formatTime(currentTime);
                    breakElement.innerHTML = `<div class="time">${breakStartTimeStr} - ${breakEndTimeStr}</div><div>Lunch Break</div>`;
                    scheduleContainer.appendChild(breakElement);
                } else {
                    const breakElement = document.createElement('div');
                    breakElement.classList.add('break-item');
                    const breakStartTimeStr = formatTime(currentTime);
                    currentTime.setMinutes(currentTime.getMinutes() + 10);
                    const breakEndTimeStr = formatTime(currentTime);
                    breakElement.innerHTML = `<div class="time">${breakStartTimeStr} - ${breakEndTimeStr}</div><div>Break</div>`;
                    scheduleContainer.appendChild(breakElement);
                }
            }
        });
    }

    function formatTime(date) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
});
