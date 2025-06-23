// Challenges JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initChallenges();
});

function initChallenges() {
    initFilters();
    initChallengeCards();
    loadUserChallenges();
}

function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const filterTabs = document.querySelectorAll('.filter-tab');
    
    // Category filters
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            const difficulty = this.getAttribute('data-difficulty');
            
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Apply filters
            if (filter) {
                filterChallengesByCategory(filter);
            }
            if (difficulty) {
                filterChallengesByDifficulty(difficulty);
            }
        });
    });
    
    // Post filters
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Apply post filters
            filterPosts(filter);
        });
    });
}

function filterChallengesByCategory(category) {
    const challengeCards = document.querySelectorAll('.challenge-card');
    
    challengeCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            card.classList.add('fade-in');
        } else {
            card.style.display = 'none';
            card.classList.remove('fade-in');
        }
    });
}

function filterChallengesByDifficulty(difficulty) {
    const challengeCards = document.querySelectorAll('.challenge-card');
    
    challengeCards.forEach(card => {
        const cardDifficulty = card.getAttribute('data-difficulty');
        
        if (difficulty === 'all' || cardDifficulty === difficulty) {
            card.style.display = 'block';
            card.classList.add('fade-in');
        } else {
            card.style.display = 'none';
            card.classList.remove('fade-in');
        }
    });
}

function filterPosts(filter) {
    const posts = document.querySelectorAll('.post-card');
    
    posts.forEach(post => {
        const postCategory = post.getAttribute('data-category');
        
        if (filter === 'all' || postCategory === filter) {
            post.style.display = 'block';
            post.classList.add('fade-in');
        } else {
            post.style.display = 'none';
            post.classList.remove('fade-in');
        }
    });
}

