const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent Chrome 76 and later from showing the mini-infobar
    event.preventDefault();
    // Stash the event so it can be triggered later.
    window.deferredPrompt = event;
    // Update UI notify the user they can install the PWA
    butInstall.removeAttribute('hidden');
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // Show the install prompt
    window.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await window.deferredPrompt.userChoice;
    // Notify the user of the outcome
    if (outcome === 'accepted') {
        console.log('PWA was installed');
    } else {
        console.log('PWA was not installed');
    }
    // Reset the deferredPrompt variable, since it can only be used once
    window.deferredPrompt = null;
    // Hide the install button
    butInstall.setAttribute('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('App was installed', event);
});
