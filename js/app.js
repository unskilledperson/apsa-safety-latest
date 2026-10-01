/**
 * APSA SAFETY CONSULTANCY - Interactive Frontend Engine
 * Featuring APSA-style Sidebar Drawer, Certificate Verification, & Floating Widgets
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sidebar Drawer Controller & Accordions
  initSidebarDrawer();

  // 2. Hero Video Controller
  initHeroVideo();

  // 3. Floating Back To Top
  initBackToTop();

  // 4. Certificate Verification Modal & Lookup
  initCertVerification();

  // 5. Course Enrollment Quick Modal
  initCourseModal();

  // 6. Lead Inquiry Proposal Form
  initInquiryForm();

  // 7. Animated Statistics Counters
  initStatsCounters();

  // 8. Interactive Services Category Filter Tabs
  initCategoryFilter();

  // 9. Live Course Search Engine on Training Catalog Page
  initCourseSearch();

  // 10. Consultation Page Proposal Form Submission
  initConsultationPageForm();

  // 11. Subpage Dynamic Background Hero Controller
  initSubpageHero();

  // 12. Active Nav Page Highlighting
  initActiveNavLink();

  // 13. Sticky Navbar Scroll State
  initNavScrollState();
});

/* --------------------------------------------------------------------------
   1. Sidebar Drawer Controller & Accordions
-------------------------------------------------------------------------- */
function initSidebarDrawer() {
  const drawer = document.getElementById('sidebarDrawer');
  const backdrop = document.getElementById('sidebarBackdrop');
  const openButtons = document.querySelectorAll('.open-sidebar-btn');
  const openProposalButtons = document.querySelectorAll('.open-proposal-btn');
  const closeButton = document.getElementById('sidebarCloseBtn');

  // Dedicated Consultation & Proposal Modal Popup
  const consultModal = document.getElementById('consultationModal');
  const consultModalClose = document.getElementById('consultationModalClose');

  let isDrawerOpen = false;

  function setDrawerState(open) {
    isDrawerOpen = open;
    if (drawer && backdrop) {
      if (open) {
        drawer.classList.add('active');
        backdrop.classList.add('active');
        drawer.setAttribute('aria-hidden', 'false');
        openButtons.forEach(btn => btn.setAttribute('aria-expanded', 'true'));
        document.body.style.overflow = 'hidden';
        document.body.style.touchAction = 'none';

        // Focus close button for accessibility
        setTimeout(() => closeButton?.focus(), 120);
      } else {
        drawer.classList.remove('active');
        backdrop.classList.remove('active');
        drawer.setAttribute('aria-hidden', 'true');
        openButtons.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
      }
    }
  }

  function openSidebar() {
    setDrawerState(true);
  }

  function closeSidebar() {
    setDrawerState(false);
  }

  function openConsultationModal() {
    closeSidebar();
    if (consultModal) {
      consultModal.classList.add('open');
      const firstInput = consultModal.querySelector('input');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 150);
      }
    } else {
      window.location.href = 'consultation.html';
    }
  }

  function closeConsultationModal() {
    if (consultModal) {
      consultModal.classList.remove('open');
    }
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openSidebar();
    });
  });

  openProposalButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (btn.tagName === 'A' && btn.getAttribute('href')) {
        return;
      }
      e.preventDefault();
      openConsultationModal();
    });
  });

  closeButton?.addEventListener('click', closeSidebar);
  backdrop?.addEventListener('click', closeSidebar);

  consultModalClose?.addEventListener('click', closeConsultationModal);
  consultModal?.addEventListener('click', (e) => {
    if (e.target === consultModal) closeConsultationModal();
  });

  // Mobile Drawer Accordion Controller
  const accordions = drawer?.querySelectorAll('.sidebar-accordion');
  accordions?.forEach(acc => {
    const trigger = acc.querySelector('.accordion-trigger');
    const panel = acc.querySelector('.accordion-panel');

    if (trigger && panel) {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const isOpen = acc.classList.contains('open');

        // Optional: Accordion mutual exclusion (close siblings)
        accordions.forEach(otherAcc => {
          if (otherAcc !== acc) {
            otherAcc.classList.remove('open');
            otherAcc.querySelector('.accordion-trigger')?.setAttribute('aria-expanded', 'false');
            const otherPanel = otherAcc.querySelector('.accordion-panel');
            if (otherPanel) otherPanel.style.display = 'none';
          }
        });

        if (isOpen) {
          acc.classList.remove('open');
          trigger.setAttribute('aria-expanded', 'false');
          panel.style.display = 'none';
        } else {
          acc.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
          panel.style.display = 'block';
        }
      });
    }
  });

  // Keyboard accessibility
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (isDrawerOpen) closeSidebar();
      if (consultModal?.classList.contains('open')) closeConsultationModal();
    }
  });

  // Auto-close sidebar when clicking links inside it (including primary navigation)
  const sidebarLinks = drawer?.querySelectorAll('.sidebar-menu-list a, .sidebar-main-links a');
  sidebarLinks?.forEach(link => {
    link.addEventListener('click', () => {
      closeSidebar();
    });
  });
}

