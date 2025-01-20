const container = document.getElementById('container');

// Variables to keep track of drawing state
let isDrawing = false;
let isErasing = false;
let currentColor = 'black';
let lastColor = 'black'; 

// Create a grid of the given size
function createGrid(size) {
  container.innerHTML = '';

  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    
    // Color on mouseover if drawing
    cell.addEventListener('mouseover', () => {
      if (isDrawing) {
        cell.style.backgroundColor = currentColor;
      }
    });
    
    // Also color immediately on mousedown
    cell.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        cell.style.backgroundColor = currentColor;
      }
    });

    container.appendChild(cell);
  }
}


createGrid(16);


container.addEventListener('mousedown', (e) => {
  if (e.button === 0) {
    isDrawing = true;
  }
});

// Listen for mouseup anywhere to stop drawing
document.addEventListener('mouseup', () => {
  isDrawing = false;
});

// RESET BUTTON: Clear the grid
document.getElementById('resetBtn').addEventListener('click', () => {
  const cells = container.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.style.backgroundColor = '#f5e6d4';
  });
});

// SIZE BUTTON: Change grid size
document.getElementById('sizeBtn').addEventListener('click', () => {
  const newSize = parseInt(prompt('Enter new grid size (1-100):', '16'));
  if (newSize >= 1 && newSize <= 100) {
    createGrid(newSize);
  } else {
    alert('Please enter a valid number between 1 and 100.');
  }
});

// COLOR BUTTON: Change the drawing color
document.getElementById('colorBtn').addEventListener('click', () => {
  const colorInput = prompt("Enter a color name or hex code (e.g. 'red' or '#ff0000'):", currentColor);
  if (colorInput) {
    lastColor = colorInput;
    if (!isErasing) {
      currentColor = colorInput;
    }
  }
});

// ERASE BUTTON: Toggle eraser mode
document.getElementById('eraseBtn').addEventListener('click', () => {
  if (!isErasing) {
    isErasing = true;
    document.getElementById('eraseBtn').textContent = 'Stop Erasing';
    currentColor = '#f5e6d4';
  } else {
    isErasing = false;
    document.getElementById('eraseBtn').textContent = 'Erase';
    currentColor = lastColor;
  }
});
