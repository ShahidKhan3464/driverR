import Swal from 'sweetalert2';

const Index = (icon = null, title = null, message = 'Error occured') => {

    return (
        Swal.fire({
            icon: icon,
            title: title,
            text: message,
            allowEscapeKey: false,
            confirmButtonText: false,
            allowOutsideClick: false,
            customClass: { title: 'sweetAlert-title' },
            html: `
                <div class="sweetAlert-close-btn">
                    <button type="button"><img src="/images/pop-cross-icon.svg" alt="cross-icon" /></button>
                </div>
                <div class="sweetAlert-message">${message}</div>
            `,
            didOpen: () => {
                const closeButton = Swal.getPopup().querySelector('.sweetAlert-close-btn button');
                if (closeButton) {
                    closeButton.addEventListener('click', () => {
                        Swal.close()
                    })
                }
            },
        })
    )
}

export default Index