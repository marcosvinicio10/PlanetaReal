// Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initDashboard();
});

function initDashboard() {
    initCharts();
    initPeriodSelector();
    initRankingSelector();
    loadUserData();
}

function initCharts() {
    // Impact Chart (Pie Chart)
    const impactCtx = document.getElementById('impactChart');
    if (impactCtx) {
        new Chart(impactCtx, {
            type: 'doughnut',
            data: {
                labels: ['Transporte', 'Moradia', 'Alimentação', 'Consumo', 'Resíduos'],
                datasets: [{
                    data: [25, 30, 20, 15, 10],
                    backgroundColor: [
                        '#A8D5BA',
                        '#7FB069',
                        '#B5E2FA',
                        '#6E5849',
                        '#28a745'
                    ],
                    borderWidth: 0,
                    cutout: '70%'
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
                            usePointStyle: true,
                            font: {
                                family: 'Poppins',
                                size: 12
                            }
                        }
                    }
                }
            }
        });
    }

    // Progress Chart (Line Chart)
    const progressCtx = document.getElementById('progressChart');
    if (progressCtx) {
        new Chart(progressCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                datasets: [{
                    label: 'Pegada CO₂ (ton/ano)',
                    data: [3.2, 2.9, 2.7, 2.5, 2.3, 2.1],
                    borderColor: '#A8D5BA',
                    backgroundColor: 'rgba(168, 213, 186, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        ticks: {
                            font: {
                                family: 'Poppins'
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                family: 'Poppins'
                            }
                        }
                    }
                }
            }
        });
    }
}

function initPeriodSelector() {
    const periodSelector = document.querySelector('.period-selector');
    if (periodSelector) {
        periodSelector.addEventListener('change', function() {
            updateProgressChart(this.value);
        });
    }
}

function initRankingSelector() {
    const rankingSelector = document.querySelector('.ranking-selector');
    if (rankingSelector) {
        rankingSelector.addEventListener('change', function() {
            updateRanking(this.value);
        });
    }
}

function updateProgressChart(period) {
    // Update progress chart based on selected period
    console.log('Updating progress chart for period:', period);
    
    // This would typically fetch new data from an API
    // For now, we'll just show a notification
    if (window.PlanetaReal && window.PlanetaReal.showNotification) {
        window.PlanetaReal.showNotification(`Gráfico atualizado para ${period}`, 'info');
    }
}

function updateRanking(scope) {
    // Update ranking based on selected scope
    console.log('Updating ranking for scope:', scope);
    
    if (window.PlanetaReal && window.PlanetaReal.showNotification) {
        window.PlanetaReal.showNotification(`Ranking atualizado para ${scope}`, 'info');
    }
}

