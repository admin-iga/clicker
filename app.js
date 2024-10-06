document.addEventListener('DOMContentLoaded', (event) => {
    let score = 0;
    let autoClickerCount = 0;
    let multiplier = 1;
    const clickButton = document.getElementById('click-button');
    const scoreDisplay = document.getElementById('score');
    const store = document.getElementById('store');
    const openStoreButton = document.getElementById('open-store');
    const buyAutoClickerButton = document.getElementById('buy-auto-clicker');
    const buyMultiplierButton = document.getElementById('buy-multiplier');
    const bonusMessage = document.getElementById('bonus-message');

    clickButton.addEventListener('click', () => {
        score += 1 * multiplier;
        scoreDisplay.textContent = score;
        checkForBonus();
        checkForMilestones(); // Проверяем достижения
    });

    // Убедимся, что обработчик для открытия магазина работает
    openStoreButton.addEventListener('click', () => {
        store.classList.toggle('hidden');
    });

    buyAutoClickerButton.addEventListener('click', () => {
        if (score >= 10) {
            score -= 10;
            autoClickerCount++;
            scoreDisplay.textContent = score;
            startAutoClicker();
        }
    });

    buyMultiplierButton.addEventListener('click', () => {
        if (score >= 50) {
            score -= 50;
            multiplier++;
            scoreDisplay.textContent = score;
        }
    });

    function startAutoClicker() {
        setInterval(() => {
            score += autoClickerCount * multiplier;
            scoreDisplay.textContent = score;
        }, 1000);
    }

    function checkForBonus() {
        if (score % 20 === 0 && score > 0) {
            bonusMessage.classList.remove('hidden');
            setTimeout(() => {
                bonusMessage.classList.add('hidden');
            }, 1000);
        }
    }

    // Проверка достижений и вывод уведомления
    function checkForMilestones() {
        if (score === 50) {
            alert('Поздравляем! Вы достигли 50 очков!');
        } else if (score === 100) {
            alert('Отлично! Вы достигли 100 очков!');
        } else if (score === 200) {
            alert('Великолепно! Вы достигли 200 очков!');
        }
        // Добавьте больше достижений здесь, если необходимо
    }
});
