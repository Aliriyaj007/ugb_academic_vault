/* ═══════════════════════════════════════════════════════════════════════════════
   UGB ACADEMIC VAULT - JAVASCRIPT
   Interactive Features and Modal System
   ═══════════════════════════════════════════════════════════════════════════════ */

'use strict';

// ═══════════════════════════════════════════════════════════════════════════════
// DOM ELEMENTS
// ═══════════════════════════════════════════════════════════════════════════════

const splashScreen = document.getElementById('splashScreen');
const mainApp = document.getElementById('mainApp');
const menuBtn = document.getElementById('menuBtn');
const navDrawer = document.getElementById('navDrawer');
const drawerOverlay = document.getElementById('drawerOverlay');
const closeDrawer = document.getElementById('closeDrawer');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalClose = modal.querySelector('.modal-close');
const modalBackdrop = modal.querySelector('.modal-backdrop');
const sectionCards = document.querySelectorAll('.section-card');
const drawerItems = document.querySelectorAll('.drawer-item');
const themeToggle = document.getElementById('themeToggle');
const loadingIndicator = document.getElementById('loadingIndicator');

// ═══════════════════════════════════════════════════════════════════════════════
// SPLASH SCREEN LOGIC
// ═══════════════════════════════════════════════════════════════════════════════

function initializeSplashScreen() {
  // Check if user has already seen splash screen in this session
  const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');

  if (hasSeenSplash) {
    // Skip splash screen
    splashScreen.style.display = 'none';
    mainApp.classList.add('visible');
  } else {
    // Show splash screen for 2 seconds
    setTimeout(() => {
      splashScreen.classList.add('fade-out');
      setTimeout(() => {
        splashScreen.style.display = 'none';
        mainApp.classList.add('visible');
        sessionStorage.setItem('hasSeenSplash', 'true');
      }, 500); // Wait for fade-out animation
    }, 2000);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// NAVIGATION DRAWER
// ═══════════════════════════════════════════════════════════════════════════════

function openDrawer() {
  navDrawer.classList.add('open');
  drawerOverlay.classList.add('visible');
  document.body.style.overflow = 'hidden';
}

function closeDrawerFunc() {
  navDrawer.classList.remove('open');
  drawerOverlay.classList.remove('visible');
  document.body.style.overflow = '';
}

// Event Listeners
menuBtn.addEventListener('click', openDrawer);
closeDrawer.addEventListener('click', closeDrawerFunc);
drawerOverlay.addEventListener('click', closeDrawerFunc);

// ═══════════════════════════════════════════════════════════════════════════════
// MODAL SYSTEM
// ═══════════════════════════════════════════════════════════════════════════════

function openModal(title, content) {
  modalTitle.textContent = title;
  modalBody.innerHTML = content;
  modal.classList.add('visible');
  document.body.style.overflow = 'hidden';
}

function closeModalFunc() {
  modal.classList.remove('visible');
  document.body.style.overflow = '';
}

// Event Listeners
modalClose.addEventListener('click', closeModalFunc);
modalBackdrop.addEventListener('click', closeModalFunc);

// ESC key to close modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (modal.classList.contains('visible')) {
      closeModalFunc();
    }
    if (navDrawer.classList.contains('open')) {
      closeDrawerFunc();
    }
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// DARK MODE TOGGLE
// ═══════════════════════════════════════════════════════════════════════════════

function initializeDarkMode() {
  // Check if user has a saved preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Apply dark mode if saved or if system prefers dark and no preference saved
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.classList.add('dark-mode');
    updateThemeIcon();
  }
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');

  // Save preference
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');

  updateThemeIcon();
}

