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

    let chatId = null; // Переменная для хранения chat_id

    // Функция для получения chat_id (замените на свой метод)
    function getChatId() {
        // Здесь вы можете задать свой метод получения chat_id
        // Например, если вы сохраняете его на сервере при старте игры
        chatId = 'YOUR_CHAT_ID'; // Получить из состояния приложения или сервера
    }

    // Вызываем функцию получения chat_id при старте игры
    getChatId();

    clickButton.addEventListener('click', () => {
        score += 1 * multiplier;
        scoreDisplay.textContent = score;
        checkForBonus();
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

    // Интеграция с Telegram API (отправка сообщения при достижении очков)
    function sendTelegramNotification(message) {
        const apiUrl = `https://api.telegram.org/bot${'7285169360:AAGiOclAJdmiWMSsKvgd7BOFd43c8bdJ2QA'}/sendMessage`;
        if (chatId) {
            axios.post(apiUrl, {
                chat_id: chatId,
                text: message
            }).then(response => {
                console.log('Уведомление отправлено в Telegram');
            }).catch(error => {
                console.error('Ошибка при отправке уведомления в Telegram', error);
            });
        } else {
            console.error('chat_id не установлен!');
        }
    }

    // Пример отправки уведомления при достижении 100 очков
    setInterval(() => {
        if (score >= 100) {
            sendTelegramNotification(`Поздравляем! Вы достигли ${score} очков в Хамстер Комбат!`);
        }
    }, 5000);
});
