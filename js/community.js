// Community JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initCommunity();
});

function initCommunity() {
    initPostFilters();
    initPostActions();
    initCreatePost();
    loadPosts();
}

function initPostFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const sortSelect = document.querySelector('.sort-select');
    
    // Filter tabs
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Apply filter
            filterPosts(filter);
        });
    });
    
    // Sort select
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortPosts(this.value);
        });
    }
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

function sortPosts(sortBy) {
    const postsContainer = document.querySelector('.posts-feed');
    const posts = Array.from(postsContainer.querySelectorAll('.post-card'));
    
    posts.sort((a, b) => {
        switch(sortBy) {
            case 'recent':
                return new Date(b.getAttribute('data-date')) - new Date(a.getAttribute('data-date'));
            case 'popular':
                return parseInt(b.getAttribute('data-likes')) - parseInt(a.getAttribute('data-likes'));
            case 'trending':
                return parseInt(b.getAttribute('data-comments')) - parseInt(a.getAttribute('data-comments'));
            default:
                return 0;
        }
    });
    
    // Reorder posts in DOM
    posts.forEach(post => postsContainer.appendChild(post));
}

function initPostActions() {
    // Like functionality
    document.addEventListener('click', function(e) {
        if (e.target.closest('.action-btn') && e.target.closest('.action-btn').textContent.includes('heart')) {
            const likeBtn = e.target.closest('.action-btn');
            const postCard = likeBtn.closest('.post-card');
            
            if (likeBtn.classList.contains('liked')) {
                unlikePost(likeBtn, postCard);
            } else {
                likePost(likeBtn, postCard);
            }
        }
    });
    
    // Comment functionality
    document.addEventListener('click', function(e) {
        if (e.target.closest('.comment-input')) {
            const commentInput = e.target.closest('.comment-input');
            const sendBtn = commentInput.parentElement.querySelector('.btn-send');
            
            if (sendBtn) {
                sendBtn.addEventListener('click', function() {
                    addComment(commentInput);
                });
            }
        }
    });
}

function likePost(likeBtn, postCard) {
    likeBtn.classList.add('liked');
    const likeCount = likeBtn.querySelector('span');
    const currentLikes = parseInt(likeCount.textContent);
    likeCount.textContent = currentLikes + 1;
    
    // Add animation
    postCard.classList.add('liked');
    setTimeout(() => postCard.classList.remove('liked'), 300);
    
    if (window.PlanetaReal && window.PlanetaReal.showNotification) {
        window.PlanetaReal.showNotification('Post curtido!', 'success');
    }
}

function unlikePost(likeBtn, postCard) {
    likeBtn.classList.remove('liked');
    const likeCount = likeBtn.querySelector('span');
    const currentLikes = parseInt(likeCount.textContent);
    likeCount.textContent = Math.max(0, currentLikes - 1);
    
    if (window.PlanetaReal && window.PlanetaReal.showNotification) {
        window.PlanetaReal.showNotification('Curtida removida', 'info');
    }
}

function addComment(commentInput) {
    const comment = commentInput.value.trim();
    if (!comment) return;
    
    const postCard = commentInput.closest('.post-card');
    const commentsContainer = postCard.querySelector('.post-comments');
    
    // Create new comment element
    const commentElement = document.createElement('div');
    commentElement.className = 'comment';
    commentElement.innerHTML = `
        <img src="https://via.placeholder.com/30" alt="Seu avatar" class="comment-avatar">
        <div class="comment-content">
            <div class="comment-header">
                <span class="comment-author">Você</span>
                <span class="comment-time">Agora</span>
            </div>
            <p>${comment}</p>
        </div>
    `;
    
    // Insert before the add-comment div
    const addCommentDiv = commentsContainer.querySelector('.add-comment');
    commentsContainer.insertBefore(commentElement, addCommentDiv);
    
    // Clear input
    commentInput.value = '';
    
    // Update comment count
    const commentCount = postCard.querySelector('.action-btn:nth-child(2) span');
    if (commentCount) {
        const currentComments = parseInt(commentCount.textContent);
        commentCount.textContent = currentComments + 1;
    }
    
    if (window.PlanetaReal && window.PlanetaReal.showNotification) {
        window.PlanetaReal.showNotification('Comentário adicionado!', 'success');
    }
}

function initCreatePost() {
    const createPostBtn = document.querySelector('.btn[onclick="createPost()"]');
    if (createPostBtn) {
        createPostBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openCreatePostModal();
        });
    }
    
    // Initialize form submission
    const createPostForm = document.querySelector('.create-post-form');
    if (createPostForm) {
        createPostForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitPost(this);
        });
    }
}

