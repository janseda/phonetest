function handleOrientation(event) {
    const alpha = event.alpha;
    const beta = event.beta;
    const gamma = event.gamma;

    document.getElementById('alpha').textContent = alpha.toFixed(2);
    document.getElementById('beta').textContent = beta.toFixed(2);
    document.getElementById('gamma').textContent = gamma.toFixed(2);
}

function requestPermission() {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
        .then(permissionState => {
            if (permissionState === 'granted') {
                window.addEventListener('deviceorientation', handleOrientation);
            } else {
                alert('Oprávnění ke gyroskopickým senzorům nebylo uděleno.');
            }
        })
        .catch(error => {
            console.error('Chyba při požadování oprávnění:', error);
        });
    } else {
        // Pro zařízení, která nevyžadují explicitní oprávnění
        window.addEventListener('deviceorientation', handleOrientation);
    }
}

requestPermission();
