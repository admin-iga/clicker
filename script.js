let score = 0;
let attackPower = 1;

document.addEventListener("DOMContentLoaded", () => {
    const clickerButton = document.getElementById("clicker-button");
    const scoreElement = document.getElementById("score");
    const upgradeButton = document.getElementById("upgrade-attack");

    clickerButton.addEventListener("click", () => {
        score += attackPower;
        scoreElement.textContent = score;
    });

    upgradeButton.addEventListener("click", () => {
        if (score >= 10) {
            score -= 10;
            attackPower += 1;
            scoreElement.textContent = score;
            alert("Атака улучшена! Теперь атака: " + attackPower);
        } else {
            alert("Недостаточно очков для улучшения!");
        }
    });

    // Инициализация Telegram Web App
    const tg = window.Telegram.WebApp;
    tg.expand(); // Расширить веб-приложение на весь экран
});
