function startSensors() {
    // Akcelerometr
    if ('Accelerometer' in window) {
        try {
            let accelerometer = new Accelerometer({frequency: 60});
            accelerometer.addEventListener('reading', () => {
                document.getElementById('acc-x').textContent = accelerometer.x.toFixed(2);
                document.getElementById('acc-y').textContent = accelerometer.y.toFixed(2);
                document.getElementById('acc-z').textContent = accelerometer.z.toFixed(2);
            });
            accelerometer.start();
        } catch (error) {
            console.error("Chyba při přístupu k akcelerometru:", error);
        }
    } else {
        console.warn("Akcelerometr není podporován.");
    }

    // Gyroskop
    if ('Gyroscope' in window) {
        try {
            let gyroscope = new Gyroscope({frequency: 60});
            gyroscope.addEventListener('reading', () => {
                document.getElementById('gyro-x').textContent = gyroscope.x.toFixed(2);
                document.getElementById('gyro-y').textContent = gyroscope.y.toFixed(2);
                document.getElementById('gyro-z').textContent = gyroscope.z.toFixed(2);
            });
            gyroscope.start();
        } catch (error) {
            console.error("Chyba při přístupu k gyroskopu:", error);
        }
    } else {
        console.warn("Gyroskop není podporován.");
    }

    // Magnetometr
    if ('Magnetometer' in window) {
        try {
            let magnetometer = new Magnetometer({frequency: 60});
            magnetometer.addEventListener('reading', () => {
                document.getElementById('mag-x').textContent = magnetometer.x.toFixed(2);
                document.getElementById('mag-y').textContent = magnetometer.y.toFixed(2);
                document.getElementById('mag-z').textContent = magnetometer.z.toFixed(2);
            });
            magnetometer.start();
        } catch (error) {
            console.error("Chyba při přístupu k magnetometru:", error);
        }
    } else {
        console.warn("Magnetometr není podporován.");
    }

    // GPS
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            document.getElementById('latitude').textContent = position.coords.latitude;
            document.getElementById('longitude').textContent = position.coords.longitude;
        }, (error) => {
            console.error("Chyba při přístupu k GPS:", error);
        });
    } else {
        console.warn("GPS není podporována.");
    }

    // Světelný senzor
    if ('AmbientLightSensor' in window) {
        try {
            let lightSensor = new AmbientLightSensor();
            lightSensor.addEventListener('reading', () => {
                document.getElementById('illuminance').textContent = lightSensor.illuminance;
            });
            lightSensor.start();
        } catch (error) {
            console.error("Chyba při přístupu ke světelnému senzoru:", error);
        }
    } else {
        console.warn("Světelný senzor není podporován.");
    }

    // Proximity senzor
    if ('ProximitySensor' in window) {
        try {
            let proximitySensor = new ProximitySensor();
            proximitySensor.addEventListener('reading', () => {
                document.getElementById('proximity-distance').textContent = proximitySensor.distance;
            });
            proximitySensor.start();
        } catch (error) {
            console.error("Chyba při přístupu k proximity senzoru:", error);
        }
    } else {
        console.warn("Proximity senzor není podporován.");
    }

    // Baterie
    if ('getBattery' in navigator) {
        navigator.getBattery().then((battery) => {
            document.getElementById('charging').textContent = battery.charging ? "Ano" : "Ne";
            document.getElementById('battery-level').textContent = (battery.level * 100).toFixed(0);
            
            battery.addEventListener('chargingchange', () => {
                document.getElementById('charging').textContent = battery.charging ? "Ano" : "Ne";
            });
            battery.addEventListener('levelchange', () => {
                document.getElementById('battery-level').textContent = (battery.level * 100).toFixed(0);
            });
        }).catch((error) => {
            console.error("Chyba při přístupu k Battery API:", error);
        });
    } else {
        console.warn("Battery API není podporováno.");
    }

    // Vibrační API
    document.getElementById('vibrate-button').addEventListener('click', () => {
        if ('vibrate' in navigator) {
            navigator.vibrate(200); // Vibrace na 200ms
        } else {
            console.warn("Vibrační API není podporováno.");
        }
    });
}

// Funkce pro požádání o oprávnění
function requestPermission() {
    if (typeof DeviceMotionEvent.requestPermission === 'function' || typeof DeviceOrientationEvent.requestPermission === 'function') {
        // Pro iOS
        Promise.all([
            DeviceMotionEvent.requestPermission(),
            DeviceOrientationEvent.requestPermission()
        ])
        .then(results => {
            if (results.every(result => result === 'granted')) {
                startSensors();
            } else {
                console.warn("Oprávnění ke snímačům nebyla udělena.");
            }
        })
        .catch(console.error);
    } else {
        // Pro Android a starší iOS
        startSensors();
    }
}

// Spuštění požádání o oprávnění
requestPermission();
