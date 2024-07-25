const items = [
    // Plastic items
    { type: 'plastic', emoji: '🍾', color: '#ffcdd2' },
    { type: 'plastic', emoji: '🥤', color: '#ffcdd2' },
    { type: 'plastic', emoji: '🧴', color: '#ffcdd2' },
    { type: 'plastic', emoji: '♻️', color: '#ffcdd2' },
    { type: 'plastic', emoji: '🛍️', color: '#ffcdd2' },

    // Paper items
    { type: 'paper', emoji: '📰', color: '#c8e6c9' },
    { type: 'paper', emoji: '📦', color: '#c8e6c9' },
    { type: 'paper', emoji: '🧻', color: '#c8e6c9' },
    { type: 'paper', emoji: '📚', color: '#c8e6c9' },
    { type: 'paper', emoji: '🗞️', color: '#c8e6c9' },

    // Glass items
    { type: 'glass', emoji: '🍷', color: '#bbdefb' },
    { type: 'glass', emoji: '🍶', color: '#bbdefb' },
    { type: 'glass', emoji: '🥃', color: '#bbdefb' },
    { type: 'glass', emoji: '🧪', color: '#bbdefb' },
    { type: 'glass', emoji: '🔍', color: '#bbdefb' },
];

let score = 0;
let currentItem;

function createItem() {
    const itemContainer = document.getElementById('item-container');
    itemContainer.innerHTML = '';
    currentItem = items[Math.floor(Math.random() * items.length)];
    const itemElement = document.createElement('div');
    itemElement.className = 'item';
    itemElement.style.backgroundColor = currentItem.color;
    itemElement.textContent = currentItem.emoji;
    itemElement.draggable = true;
    itemElement.addEventListener('dragstart', dragStart);
    itemContainer.appendChild(itemElement);
}

function dragStart(e) {
    e.dataTransfer.setData('text/plain', currentItem.type);
}

function dragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
}

function dragLeave(e) {
    e.currentTarget.classList.remove('drag-over');
}

function drop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    const itemType = e.dataTransfer.getData('text');
    const binType = e.currentTarget.id;
    
    if (itemType === binType) {
        score++;
        document.getElementById('score').textContent = `Score: ${score}`;
    } else {
        score = Math.max(0, score - 1);
        document.getElementById('score').textContent = `Score: ${score}`;
    }
    createItem();
}

document.querySelectorAll('.bin').forEach(bin => {
    bin.addEventListener('dragover', dragOver);
    bin.addEventListener('dragleave', dragLeave);
    bin.addEventListener('drop', drop);
});

createItem();