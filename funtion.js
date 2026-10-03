
let queue = [];          
let stack = [];          


const queueDisplay = document.getElementById('queueDisplay');
const queueInput = document.getElementById('queueInput');
const enqueueBtn = document.getElementById('enqueueBtn');
const dequeueBtn = document.getElementById('dequeueBtn');
const queuePeekBtn = document.getElementById('queuePeekBtn');
const queueSizeSpan = document.getElementById('queueSize');

const stackDisplay = document.getElementById('stackDisplay');
const stackInput = document.getElementById('stackInput');
const pushBtn = document.getElementById('pushBtn');
const popBtn = document.getElementById('popBtn');
const stackPeekBtn = document.getElementById('stackPeekBtn');
const stackSizeSpan = document.getElementById('stackSize');


function renderQueue() {
    queueDisplay.innerHTML = '';
    if (queue.length === 0) {
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'empty-message';
        emptyDiv.textContent = '[ EMPTY QUEUE ]';
        queueDisplay.appendChild(emptyDiv);
    } else {
        queue.forEach((item, index) => {
            const badge = document.createElement('span');
            badge.className = 'element-badge';
            badge.setAttribute('data-index', (index + 1).toString().padStart(2, '0'));
            badge.textContent = item;
            if (index === 0) badge.title = 'FRONT';
            queueDisplay.appendChild(badge);
        });
    }
    queueSizeSpan.textContent = `SIZE: ${queue.length}`;
}

function renderStack() {
    stackDisplay.innerHTML = '';
    if (stack.length === 0) {
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'empty-message';
        emptyDiv.textContent = '[ EMPTY STACK ]';
        stackDisplay.appendChild(emptyDiv);
    } else {
        stack.forEach((item, index) => {
            const badge = document.createElement('span');
            badge.className = 'element-badge';
            const bottomIndex = index + 1;
            badge.setAttribute('data-index', bottomIndex.toString().padStart(2, '0'));
            badge.textContent = item;
            if (index === stack.length - 1) badge.title = 'TOP';
            stackDisplay.appendChild(badge);
        });
    }
    stackSizeSpan.textContent = `SIZE: ${stack.length}`;
}

// ------------------------------------------------------------
//  HELPERS
// ------------------------------------------------------------
function getQueueInputValue() {
    let raw = queueInput.value.trim();
    if (raw === '') {
        return 'OBJ_' + Math.floor(Math.random() * 1000);
    }
    return raw;
}

function getStackInputValue() {
    let raw = stackInput.value.trim();
    if (raw === '') {
        return 'OBJ_' + Math.floor(Math.random() * 1000);
    }
    return raw;
}

function pulseElement(element) {
    element.classList.add('pulse');
    setTimeout(() => element.classList.remove('pulse'), 350);
}

function shakeElement(element) {
    element.classList.add('shake');
    setTimeout(() => element.classList.remove('shake'), 300);
}


function enqueue() {
    const value = getQueueInputValue();
    queue.push(value);
    renderQueue();
    queueInput.value = '';
    queueInput.placeholder = `ENQUEUE ${Math.floor(Math.random() * 100)}`;
    queueInput.focus();
    pulseElement(queueDisplay);
}

function dequeue() {
    if (queue.length === 0) {
        shakeElement(queueDisplay);
        return;
    }
    queue.shift();
    renderQueue();
    pulseElement(queueDisplay);
}

function peekQueue() {
    if (queue.length === 0) {
        shakeElement(queueDisplay);
        return;
    }
    const firstBadge = queueDisplay.querySelector('.element-badge');
    if (firstBadge) {
        firstBadge.style.transform = 'scale(1.15)';
        firstBadge.style.backgroundColor = '#e8e6e1';
        firstBadge.style.color = '#e05a33';
        firstBadge.style.borderColor = '#e05a33';
        firstBadge.style.boxShadow = '0 0 20px #e05a33, 2px 2px 0 rgba(0,0,0,0.4)';
        setTimeout(() => {
            firstBadge.style.transform = '';
            firstBadge.style.backgroundColor = '';
            firstBadge.style.color = '';
            firstBadge.style.borderColor = '';
            firstBadge.style.boxShadow = '';
        }, 400);
    }
}


function push() {
    const value = getStackInputValue();
    stack.push(value);
    renderStack();
    stackInput.value = '';
    stackInput.placeholder = `PUSH ${Math.floor(Math.random() * 100)}`;
    stackInput.focus();
    pulseElement(stackDisplay);
}

function pop() {
    if (stack.length === 0) {
        shakeElement(stackDisplay);
        return;
    }
    stack.pop();
    renderStack();
    pulseElement(stackDisplay);
}

function peekStack() {
    if (stack.length === 0) {
        shakeElement(stackDisplay);
        return;
    }
    const badges = stackDisplay.querySelectorAll('.element-badge');
    if (badges.length > 0) {
        const topBadge = badges[badges.length - 1];
        topBadge.style.transform = 'scale(1.15)';
        topBadge.style.backgroundColor = '#e8e6e1';
        topBadge.style.color = '#e05a33';
        topBadge.style.borderColor = '#e05a33';
        topBadge.style.boxShadow = '0 0 20px #e05a33, 2px 2px 0 rgba(0,0,0,0.4)';
        setTimeout(() => {
            topBadge.style.transform = '';
            topBadge.style.backgroundColor = '';
            topBadge.style.color = '';
            topBadge.style.borderColor = '';
            topBadge.style.boxShadow = '';
        }, 400);
    }
}

// ------------------------------------------------------------
//  INITIALIZATION
// ------------------------------------------------------------
function init() {
    // Celestial Violence themed initial data
    queue = ['SIGNAL', 'ECHO', 'PULSE'];
    stack = ['CELESTIAL', 'VIOLENCE', 'SURRENDER'];

    renderQueue();
    renderStack();

    queueInput.value = 'RESISTANCE';
    queueInput.placeholder = 'ENQUEUE DATA';
    stackInput.value = 'FUTILE';
    stackInput.placeholder = 'PUSH DATA';

    // --- queue listeners ---
    enqueueBtn.addEventListener('click', enqueue);
    dequeueBtn.addEventListener('click', dequeue);
    queuePeekBtn.addEventListener('click', peekQueue);

    queueInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            enqueue();
        }
    });

    // --- stack listeners ---
    pushBtn.addEventListener('click', push);
    popBtn.addEventListener('click', pop);
    stackPeekBtn.addEventListener('click', peekStack);

    stackInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            push();
        }
    });

    // dynamic placeholder refresh
    setInterval(() => {
        if (document.activeElement !== queueInput && queueInput.value === '') {
            queueInput.placeholder = `ENQUEUE ${Math.floor(Math.random() * 100)}`;
        }
        if (document.activeElement !== stackInput && stackInput.value === '') {
            stackInput.placeholder = `PUSH ${Math.floor(Math.random() * 100)}`;
        }
    }, 4000);
}

// Start the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);