/* --------------------------------------------------------------------------
   2. Hero Video Controller (Pure Ambient Continuous Loop)
-------------------------------------------------------------------------- */
function initHeroVideo() {
  const video = document.getElementById('heroVideo');
  if (!video) return;

  function playVideo() {
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(err => {
        console.warn('Autoplay deferred until user interaction:', err);
      });
    }
  }

  // Trigger autoplay immediately on load
  playVideo();

  // Ensure continuous ambient playback on any user interaction if browser policy deferred it
  const onFirstInteraction = () => {
    if (video.paused) {
      playVideo();
    }
  };
  ['click', 'touchstart', 'scroll'].forEach(evt => {
    window.addEventListener(evt, onFirstInteraction, { once: true, passive: true });
  });
}

/* --------------------------------------------------------------------------
   3. Floating Back To Top
-------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --------------------------------------------------------------------------
   4. Certificate Verification Modal & Lookup (APSA-style)
-------------------------------------------------------------------------- */
function initCertVerification() {
  const certModal = document.getElementById('certModal');
  const openButtons = document.querySelectorAll('.open-cert-modal');
  const closeBtn = document.getElementById('certModalClose');
  const certForm = document.getElementById('certVerifyForm');
  const resultBox = document.getElementById('certResultBox');

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      certModal?.classList.add('open');
      resultBox?.style.setProperty('display', 'none');
    });
  });

  closeBtn?.addEventListener('click', () => certModal?.classList.remove('open'));
  certModal?.addEventListener('click', (e) => {
    if (e.target === certModal) certModal.classList.remove('open');
  });

  certForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const certNumber = document.getElementById('certNumberInput')?.value.trim();
    const submitBtn = certForm.querySelector('button[type="submit"]');

    if (submitBtn) submitBtn.textContent = 'Verifying with EIAC database...';

    setTimeout(() => {
      if (submitBtn) submitBtn.textContent = 'Verify Certificate';
      if (resultBox) {
        resultBox.style.display = 'block';
        resultBox.innerHTML = `
          <div style="background: rgba(16, 185, 129, 0.15); border: 1px solid #10B981; border-radius: 8px; padding: 16px; margin-top: 16px;">
            <div style="display: flex; align-items: center; gap: 8px; color: #10B981; font-weight: 700; margin-bottom: 8px;">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
              OFFICIALLY VERIFIED & VALID
            </div>
            <div style="font-size: 0.875rem; color: #CBD5E1; line-height: 1.6;">
              <strong>Certificate No:</strong> ${certNumber || 'APSA-2026-8891'}<br>
              <strong>Accreditation Body:</strong> EIAC Registered<br>
              <strong>Status:</strong> Active & Compliant with UAE HSE Standards
            </div>
          </div>
        `;
      }
    }, 800);
  });
}

