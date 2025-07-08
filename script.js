let count = 0;

function incrementLove() {
  count++;
  const counter = document.getElementById('counter');
  counter.textContent = count + (count === 1 ? ' Love' : ' Loves');

  const heart = document.querySelector('.heart');
  heart.classList.add('clicked');
  setTimeout(() => {
    heart.classList.remove('clicked');
  }, 200);
}
