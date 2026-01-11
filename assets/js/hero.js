(function(){
  const heroEl = document.querySelector('.final-hero');
  if(!heroEl) return;
  const heroTitle = document.getElementById('heroTitle');
  const heroCaption = document.getElementById('heroCaption');
  const prevBtn = document.querySelector('.hero-prev');
  const nextBtn = document.querySelector('.hero-next');

  /* ===== slides (image + text) ===== */
  const slides = [
    {
      img: 'https://ptsnsuniversity.ac.in/slides/10.jpg',
      title: 'Education is the best key to success in life',
      caption: 'We blend academic excellence with real-world experience — flexible programs, international partnerships, and a campus community that supports you.'
    },
    {
      img: 'https://ptsnsuniversity.ac.in/slides/3.jpg',
      title: 'Learn from Industry-experienced Faculty',
      caption: 'Hands-on labs, live projects, and mentor guidance to prepare you for the real world.'
    },
    {
      img: 'https://ptsnsuniversity.ac.in/slides/1.jpg',
      title: 'Flexible schedules for modern learners',
      caption: 'Day, evening and online options so you can learn on your terms.'
    },
    {
      img: 'https://ptsnsuniversity.ac.in/slides/8.jpg',
      title: 'Scholarships & Financial Aid',
      caption: 'Merit-based aid, installment plans, and student support services.'
    }
  ];

  let idx = 0;
  const slideIntervalMs = 4500;
  let slideTimer = null;

  function setHeroSlide(i){
    i = (i + slides.length) % slides.length;
    idx = i;
    const s = slides[i];
    // set CSS var and background-image (keeps overlay)
    heroEl.style.setProperty('--bg-url', `url('${s.img}')`);
    heroEl.style.backgroundImage = `linear-gradient(var(--hero-overlay), var(--hero-overlay)), url('${s.img}')`;
    // update text
    if(heroTitle) heroTitle.textContent = s.title;
    if(heroCaption) heroCaption.textContent = s.caption;
  }

  function startSlideshow(){
    stopSlideshow();
    slideTimer = setInterval(()=> {
      idx = (idx + 1) % slides.length;
      setHeroSlide(idx);
    }, slideIntervalMs);
  }
  function stopSlideshow(){ if(slideTimer){ clearInterval(slideTimer); slideTimer = null; } }

  // init
  setHeroSlide(0);
  startSlideshow();

  // Pause/resume on hover for readability (desktop)
  heroEl.addEventListener('mouseenter', stopSlideshow);
  heroEl.addEventListener('mouseleave', ()=> { if(!slideTimer) startSlideshow(); });

  // Prev / Next button handlers (restart autoplay after click)
  function showPrev(){
    stopSlideshow();
    idx = (idx - 1 + slides.length) % slides.length;
    setHeroSlide(idx);
    startSlideshow();
  }
  function showNext(){
    stopSlideshow();
    idx = (idx + 1) % slides.length;
    setHeroSlide(idx);
    startSlideshow();
  }

  if(prevBtn) prevBtn.addEventListener('click', showPrev);
  if(nextBtn) nextBtn.addEventListener('click', showNext);

  // Keyboard accessibility
  window.addEventListener('keydown', (e)=>{
    if(e.key === 'ArrowLeft') showPrev();
    if(e.key === 'ArrowRight') showNext();
  });

  /* ===== feature-card hover: show gradient + uplift (NO hero change) ===== */
  const cards = Array.from(document.querySelectorAll('.feature-card'));
  cards.forEach(card => {
    const grad = card.getAttribute('data-grad') || '';
    card.setAttribute('tabindex','0');

    card.addEventListener('mouseenter', () => {
      if(grad) card.style.background = grad;
      card.style.backgroundBlendMode = 'overlay';
      card.classList.add('hovered');
    });
    card.addEventListener('mouseleave', () => {
      card.style.background = 'transparent';
      card.classList.remove('hovered');
    });

    // keyboard support
    card.addEventListener('focus', () => {
      card.dispatchEvent(new Event('mouseenter'));
    });
    card.addEventListener('blur', () => {
      card.dispatchEvent(new Event('mouseleave'));
    });
  });

  window.__heroControls = { setHeroSlide, startSlideshow, stopSlideshow, showNext, showPrev };
})();
