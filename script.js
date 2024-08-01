function handleOrientation(event) {
    const alpha = event.alpha; // Rotace kolem z-osy
    const beta = event.beta;   // Rotace kolem x-osy
    const gamma = event.gamma; // Rotace kolem y-osy

    // Zobrazení hodnot na stránce
    document.getElementById('alpha').textContent = alpha.toFixed(2);
    document.getElementById('beta').textContent = beta.toFixed(2);
    document.getElementById('gamma').textContent = gamma.toFixed(2);
}

// Funkce pro požádání o oprávnění na iOS
function requestPermission() {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
        .then(permissionState => {
            if (permissionState === 'granted') {
                window.addEventListener('deviceorientation', handleOrientation);
            } else {
                alert('Oprávnění ke gyroskopickým senzorům nebylo uděleno.');
            }
        })
        .catch(console.error);
    } else {
        // Pokud není potřeba explicitní oprávnění, rovnou přidáme event listener
        window.addEventListener('deviceorientation', handleOrientation);
    }
}

// Zavoláme funkci pro požádání o oprávnění při načtení stránky
requestPermission();
