// Calculator JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initCalculator();
});

let currentStep = 1;
const totalSteps = 5;
let calculatorData = {
    transport: {},
    housing: {},
    food: {},
    consumption: {},
    waste: {}
};

function initCalculator() {
    // Initialize sliders
    initSliders();
    
    // Initialize option cards
    initOptionCards();
    
    // Initialize navigation buttons
    initNavigation();
    
    // Initialize number inputs
    initNumberInputs();
}

function initSliders() {
    const sliders = document.querySelectorAll('.slider');
    sliders.forEach(slider => {
        const valueDisplay = slider.parentElement.querySelector('.slider-value span');
        if (valueDisplay) {
            slider.addEventListener('input', function() {
                valueDisplay.textContent = this.value;
            });
        }
    });
}

function initOptionCards() {
    const optionCards = document.querySelectorAll('.option-card');
    optionCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove selected class from siblings
            const siblings = this.parentElement.querySelectorAll('.option-card');
            siblings.forEach(sib => sib.classList.remove('selected'));
            
            // Add selected class to clicked card
            this.classList.add('selected');
        });
    });
}

function initNavigation() {
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const calculateBtn = document.getElementById('calculate-btn');
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextStep);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevStep);
    }
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateResult);
    }
}

function initNumberInputs() {
    // Initialize existing number inputs
    const numberInputs = document.querySelectorAll('.number-input input');
    numberInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (this.value < this.min) this.value = this.min;
            if (this.value > this.max) this.value = this.max;
        });
    });
}

function increment(elementId) {
    const element = document.getElementById(elementId);
    if (element && element.value < element.max) {
        element.value = parseInt(element.value) + 1;
    }
}

function decrement(elementId) {
    const element = document.getElementById(elementId);
    if (element && element.value > element.min) {
        element.value = parseInt(element.value) - 1;
    }
}

function nextStep() {
    if (currentStep < totalSteps) {
        // Save current step data
        saveStepData(currentStep);
        
        // Move to next step
        currentStep++;
        updateStepDisplay();
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        updateStepDisplay();
    }
}

function updateStepDisplay() {
    // Update progress bar
    const progressSteps = document.querySelectorAll('.progress-step');
    progressSteps.forEach((step, index) => {
        const stepNum = index + 1;
        step.classList.remove('active', 'completed');
        
        if (stepNum < currentStep) {
            step.classList.add('completed');
        } else if (stepNum === currentStep) {
            step.classList.add('active');
        }
    });
    
    // Update step content
    const stepContents = document.querySelectorAll('.step-content');
    stepContents.forEach((content, index) => {
        const stepNum = index + 1;
        content.classList.remove('active');
        
        if (stepNum === currentStep) {
            content.classList.add('active');
        }
    });
    
    // Update navigation buttons
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const calculateBtn = document.getElementById('calculate-btn');
    
    if (prevBtn) {
        prevBtn.style.display = currentStep > 1 ? 'inline-flex' : 'none';
    }
    
    if (nextBtn) {
        nextBtn.style.display = currentStep < totalSteps ? 'inline-flex' : 'none';
    }
    
    if (calculateBtn) {
        calculateBtn.style.display = currentStep === totalSteps ? 'inline-flex' : 'none';
    }
}

function saveStepData(step) {
    switch(step) {
        case 1: // Transport
            calculatorData.transport = {
                distance: document.getElementById('distance')?.value || 50,
                transportType: document.querySelector('.step-content[data-step="1"] .option-card.selected')?.dataset.value || 'car',
                passengers: document.getElementById('passengers')?.value || 1
            };
            break;
        case 2: // Housing
            calculatorData.housing = {
                houseSize: document.querySelector('.step-content[data-step="2"] .option-card.selected')?.dataset.value || 'medium',
                household: document.getElementById('household')?.value || 1,
                energySource: document.querySelector('.step-content[data-step="2"] .option-card.selected')?.dataset.value || 'mixed',
                energyConsumption: document.getElementById('energy')?.value || 300
            };
            break;
        case 3: // Food
            calculatorData.food = {
                diet: document.querySelector('.step-content[data-step="3"] .option-card.selected')?.dataset.value || 'omnivore',
                meatMeals: document.getElementById('meat-meals')?.value || 7,
                organic: document.querySelector('.step-content[data-step="3"] .option-card.selected')?.dataset.value || 'sometimes'
            };
            break;
        case 4: // Consumption
            calculatorData.consumption = {
                clothes: document.getElementById('clothes')?.value || 3,
                secondHand: document.querySelector('.step-content[data-step="4"] .option-card.selected')?.dataset.value || 'sometimes',
                electronics: document.getElementById('electronics')?.value || 1
            };
            break;
        case 5: // Waste
            calculatorData.waste = {
                recycling: document.querySelector('.step-content[data-step="5"] .option-card.selected')?.dataset.value || 'sometimes',
                wasteAmount: document.getElementById('waste')?.value || 2,
                composting: document.querySelector('.step-content[data-step="5"] .option-card.selected')?.dataset.value || 'no'
            };
            break;
    }
}

