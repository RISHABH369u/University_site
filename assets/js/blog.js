// blog.js - read-more links populate modal
document.querySelectorAll('.read-more').forEach(btn=>{
  btn.addEventListener('click', function(e){
    e.preventDefault();
    const title = this.dataset.title || '';
    const date = this.dataset.date || '';
    const author = this.dataset.author || '';
    const image = this.dataset.image || '';
    const content = this.dataset.content || '';

    const titleEl = document.getElementById('postTitle');
    const dateEl = document.getElementById('postDate');
    const contentEl = document.getElementById('postContent');
    const imgEl = document.getElementById('postImage'); // optional

    if(titleEl) titleEl.textContent = title;
    if(dateEl) dateEl.textContent = date + ' • ' + author;
    if(contentEl) contentEl.innerHTML = content;
    if(imgEl && image) imgEl.src = image;

    try{
      const bsModal = new bootstrap.Modal(document.getElementById('postModal'));
      bsModal.show();
    }catch(err){
      const modal = document.getElementById('postModal');
      if(modal) modal.style.display = 'block';
    }
  });
});