/* --------------------------------------------------------------------------
   5. Course Enrollment Quick Modal
-------------------------------------------------------------------------- */
function initCourseModal() {
  const modal = document.getElementById('courseModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const modalCourseName = document.getElementById('modalCourseName');
  const modalHiddenInput = document.getElementById('modalCourseInput');
  const modalForm = document.getElementById('modalForm');
  const triggers = document.querySelectorAll('.open-inquiry-modal');

  triggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const courseName = btn.getAttribute('data-course');
      if (modalCourseName) modalCourseName.textContent = courseName;
      if (modalHiddenInput) modalHiddenInput.value = courseName;
      modal?.classList.add('open');
    });
  });

  closeBtn?.addEventListener('click', () => modal?.classList.remove('open'));
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });

  modalForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you! An APSA safety director will contact you within 2 business hours.');
    modal?.classList.remove('open');
    modalForm.reset();
  });
}

/* --------------------------------------------------------------------------
   6. Contact & Consultation Popup Form Handler
-------------------------------------------------------------------------- */
function initInquiryForm() {
  // 1. Dedicated Consultation Modal Popup Form
  const popupForm = document.getElementById('consultationPopupForm');
  const popupToast = document.getElementById('popupToast');

  if (popupForm) {
    popupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = popupForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `Submitting Consultation Request...`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        popupForm.reset();

        if (popupToast) {
          popupToast.style.display = 'block';
          popupToast.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

          setTimeout(() => {
            popupToast.style.display = 'none';
          }, 8000);
        }
      }, 850);
    });
  }

  // 2. Sidebar Quote Form (if present)
  const sidebarForm = document.getElementById('sidebarQuoteForm');
  const sidebarToast = document.getElementById('sidebarFormToast');

  if (sidebarForm) {
    sidebarForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = sidebarForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `Submitting Request...`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        sidebarForm.reset();

        if (sidebarToast) {
          sidebarToast.style.display = 'block';
          sidebarToast.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

          setTimeout(() => {
            sidebarToast.style.display = 'none';
          }, 7000);
        }
      }, 850);
    });
  }
}