function calculateResult() {
    // Save final step data
    saveStepData(currentStep);
    
    // Calculate footprint
    const result = calculateFootprint(calculatorData);
    
    // Show results modal
    showResults(result);
}

function calculateFootprint(data) {
    let totalCO2 = 0;
    let breakdown = {
        transport: 0,
        housing: 0,
        food: 0,
        consumption: 0,
        waste: 0
    };
    
    // Transport calculation
    const transportFactors = {
        car: 0.2,
        bus: 0.05,
        bike: 0,
        walk: 0,
        subway: 0.03,
        motorcycle: 0.15
    };
    
    const distance = parseInt(data.transport.distance || 50);
    const transportType = data.transport.transportType || 'car';
    const passengers = parseInt(data.transport.passengers || 1);
    
    breakdown.transport = (distance * transportFactors[transportType]) / passengers;
    totalCO2 += breakdown.transport;
    
    // Housing calculation
    const sizeFactors = {
        small: 0.8,
        medium: 1.0,
        large: 1.5,
        xlarge: 2.0
    };
    
    const energyFactors = {
        renewable: 0.3,
        mixed: 0.7,
        fossil: 1.0
    };
    
    const houseSize = data.housing.houseSize || 'medium';
    const household = parseInt(data.housing.household || 1);
    const energySource = data.housing.energySource || 'mixed';
    const energyConsumption = parseInt(data.housing.energyConsumption || 300);
    
    breakdown.housing = (energyConsumption * 0.0005 * energyFactors[energySource] * sizeFactors[houseSize]) / household;
    totalCO2 += breakdown.housing;
    
    // Food calculation
    const dietFactors = {
        vegan: 0.3,
        vegetarian: 0.5,
        flexitarian: 0.7,
        omnivore: 1.0
    };
    
    const meatMeals = parseInt(data.food.meatMeals || 7);
    const diet = data.food.diet || 'omnivore';
    
    breakdown.food = (meatMeals * 0.1 * dietFactors[diet]);
    totalCO2 += breakdown.food;
    
    // Consumption calculation
    const clothes = parseInt(data.consumption.clothes || 3);
    const secondHand = data.consumption.secondHand || 'sometimes';
    const electronics = parseInt(data.consumption.electronics || 1);
    
    const secondHandFactor = {
        always: 0.2,
        sometimes: 0.6,
        rarely: 0.8,
        never: 1.0
    };
    
    breakdown.consumption = (clothes * 0.05 + electronics * 0.3) * secondHandFactor[secondHand];
    totalCO2 += breakdown.consumption;
    
    // Waste calculation
    const recycling = data.waste.recycling || 'sometimes';
    const wasteAmount = parseInt(data.waste.wasteAmount || 2);
    const composting = data.waste.composting || 'no';
    
    const recyclingFactor = {
        always: 0.3,
        sometimes: 0.7,
        rarely: 0.9,
        never: 1.0
    };
    
    const compostingFactor = composting === 'yes' ? 0.8 : 1.0;
    
    breakdown.waste = wasteAmount * 0.1 * recyclingFactor[recycling] * compostingFactor;
    totalCO2 += breakdown.waste;
    
    return {
        totalCO2: Math.round(totalCO2 * 100) / 100,
        breakdown: breakdown,
        recommendations: generateRecommendations(data, breakdown)
    };
}

