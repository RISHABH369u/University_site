// forms.js - lightbox helper and miscellaneous small scripts
// toggles dot active state (testimonial dots)
document.querySelectorAll('.dots .dot').forEach((btn, idx) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.dots .dot').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    // if you later wire a slider, switch slide here (idx = 0..2)
  });
});
