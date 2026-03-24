export function mostrarNotificacao(message, type = "success") {

    const container = document.getElementById("toastContainer");

    const toastEl = document.createElement("div");

    toastEl.className = `toast align-items-center text-bg-${type} border-0`;
    toastEl.role = "alert";

    toastEl.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;

    container.appendChild(toastEl);

    const toast = new bootstrap.Toast(toastEl, {
        delay: 5000
    });

    toast.show();

    // remove do DOM depois que sumir
    toastEl.addEventListener("hidden.bs.toast", () => {
        toastEl.remove();
    });
}