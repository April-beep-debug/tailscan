document.addEventListener('DOMContentLoaded', () => {
    console.log("✅ form.js cargado");

    const imagenInput = document.getElementById('imagen');
    const preview = document.getElementById('preview');
    const crearQR = document.getElementById('crearQR');
    const qrDiv = document.getElementById('qr');

    let fotoBase64 = '';

    // Redimensionar imagen (solo para vista previa)
    function resizeImage(file, callback) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                const maxWidth = 400;

                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;
                canvas.getContext('2d').drawImage(img, 0, 0, width, height);
                fotoBase64 = canvas.toDataURL('image/jpeg', 0.7);
                preview.innerHTML = `<img src="${fotoBase64}" alt="Foto">`;
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    imagenInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) resizeImage(file);
    });

    crearQR.addEventListener('click', () => {
        console.log("🟢 Botón clickeado");

        const dueno = document.getElementById('dueno').value.trim();
        const mascota = document.getElementById('mascota').value.trim();
        const telefono = document.getElementById('telefono').value.trim();

        if (!dueno || !mascota || !telefono) {
            alert("Por favor completa todos los campos");
            return;
        }

        // Solo datos de texto en el QR (sin foto)
        const url = `info.html?dueno=${encodeURIComponent(dueno)}&mascota=${encodeURIComponent(mascota)}&telefono=${encodeURIComponent(telefono)}`;

        qrDiv.innerHTML = '<p><strong>Escanea la tarjeta:</strong></p>';

        const canvas = document.createElement('canvas');

        QRCode.toCanvas(canvas, url, { 
            width: 280,
            margin: 1,
            color: { dark: '#1a1a1a', light: '#ffffff' }
        }, function (error) {
            if (error) {
                console.error(error);
                return;
            }
            qrDiv.appendChild(canvas);
            console.log("✅ QR generado correctamente");
        });
    });
});