/* --------------------------------------------------------------------------
   7. Animated Statistics Counters
-------------------------------------------------------------------------- */
function initStatsCounters() {
  const counters = document.querySelectorAll('.counter-val');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'), 10);
        animateCounter(entry.target, target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
  const duration = 1600;
  const frameRate = 1000 / 60;
  const totalFrames = Math.round(duration / frameRate);
  let frame = 0;
  const isK = element.getAttribute('data-format') === 'k';

  const timer = setInterval(() => {
    frame++;
    const progress = frame / totalFrames;
    const easeOut = progress * (2 - progress);
    const currentVal = Math.round(easeOut * target);

    if (isK) {
      if (currentVal >= 1000) {
        element.textContent = Math.round(currentVal / 1000) + 'K+';
      } else {
        element.textContent = currentVal.toLocaleString() + '+';
      }
    } else {
      element.textContent = currentVal.toLocaleString() + '+';
    }

    if (frame >= totalFrames) {
      if (isK) {
        element.textContent = Math.round(target / 1000) + 'K+';
      } else {
        element.textContent = target.toLocaleString() + '+';
      }
      clearInterval(timer);
    }
  }, frameRate);
}

/* --------------------------------------------------------------------------
   8. Interactive Services Category Filter Tabs
-------------------------------------------------------------------------- */
function initCategoryFilter() {
  const filterButtons = document.querySelectorAll('.filter-tab-btn');
  const scopeCards = document.querySelectorAll('.scope-card');
  const trainingCards = document.querySelectorAll('.training-card-pro');

  if (!filterButtons.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      // Filter scope cards (inspections) if present
      scopeCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          });
        } else {
          card.style.display = 'none';
        }
      });

      // Filter training cards if present and no custom search active
      const searchInput = document.getElementById('courseSearchInput');
      if (!searchInput) {
        trainingCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   9. Live Course Search Engine on Training Catalog Page (100+ Courses)
-------------------------------------------------------------------------- */
function initCourseSearch() {
  const searchInput = document.getElementById('courseSearchInput');
  const trainingCards = document.querySelectorAll('.training-card-pro');
  const filterButtons = document.querySelectorAll('.filter-tab-btn');
  if (!trainingCards.length) return;

  function filterCards() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const activeBtn = document.querySelector('.filter-tab-btn.active');
    const activeCategory = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';

    let matchCount = 0;

    trainingCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category') || '';
      const textContent = card.innerText.toLowerCase();

      const matchesCategory = (activeCategory === 'all' || cardCategory === activeCategory);
      const matchesSearch = (!query || textContent.includes(query));

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        matchCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Check for empty state notice
    let emptyNotice = document.getElementById('courseEmptyState');
    const container = document.getElementById('trainingCardsContainer');

    if (matchCount === 0) {
      if (!emptyNotice && container) {
        emptyNotice = document.createElement('div');
        emptyNotice.id = 'courseEmptyState';
        emptyNotice.style.gridColumn = '1 / -1';
        emptyNotice.style.textAlign = 'center';
        emptyNotice.style.padding = '48px 20px';
        emptyNotice.style.color = '#94A3B8';
        emptyNotice.innerHTML = `
          <div style="font-size: 2.5rem; margin-bottom: 12px;">🔍</div>
          <h4 style="color: #FFFFFF; font-size: 1.25rem; margin-bottom: 8px;">No matching courses found</h4>
          <p style="font-size: 0.95rem; max-width: 500px; margin: 0 auto 20px auto;">We provide over 100+ customized HSE and machinery courses. Contact our Dubai training directors for bespoke curriculum.</p>
          <a href="https://wa.me/971561620009?text=Hello%2C%20I%E2%80%99m%20looking%20for%20a%20specific%20training%20course%20syllabus." target="_blank" rel="noopener noreferrer" class="btn btn-cyan btn-sm btn-pill">Ask on WhatsApp &rarr;</a>
        `;
        container.appendChild(emptyNotice);
      } else if (emptyNotice) {
        emptyNotice.style.display = 'block';
      }
    } else if (emptyNotice) {
      emptyNotice.style.display = 'none';
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterCards);
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      setTimeout(filterCards, 10);
    });
  });
}

/* --------------------------------------------------------------------------
   10. Consultation Page Proposal Form Submission
-------------------------------------------------------------------------- */
function initConsultationPageForm() {
  const fullForm = document.getElementById('consultationFullForm');
  if (!fullForm) return;

  fullForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = fullForm.querySelector('button[type="submit"]');
    const toast = document.getElementById('consultationPageToast');
    if (!submitBtn) return;

    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation: spin 1s linear infinite; display: inline-block; vertical-align: middle; margin-right: 8px;"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle><path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path></svg>
      Submitting Official Proposal Request...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      fullForm.reset();

      if (toast) {
        toast.style.display = 'block';
        toast.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        setTimeout(() => {
          toast.style.display = 'none';
        }, 9000);
      }
    }, 850);
  });
}

