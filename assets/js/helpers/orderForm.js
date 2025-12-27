export function initOrderForm() {
    const container = document.getElementById('products-container');
    const addBtn = document.getElementById('add-product-btn');

    if (!container || !addBtn) return;

    let productIndex = 1;

    addBtn.addEventListener('click', () => {
        const firstRow = container.querySelector('.product-row');
        const newRow = firstRow.cloneNode(true);
        const select = newRow.querySelector('select');
        select.value = "";
        select.name = `products[${productIndex}][product_id]`;

        const input = newRow.querySelector('input');
        input.value = "1";
        input.name = `products[${productIndex}][quantity]`;

        newRow.classList.add('border-t', 'border-dashed', 'border-gray-200', 'pt-4', 'mt-4');

        const actionDiv = newRow.lastElementChild;
        actionDiv.innerHTML = `
            <button type="button" class="text-red-500 hover:text-red-700 font-bold text-xl remove-btn">
                &times;
            </button>
        `;

        actionDiv.querySelector('.remove-btn').addEventListener('click', () => {
            newRow.remove();
        });

        container.appendChild(newRow);
        productIndex++;
    });
}