function updateThemeIcon() {
  const isDark = document.body.classList.contains('dark-mode');
  themeToggle.textContent = isDark ? 'light_mode' : 'dark_mode';
  themeToggle.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

// Event listener for theme toggle
themeToggle.addEventListener('click', toggleDarkMode);

// Keyboard support for theme toggle
themeToggle.setAttribute('tabindex', '0');
themeToggle.setAttribute('role', 'button');
themeToggle.setAttribute('aria-label', 'Toggle dark mode');

themeToggle.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleDarkMode();
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// LOADING INDICATOR
// ═══════════════════════════════════════════════════════════════════════════════

function showLoading() {
  loadingIndicator.classList.add('visible');
}

function hideLoading() {
  loadingIndicator.classList.remove('visible');
}

// ═══════════════════════════════════════════════════════════════════════════════
// MODAL CONTENT
// ═══════════════════════════════════════════════════════════════════════════════

const modalContents = {
  about: `
    <p>Welcome to <strong>UGB Academic Vault</strong>, your comprehensive academic resources portal for the University of Gourbanga.</p>
    
    <h3>What We Offer</h3>
    <p>This application provides centralized access to all your academic materials including:</p>
    <ul>
      <li>Course materials, notes, and syllabus</li>
      <li>Previous Year Questions (PYQs)</li>
      <li>Academic event photos and memories</li>
      <li>Study materials upload and sharing</li>
      <li>Student discussion groups</li>
    </ul>
    
    <h3>No Login Required</h3>
    <p>Access all materials completely free, without any registration or login requirements. We believe in keeping education accessible to everyone.</p>
    
    <h3>Google Drive Integration</h3>
    <p>All materials are securely hosted on Google Drive, ensuring reliable access and easy sharing.</p>
    
    <h3>Developed by Students, For Students</h3>
    <p>This app was created by <strong>aliriyaj007</strong> to help University of Gourbanga students access academic resources more easily.</p>
    
    <p style="margin-top: 24px; padding: 16px; background: rgba(25, 118, 210, 0.1); border-radius: 8px;">
      <strong>💡 Pro Tip:</strong> Download our Android app for an even better mobile experience!
    </p>
  `,

  privacy: `
    <p><strong>UGB Academic Vault</strong> is committed to protecting your privacy. This privacy policy explains our data handling practices.</p>
    
    <h3>No Data Collection</h3>
    <p>UGB Academic Vault does <strong>not</strong> collect, store, or process any personal user data. We respect your privacy completely.</p>
    
    <h3>No Login or Registration</h3>
    <p>The app does not require login, registration, or authentication of any kind. You can access all content anonymously.</p>
    
    <h3>No Tracking</h3>
    <p>We do not use:</p>
    <ul>
      <li>Analytics or tracking tools</li>
      <li>Cookies or local storage for tracking</li>
      <li>Third-party advertising systems</li>
      <li>User behavior monitoring</li>
    </ul>
    
    <h3>External Content</h3>
    <p>All content is accessed via external Google Drive links. Any interaction with Google Drive is governed by <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google's Privacy Policy</a>.</p>
    
    <h3>What Users Should Know</h3>
    <p>By using this app, you acknowledge that:</p>
    <ul>
      <li>Files are hosted externally on Google Drive</li>
      <li>Downloads and viewing are handled by Google Drive</li>
      <li>The app itself stores no personal information</li>
      <li>We have no access to your viewing or download history</li>
    </ul>
    
    <h3>Policy Updates</h3>
    <p>This privacy policy may be updated only if app functionality changes. We will always maintain our commitment to user privacy.</p>
    
    <p style="margin-top: 24px; padding: 16px; background: rgba(0, 137, 123, 0.1); border-radius: 8px;">
      <strong>🔒 Your Privacy Matters:</strong> We will never compromise your privacy or data security.
    </p>
  `,

  disclaimer: `
    <p><strong>Important Notice:</strong> Please read this disclaimer carefully before using UGB Academic Vault.</p>
    
    <h3>Not Officially Affiliated</h3>
    <p>This application is <strong>independently developed</strong> and is not officially affiliated with, endorsed by, or connected to the University of Gourbanga.</p>
    
    <h3>Third-Party Content</h3>
    <p>All academic materials, PDFs, and resources available through this app are:</p>
    <ul>
      <li>Hosted on third-party platforms (Google Drive)</li>
      <li>Provided for educational purposes only</li>
      <li>Subject to their respective copyright and usage policies</li>
    </ul>
    
    <h3>Developer Responsibilities</h3>
    <p>The developer does <strong>not</strong>:</p>
    <ul>
      <li>Own or create the academic content provided</li>
      <li>Guarantee the accuracy, completeness, or timeliness of any materials</li>
      <li>Assume liability for how users access or use the materials</li>
      <li>Provide official university information or announcements</li>
    </ul>
    
    <h3>User Responsibilities</h3>
    <p>By using this app, you agree to:</p>
    <ul>
      <li>Use materials responsibly and ethically</li>
      <li>Respect copyright and intellectual property laws</li>
      <li>Not redistribute materials without proper authorization</li>
      <li>Verify important information through official university channels</li>
    </ul>
    
    <h3>Official Information</h3>
    <p>For official university information, policies, and announcements, please visit the University of Gourbanga's official website.</p>
    
    <p style="margin-top: 24px; padding: 16px; background: rgba(106, 27, 154, 0.1); border-radius: 8px;">
      <strong>⚠️ Remember:</strong> Always use academic materials ethically and in accordance with applicable laws and regulations.
    </p>
  `,

  download: `
    <div class="download-section">
      <span class="material-icons">smartphone</span>
      <h3 style="margin-bottom: 16px;">Get the Mobile App</h3>
      <p>Experience UGB Academic Vault with a native Android app designed for better performance and user experience.</p>
      
      <a href="https://github.com/Aliriyaj007/ugb_academic_vault/releases/tag/v1.0.0" target="_blank" rel="noopener noreferrer" class="download-btn">
        <span class="material-icons">download</span>
        Download for Android
      </a>
      
      <p style="margin-top: 24px; font-size: 14px; color: #757575;">
        Available for Android devices
      </p>
      
      <h3 style="margin-top: 32px;">Why Download the App?</h3>
      <ul style="text-align: left; max-width: 400px; margin: 16px auto;">
        <li>Faster access to materials</li>
        <li>Better offline support</li>
        <li>Optimized mobile interface</li>
        <li>Push notifications for updates</li>
        <li>Enhanced security features</li>
      </ul>
      
      <p style="margin-top: 24px; padding: 16px; background: rgba(25, 118, 210, 0.1); border-radius: 8px;">
        <strong>💡 Note:</strong> The web app will continue to work perfectly in your browser. The mobile app is just an enhanced alternative!
      </p>
    </div>
  `
};

// ═══════════════════════════════════════════════════════════════════════════════
// DRAWER NAVIGATION
// ═══════════════════════════════════════════════════════════════════════════════

drawerItems.forEach(item => {
  item.addEventListener('click', () => {
    const action = item.getAttribute('data-action');

    closeDrawerFunc();

    if (action === 'home') {
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (modalContents[action]) {
      // Open respective modal
      setTimeout(() => {
        openModal(
          item.querySelector('span:last-child').textContent,
          modalContents[action]
        );
      }, 300); // Wait for drawer to close
    }
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION CARD INTERACTIONS
// ═══════════════════════════════════════════════════════════════════════════════

sectionCards.forEach(card => {
  card.addEventListener('click', () => {
    const url = card.getAttribute('data-url');
    if (url) {
      // Show loading indicator
      showLoading();

      // Open link in new tab
      window.open(url, '_blank', 'noopener,noreferrer');

      // Hide loading indicator after a short delay
      setTimeout(() => {
        hideLoading();
      }, 1000);
    }
  });

  // Make cards keyboard accessible
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'link');

  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const url = card.getAttribute('data-url');
      if (url) {
        showLoading();
        window.open(url, '_blank', 'noopener,noreferrer');
        setTimeout(() => {
          hideLoading();
        }, 1000);
      }
    }
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// ACCESSIBILITY ENHANCEMENTS
// ═══════════════════════════════════════════════════════════════════════════════

// Make drawer items keyboard accessible
drawerItems.forEach(item => {
  item.setAttribute('tabindex', '0');
  item.setAttribute('role', 'menuitem');

  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      item.click();
    }
  });
});

// Trap focus in modal when open
function trapFocusInModal(e) {
  if (!modal.classList.contains('visible')) return;

  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (e.key === 'Tab') {
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }
}

document.addEventListener('keydown', trapFocusInModal);

// ═══════════════════════════════════════════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════════════════════════════════════════

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
  initializeSplashScreen();
  initializeDarkMode();
});

// Prevent right-click context menu on section cards (optional, for app-like feel)
sectionCards.forEach(card => {
  card.addEventListener('contextmenu', (e) => {
    // Allow context menu for accessibility, but could be prevented for app-like feel
    // e.preventDefault();
  });
});

// Add smooth scroll behavior programmatically for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
  const scrollToTop = () => {
    const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, currentScroll - currentScroll / 8);
    }
  };

  // Override smooth scroll for home navigation
  const homeItem = document.querySelector('[data-action="home"]');
  if (homeItem) {
    homeItem.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToTop();
    });
  }
}

// Log app initialization (can be removed in production)
console.log('🎓 UGB Academic Vault initialized successfully!');
console.log('Made with ❤️ by aliriyaj007');
console.log('✨ Features: Dark Mode, Loading Indicators, Responsive Design');
console.log('🔗 Download App: https://github.com/Aliriyaj007/ugb_academic_vault/releases/tag/v1.0.0');
