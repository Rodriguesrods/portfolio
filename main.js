// CURSOR CUSTOMIZADO
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .project-card, .social-card, .add-project-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1.8)';
    ring.style.opacity = '0.9';
    ring.style.transform = 'translate(-50%,-50%) scale(1.3)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    ring.style.opacity = '0.5';
    ring.style.transform = 'translate(-50%,-50%) scale(1)';
  });
});

// REVEAL ON SCROLL
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

// PARALLAX ORB
document.addEventListener('mousemove', e => {
  const orb1 = document.querySelector('.orb1');
  const orb2 = document.querySelector('.orb2');
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  orb1.style.transform = `translate(${x}px, ${y}px)`;
  orb2.style.transform = `translate(${-x * 0.6}px, ${-y * 0.6}px)`;
});

const cards = document.querySelectorAll(".project-card-mini");
const modal = document.getElementById("projectModal");
const modalBody = document.getElementById("modalBody");
const closeBtn = document.querySelector(".modal-close");
const overlay = document.querySelector(".modal-overlay");

cards.forEach(card => {
  card.addEventListener("click", () => {
    const title = card.dataset.title;
    const desc = card.dataset.desc;
    const tech = card.dataset.tech.split(",");
    const status = card.dataset.status;

    modalBody.innerHTML = `
      <h2>${title}</h2>
      <p>${desc}</p>
      <div class="tech">
        ${tech.map(t => `<span>${t}</span>`).join("")}
      </div>
      <p style="margin-top:1rem; color: var(--purple-light)">
        ${status}
      </p>
    `;

    modal.classList.add("active");
  });
});

function closeModal() {
  modal.classList.remove("active");
}

closeBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);