const eventList = document.getElementById('eventList');
const apiKey = 'Z9zEQGxGVy4211upM5jqz4bbbXVJ0SQHgGI0uwx8';

// Función para cargar todos los eventos
const cargarEventos = async () => {
    try {
        const respuesta = await fetch(`https://eonet.gsfc.nasa.gov/api/v2.1/events?api_key=${apiKey}&limit=50`); // Limitar a 50 eventos, puedes ajustar el número
        if (respuesta.status === 200) {
            const datos = await respuesta.json();
            console.log("Datos obtenidos:", datos);

            let eventosHTML = '';
            if (datos.events && datos.events.length > 0) {
                datos.events.forEach(evento => {
                    eventosHTML += `
                    <div class="event">
                        <h2>${evento.title}</h2>
                        <p><strong>Fecha de inicio:</strong> ${new Date(evento.geometries[0].date).toLocaleDateString()}</p>
                        <p><strong>Tipo:</strong> ${evento.categories.map(cat => cat.title).join(', ')}</p>
                        <p><strong>Coordenadas:</strong> ${evento.geometries[0].coordinates.join(', ')}</p>
                    </div>`;
                });

                eventList.innerHTML = eventosHTML;
            } else {
                eventList.innerHTML = "<p>No hay eventos disponibles.</p>";
            }
        } else {
            console.error('Error al obtener los eventos:', respuesta.statusText);
            eventList.innerHTML = "<p>Error al cargar los eventos. Intenta nuevamente.</p>";
        }
    } catch (error) {
        console.error('Error capturado:', error);
        eventList.innerHTML = "<p>Error de red. Intenta nuevamente.</p>";
    }
};

// Cargar los eventos iniciales
cargarEventos();
