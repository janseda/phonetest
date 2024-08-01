// Akcelerometr
if ('Accelerometer' in window) {
    let accelerometer = new Accelerometer({frequency: 60});
    accelerometer.addEventListener('reading', () => {
        document.getElementById('acc-x').textContent = accelerometer.x.toFixed(2);
        document.getElementById('acc-y').textContent = accelerometer.y.toFixed(2);
        document.getElementById('acc-z').textContent = accelerometer.z.toFixed(2);
    });
    accelerometer.start();
} else {
    alert("Akcelerometr není podporován.");
}

// Gyroskop
if ('Gyroscope' in window) {
    let gyroscope = new Gyroscope({frequency: 60});
    gyroscope.addEventListener('reading', () => {
        document.getElementById('gyro-x').textContent = gyroscope.x.toFixed(2);
        document.getElementById('gyro-y').textContent = gyroscope.y.toFixed(2);
        document.getElementById('gyro-z').textContent = gyroscope.z.toFixed(2);
    });
    gyroscope.start();
} else {
    alert("Gyroskop není podporován.");
}

// Orientace zařízení
if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', function(event) {
        document.getElementById('alpha').textContent = event.alpha.toFixed(2);
        document.getElementById('beta').textContent = event.beta.toFixed(2);
        document.getElementById('gamma').textContent = event.gamma.toFixed(2);
    }, true);
} else {
    alert("Orientace zařízení není podporována.");
}