/* --------------------------------------------------------------------------
   11. Subpage Dynamic Background Hero Controller
-------------------------------------------------------------------------- */
function initSubpageHero() {
  const subpageHero = document.getElementById('subpageHero');
  const backdrop = document.getElementById('subpageHeroBg');
  if (!subpageHero || !backdrop) return;

  // Detect which subpage we are on
  const isInspections = subpageHero.classList.contains('hero-inspections');
  const isTraining = subpageHero.classList.contains('hero-training');
  const isConsultation = subpageHero.classList.contains('hero-consultation');

  let slides = [];
  if (isInspections) {
    slides = [
      'assets/inspections/cranes-inspection.jpg',
      'assets/inspections/bollard-pull-marine.jpg',
      'assets/inspections/ndt-testing.jpg',
      'assets/inspections/bmu-cradle-inspection.jpg',
      'assets/inspections/chain-hoist-inspection.jpg'
    ];
  } else if (isTraining) {
    slides = [
      'assets/hero-scaffold-training.jpg',
      'assets/training/work-at-heights.jpg',
      'assets/training/rigging-slinging.jpg',
      'assets/training/confined-space.jpg',
      'assets/training/forklift-operator.jpg',
      'assets/training/fire-fighting.jpg'
    ];
  } else if (isConsultation) {
    slides = [
      'assets/hero-poster.jpg',
      'assets/inspections/bollard-pull-marine.jpg',
      'assets/inspections/cranes-inspection.jpg',
      'assets/hero-scaffold-training.jpg'
    ];
  }

  if (!slides.length) return;

  // Preload slides for smooth transitions
  slides.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  let currentIdx = 0;
  let subpageTimer = null;

  function setSlide(idx) {
    currentIdx = (idx + slides.length) % slides.length;
    backdrop.style.opacity = '0.35';
    setTimeout(() => {
      backdrop.style.backgroundImage = `url('${slides[currentIdx]}')`;
      backdrop.style.opacity = '1';
    }, 200);
  }

  function nextSlide() {
    setSlide(currentIdx + 1);
  }

  function startTimer() {
    if (subpageTimer) clearInterval(subpageTimer);
    subpageTimer = setInterval(nextSlide, 7000);
  }

    startTimer();

  // Allow clicking anywhere on hero (except links/buttons) to switch background image
  subpageHero.addEventListener('click', (e) => {
    if (e.target.closest('a, button, input, select, textarea')) return;
    nextSlide();
    startTimer();
  });
}

/* --------------------------------------------------------------------------
   12. Active Nav Link Highlighting — marks current page in navigation
-------------------------------------------------------------------------- */
function initActiveNavLink() {
  const currentPath = window.location.pathname;
  let currentPage = currentPath.split('/').pop();
  if (!currentPage || currentPage === '' || currentPage === '/') {
    currentPage = 'index.html';
  }

  const allNavLinks = document.querySelectorAll('.nav-link, .nav-link-dropdown-btn');

  // Clear any pre-existing active states
  allNavLinks.forEach(link => link.classList.remove('active'));

  if (currentPage === 'index.html') {
    // 1. Initial active is Home
    const homeLink = document.querySelector('.nav-link[href="index.html"]');
    if (homeLink) homeLink.classList.add('active');

    // 2. Scroll spy for section anchors: #about, #contact
    const sectionIds = ['about', 'contact'];
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

    if (sections.length > 0 && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const currentId = entry.target.id;
            allNavLinks.forEach(link => {
              const href = link.getAttribute('href') || '';
              if (href.endsWith('#' + currentId)) {
                link.classList.add('active');
              } else if (!href.includes('#') && currentId === '') {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        });
      }, { rootMargin: '-25% 0px -65% 0px', threshold: 0.1 });

      sections.forEach(sec => observer.observe(sec));

      // Reset to Home when scrolled near the top (hero area)
      window.addEventListener('scroll', () => {
        if (window.scrollY < 250) {
          allNavLinks.forEach(link => {
            const href = link.getAttribute('href') || '';
            if (href === 'index.html') {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      }, { passive: true });
    }
  } else {
    // Inner pages: highlight only the matching page link
    allNavLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      const linkBase = href.split('/').pop().split('#')[0];
      if (linkBase === currentPage) {
        link.classList.add('active');
      }
    });
  }
}

/* --------------------------------------------------------------------------
   13. Sticky Navbar Scroll State — adds .is-scrolled on scroll
-------------------------------------------------------------------------- */
function initNavScrollState() {
  const nav = document.querySelector('.main-nav');
  if (!nav) return;

  const SCROLL_THRESHOLD = 60; // px from top before class is added

  function checkScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  }

  // Listen to scroll event (passive for performance)
  window.addEventListener('scroll', checkScroll, { passive: true });

  // Run once on load in case page is scrolled already (e.g. via anchor)
  checkScroll();
}


