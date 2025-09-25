// Progress-bar animation
window.onload = () => {
  document.querySelectorAll('.fill').forEach(bar => {
    if (bar.classList.contains('html')) {
      bar.style.width = '90%';
    } else if (bar.classList.contains('css')) {
      bar.style.width = '85%';
    } else if (bar.classList.contains('problemlösning')) {
      bar.style.width = '90%';
    } else if (bar.classList.contains('teamwork')) {
      bar.style.width = '100%';
    }
  });
