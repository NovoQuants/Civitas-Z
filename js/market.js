/* =====================================================
   CIVITAS-X | MARKET.JS
   Market dashboard and chart visualization
   ===================================================== */

// DEMONSTRATION MARKET DATA

const demoMarketData = [

    { label: "Mon", value: 100.0 },

    { label: "Tue", value: 101.2 },

    { label: "Wed", value: 100.7 },

    { label: "Thu", value: 102.1 },

    { label: "Fri", value: 103.4 },

    { label: "Mon", value: 102.8 },

    { label: "Tue", value: 104.1 }

];

// UPDATE HTML TEXT

function setText(selector, value) {

    const element = document.querySelector(selector);

    if (element) {

        element.textContent = value;

    }

}

// CREATE MARKET CHART

function renderMarketChart() {

    const canvas = document.querySelector(
        "#marketChart, #researchChart"
    );

    if (!canvas || !window.Chart) return;

    // Prevent duplicate charts

    if (
        window.Chart.getChart &&
        window.Chart.getChart(canvas)
    ) {
        return;
    }

    new window.Chart(canvas, {

        type: "line",

        data: {

            labels: demoMarketData.map(
                point => point.label
            ),

            datasets: [

                {

                    label: "Illustrative Index Value",

                    data: demoMarketData.map(
                        point => point.value
                    ),

                    borderColor: "#58a6ff",

                    backgroundColor:
                        "rgba(88, 166, 255, 0.12)",

                    fill: true,

                    tension: 0.32,

                    pointRadius: 3,

                    pointHoverRadius: 5

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    labels: {

                        color: "#c7d5e8"

                    }

                },

                tooltip: {

                    mode: "index",

                    intersect: false

                }

            },

            scales: {

                x: {

                    ticks: {

                        color: "#9db0c9"

                    },

                    grid: {

                        color:
                            "rgba(148,173,204,.08)"

                    }

                },

                y: {

                    ticks: {

                        color: "#9db0c9"

                    },

                    grid: {

                        color:
                            "rgba(148,173,204,.08)"

                    }

                }

            }

        }

    });

}

// INITIALIZE MARKET DASHBOARD

function initMarket() {

    setText(
        "[data-market-status]",
        "Demo data"
    );

    setText(
        "#marketStatus",
        "Demo data"
    );

    setText(
        "[data-market-date]",
        new Date().toLocaleDateString()
    );

    setText(
        '[data-market-value="sample-index"]',
        "104.1"
    );

    setText(
        '[data-market-change="sample-index"]',
        "+4.1%"
    );

    renderMarketChart();

    // REFRESH BUTTON

    const refreshButton = document.querySelector(
        "#refreshMarket, [data-refresh-market]"
    );

    if (refreshButton) {

        refreshButton.addEventListener(
            "click",
            () => {

                const canvas = document.querySelector(
                    "#marketChart, #researchChart"
                );

                if (
                    canvas &&
                    window.Chart?.getChart
                ) {

                    const chart =
                        window.Chart.getChart(canvas);

                    if (chart) {

                        chart.update();

                    }

                }

                setText(
                    "[data-market-status]",
                    "Demo refreshed"
                );

                setText(
                    "#marketStatus",
                    "Demo refreshed"
                );

            }
        );

    }

}

// EXPORT FUNCTION

export {
    initMarket
};

