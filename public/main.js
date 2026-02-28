'use strict';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
};

async function injectAnalytics() {
  await import("/_vercel/insights/script.js");
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
}

if (!navigator.globalPrivacyControl) {
  injectAnalytics()
}
