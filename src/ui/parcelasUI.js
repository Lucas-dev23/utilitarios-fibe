export function carregarParcelas(maxParcelas = 12) {
    const container = document.getElementById("dropdownParcelas");

    container.innerHTML = "";

    for (let i = 1; i <= maxParcelas; i++) {
        container.innerHTML += `
            <div class="form-check">
                <input class="form-check-input parcela-checkbox" 
                       type="checkbox" 
                       value="${i}" 
                       id="p${i}" 
                       name="parcelas[]">

                <label class="form-check-label" for="p${i}">
                    ${i}x
                </label>
            </div>
        `;
    }
}