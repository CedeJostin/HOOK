
document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menu-icon');
    const nav = document.getElementById('nav');
    
    menuIcon.addEventListener('click', function() {
        nav.classList.toggle('active');
        
    });
});

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuIcon.classList.remove('active');
            nav.classList.remove('active');
        });
    });


    document.addEventListener('DOMContentLoaded', function() {
        // Manejar el envío del formulario
        const form = document.querySelector('.contact-form');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Aquí puedes agregar la lógica para manejar el envío del formulario
                const formData = new FormData(form);
                const emailParams = {
                    from_name: formData.get('name'),
                    from_email: formData.get('email'),
                    message: formData.get('message')
                };
    
                console.log(emailParams); // Verificar que los datos se obtienen correctamente
    
                emailjs.send('service_fwxau84', 'template_lg47eav', emailParams, 'MpECxtJKruMbzXrVD')
                    .then(function(response) {
                        alert('Mensaje enviado correctamente');
                        form.reset();
                    }, function(error) {
                        alert('Ocurrió un error al enviar el mensaje');
                    });
            });
        }
    });



