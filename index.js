document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav ul li a');

  function changeNavOnScroll() {
    const scrollPosition = window.scrollY + window.innerHeight;
    const tolerance = 150;

    let index = sections.length;

    while (--index && scrollPosition < sections[index].offsetTop + sections[index].offsetHeight - tolerance) {}

    navLinks.forEach((link) => link.classList.remove('active'));
    if (navLinks[index]) {
      navLinks[index].classList.add('active');
    }
  }

  // Adiciona uma suavização ao clicar nos links de navegação
  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();

      // Obtém o ID da seção a ser rolada
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      // Rola suavemente para a seção
      targetSection.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Usa Intersection Observer para adicionar/remove a classe 'visible'
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // A seção precisa estar 10% visível
  };

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach(section => observer.observe(section));

  window.addEventListener('scroll', changeNavOnScroll);
  changeNavOnScroll(); // Run on initial load to set the correct state
});
