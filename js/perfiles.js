document.addEventListener('DOMContentLoaded', () => {
    //  RESALTAR LINK ACTIVO EN PERFILES
    const path = window.location.pathname;
    const enPerfil = /(leonel|maximiliano|yohana|melisa|itziar)\.html$/.test(path);
    const enBitacora = /bitacora\.html$/.test(path);

    const navLinks = document.querySelectorAll('.navegacion-principal .nav-link');

    if (enPerfil || enBitacora) {
        // Quitamos cualquier "activo" hardcodeado
        navLinks.forEach(link => link.classList.remove('activo'));

        // Marcamos el que corresponde
        if (enPerfil) {
            const linkStaff = document.querySelector('.navegacion-principal a[href*="#seccion-integrantes"]');
            if (linkStaff) linkStaff.classList.add('activo');
        }
        if (enBitacora) {
            const linkBitacora = document.querySelector('.navegacion-principal a[href="bitacora.html"]');
            if (linkBitacora) linkBitacora.classList.add('activo');
        }
    }

    //  TARJETA FLIP 3D
    const tarjeta = document.getElementById('tarjeta-perfil');

    if (tarjeta) {
        tarjeta.addEventListener('click', () => {
            tarjeta.classList.toggle('girada');
        });
    }
});