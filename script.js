// Transactions data
const transactions = [
    { name: 'Apple Inc.', date: 'Today, 2:30 PM', amount: '+$1,240.00', type: 'positive', icon: 'fa-apple-whole', color: 'blue' },
    { name: 'Netflix Subscription', date: 'Today, 11:00 AM', amount: '-$15.99', type: 'negative', icon: 'fa-tv', color: 'orange' },
    { name: 'Freelance Payment', date: 'Yesterday', amount: '+$3,500.00', type: 'positive', icon: 'fa-briefcase', color: 'green' },
    { name: 'Amazon Purchase', date: 'Yesterday', amount: '-$89.50', type: 'negative', icon: 'fa-shopping-cart', color: 'orange' },
    { name: 'Salary Deposit', date: 'Apr 20', amount: '+$5,200.00', type: 'positive', icon: 'fa-building', color: 'purple' },
    { name: 'Uber Ride', date: 'Apr 19', amount: '-$24.30', type: 'negative', icon: 'fa-car', color: 'orange' },
];

// Render transactions
const txList = document.getElementById('transactionList');
transactions.forEach(tx => {
    txList.innerHTML += `
        <div class="tx-item">
            <div class="tx-icon" style="background:${tx.color === 'green' ? 'rgba(52,211,153,.1)' : tx.color === 'blue' ? 'rgba(96,165,250,.1)' : tx.color === 'purple' ? 'rgba(167,139,250,.1)' : 'rgba(251,191,36,.1)'};color:var(--${tx.color})">
                <i class="fas ${tx.icon}"></i>
            </div>
            <div class="tx-details">
                <div class="tx-name">${tx.name}</div>
                <div class="tx-date">${tx.date}</div>
            </div>
            <div class="tx-amount ${tx.type}">${tx.amount}</div>
        </div>`;
});

// Performance Chart
const perfCtx = document.getElementById('performanceChart').getContext('2d');
new Chart(perfCtx, {
    type: 'line',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Income',
            data: [4200, 3800, 5100, 4600, 5800, 4900, 6200],
            borderColor: '#34d399',
            backgroundColor: 'rgba(52,211,153,0.1)',
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: '#34d399'
        }, {
            label: 'Expenses',
            data: [2800, 3200, 2900, 3500, 2600, 3100, 2800],
            borderColor: '#fbbf24',
            backgroundColor: 'rgba(251,191,36,0.05)',
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: '#fbbf24'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8', font: { size: 11 } } },
            y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8', font: { size: 11 }, callback: v => '$' + (v/1000) + 'k' } }
        }
    }
});
document.getElementById('performanceChart').parentElement.style.height = '280px';

// Spending Chart
const spendCtx = document.getElementById('spendingChart').getContext('2d');
new Chart(spendCtx, {
    type: 'doughnut',
    data: {
        labels: ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment'],
        datasets: [{
            data: [35, 20, 18, 15, 12],
            backgroundColor: ['#818cf8', '#34d399', '#fbbf24', '#60a5fa', '#f87171'],
            borderWidth: 0,
            spacing: 4,
            borderRadius: 6
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
            legend: { position: 'bottom', labels: { color: '#94a3b8', padding: 12, font: { size: 11 }, usePointStyle: true, pointStyleWidth: 8 } }
        }
    }
});
document.getElementById('spendingChart').parentElement.style.height = '280px';

// Sidebar nav
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', e => {
        e.preventDefault();
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});

// Range buttons
document.querySelectorAll('.range-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.range-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// Mobile menu
document.getElementById('menuToggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
});

// Animate stat numbers
document.querySelectorAll('.stat-value').forEach(el => {
    const target = parseFloat(el.textContent.replace(/[$,]/g, ''));
    let current = 0;
    const increment = target / 40;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = '$' + current.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }, 30);
});
