// Update copyright year
document.getElementById('y').textContent = new Date().getFullYear();

// Vision stack controller: swap which card is active as you scroll through steps
(function () {
  var section = document.querySelector('.staggered');
  var stacked = document.querySelector('.staggered .stacked');
  var steps = Array.prototype.slice.call(document.querySelectorAll('.staggered .steps .step'));
  var cards = Array.prototype.slice.call(document.querySelectorAll('.staggered .stacked .vision-card'));
  if (!section || !stacked || !steps.length || !cards.length) return;

  function setState(idx) {
    stacked.classList.remove('show-stack');
    cards.forEach(function (c, i) {
      c.classList.remove('active','prev','next');
      if (i === idx) c.classList.add('active');
      if (i === idx - 1) c.classList.add('prev');
      if (i === idx + 1) c.classList.add('next');
    });
    // Update progress UI
    var dots = Array.prototype.slice.call(document.querySelectorAll('.staggered .progress .dot'));
    var current = document.querySelector('.staggered .progress .current');
    dots.forEach(function(d,i){ d.classList.toggle('active', i === idx); });
    if (current) current.textContent = String(idx + 1);
    // If we've passed the last step, show final stacked view
    if (idx >= steps.length - 1) {
      var endRect = steps[steps.length - 1].getBoundingClientRect();
      if (endRect.top < window.innerHeight * 0.25) {
        stacked.classList.add('show-stack');
      }
    }
  }

  setState(0);
  window.addEventListener('scroll', function () {
    for (var i = 0; i < steps.length; i++) {
      var rect = steps[i].getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
        setState(i);
        break;
      }
    }
  }, { passive: true });

  // Clickable dots to jump between cards (accessible buttons)
  var dots = Array.prototype.slice.call(document.querySelectorAll('.staggered .progress .dot'));
  dots.forEach(function(dot){
    dot.setAttribute('role','button');
    dot.setAttribute('tabindex','0');
    dot.setAttribute('aria-label','Go to card ' + (parseInt(dot.getAttribute('data-index'),10)+1));
    function go(){
      var idx = parseInt(dot.getAttribute('data-index'), 10) || 0;
      var target = steps[idx];
      if (!target) return;
      var y = window.scrollY + target.getBoundingClientRect().top - window.innerHeight * 0.5 + target.offsetHeight * 0.5;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setState(idx);
    }
    dot.addEventListener('click', go);
    dot.addEventListener('keydown', function(e){ if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
  });
})();

// Form UX
(function(){
  var form = document.getElementById('beta-form') || document.querySelector('form.beta-form');
  if (!form) return;
  var status = document.getElementById('beta-status');
  function setStatus(msg, ok){ if (status) { status.textContent = msg; status.style.color = ok? '#2dd4ff' : '#ff36a3'; } }
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var name = form.querySelector('#full-name');
    var email = form.querySelector('#email');
    var phone = form.querySelector('#phone');
    var reason = form.querySelector('#reason');
    if (!name.value.trim() || !email.validity.valid || !phone.validity.valid || !reason.value.trim()) {
      setStatus('Please complete all required fields correctly.', false);
      return;
    }
    setStatus('Submitting...', true);
    setTimeout(function(){ setStatus('Thanks! We will reach out soon.', true); form.reset(); }, 800);
  });
})();