function generateRecommendations(data, breakdown) {
    const recommendations = [];
    
    // Transport recommendations
    if (breakdown.transport > 1.0) {
        recommendations.push({
            category: 'Transporte',
            title: 'Transporte Sustentável',
            description: 'Considere usar bicicleta ou transporte público 2x por semana',
            impact: '-0.3 ton CO₂/ano',
            icon: 'fas fa-bicycle'
        });
    }
    
    // Housing recommendations
    if (breakdown.housing > 0.8) {
        recommendations.push({
            category: 'Moradia',
            title: 'Eficiência Energética',
            description: 'Troque 5 lâmpadas por LED e instale termostatos inteligentes',
            impact: '-0.2 ton CO₂/ano',
            icon: 'fas fa-lightbulb'
        });
    }
    
    // Food recommendations
    if (breakdown.food > 0.5) {
        recommendations.push({
            category: 'Alimentação',
            title: 'Dieta Consciente',
            description: 'Reduza o consumo de carne em 2 dias por semana',
            impact: '-0.4 ton CO₂/ano',
            icon: 'fas fa-utensils'
        });
    }
    
    // Consumption recommendations
    if (breakdown.consumption > 0.3) {
        recommendations.push({
            category: 'Consumo',
            title: 'Consumo Responsável',
            description: 'Compre mais produtos de segunda mão e repare em vez de substituir',
            impact: '-0.2 ton CO₂/ano',
            icon: 'fas fa-shopping-bag'
        });
    }
    
    // Waste recommendations
    if (breakdown.waste > 0.2) {
        recommendations.push({
            category: 'Resíduos',
            title: 'Reciclagem e Compostagem',
            description: 'Implemente reciclagem completa e compostagem doméstica',
            impact: '-0.1 ton CO₂/ano',
            icon: 'fas fa-recycle'
        });
    }
    
    return recommendations;
}

function showResults(result) {
    // Update modal content
    document.getElementById('footprint-number').textContent = result.totalCO2;
    
    // Update breakdown
    const categories = ['transport', 'housing', 'food', 'consumption', 'waste'];
    const categoryNames = ['Transporte', 'Moradia', 'Alimentação', 'Consumo', 'Resíduos'];
    
    categories.forEach((category, index) => {
        const percentage = Math.round((result.breakdown[category] / result.totalCO2) * 100);
        const barElement = document.getElementById(`${category}-bar`);
        const valueElement = document.getElementById(`${category}-value`);
        
        if (barElement) {
            barElement.style.width = `${percentage}%`;
        }
        if (valueElement) {
            valueElement.textContent = `${percentage}%`;
        }
    });
    
    // Update recommendations
    const recommendationsList = document.getElementById('recommendations-list');
    if (recommendationsList) {
        recommendationsList.innerHTML = '';
        result.recommendations.forEach(rec => {
            const recElement = document.createElement('div');
            recElement.className = 'recommendation-item';
            recElement.innerHTML = `
                <div class="recommendation-icon">
                    <i class="${rec.icon}"></i>
                </div>
                <div class="recommendation-content">
                    <h4>${rec.title}</h4>
                    <p>${rec.description}</p>
                    <div class="recommendation-impact">
                        <span class="impact-savings">${rec.impact}</span>
                        <span class="impact-time">por ano</span>
                    </div>
                </div>
                <button class="btn-action">Aplicar</button>
            `;
            recommendationsList.appendChild(recElement);
        });
    }
    
    // Show modal
    const modal = document.getElementById('results-modal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function saveResults() {
    // Save results to localStorage
    const results = {
        timestamp: new Date().toISOString(),
        footprint: calculatorData,
        result: calculateFootprint(calculatorData)
    };
    
    localStorage.setItem('planetaRealResults', JSON.stringify(results));
    
    // Show success message
    if (window.PlanetaReal && window.PlanetaReal.showNotification) {
        window.PlanetaReal.showNotification('Resultados salvos com sucesso!', 'success');
    }
    
    // Close modal
    const modal = document.getElementById('results-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function createActionPlan() {
    // Redirect to dashboard or create action plan
    window.location.href = 'dashboard.html';
}

// Global functions for onclick handlers
window.updateProgress = function(challengeId) {
    // Update challenge progress
    console.log('Updating progress for challenge:', challengeId);
    if (window.PlanetaReal && window.PlanetaReal.showNotification) {
        window.PlanetaReal.showNotification('Progresso atualizado!', 'success');
    }
};

window.viewDetails = function(challengeId) {
    // Show challenge details
    console.log('Viewing details for challenge:', challengeId);
};

window.acceptChallenge = function(challengeId) {
    // Accept challenge
    console.log('Accepting challenge:', challengeId);
    if (window.PlanetaReal && window.PlanetaReal.showNotification) {
        window.PlanetaReal.showNotification('Desafio aceito!', 'success');
    }
}; 