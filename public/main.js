'use strict';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .catch((error) => console.error('Service worker registration failed.', error));
};

// Queues calls until the analytics script takes over, so va() never throws
window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };

if (!navigator.globalPrivacyControl) {
  // Content blockers and local development make this fail, which is fine
  import("/_vercel/insights/script.js").catch(() => {});
}
