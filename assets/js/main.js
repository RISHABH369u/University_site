// main.js - common initialization: AOS, slick, modal wiring, forms, lightbox, misc
document.addEventListener('DOMContentLoaded', function(){
  // Initialize AOS if available
  try{ if(window.AOS) AOS.init({duration:700,once:true,easing:'ease-out-cubic'}); }catch(e){}

  // Slick sliders (jQuery required)
  try{
    if(window.jQuery && jQuery().slick){
      $('.faculty-slider').slick({slidesToShow:3,slidesToScroll:1,dots:false,arrows:true,responsive:[{breakpoint:992,settings:{slidesToShow:2}},{breakpoint:576,settings:{slidesToShow:1}}]});
      $('.testimonial-slider').slick({slidesToShow:1,autoplay:true,autoplaySpeed:3800,dots:true});
      $('.event-slider').slick({slidesToShow:2,responsive:[{breakpoint:768,settings:{slidesToShow:1}}]});
    }
  }catch(e){ console.warn('Slick init error', e); }

  // Course modal population (Bootstrap-based)
  try{
    var courseModal = document.getElementById('courseModal');
    if(courseModal){
      courseModal.addEventListener('show.bs.modal', function (event) {
        var button = event.relatedTarget; var course = button && button.getAttribute ? button.getAttribute('data-course') : null;
        if(course) {
          var titleEl = document.getElementById('courseTitle');
          if(titleEl) titleEl.textContent = course;
          var sylEl = document.getElementById('courseSyllabus');
          if(sylEl) sylEl.textContent = 'Syllabus for ' + course + ' — replace with real content.';
        }
      });
    }
  }catch(e){}

  // Event modal population (Bootstrap-based)
  try{
    var eventModal = document.getElementById('eventModal');
    if(eventModal){
      eventModal.addEventListener('show.bs.modal', function (event) {
        var button = event.relatedTarget; var ev = button && button.getAttribute ? button.getAttribute('data-event') : null;
        if(ev){
          var et = document.getElementById('eventTitle');
          var ed = document.getElementById('eventDesc');
          if(et) et.textContent = ev;
          if(ed) ed.textContent = 'Details and schedule for ' + ev + '.';
        }
      });
    }
  }catch(e){}

  // Faculty modal population
  try{
    var facModal = document.getElementById('facultyModal');
    if(facModal){
      facModal.addEventListener('show.bs.modal', function (event) {
        var button = event.relatedTarget; var name = button && button.getAttribute ? button.getAttribute('data-faculty') : null;
        if(name){
          var fn = document.getElementById('facultyName');
          var fb = document.getElementById('facultyBio');
          if(fn) fn.textContent = name;
          if(fb) fb.textContent = 'Biography and publications for ' + name + '.';
        }
      });
    }
  }catch(e){}

  // Image Lightbox
  try{
    var imgLb = document.getElementById('imgLightbox');
    if(imgLb){
      imgLb.addEventListener('show.bs.modal', function(event){
        var img = event.relatedTarget; var src = img && img.getAttribute ? img.getAttribute('data-src') : null; 
        var light = document.getElementById('lightboxImg');
        if(light && src) light.src = src;
      });
    }
  }catch(e){}

  // Blog post modal population (uses data attributes filled by read-more links)
  try{
    var postModal = document.getElementById('postModal');
    if(postModal){
      postModal.addEventListener('show.bs.modal', function(event){
        var btn = event.relatedTarget; 
        if(btn){
          var title = btn.getAttribute('data-title') || 'Sample Post Title';
          var content = btn.getAttribute('data-content') || '<p>Long content for the post — replace with actual content.</p>';
          var titleEl = document.getElementById('postTitle');
          var contentEl = document.getElementById('postContent');
          if(titleEl) titleEl.textContent = title;
          if(contentEl) contentEl.innerHTML = content;
        }
      });
    }
  }catch(e){}

  // Contact form demo handler
  try{
    var cf = document.getElementById('contactForm');
    if(cf){
      cf.addEventListener('submit', function(e){ e.preventDefault(); var msg = document.getElementById('cfMessage'); if(msg) msg.innerHTML = '<span class="text-success">Thanks — your message was received (demo).</span>'; this.reset(); });
    }
    var af = document.getElementById('applyForm');
    if(af){
      af.addEventListener('submit', function(e){ e.preventDefault(); alert('Application submitted (demo).'); this.reset(); });
    }
  }catch(e){}
});
