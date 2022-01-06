(function() {
  const sections = Array.from(document.querySelectorAll('section'));
  const mainNav = document.querySelector('#main-nav');
  const navLinks = Array.from(mainNav.querySelectorAll('a'));

  function setActiveNavLink(navLink) {
    const { hash } = navLink;
    navLinks.forEach(navLink => navLink.classList.remove('active'));
    navLink.classList.add('active');
  }

  function handleMainNavClick(event) {
    const { target } = event;
    if (target.nodeName !== 'A') return false;

    setActiveNavLink(target);
    return false;
  }
  mainNav.addEventListener('onclick', handleMainNavClick);

  function handleScroll() {
    sections.forEach(function(section) {
      section.classList.remove('previous', 'current', 'next');
      const top = section.offsetTop - 200;
      const bottom = section.offsetTop + section.offsetHeight;

      if (scrollY > bottom) {                
        section.classList.add('previous');
      } else {        
        if (scrollY > top) {
          section.classList.add('current');
          const selector = `a[href="#${section.id}"]`;
          const navLink = mainNav.querySelector(selector);
          setActiveNavLink(navLink);
        } else {
          section.classList.add('next');
        }
      }

    });
  }
  addEventListener('scroll', handleScroll);
  handleScroll();

  const linkResumeNode = document.getElementById('link-resume');
  const qrCodeNode = document.getElementById('qr-code');
  const text = linkResumeNode.href.replace(/\/[^/]*$/, '');
  const qrCode = new QRCode(qrCodeNode, {
    text: text,
    correctLevel : QRCode.CorrectLevel.L
  });
  requestAnimationFrame(function() {
    qrCodeNode.parentNode.innerHTML += '<a href="'+ text + '">' + text + '</a>';
  });
  //qrCodeNode.innerHTML += target;
})();