function initChallengeCards() {
    const challengeCards = document.querySelectorAll('.challenge-card');
    
    challengeCards.forEach(card => {
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Add click handlers for option cards
        const optionCards = card.querySelectorAll('.option-card');
        optionCards.forEach(option => {
            option.addEventListener('click', function() {
                const siblings = this.parentElement.querySelectorAll('.option-card');
                siblings.forEach(sib => sib.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
    });
}

function loadUserChallenges() {
    // Load user's active challenges from localStorage
    const activeChallenges = getActiveChallenges();
    updateActiveChallengesDisplay(activeChallenges);
}

function getActiveChallenges() {
    const saved = localStorage.getItem('activeChallenges');
    return saved ? JSON.parse(saved) : [];
}

function updateActiveChallengesDisplay(activeChallenges) {
    const activeChallengesContainer = document.querySelector('.active-challenges');
    
    if (activeChallengesContainer) {
        // Clear existing content
        activeChallengesContainer.innerHTML = '';
        
        // Add active challenges
        activeChallenges.forEach(challenge => {
            const challengeElement = createActiveChallengeElement(challenge);
            activeChallengesContainer.appendChild(challengeElement);
        });
        
        // If no active challenges, show message
        if (activeChallenges.length === 0) {
            activeChallengesContainer.innerHTML = `
                <div class="no-challenges">
                    <i class="fas fa-trophy"></i>
                    <h3>Nenhum desafio ativo</h3>
                    <p>Explore os desafios disponíveis e comece sua jornada sustentável!</p>
                </div>
            `;
        }
    }
}

function createActiveChallengeElement(challenge) {
    const div = document.createElement('div');
    div.className = 'challenge-card active';
    div.setAttribute('data-category', challenge.category || 'general');
    div.setAttribute('data-difficulty', challenge.difficulty || 'medium');
    
    const challengeData = getChallengeData(challenge.id);
    
    div.innerHTML = `
        <div class="challenge-header">
            <div class="challenge-icon">
                <i class="${challengeData.icon}"></i>
            </div>
            <div class="challenge-status active">
                <span>Em andamento</span>
            </div>
        </div>
        <div class="challenge-content">
            <h3>${challengeData.title}</h3>
            <p>${challengeData.description}</p>
            <div class="challenge-progress">
                <div class="progress-info">
                    <span>Progresso: ${challenge.progress}%</span>
                    <span>${challenge.progress}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${challenge.progress}%"></div>
                </div>
            </div>
            <div class="challenge-rewards">
                <div class="reward">
                    <i class="fas fa-star"></i>
                    <span>+${challengeData.points} pontos</span>
                </div>
                <div class="reward">
                    <i class="fas fa-medal"></i>
                    <span>Badge "${challengeData.badge}"</span>
                </div>
            </div>
        </div>
        <div class="challenge-actions">
            <button class="btn btn-primary" onclick="updateProgress(${challenge.id})">
                <i class="fas fa-check"></i>
                Marcar como feito
            </button>
            <button class="btn btn-secondary" onclick="viewDetails(${challenge.id})">
                <i class="fas fa-info-circle"></i>
                Detalhes
            </button>
        </div>
    `;
    
    return div;
}

function getChallengeData(challengeId) {
    // Mock challenge data
    const challenges = {
        1: {
            title: 'Semana Sem Carro',
            description: 'Use apenas transporte público, bicicleta ou caminhe por 7 dias consecutivos.',
            points: 100,
            badge: 'Ciclista Verde',
            icon: 'fas fa-bicycle',
            category: 'transport',
            difficulty: 'medium'
        },
        2: {
            title: 'Reduzir Desperdício',
            description: 'Diminua o desperdício de comida em 50% esta semana.',
            points: 75,
            badge: 'Anti-Desperdício',
            icon: 'fas fa-utensils',
            category: 'food',
            difficulty: 'easy'
        },
        3: {
            title: 'Eficiência Energética',
            description: 'Troque 5 lâmpadas incandescentes por LED.',
            points: 50,
            badge: 'Eficiência',
            icon: 'fas fa-lightbulb',
            category: 'energy',
            difficulty: 'easy'
        },
        4: {
            title: 'Vegano por 30 dias',
            description: 'Adote uma dieta vegana por um mês completo.',
            points: 300,
            badge: 'Vegano',
            icon: 'fas fa-seedling',
            category: 'food',
            difficulty: 'hard'
        },
        5: {
            title: 'Zero Plástico',
            description: 'Evite usar plásticos descartáveis por 7 dias.',
            points: 80,
            badge: 'Zero Plástico',
            icon: 'fas fa-recycle',
            category: 'waste',
            difficulty: 'easy'
        },
        6: {
            title: 'Consumo Consciente',
            description: 'Compre apenas produtos de segunda mão por 30 dias.',
            points: 250,
            badge: 'Consciente',
            icon: 'fas fa-shopping-bag',
            category: 'consumption',
            difficulty: 'hard'
        },
        7: {
            title: 'Energia Renovável',
            description: 'Instale painéis solares ou mude para energia renovável.',
            points: 500,
            badge: 'Renovável',
            icon: 'fas fa-solar-panel',
            category: 'energy',
            difficulty: 'hard'
        }
    };
    
    return challenges[challengeId] || {
        title: 'Desafio Desconhecido',
        description: 'Descrição não disponível',
        points: 0,
        badge: 'Desconhecido',
        icon: 'fas fa-question',
        category: 'general',
        difficulty: 'medium'
    };
}

// Global functions for onclick handlers
window.acceptChallenge = function(challengeId) {
    console.log('Accepting challenge:', challengeId);
    
    const challengeData = getChallengeData(challengeId);
    const newChallenge = {
        id: challengeId,
        category: challengeData.category,
        difficulty: challengeData.difficulty,
        acceptedAt: new Date().toISOString(),
        progress: 0
    };
    
    const activeChallenges = getActiveChallenges();
    activeChallenges.push(newChallenge);
    localStorage.setItem('activeChallenges', JSON.stringify(activeChallenges));
    
    if (window.PlanetaReal && window.PlanetaReal.showNotification) {
        window.PlanetaReal.showNotification(`Desafio "${challengeData.title}" aceito!`, 'success');
    }
    
    // Reload display
    loadUserChallenges();
};

window.updateProgress = function(challengeId) {
    console.log('Updating progress for challenge:', challengeId);
    
    const activeChallenges = getActiveChallenges();
    const challenge = activeChallenges.find(c => c.id === challengeId);
    
    if (challenge) {
        challenge.progress += 25; // Increment by 25%
        if (challenge.progress >= 100) {
            challenge.completedAt = new Date().toISOString();
            challenge.progress = 100;
            
            // Move to completed challenges
            const completedChallenges = getCompletedChallenges();
            completedChallenges.push(challenge);
            localStorage.setItem('completedChallenges', JSON.stringify(completedChallenges));
            
            // Remove from active challenges
            const updatedActive = activeChallenges.filter(c => c.id !== challengeId);
            localStorage.setItem('activeChallenges', JSON.stringify(updatedActive));
            
            if (window.PlanetaReal && window.PlanetaReal.showNotification) {
                window.PlanetaReal.showNotification('Desafio concluído! Parabéns! 🎉', 'success');
            }
        } else {
            localStorage.setItem('activeChallenges', JSON.stringify(activeChallenges));
            
            if (window.PlanetaReal && window.PlanetaReal.showNotification) {
                window.PlanetaReal.showNotification('Progresso atualizado!', 'info');
            }
        }
        
        // Reload display
        loadUserChallenges();
    }
};

window.viewDetails = function(challengeId) {
    console.log('Viewing details for challenge:', challengeId);
    
    const challengeData = getChallengeData(challengeId);
    
    // Update modal content
    const modal = document.getElementById('challenge-modal');
    if (modal) {
        const title = modal.querySelector('#modal-challenge-title');
        const description = modal.querySelector('#modal-challenge-description');
        const steps = modal.querySelector('#modal-challenge-steps');
        const icon = modal.querySelector('.challenge-detail-icon i');
        
        if (title) title.textContent = challengeData.title;
        if (description) description.textContent = challengeData.description;
        if (icon) icon.className = challengeData.icon;
        
        // Show modal
        modal.style.display = 'block';
    }
};

function getCompletedChallenges() {
    const saved = localStorage.getItem('completedChallenges');
    return saved ? JSON.parse(saved) : [];
}

// Modal functions
function closeModal() {
    const modal = document.getElementById('challenge-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Export functions for global access
window.closeModal = closeModal; 