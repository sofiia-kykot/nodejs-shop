export function initOrderForm(productsArray) {
    const container = document.getElementById('products-container');
    const addBtn = document.getElementById('add-product-btn');

    if (!container || !addBtn) return;

    const products = productsArray;

    addBtn.addEventListener('click', () => {
        const productIndex = container.querySelectorAll('.product-row').length;

        const newRow = document.createElement('div');
        newRow.className = 'flex gap-4 items-end product-row border-t border-dashed border-gray-200 pt-4 mt-4';

        const options = products.map(product =>
            `<option value="${product.product_id}" data-price="${product.price}">${product.product_name} (SKU: ${product.sku}) - $${product.price}</option>`
        ).join('');

        newRow.innerHTML = `
            <div class="grow">
                <label class="block text-xs font-medium text-gray-500 mb-1 uppercase">Select Product</label>
                <select name="products[${productIndex}][product_id]" required
                        class="w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm py-2 px-3 border bg-white">
                    <option value="" disabled selected>-- Choose a product --</option>
                    ${options}
                </select>
            </div>
            <div class="w-24">
                <label class="block text-xs font-medium text-gray-500 mb-1 uppercase">Qty</label>
                <input type="number" name="products[${productIndex}][quantity]" value="1" min="1" required
                       class="w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm py-2 px-3 border text-center">
            </div>
            <div class="pb-1 w-8 flex justify-center">
                <button type="button" class="text-red-500 hover:text-red-700 font-bold text-xl remove-btn">
                    &times;
                </button>
            </div>
        `;

        container.appendChild(newRow);
    });


    container.addEventListener('click', (e) => {
        if (e.target.closest('.remove-btn')) {
            const rows = container.querySelectorAll('.product-row');
            if (rows.length > 1) {
                e.target.closest('.product-row').remove();
            } else {
                alert("Order must have at least one product");
            }
        }
    });
}

export function setupOrderForm(btnId, formId, apiCallback, successText) {
    const btn = document.getElementById(btnId);
    const form = document.getElementById(formId);

    if (!btn || !form) return;

    btn.addEventListener('click', async (e) => {
        e.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const productsList = document.getElementById('products-container').querySelectorAll('.product-row');
        const items = [];

        productsList.forEach((row) => {
            const productSelect = row.querySelector('[name$="[product_id]"]');
            const quantityInput = row.querySelector('[name$="[quantity]"]');

            if (productSelect && productSelect.value) {
                const selectedOption = productSelect.selectedOptions[0];
                const unit_price = selectedOption?.dataset.price;

                items.push({
                    product_id: parseInt(productSelect.value),
                    quantity: parseInt(quantityInput.value) || 1,
                    unit_price: parseFloat(unit_price) || 0
                });
            }
        });

        if (items.length === 0) {
            alert('Please, add at least one product to the order.');
            return;
        }

        const payload = {
            customer_name: form.querySelector('[name="customer_name"]').value,
            customer_phone: form.querySelector('[name="customer_phone"]').value,
            shipping_address: form.querySelector('[name="shipping_address"]').value,
            status: form.querySelector('[name="status"]').value,
            payment_method: form.querySelector('[name="payment_method"]').value,
            items: items
        };

        try {
            const response = await apiCallback(payload, btn);

            if (response.status === 200 || response.status === 201) {
                alert(`${successText} Redirecting to home page ...!`);
                window.location.href = '/';
            }
        } catch (error) {
            console.error(error);
            const serverMessage = error.response?.data?.message || "Error creating order. Please try again later.";
            alert(serverMessage);
        }
    });
}