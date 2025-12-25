// Конфигурация ссылок (ЗАМЕНИТЕ НА СВОИ!)
const LINKS = {
    download: "https://t.me/your_channel_link", // Ваш Telegram канал
    donate: "https://www.donationalerts.com/r/your_page", // Ваш DonationAlerts
    youtube: "https://youtube.com/your_channel",
    telegram: "https://t.me/your_telegram",
    tiktok: "https://tiktok.com/@your_profile"
};

// Обработчики кнопок
document.getElementById('downloadBtn').addEventListener('click', function() {
    // Простая анимация пульсации
    this.style.animation = 'pulse 0.5s';
    setTimeout(() => {
        this.style.animation = '';
        window.open(LINKS.download, '_blank');
    }, 500);
});

document.getElementById('donateBtn').addEventListener('click', function() {
    createCoinEffect(this);
    setTimeout(() => window.open(LINKS.donate, '_blank'), 800);
});

document.getElementById('youtubeBtn').addEventListener('click', function() {
    createParticleEffect(this, 0xFF0000); // Красный
    setTimeout(() => window.open(LINKS.youtube, '_blank'), 800);
});

document.getElementById('telegramBtn').addEventListener('click', function() {
    createParticleEffect(this, 0x0088cc); // Голубой
    setTimeout(() => window.open(LINKS.telegram, '_blank'), 800);
});

document.getElementById('tiktokBtn').addEventListener('click', function() {
    createParticleEffect(this, 0xFF0050, 0x00F2EA); // Розовый и голубой
    setTimeout(() => window.open(LINKS.tiktok, '_blank'), 800);
});

// Анимация появления скриншотов при прокрутке
const featureBlocks = document.querySelectorAll('.feature-block');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

featureBlocks.forEach(block => observer.observe(block));

// Эффект монеток для кнопки доната
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

// Эффект частиц для соцсетей
function createParticleEffect(button, color1, color2 = null) {
    // Простая CSS-анимация вместо Three.js для экономии ресурсов
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
        
        // Чередование цветов если их два
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

/* Эффект для кнопки скачивания */
.download-btn:hover {
    animation: download-glow 2s infinite;
}

@keyframes download-glow {
    0%, 100% {
        box-shadow: 0 8px 20px rgba(71, 118, 230, 0.5);
    }
    50% {
        box-shadow: 0 8px 30px rgba(142, 84, 233, 0.8), 0 0 40px rgba(71, 118, 230, 0.4);
    }
}

// Добавляем CSS для анимации пульсации
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;

document.head.appendChild(style);
