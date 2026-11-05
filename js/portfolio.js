
/* =====================================================
   CIVITAS-X | SIMULATIONS.JS
   Monte Carlo simulation
   ===================================================== */

// GET NUMBERS FROM HTML

function getNumber(selector, fallback) {

    const element = document.querySelector(selector);

    if (!element) return fallback;

    const value = Number(element.value);

    return Number.isFinite(value)
        ? value
        : fallback;

}

// CALCULATE PERCENTILES

function percentile(sortedValues, fraction) {

    const index = Math.min(
        sortedValues.length - 1,

        Math.max(
            0,
            Math.floor(
                fraction *
                (sortedValues.length - 1)
            )
        )
    );

    return sortedValues[index];

}

// GENERATE RANDOM NORMAL NUMBER

function randomNormal() {

    let u = 0;
    let v = 0;

    while (u === 0) {
        u = Math.random();
    }

    while (v === 0) {
        v = Math.random();
    }

    return Math.sqrt(
        -2 * Math.log(u)
    ) * Math.cos(
        2 * Math.PI * v
    );

}

// RUN MONTE CARLO SIMULATION

function runMonteCarlo() {

    const initial = getNumber(
        "#simulationInitial, [name='simulationInitial']",
        10000
    );

    const annualReturn = getNumber(
        "#simulationReturn, [name='simulationReturn']",
        7
    ) / 100;

    const volatility = getNumber(
        "#simulationVolatility, [name='simulationVolatility']",
        15
    ) / 100;

    const years = Math.floor(
        getNumber(
            "#simulationYears, [name='simulationYears']",
            10
        )
    );

    const trials = Math.floor(
        getNumber(
            "#simulationTrials, [name='simulationTrials']",
            1000
        )
    );

    const output = document.querySelector(
        "#simulationResult, [data-simulation-result]"
    );

    if (!output) return;

    // VALIDATE INPUTS

    if (
        initial <= 0 ||
        volatility < 0 ||
        years < 1 ||
        years > 80 ||
        trials < 10 ||
        trials > 20000
    ) {

        output.textContent =
            "Use a positive starting amount, non-negative volatility, 1–80 years, and 10–20,000 trials.";

        return;

    }

    // STORE SIMULATION RESULTS

    const outcomes = [];

    // CALCULATE ANNUAL DRIFT

    const yearlyDrift =
        annualReturn -
        0.5 * volatility * volatility;

    // RUN SIMULATION TRIALS

    for (
        let trial = 0;
        trial < trials;
        trial++
    ) {

        let value = initial;

        for (
            let year = 0;
            year < years;
            year++
        ) {

            const shock = randomNormal();

            value *= Math.exp(
                yearlyDrift +
                volatility * shock
            );

        }

        outcomes.push(value);

    }

    // SORT RESULTS

    outcomes.sort(
        (a, b) => a - b
    );

    // CALCULATE PERCENTILES

    const median = percentile(
        outcomes,
        0.50
    );

    const lower = percentile(
        outcomes,
        0.10
    );

    const upper = percentile(
        outcomes,
        0.90
    );

    // FORMAT CURRENCY

    const formatMoney = value => {

        return value.toLocaleString(
            "en-US",
            {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0
            }
        );

    };

    // DISPLAY RESULTS

    output.innerHTML = `

        <strong>
            Simulation complete:
            ${trials.toLocaleString()}
            illustrative paths
        </strong>

        <div class="small-note">

            10th percentile:
            ${formatMoney(lower)}

        </div>

        <div class="small-note">

            Median outcome:
            ${formatMoney(median)}

        </div>

        <div class="small-note">

            90th percentile:
            ${formatMoney(upper)}

        </div>

        <div class="small-note">

            These are model-generated scenarios,
            not guaranteed outcomes or predictions.
            The model assumes constant annual
            return and volatility parameters.

        </div>

    `;

}

// INITIALIZE SIMULATIONS

function initSimulations() {

    const form = document.querySelector(
        "#simulationForm, [data-simulation-form]"
    );

    const button = document.querySelector(
        "#runSimulation, [data-run-simulation]"
    );

    // FORM SUBMISSION

    if (form) {

        form.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                runMonteCarlo();

            }
        );

    }

    else if (button) {

        button.addEventListener(
            "click",
            runMonteCarlo
        );

    }

}

// EXPORT FUNCTIONS

export {
    initSimulations,
    runMonteCarlo
};

