document.addEventListener("DOMContentLoaded", () => {

    // --- Variables del Modal ---
    const modalOverlay = document.getElementById('modal-overlay');
    const modalCloseBtn = document.getElementById('modal-close');
    
    // --- Contenido del Modal ---
    const modalImg = document.getElementById('modal-img');
    const modalName = document.getElementById('modal-name');
    const modalPrice = document.getElementById('modal-price');

    // --- Grupos de Formularios ---
    const formSizeStandard = document.getElementById('form-size-standard');
    const formSizeCustom = document.getElementById('form-size-custom');
    const formPackaging = document.getElementById('form-packaging');
    
    // --- Grupos de Instrucciones ---
    const instructionsStandard = document.getElementById('instructions-standard');
    const instructionsCustom = document.getElementById('instructions-custom');

    // --- Inputs Estándar (Tamaño) ---
    const radioSize10cm = document.getElementById('size-standard-10');
    const radioSizeCustom = document.getElementById('size-standard-custom');
    const textSizeCustom = document.getElementById('size-standard-custom-text');
    
    // --- Inputs Personalizados (Tamaño) ---
    const modalSizeCustomInput = document.getElementById('modal-size-custom');
    
    // --- Inputs de Empaque (Unificados) ---
    const modalPackagingSelect = document.getElementById('modal-packaging-select');
    // El input de texto personalizado ha sido eliminado

    // --- Botones de Acción ---
    const waButton = document.getElementById('modal-wa-btn');
    const igButton = document.getElementById('modal-ig-btn');

    const productLinks = document.querySelectorAll('.product-link');
    
    let currentProductName = "";
    let currentProductType = "standard";

    // --- Función para ABRIR el modal ---
    function openModal(event) {
        event.preventDefault(); 
        const link = this; 
        
        currentProductName = link.dataset.name;
        currentProductType = link.dataset.type || 'standard';
        
        modalImg.src = link.dataset.img;
        modalName.textContent = currentProductName;
        modalPrice.textContent = link.dataset.price;
        
        // --- Resetear formularios ---
        radioSize10cm.checked = true;
        radioSizeCustom.checked = false;
        textSizeCustom.value = "";
        textSizeCustom.style.display = 'none';
        modalSizeCustomInput.value = "";
        modalPackagingSelect.value = ""; // Resetea el dropdown
        
        // --- Lógica condicional para mostrar/ocultar ---
        formPackaging.style.display = 'block'; // El empaque se muestra siempre

        if (currentProductType === 'custom') {
            formSizeStandard.style.display = 'none';
            formSizeCustom.style.display = 'block';
            instructionsStandard.style.display = 'none';
            instructionsCustom.style.display = 'block';
        } else {
            formSizeStandard.style.display = 'block';
            formSizeCustom.style.display = 'none';
            instructionsStandard.style.display = 'block';
            instructionsCustom.style.display = 'none';
        }
        
        modalOverlay.style.display = 'flex';
    }

    // --- Función para CERRAR el modal ---
    function closeModal() {
        modalOverlay.style.display = 'none';
    }

    // --- Función para mostrar/ocultar input de TAMAÑO personalizado ---
    function toggleCustomSize() {
        if (radioSizeCustom.checked) {
            textSizeCustom.style.display = 'block';
        } else {
            textSizeCustom.style.display = 'none';
            textSizeCustom.value = "";
        }
    }

    // (La función para empaque personalizado ha sido eliminada)
    
    // --- Función para OBTENER los datos del formulario ---
    function getFormData() {
        let size = "No especificado";
        let packaging = "No especificado";

        // 1. Obtener TAMAÑO
        if (currentProductType === 'custom') {
            size = modalSizeCustomInput.value || "No especificado";
        } else {
            if (radioSize10cm.checked) {
                size = "10cm (Estándar)";
            } else if (radioSizeCustom.checked) {
                size = textSizeCustom.value || "Personalizado (No descrito)";
            }
        }
        
        // 2. Obtener EMPAQUE (simplificado)
        packaging = modalPackagingSelect.value || "No especificado";
        
        return { size, packaging };
    }

    // --- Función para enviar por WHATSAPP ---
    function sendWhatsApp() {
        const { size, packaging } = getFormData();
        
        const baseMessage = `¡Hola! Me interesa el producto: *${currentProductName}*.\n\n*Tamaño:* ${size}\n*Empaque:* ${packaging}\n\nQuedo atento/a a la cotización. ¡Gracias!`;
        const encodedMessage = encodeURIComponent(baseMessage);
        const waNumber = "593999406153";
        
        const waLink = `https://wa.me/${waNumber}?text=${encodedMessage}`;
        window.open(waLink, '_blank');
    }
    
    // --- Función para enviar por INSTAGRAM ---
    function sendInstagram() {
        const { size, packaging } = getFormData();
        const message = `¡Hola! Me interesa el producto: ${currentProductName}.\n\nTamaño: ${size}\nEmpaque: ${packaging}\n\nQuedo atento/a a la cotización. ¡Gracias!`;

        try {
            navigator.clipboard.writeText(message);
            alert("Se ha copiado el mensaje de tu pedido al portapapeles. Pégalo en el chat de Instagram. 👍");
        } catch (err) {
            alert("No se pudo copiar el mensaje. Por favor, abre Instagram y escribe tu pedido.");
        }
        
        const igLink = "https://ig.me/m/tejidosdelight";
        window.open(igLink, '_blank');
    }

    // --- Asignar los "Event Listeners" ---
    
    productLinks.forEach(link => {
        link.addEventListener('click', openModal);
    });

    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Listeners de formularios
    radioSize10cm.addEventListener('change', toggleCustomSize);
    radioSizeCustom.addEventListener('change', toggleCustomSize);
    // El listener para el empaque ya no es necesario
    
    waButton.addEventListener('click', sendWhatsApp);
    igButton.addEventListener('click', sendInstagram);

});