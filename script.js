const LINKS = {
    download: "https://t.me/+l7UnOI80MvM3ODFi",
    donate: "https://www.donationalerts.com/r/humorist1337",
    youtube: "https://www.youtube.com/channel/UCd2hWCQZaG6IlypY9FuLuBQ",
    telegram: "https://t.me/StandJokeTG",
    tiktok: "https://tiktok.com/@standjoke"
};

document.getElementById('downloadBtn').addEventListener('click', function() {
    createDownloadEffect(this);
    setTimeout(() => {
        window.open(LINKS.download, '_blank');
    }, 600);
});

document.getElementById('donateBtn').addEventListener('click', function() {
    createCoinEffect(this);
    setTimeout(() => window.open(LINKS.donate, '_blank'), 800);
});

document.getElementById('youtubeBtn').addEventListener('click', function() {
    createParticleEffect(this, 0xFF0000);
    setTimeout(() => window.open(LINKS.youtube, '_blank'), 800);
});

document.getElementById('telegramBtn').addEventListener('click', function() {
    createParticleEffect(this, 0x0088cc);
    setTimeout(() => window.open(LINKS.telegram, '_blank'), 800);
});

document.getElementById('tiktokBtn').addEventListener('click', function() {
    createParticleEffect(this, 0xFF0050, 0x00F2EA);
    setTimeout(() => window.open(LINKS.tiktok, '_blank'), 800);
});

const featureBlocks = document.querySelectorAll('.feature-block');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

featureBlocks.forEach(block => observer.observe(block));

function createDownloadEffect(button) {
    const container = document.getElementById('effectsContainer');
    const symbols = ['💾', '⬇️', '🎮', '🚀', '⚡', '🔧', '🛠️', '📦'];
    
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
        particle.style.position = 'fixed';
        particle.style.left = (button.getBoundingClientRect().left + button.offsetWidth / 2) + 'px';
        particle.style.top = (button.getBoundingClientRect().top + button.offsetHeight / 2) + 'px';
        particle.style.fontSize = '20px';
        particle.style.zIndex = '1000';
        particle.style.pointerEvents = 'none';
        particle.style.userSelect = 'none';
        particle.style.opacity = '0.8';
        
        const angle = Math.random() * Math.PI * 2;
        const distance = 40 + Math.random() * 60;
        const duration = 700 + Math.random() * 300;
        
        container.appendChild(particle);
        
        const animation = particle.animate([
            { 
                transform: 'translate(0, 0) scale(1) rotate(0deg)',
                opacity: 1 
            },
            { 
                transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0) rotate(180deg)`,
                opacity: 0 
            }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        });
        
        animation.onfinish = () => particle.remove();
    }
}

function createCoinEffect(button) {
    const container = document.getElementById('effectsContainer');
    for (let i = 0; i < 15; i++) {
        const coin = document.createElement('div');
        coin.innerHTML = '🪙';
        coin.style.position = 'fixed';
        coin.style.left = (button.getBoundingClientRect().left + button.offsetWidth / 2) + 'px';
        coin.style.top = (button.getBoundingClientRect().top + button.offsetHeight / 2) + 'px';
        coin.style.fontSize = '24px';
        coin.style.zIndex = '1000';
        coin.style.pointerEvents = 'none';
        coin.style.userSelect = 'none';
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = 2 + Math.random() * 2;
        const life = 1000 + Math.random() * 500;
        
        container.appendChild(coin);
        
        const startTime = Date.now();
        function animate() {
            const elapsed = Date.now() - startTime;
            if (elapsed > life) {
                coin.remove();
                return;
            }
            
            const progress = elapsed / life;
            const x = Math.cos(angle) * velocity * elapsed * 0.05;
            const y = Math.sin(angle) * velocity * elapsed * 0.05 - (progress * 100);
            
            coin.style.transform = `translate(${x}px, ${y}px) rotate(${elapsed * 0.2}deg)`;
            coin.style.opacity = 1 - progress;
            
            requestAnimationFrame(animate);
        }
        animate();
    }
}

function createParticleEffect(button, color1, color2 = null) {
    const container = document.getElementById('effectsContainer');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.width = '10px';
        particle.style.height = '10px';
        particle.style.position = 'fixed';
        particle.style.left = (button.getBoundingClientRect().left + button.offsetWidth / 2) + 'px';
        particle.style.top = (button.getBoundingClientRect().top + button.offsetHeight / 2) + 'px';
        particle.style.borderRadius = '50%';
        particle.style.zIndex = '1000';
        particle.style.pointerEvents = 'none';
        
        const color = color2 && i % 2 === 0 ? 
            `rgb(${color2 >> 16}, ${(color2 >> 8) & 255}, ${color2 & 255})` :
            `rgb(${color1 >> 16}, ${(color1 >> 8) & 255}, ${color1 & 255})`;
        
        particle.style.backgroundColor = color;
        particle.style.boxShadow = `0 0 10px ${color}`;
        
        container.appendChild(particle);
        
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 80;
        const duration = 600 + Math.random() * 400;
        
        const animation = particle.animate([
            { 
                transform: 'translate(0, 0) scale(1)',
                opacity: 1 
            },
            { 
                transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                opacity: 0 
            }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
        });
        
        animation.onfinish = () => particle.remove();
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);