function openCreatePostModal() {
    const modal = document.getElementById('create-post-modal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function submitPost(form) {
    const formData = new FormData(form);
    const postData = {
        type: form.querySelector('.post-type-select').value,
        title: form.querySelector('.post-title-input').value,
        content: form.querySelector('.post-content-input').value,
        tags: form.querySelector('.post-tags-input').value,
        date: new Date().toISOString(),
        author: 'João Silva',
        likes: 0,
        comments: 0
    };
    
    // Validate form
    if (!postData.title.trim() || !postData.content.trim()) {
        if (window.PlanetaReal && window.PlanetaReal.showNotification) {
            window.PlanetaReal.showNotification('Por favor, preencha todos os campos obrigatórios', 'error');
        }
        return;
    }
    
    // Add post to feed
    addPostToFeed(postData);
    
    // Close modal
    const modal = document.getElementById('create-post-modal');
    if (modal) {
        modal.style.display = 'none';
    }
    
    // Reset form
    form.reset();
    
    if (window.PlanetaReal && window.PlanetaReal.showNotification) {
        window.PlanetaReal.showNotification('Post criado com sucesso!', 'success');
    }
}

function addPostToFeed(postData) {
    const postsFeed = document.querySelector('.posts-feed');
    const postElement = createPostElement(postData);
    
    // Insert at the beginning of the feed
    postsFeed.insertBefore(postElement, postsFeed.firstChild);
}

function createPostElement(postData) {
    const article = document.createElement('article');
    article.className = 'post-card';
    article.setAttribute('data-category', postData.type);
    article.setAttribute('data-date', postData.date);
    article.setAttribute('data-likes', postData.likes);
    article.setAttribute('data-comments', postData.comments);
    
    const typeIcons = {
        general: 'fas fa-globe',
        achievement: 'fas fa-trophy',
        tip: 'fas fa-lightbulb',
        question: 'fas fa-question-circle',
        event: 'fas fa-calendar'
    };
    
    const typeLabels = {
        general: 'Post Geral',
        achievement: 'Conquista',
        tip: 'Dica',
        question: 'Pergunta',
        event: 'Evento'
    };
    
    article.innerHTML = `
        <div class="post-header">
            <div class="post-author">
                <img src="https://via.placeholder.com/50" alt="${postData.author}" class="author-avatar">
                <div class="author-info">
                    <h4>${postData.author}</h4>
                    <span class="post-meta">Agora • <i class="${typeIcons[postData.type]}"></i> ${typeLabels[postData.type]}</span>
                </div>
            </div>
            <div class="post-actions">
                <button class="btn-icon" title="Mais opções">
                    <i class="fas fa-ellipsis-h"></i>
                </button>
            </div>
        </div>
        
        <div class="post-content">
            <h3>${postData.title}</h3>
            <p>${postData.content}</p>
            ${postData.tags ? `<div class="post-tags">${postData.tags.split(',').map(tag => `<span class="tag">${tag.trim()}</span>`).join('')}</div>` : ''}
        </div>
        
        <div class="post-actions-bar">
            <button class="action-btn" onclick="likePost(this, this.closest('.post-card'))">
                <i class="fas fa-heart"></i>
                <span>${postData.likes}</span>
            </button>
            <button class="action-btn" onclick="commentPost(this, this.closest('.post-card'))">
                <i class="fas fa-comment"></i>
                <span>${postData.comments}</span>
            </button>
            <button class="action-btn" onclick="sharePost(this, this.closest('.post-card'))">
                <i class="fas fa-share"></i>
                <span>Compartilhar</span>
            </button>
            <button class="action-btn" onclick="savePost(this, this.closest('.post-card'))">
                <i class="fas fa-bookmark"></i>
                <span>Salvar</span>
            </button>
        </div>
        
        <div class="post-comments">
            <div class="add-comment">
                <img src="https://via.placeholder.com/30" alt="Seu avatar" class="comment-avatar">
                <input type="text" placeholder="Adicionar comentário..." class="comment-input">
                <button class="btn-send">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    `;
    
    return article;
}

function loadPosts() {
    // Load posts from localStorage or API
    const savedPosts = localStorage.getItem('communityPosts');
    if (savedPosts) {
        try {
            const posts = JSON.parse(savedPosts);
            posts.forEach(postData => {
                const postElement = createPostElement(postData);
                const postsFeed = document.querySelector('.posts-feed');
                postsFeed.appendChild(postElement);
            });
        } catch (error) {
            console.error('Error loading posts:', error);
        }
    }
}

// Global functions for onclick handlers
window.createPost = function() {
    openCreatePostModal();
};

window.joinGroup = function() {
    if (window.PlanetaReal && window.PlanetaReal.showNotification) {
        window.PlanetaReal.showNotification('Funcionalidade de grupos em desenvolvimento!', 'info');
    }
};

window.shareAchievement = function() {
    if (window.PlanetaReal && window.PlanetaReal.showNotification) {
        window.PlanetaReal.showNotification('Compartilhando conquista...', 'info');
    }
};

window.findFriends = function() {
    if (window.PlanetaReal && window.PlanetaReal.showNotification) {
        window.PlanetaReal.showNotification('Procurando amigos...', 'info');
    }
};

window.createEvent = function() {
    if (window.PlanetaReal && window.PlanetaReal.showNotification) {
        window.PlanetaReal.showNotification('Criando evento...', 'info');
    }
};

window.suggestIdea = function() {
    if (window.PlanetaReal && window.PlanetaReal.showNotification) {
        window.PlanetaReal.showNotification('Enviando sugestão...', 'info');
    }
};

window.likePost = function(btn, postCard) {
    if (btn.classList.contains('liked')) {
        unlikePost(btn, postCard);
    } else {
        likePost(btn, postCard);
    }
};

window.commentPost = function(btn, postCard) {
    const commentInput = postCard.querySelector('.comment-input');
    if (commentInput) {
        commentInput.focus();
    }
};

window.sharePost = function(btn, postCard) {
    if (window.PlanetaReal && window.PlanetaReal.showNotification) {
        window.PlanetaReal.showNotification('Compartilhando post...', 'info');
    }
};

window.savePost = function(btn, postCard) {
    if (window.PlanetaReal && window.PlanetaReal.showNotification) {
        window.PlanetaReal.showNotification('Post salvo!', 'success');
    }
};

window.joinEvent = function(eventId) {
    if (window.PlanetaReal && window.PlanetaReal.showNotification) {
        window.PlanetaReal.showNotification('Participando do evento!', 'success');
    }
};

window.loadMorePosts = function() {
    if (window.PlanetaReal && window.PlanetaReal.showNotification) {
        window.PlanetaReal.showNotification('Carregando mais posts...', 'info');
    }
}; 