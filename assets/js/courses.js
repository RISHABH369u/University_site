(function(){
  // setup images from data-image attributes (keeps markup clean)
  document.querySelectorAll('.course-card').forEach(card=>{
    const url = card.dataset.image || '';
    const media = card.querySelector('.card-media');
    if(url && media) media.style.backgroundImage = `url('${url}')`;
  });

  // Filtering
  const filterCategory = document.getElementById('filterCategory');
  const filterLevel = document.getElementById('filterLevel');
  const grid = document.getElementById('coursesGrid');

  function applyFilters(){
    if(!grid) return;
    const cat = filterCategory ? filterCategory.value : 'all';
    const lvl = filterLevel ? filterLevel.value : 'all';
    const cards = Array.from(grid.querySelectorAll('.course-card'));
    cards.forEach(c=>{
      const matchCat = (cat === 'all') || (c.dataset.category === cat);
      const matchLvl = (lvl === 'all') || (c.dataset.level === lvl);
      if(matchCat && matchLvl){
        c.style.display = '';
        // animate reveal if not already shown
        requestAnimationFrame(()=> c.classList.add('reveal'));
      } else {
        c.style.display = 'none';
      }
    });
  }
  if(filterCategory) filterCategory.addEventListener('change', applyFilters);
  if(filterLevel) filterLevel.addEventListener('change', applyFilters);

  // view toggle
  const gridViewBtn = document.getElementById('gridView');
  const compactViewBtn = document.getElementById('compactView');

  function setViewCompact(isCompact){
    const cards = grid ? Array.from(grid.querySelectorAll('.course-card')) : [];
    if(isCompact && grid){
      grid.classList.add('compact');
      cards.forEach(c=> c.classList.add('compact'));
      if(gridViewBtn){ gridViewBtn.classList.remove('active'); gridViewBtn.setAttribute('aria-pressed','false'); }
      if(compactViewBtn){ compactViewBtn.classList.add('active'); compactViewBtn.setAttribute('aria-pressed','true'); }
    } else if(grid){
      grid.classList.remove('compact');
      cards.forEach(c=> c.classList.remove('compact'));
      if(gridViewBtn){ gridViewBtn.classList.add('active'); gridViewBtn.setAttribute('aria-pressed','true'); }
      if(compactViewBtn){ compactViewBtn.classList.remove('active'); compactViewBtn.setAttribute('aria-pressed','false'); }
    }
  }
  if(gridViewBtn) gridViewBtn.addEventListener('click', ()=> setViewCompact(false));
  if(compactViewBtn) compactViewBtn.addEventListener('click', ()=> setViewCompact(true));

  // initial apply + reveal on scroll (intersection)
  applyFilters();
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(ent=>{
        if(ent.isIntersecting){
          ent.target.classList.add('reveal');
          io.unobserve(ent.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.course-card').forEach(el=> io.observe(el));
  }

  // Modal behavior: open with card data
  const modal = document.getElementById('courseModal');
  const modalTitle = document.getElementById('modalTitle') || document.getElementById('courseTitle');
  const modalMeta = document.getElementById('modalMeta') || document.getElementById('courseSyllabus');
  const modalDesc = document.getElementById('modalDesc') || document.getElementById('courseSyllabus');
  const modalImage = modal ? modal.querySelector('.modal-image') : null;
  const modalMore = document.getElementById('modalMore');

  function openModalFromCard(card){
    if(!card || !modal) return;
    const title = card.dataset.title || card.querySelector('.card-title')?.innerText;
    const dur = card.dataset.duration || '';
    const fees = card.dataset.fees || '';
    const desc = card.dataset.desc || '';
    const img = card.dataset.image || '';

    if(modalTitle) modalTitle.textContent = title;
    if(modalMeta) modalMeta.textContent = `${dur} • ${fees}`;
    if(modalDesc) modalDesc.textContent = desc;
    if(modalImage) modalImage.style.backgroundImage = img ? `url('${img}')` : 'none';
    modal.setAttribute('aria-hidden','false');
    // focus management
    const closeBtn = modal.querySelector('.modal-close');
    if(closeBtn) closeBtn.focus();
  }

  // attach handlers
  document.querySelectorAll('.view-detail').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const card = e.target.closest('.course-card');
      openModalFromCard(card);
    });
  });
  // allow keyboard open by pressing Enter on a card
  document.querySelectorAll('.course-card').forEach(card=>{
    card.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        openModalFromCard(card);
      }
    });
  });

  // close modal
  if(modal){
    const modalClose = modal.querySelector('.modal-close');
    if(modalClose) modalClose.addEventListener('click', ()=> modal.setAttribute('aria-hidden','true'));
    modal.addEventListener('click', (e)=> { if(e.target === modal) modal.setAttribute('aria-hidden','true'); });
    window.addEventListener('keydown', (e)=> { if(e.key === 'Escape') modal.setAttribute('aria-hidden','true'); });

    // accessible focus trap (basic)
    modal.addEventListener('keydown', (e)=>{
      if(e.key === 'Tab' && modal.getAttribute('aria-hidden') === 'false'){
        const focusables = modal.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
        if(focusables.length === 0) return;
        const first = focusables[0], last = focusables[focusables.length - 1];
        if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
        else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
      }
    });
  }

})();
