import '../css/style.css';
import axios from 'axios';
import {initOrderForm} from './helpers/orderForm';

window.axios = axios;

document.addEventListener('DOMContentLoaded', () => {
    initOrderForm();
});