
function preloadImages() {
  document.querySelectorAll('.icon img').forEach(img => {
      const preloaded = new Image();
      preloaded.src = img.getAttribute('data-active');
  });
}

window.onload = function() {
  preloadImages();
  setupIconChanger();
};


function setupIconChanger() {
  const icons = document.querySelectorAll('.icon img');
  const text = document.getElementById('text');
  const labels = ["Football", "Tennis", "Basketball", "eSports", "Ice Hockey", "American Football", "Baseball", "Table Tennis", "Volleyball", "MMA"];
  let currentIndex = 0;

  function changeIcon() {
      icons.forEach(img => {
          img.src = img.getAttribute('data-active').replace('-2', '-1');
          img.parentElement.classList.remove('active');
      });
      
      icons[currentIndex].src = icons[currentIndex].getAttribute('data-active');
      icons[currentIndex].parentElement.classList.add('active');
      text.textContent = labels[currentIndex];

      currentIndex = (currentIndex + 1) % icons.length;
      setTimeout(() => requestAnimationFrame(changeIcon), 1800);
  }
  changeIcon();
}
setupIconChanger();

function setupConfettiAnimation() {
  function randomize(collection) {
    return collection[Math.floor(Math.random() * collection.length)];
  }

  let confettiCount = 50;
  const maxConfetti = 300;
  const increaseRate = 10;

  function createConfettiItem() {
    const colors = ['#E75624', '#E9128C', '#FFD700', '#00FF7F', '#1E90FF', '#9400D3'];
    const height = 6.6, width = 6.6;
    const scale = Math.random() * 1.75 + 2;
    const duration = 5 + Math.random() * 5;
    const delay = Math.random() * 5;
    const $confettiItem = $('<svg class="confetti-item" width="' + width * scale + '" height="' + height * scale + '" viewbox="0 0 ' + width + ' ' + height + '">\n  <use transform="rotate(' + Math.random() * 360 + ', ' + width / 2 + ', ' + height / 2 + ')" xlink:href="#svg-confetti" />\n</svg>');
    $confettiItem.css({
      'animation': duration + 's linear infinite confetti-fall',
      'animation-delay': delay + 's',
      'color': randomize(colors),
      'left': Math.random() * 110 + 'vw'
    });
    return $confettiItem;
  }

  function confetti() {
    const $confettiItems = $('<div class="confetti"></div>');
    for (var i = 0; i < confettiCount; i++) {
      $confettiItems.append(createConfettiItem());
    }
    $('body').append($confettiItems);
    if (confettiCount < maxConfetti) {
      confettiCount += increaseRate;
    }
  }

  $(function() {
    confetti();
    setInterval(() => {
      $('.confetti-item:first-child').remove();
      $('.confetti').append(createConfettiItem());
    }, 200);
  });
}

setupIconChanger();
setupConfettiAnimation();