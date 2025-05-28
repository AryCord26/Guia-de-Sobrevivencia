document.addEventListener('DOMContentLoaded', () => {
  const calendarBody = document.getElementById('calendarBody');
  const monthYear = document.getElementById('monthYear');
  const prevMonthBtn = document.getElementById('prevMonth');
  const nextMonthBtn = document.getElementById('nextMonth');

  const eventModal = new bootstrap.Modal(document.getElementById('eventModal'));
  const eventForm = document.getElementById('eventForm');
  const eventDateInput = document.getElementById('eventDate');
  const eventTextInput = document.getElementById('eventText');
  const eventIndexInput = document.getElementById('eventIndex');
  const btnDeleteEvent = document.getElementById('btnDeleteEvent');

  let today = new Date();
  let currentYear = today.getFullYear();
  let currentMonth = today.getMonth(); // 0-11

  let events = JSON.parse(localStorage.getItem('calendarEvents')) || {};

  function saveEvents() {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }

  function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  function renderCalendar(year, month) {
    calendarBody.innerHTML = '';

    const firstDay = new Date(year, month, 1);
    const firstWeekday = firstDay.getDay(); // 0 = Sunday

    const daysInMonth = getDaysInMonth(year, month);

    monthYear.textContent = firstDay.toLocaleDateString('pt-BR', {
      month: 'long',
      year: 'numeric',
    });

    // Previous month's last days to fill the gap (optional)
    const prevMonthDays = getDaysInMonth(year, month - 1);

    let date = 1;
    let nextMonthDate = 1;

    for (let row = 0; row < 6; row++) {
      const tr = document.createElement('tr');

      for (let col = 0; col < 7; col++) {
        const td = document.createElement('td');

        // Calculate the calendar cell date
        const cellIndex = row * 7 + col;

        if (cellIndex < firstWeekday) {
          // Days from previous month (optional)
          const dayNum = prevMonthDays - (firstWeekday - 1 - cellIndex);
          td.classList.add('text-muted');
          td.textContent = dayNum;
          td.style.backgroundColor = '#222';
          td.style.cursor = 'default';
        } else if (date <= daysInMonth) {
          // Current month days
          const dayString = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;

          td.innerHTML = `<span class="date-number">${date}</span>`;

          // Check if today
          if (
            year === today.getFullYear() &&
            month === today.getMonth() &&
            date === today.getDate()
          ) {
            td.classList.add('today');
          }

          // Check if event exists for this date
          if (events[dayString]) {
            td.classList.add('evento');
            const evtDiv = document.createElement('div');
            evtDiv.classList.add('event-text');
            evtDiv.textContent = events[dayString];
            td.appendChild(evtDiv);
          }

          // Click event to open modal
          td.addEventListener('click', () => {
            openEventModal(dayString);
          });

          date++;
        } else {
          // Days from next month (optional)
          td.classList.add('text-muted');
          td.textContent = nextMonthDate++;
          td.style.backgroundColor = '#222';
          td.style.cursor = 'default';
        }

        tr.appendChild(td);
      }
      calendarBody.appendChild(tr);
    }
  }

  function openEventModal(dateStr) {
    eventDateInput.value = dateStr;
    eventTextInput.value = events[dateStr] || '';
    eventIndexInput.value = dateStr;
    btnDeleteEvent.style.display = events[dateStr] ? 'inline-block' : 'none';
    eventModal.show();
  }

  eventForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const dateStr = eventDateInput.value;
    const text = eventTextInput.value.trim();

    if (text) {
      events[dateStr] = text;
    } else {
      delete events[dateStr];
    }

    saveEvents();
    renderCalendar(currentYear, currentMonth);
    eventModal.hide();
  });

  btnDeleteEvent.addEventListener('click', () => {
    const dateStr = eventDateInput.value;
    if (events[dateStr]) {
      delete events[dateStr];
      saveEvents();
      renderCalendar(currentYear, currentMonth);
      eventModal.hide();
    }
  });

  prevMonthBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar(currentYear, currentMonth);
  });

  nextMonthBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar(currentYear, currentMonth);
  });

  renderCalendar(currentYear, currentMonth);
});
