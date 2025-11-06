/**
 * background.js - Service worker for JobScan Lite
 * Handles side panel functionality for persistent view
 */

// Listen for messages from popup to open side panel
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'openSidePanel') {
    console.log('Received openSidePanel request');
    
    // Check if sidePanel API is available
    if (!chrome.sidePanel) {
      console.error('Side panel API not available');
      sendResponse({ success: false, error: 'Side panel API not available' });
      return;
    }
    
    // Open side panel in current window (no tabs permission needed)
    chrome.sidePanel.open({ windowId: sender.tab.windowId })
      .then(() => {
        console.log('Side panel opened successfully');
        sendResponse({ success: true });
      })
      .catch((error) => {
        console.error('Failed to open side panel:', error);
        sendResponse({ success: false, error: error.message });
      });
    
    return true; // Keep message channel open for async response
  }
});

// Set up on installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('ResuMatch installed successfully!');
});

