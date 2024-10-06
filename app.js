document.addEventListener('DOMContentLoaded', (event) => {
    let score = 0;
    let autoClickerCount = 0;
    let multiplier = 1;
    let superClickActive = false;
    let superClickDuration = 0;
    const clickButton = document.getElementById('click-button');
    const scoreDisplay = document.getElementById('score');
    const store = document.getElementById('store');
    const openStoreButton = document.getElementById('open-store');
    const buyAutoClickerButton = document.getElementById('buy-auto-clicker');
    const buyMultiplierButton = document.getElementById('buy-multiplier');
    const buySuperClickButton = document.getElementById('buy-super-click');
    const buySpeedUpButton = document.getElementById('buy-speed-up');
    const buyBonusTimeButton = document.getElementById('buy-bonus-time');
    const bonusMessage = document.getElementById('bonus-message');

    clickButton.addEventListener('click', () => {
        let pointsToAdd = superClickActive ? 2 * multiplier : 1 * multiplier;
        score += pointsToAdd;
        scoreDisplay.textContent = score;
        checkForBonus();
        checkForMilestones(); // Проверяем достижения
    });

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

    buySuperClickButton.addEventListener('click', () => {
        if (score >= 100) {
            score -= 100;
            superClickActive = true;
            superClickDuration = 5; // Установка времени действия
            scoreDisplay.textContent = score;
            alert('Супер-клик активирован на 5 секунд!');
            setTimeout(() => {
                superClickActive = false;
                alert('Супер-клик закончился!');
            }, 5000);
        }
    });

    buySpeedUpButton.addEventListener('click', () => {
        if (score >= 150) {
            score -= 150;
            // Увеличение скорости авто-кликера, можно добавить свою логику
            alert('Авто-кликер ускорен!');
        }
    });

    buyBonusTimeButton.addEventListener('click', () => {
        if (score >= 200) {
            score -= 200;
            autoClickerCount += 10; // Увеличение времени работы авто-кликера
            scoreDisplay.textContent = score;
            alert('Вы получили бонусное время на авто-кликера!');
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