function loadUserData() {
    // Load user data from localStorage or API
    const savedResults = localStorage.getItem('planetaRealResults');
    if (savedResults) {
        try {
            const results = JSON.parse(savedResults);
            updateUserStats(results);
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    }
}

function updateUserStats(results) {
    // Update user statistics based on saved results
    const scoreElement = document.querySelector('.score-value');
    if (scoreElement && results.result) {
        scoreElement.textContent = results.result.totalCO2;
    }
}

// Challenge management functions
function acceptChallenge(challengeId) {
    console.log('Accepting challenge:', challengeId);
    
    // Add challenge to active challenges
    const challenges = getActiveChallenges();
    const newChallenge = {
        id: challengeId,
        acceptedAt: new Date().toISOString(),
        progress: 0
    };
    
    challenges.push(newChallenge);
    localStorage.setItem('activeChallenges', JSON.stringify(challenges));
    
    if (window.PlanetaReal && window.PlanetaReal.showNotification) {
        window.PlanetaReal.showNotification('Desafio aceito com sucesso!', 'success');
    }
    
    // Reload challenges display
    loadActiveChallenges();
}

function updateChallengeProgress(challengeId) {
    console.log('Updating progress for challenge:', challengeId);
    
    const challenges = getActiveChallenges();
    const challenge = challenges.find(c => c.id === challengeId);
    
    if (challenge) {
        challenge.progress += 25; // Increment by 25%
        if (challenge.progress >= 100) {
            challenge.completedAt = new Date().toISOString();
            challenge.progress = 100;
        }
        
        localStorage.setItem('activeChallenges', JSON.stringify(challenges));
        
        if (window.PlanetaReal && window.PlanetaReal.showNotification) {
            if (challenge.progress >= 100) {
                window.PlanetaReal.showNotification('Desafio concluído! Parabéns!', 'success');
            } else {
                window.PlanetaReal.showNotification('Progresso atualizado!', 'info');
            }
        }
        
        // Reload challenges display
        loadActiveChallenges();
    }
}

function getActiveChallenges() {
    const saved = localStorage.getItem('activeChallenges');
    return saved ? JSON.parse(saved) : [];
}

function loadActiveChallenges() {
    const challenges = getActiveChallenges();
    const challengesContainer = document.querySelector('.challenges-list');
    
    if (challengesContainer) {
        challengesContainer.innerHTML = '';
        
        challenges.forEach(challenge => {
            const challengeElement = createChallengeElement(challenge);
            challengesContainer.appendChild(challengeElement);
        });
    }
}

function createChallengeElement(challenge) {
    const div = document.createElement('div');
    div.className = 'challenge-item';
    
    const challengeData = getChallengeData(challenge.id);
    
    div.innerHTML = `
        <div class="challenge-info">
            <h4>${challengeData.title}</h4>
            <p>${challengeData.description}</p>
            <div class="challenge-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${challenge.progress}%"></div>
                </div>
                <span>${challenge.progress}%</span>
            </div>
        </div>
        <div class="challenge-reward ${challenge.progress >= 100 ? 'completed' : ''}">
            <i class="fas ${challenge.progress >= 100 ? 'fa-check-circle' : 'fa-star'}"></i>
            <span>${challenge.progress >= 100 ? 'Concluído!' : `+${challengeData.points} pts`}</span>
        </div>
    `;
    
    return div;
}

function getChallengeData(challengeId) {
    // Mock challenge data - in a real app, this would come from an API
    const challenges = {
        1: {
            title: 'Semana Sem Carro',
            description: 'Use apenas transporte público ou bicicleta',
            points: 100
        },
        2: {
            title: 'Reduzir Desperdício',
            description: 'Diminua o lixo em 30% esta semana',
            points: 75
        },
        3: {
            title: 'Eficiência Energética',
            description: 'Troque 5 lâmpadas por LED',
            points: 50
        }
    };
    
    return challenges[challengeId] || {
        title: 'Desafio Desconhecido',
        description: 'Descrição não disponível',
        points: 0
    };
}

// Recommendation functions
function applyRecommendation(recommendationId) {
    console.log('Applying recommendation:', recommendationId);
    
    if (window.PlanetaReal && window.PlanetaReal.showNotification) {
        window.PlanetaReal.showNotification('Recomendação aplicada!', 'success');
    }
}

// Achievement functions
function unlockAchievement(achievementId) {
    console.log('Unlocking achievement:', achievementId);
    
    const achievements = getUnlockedAchievements();
    if (!achievements.includes(achievementId)) {
        achievements.push(achievementId);
        localStorage.setItem('unlockedAchievements', JSON.stringify(achievements));
        
        if (window.PlanetaReal && window.PlanetaReal.showNotification) {
            window.PlanetaReal.showNotification('Nova conquista desbloqueada!', 'success');
        }
    }
}

function getUnlockedAchievements() {
    const saved = localStorage.getItem('unlockedAchievements');
    return saved ? JSON.parse(saved) : [];
}

// Export functions for global access
window.acceptChallenge = acceptChallenge;
window.updateChallengeProgress = updateChallengeProgress;
window.applyRecommendation = applyRecommendation;
window.unlockAchievement = unlockAchievement; 