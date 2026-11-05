/* =====================================================
   CIVITAS-X | PORTFOLIO.JS
   Portfolio growth calculator
   ===================================================== */

// GET NUMBERS FROM HTML

const numberFrom = (selector, fallback) => {

    const element = document.querySelector(selector);

    if (!element) return fallback;

    const value = Number(element.value);

    return Number.isFinite(value)
        ? value
        : fallback;

};

// FORMAT MONEY

function formatCurrency(value) {

    return new Intl.NumberFormat(
        "en-US",
        {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2
        }
    ).format(value);

}

// CALCULATE PORTFOLIO

function calculatePortfolio() {

    const principal = numberFrom(
        "#investmentAmount, [name='investmentAmount']",
        10000
    );

    const annualReturnPercent = numberFrom(
        "#expectedReturn, [name='expectedReturn']",
        7
    );

    const years = numberFrom(
        "#investmentYears, [name='investmentYears']",
        5
    );

    const annualContribution = numberFrom(
        "#annualContribution, [name='annualContribution']",
        0
    );

    const result = document.querySelector(
        "#portfolioResult, [data-portfolio-result]"
    );

    if (!result) return;

    // VALIDATE INPUTS

    if (
        principal < 0 ||
        years < 0 ||
        annualReturnPercent <= -100 ||
        annualContribution < 0
    ) {

        result.textContent =
            "Please enter non-negative amounts and a return greater than -100%.";

        return;

    }

    // CONVERT PERCENTAGE TO DECIMAL

    const rate = annualReturnPercent / 100;

    // CALCULATE COMPOUND GROWTH

    let balance = principal;

    for (
        let year = 0;
        year < years;
        year++
    ) {

        balance =
            balance * (1 + rate) +
            annualContribution;

    }

    // CALCULATE TOTAL CONTRIBUTIONS

    const totalContributions =
        principal +
        annualContribution * years;

    // CALCULATE ESTIMATED GROWTH

    const estimatedGrowth =
        balance - totalContributions;

    // DISPLAY RESULTS

    result.innerHTML = `

        <strong>
            Illustrative ending value:
            ${formatCurrency(balance)}
        </strong>

        <div class="small-note">

            Total contributions:
            ${formatCurrency(totalContributions)}

        </div>

        <div class="small-note">

            Illustrative growth:
            ${formatCurrency(estimatedGrowth)}

        </div>

        <div class="small-note">

            Assumes the same annual return each year,
            with contributions at year-end.
            Excludes fees, taxes, and volatility.

        </div>

    `;

}

// INITIALIZE PORTFOLIO

function initPortfolio() {

    const form = document.querySelector(
        "#portfolioForm, [data-portfolio-form]"
    );

    const button = document.querySelector(
        "#calculatePortfolio, [data-calculate-portfolio]"
    );

    // FORM SUBMISSION

    if (form) {

        form.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                calculatePortfolio();

            }
        );

    }

    else if (button) {

        button.addEventListener(
            "click",
            calculatePortfolio
        );

    }

    // INITIAL CALCULATION

    if (
        document.querySelector(
            "#portfolioResult, [data-portfolio-result]"
        )
    ) {

        calculatePortfolio();

    }

}

// EXPORT FUNCTIONS

export {
    initPortfolio,
    calculatePortfolio
};
