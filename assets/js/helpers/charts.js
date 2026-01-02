import {Chart} from "chart.js/auto";

export function initSalesChart(data) {
    const ctx = document.getElementById('salesChart');

    if (!ctx) return;

    const topData = data.slice(0, 10);

    const labels = topData.map(item => item.product_name);
    const revenueData = topData.map(item => item.total_revenue);
    const qtyData = topData.map(item => item.sold_qty);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Revenue (USD)',
                    data: revenueData,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    borderColor: 'rgba(0, 0, 0, 1)',
                    borderWidth: 1,
                    yAxisID: 'y',
                    order: 1
                },
                {
                    label: 'Sold Qty',
                    data: qtyData,
                    type: 'line',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderWidth: 2,
                    tension: 0.3,
                    yAxisID: 'y1',
                    order: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            scales: {
                y: {
                    beginAtZero: true,
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {display: true, text: 'Revenue (₴)'}
                },
                y1: {
                    beginAtZero: true,
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: {drawOnChartArea: false},
                    title: {display: true, text: 'Quantity (pcs)'}
                }
            }
        }
    });

}

export function initCategoryChart(data) {
    const ctx = document.getElementById('categoryChart');

    if (!ctx) return;

    const existingChart = Chart.getChart(ctx);
    if (existingChart) existingChart.destroy();

    const labels = data.map(item => item.category_name || 'Other');
    const values = data.map(item => item.total_revenue);

    const backgroundColors = [
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 99, 132, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)',
        'rgba(201, 203, 207, 0.8)'
    ];

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                label: 'Revenue ($)',
                data: values,
                backgroundColor: backgroundColors,
                borderColor: '#ffffff',
                borderWidth: 2,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: {size: 12}
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed !== null) {
                                label += new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                }).format(context.parsed);
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
}