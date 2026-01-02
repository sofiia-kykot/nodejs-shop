import '../css/style.css';
import axios from 'axios';
import {initOrderForm, setupOrderForm} from "./helpers/orderForm";

window.axios = axios;
window.helpers = {initOrderForm};
document.addEventListener('DOMContentLoaded', () => {

    //Delete order
    const deleteOrderBtn = document.querySelectorAll('.delete-order-btn');
    deleteOrderBtn.forEach(btn => {
        btn.addEventListener('click', async () => {
            if (confirm('Are you sure you want to delete this order?')) {
                const orderId = btn.getAttribute("data-id");
                try {
                    const response = await axios.delete(`/order/${orderId}`);
                    if (response.status === 200) {
                        window.location.reload();
                    } else {
                        alert("Error deleting order.");
                    }
                } catch (error) {
                    console.log(error);
                }
                return true;
            }
            return false;
        });
    });

    // Create order
    setupOrderForm(
        'create-order-btn',
        'create-order',
        (payload) => {
            return axios.post('/orders', payload);
        },
        'Order created successfully!'
    );

    // Edit order
    setupOrderForm(
        'edit-order-btn',
        'edit-order',
        (payload, btn) => {
            const orderId = btn.getAttribute("data-order-id");
            return axios.patch(`/order/${orderId}`, payload);
        },
        'Order updated successfully!'
    );


});