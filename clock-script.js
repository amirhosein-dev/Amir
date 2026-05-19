// Clock functionality
let is24Hour = false;

const timezones = {
    'America/New_York': 'نیویورک',
    'Europe/London': 'لندن',
    'Europe/Paris': 'پاریس',
    'Asia/Dubai': 'دبی',
    'Asia/Kolkata': 'هند',
    'Asia/Bangkok': 'بانکوک',
    'Asia/Hong_Kong': 'هنگ‌کنگ',
    'Asia/Tokyo': 'توکیو',
    'Australia/Sydney': 'سیدنی',
    'Asia/Tehran': 'تهران',
    'America/Los_Angeles': 'لس‌آنجلس',
    'Asia/Singapore': 'سنگاپور'
};

function formatTime(date, is24) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    if (is24) {
        return `${hours}:${minutes}:${seconds}`;
    } else {
        let h = parseInt(hours);
        const ampm = h >= 12 ? 'ب.ظ' : 'ق.ظ';
        h = h % 12;
        h = h ? h : 12;
        return `${String(h).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;
    }
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
}

function updateClocks() {
    document.querySelectorAll('.clock-card').forEach(card => {
        const timeElements = card.querySelectorAll('[data-timezone]');
        
        timeElements.forEach(element => {
            const timezone = element.getAttribute('data-timezone');
            
            // Get current time in the specific timezone
            const date = new Date();
            const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
            const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
            const diff = tzDate - utcDate;
            const localDate = new Date(date.getTime() + diff);
            
            if (element.classList.contains('clock-time')) {
                element.textContent = formatTime(localDate, is24Hour);
                element.style.animation = 'pulse 0.5s ease';
                setTimeout(() => {
                    element.style.animation = '';
                }, 500);
            } else if (element.classList.contains('clock-date')) {
                element.textContent = formatDate(localDate);
            }
        });
    });
}

// Format toggle button
document.getElementById('toggleFormat').addEventListener('click', (e) => {
    is24Hour = !is24Hour;
    e.target.textContent = is24Hour ? 'تبدیل به ۱۲ ساعت' : 'تبدیل به ۲۴ ساعت';
    updateClocks();
});

// Refresh button
document.getElementById('refreshBtn').addEventListener('click', () => {
    updateClocks();
});

// Update clocks every second
setInterval(updateClocks, 1000);

// Initial update
updateClocks();

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);