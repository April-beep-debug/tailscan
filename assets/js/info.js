document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    
    document.getElementById('nombreMascota').textContent = params.get('mascota') || 'Mascota';
    document.getElementById('nombreDueno').textContent = params.get('dueno') || 'Sin nombre';
    document.getElementById('telefono').textContent = params.get('telefono') || 'Sin teléfono';

    const foto = params.get('foto');
    if (foto) {
        document.getElementById('fotoTarjeta').src = foto;
    }
});