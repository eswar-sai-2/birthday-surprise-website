/* =================================================================
   Birthday Surprise — Interaction & Animation Logic
   Pure vanilla JavaScript. Well organized and commented.
================================================================= */

const CORRECT_DOB = {
    day: 28,
    month: 7,
    year: 2007
};

const LETTER_TEXT = `Happy Birthday, Akka! 🎉❤️

Today is a very special day because it's the birthday of a truly wonderful person.

Even though we are not related by blood, I have always respected you like an Akka. Your kindness, support, and positive nature make you a very special person in my life.

మనకి రక్త సంబంధం లేకపోయినా, నేను నిన్ను ఎప్పుడూ అక్కగానే గౌరవిస్తాను. ❤️

Your smile has the power to brighten someone's day, and your caring heart makes everyone around you feel comfortable.

నీ జీవితంలో ప్రతి రోజు ఆనందం, ఆరోగ్యం, విజయాలతో నిండిపోవాలని మనస్ఫూర్తిగా కోరుకుంటున్నాను.

May all your dreams come true, and may this new year of your life bring countless opportunities, beautiful memories, and endless happiness.

ఎప్పుడూ ఇలాగే నవ్వుతూ, సంతోషంగా, ఆరోగ్యంగా ఉండాలి. నీ ప్రతి కల నిజం కావాలి.

Thank you for being such a wonderful person.

జన్మదిన శుభాకాంక్షలు అక్క! 🎂❤️`;

const LETTER_SIGN = "Thank you for being such a wonderful person. Once again, Happy Birthday, Akka! May your smile always shine as brightly as it does today. ❤️🎉"

/* =======================================================
   Element References
======================================================= */
const loader = document.getElementById("loader");
const screens = Array.from(document.querySelectorAll(".screen"));
const progress = document.getElementById("progress");
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

let currentScreen = 1;
let musicStarted = false;

/* =======================================================
   Stars Background
======================================================= */

function buildStars() {

    const layer = document.getElementById("starsLayer");

    const count = window.innerWidth < 600 ? 60 : 110;

    for (let i = 0; i < count; i++) {

        const star = document.createElement("span");

        star.className = "star";

        star.style.setProperty("--s", (Math.random() * 2 + 1) + "px");

        star.style.setProperty("--d", (Math.random() * 3 + 2) + "s");

        star.style.left = Math.random() * 100 + "%";

        star.style.top = Math.random() * 100 + "%";

        layer.appendChild(star);

    }

}

/* =======================================================
   Floating Hearts
======================================================= */

function buildFloatingHearts() {

    const layer = document.getElementById("heartsLayer");

    const count = window.innerWidth < 600 ? 10 : 18;

    for (let i = 0; i < count; i++) {

        const heart = document.createElement("span");

        heart.className = "float-heart";

        heart.innerHTML = "❤";

        heart.style.left = Math.random() * 100 + "%";

        heart.style.fontSize = (Math.random() * 18 + 12) + "px";

        heart.style.setProperty("--d", (Math.random() * 8 + 8) + "s");

        heart.style.setProperty("--delay", (Math.random() * 8) + "s");

        heart.style.setProperty("--sc", (Math.random() * .6 + .7));

        layer.appendChild(heart);

    }

}

/* =======================================================
   Progress Dots
======================================================= */

function buildProgress() {

    screens.forEach((screen, index) => {

        const dot = document.createElement("span");

        dot.className = "dot";

        if (index === 0)
            dot.classList.add("active");

        progress.appendChild(dot);

    });

}

function updateProgress() {

    [...progress.children].forEach((dot, index) => {

        dot.classList.toggle("active", index === currentScreen - 1);

    });

}

/* =======================================================
   Screen Navigation
======================================================= */

function goToScreen(number) {

    if (number < 1 || number > screens.length)
        return;

    const previous = document.querySelector(".screen.active");

    const next = document.getElementById("screen-" + number);

    if (previous === next)
        return;

    if (previous)
        previous.classList.remove("active");

    next.classList.add("active");

    currentScreen = number;

    updateProgress();

    restartReveals(next);

    onScreenEnter(number);

}

function restartReveals(screen) {

    screen.querySelectorAll(".reveal,.reveal-zoom").forEach((element) => {

        element.style.animation = "none";

        void element.offsetWidth;

        element.style.animation = "";

    });

}

function onScreenEnter(screen) {

    switch (screen) {

        case 2:
            playGiftOpening();
            break;

        case 3:
            startCountdown();
            break;

        case 5:
            launchBalloons("balloons5");
            burstConfetti(60);
            break;

        case 8:
            typewriterLetter();
            break;

        case 9:
            buildCake();
            break;

        case 10:

        launchBalloons("balloons10");
        burstConfetti(90);
        startFireworks();

        break;

        case 11:

        finalHearts();

        break;

        }

    if (screen !== 10)
        stopFireworks();
}

function startCountdown() {

    const number = document.getElementById("countNumber");

    let count = 3;

    number.textContent = count;

    const timer = setInterval(() => {

        count--;

        if (count > 0) {

            number.textContent = count;

        } else {

            clearInterval(timer);

            number.innerHTML = "🎉";

            setTimeout(() => {

                goToScreen(4);

            }, 1000);

        }

    }, 1000);

}

/* =======================================================
   Screen 1 → Open Gift
======================================================= */

function openGift() {

    const gift = document.querySelector(".giftbox");

    if (gift) {

        gift.classList.add("gift-opening");

    }

    createSparkles();
    if (!musicStarted) {
        bgMusic.currentTime = 0;

        bgMusic.play()
        .then(() => {
        musicStarted = true;
        musicToggle.classList.add("playing");
    })
    .catch((err) => {
        console.log("Music error:", err);
    });
    }

    setTimeout(() => {

        goToScreen(2);

    },700);

}
/* =======================================================
   Screen 2 : Gift Opening Animation
======================================================= */

function playGiftOpening() {

    const box = document.getElementById("giftboxOpening");
    const lid = box.querySelector(".giftbox-lid");
    const caption = document.getElementById("openingCaption");
    const burst = document.getElementById("burst");

    lid.classList.remove("pop");
    caption.classList.remove("show");
    burst.innerHTML = "";

    setTimeout(() => {

        lid.classList.add("pop");

        spawnSparkles(burst, 26);

        caption.classList.add("show");

    }, 500);

    setTimeout(() => {

        box.style.transition = "transform 1s ease, opacity 1s ease";

        box.style.transform = "scale(2.6)";

        box.style.opacity = "0";

    }, 1900);

    setTimeout(() => {

        box.style.transform = "";

        box.style.opacity = "";

        goToScreen(3);

    }, 2900);

}

function spawnSparkles(container, count) {

    for (let i = 0; i < count; i++) {

        const spark = document.createElement("span");

        spark.className = "spark";

        const angle = Math.random() * Math.PI * 2;

        const distance = Math.random() * 150 + 40;

        const x = Math.cos(angle) * distance;

        const y = Math.sin(angle) * distance;

        const colors = [
            "#ffd77a",
            "#ff5fa2",
            "#ff9ec7",
            "#fff7fb"
        ];

        const color = colors[i % colors.length];

        spark.style.background = color;

        spark.style.boxShadow = `0 0 10px ${color}`;

        container.appendChild(spark);

        spark.animate(
            [
                {
                    transform: "translate(0,0) scale(1)",
                    opacity: 1
                },
                {
                    transform: `translate(${x}px,${y}px) scale(0)`,
                    opacity: 0
                }
            ],
            {
                duration: 900 + Math.random() * 500,
                easing: "cubic-bezier(0.2,0.7,0.3,1)",
                fill: "forwards"
            }
        );

    }

}

/* =======================================================
   DOB Verification
======================================================= */

function verifyDob() {

    const day = Number(document.getElementById("dobDay").value);

    const month = Number(document.getElementById("dobMonth").value);

    const year = Number(document.getElementById("dobYear").value);

    const error = document.getElementById("dobError");

    const card = document.querySelector(".lock-card");

    const icon = document.getElementById("lockIcon");

    const correct =
        day === CORRECT_DOB.day &&
        month === CORRECT_DOB.month &&
        year === CORRECT_DOB.year;

    if (correct) {

        error.textContent = "";

        icon.textContent = "🔓";

        icon.classList.add("unlocked");

        burstConfetti(50);

        setTimeout(() => {

            goToScreen(5);

        }, 1000);

    }

    else {

        error.textContent =
            "Oops! That's not correct. Please try again ❤️";

        card.classList.remove("shake");

        void card.offsetWidth;

        card.classList.add("shake");

    }

}

/* =======================================================
   Balloons
======================================================= */

function launchBalloons(id) {

    const container = document.getElementById(id);

    if (!container) return;

    if (container.dataset.filled === "true") return;

    const colors = [
        "#ff5fa2",
        "#7b3fe4",
        "#ffd77a",
        "#ff9ec7",
        "#fff7fb"
    ];

    const count = window.innerWidth < 600 ? 10 : 16;

    for (let i = 0; i < count; i++) {

        const balloon = document.createElement("div");

        balloon.className = "balloon";

        const color = colors[i % colors.length];

        balloon.style.background =
            `radial-gradient(circle at 35% 30%, rgba(255,255,255,.6), ${color})`;

        balloon.style.color = color;

        balloon.style.left = Math.random() * 92 + "%";

        balloon.style.setProperty(
            "--d",
            (Math.random() * 6 + 8) + "s"
        );

        balloon.style.setProperty(
            "--delay",
            (Math.random() * 6) + "s"
        );

        balloon.style.transform =
            `scale(${Math.random() * .5 + .7})`;

        container.appendChild(balloon);

    }

    container.dataset.filled = "true";

}

/* =======================================================
   Confetti
======================================================= */

function burstConfetti(amount) {

    const colors = [
        "#ff5fa2",
        "#7b3fe4",
        "#ffd77a",
        "#ff9ec7",
        "#fff7fb"
    ];

    const active = document.querySelector(".screen.active");

    if (!active) return;

    for (let i = 0; i < amount; i++) {

        const piece = document.createElement("span");

        piece.className = "confetti-piece";

        piece.style.left = Math.random() * 100 + "%";

        piece.style.background =
            colors[Math.floor(Math.random() * colors.length)];

        piece.style.setProperty(
            "--d",
            (Math.random() * 2 + 2) + "s"
        );

        piece.style.setProperty(
            "--delay",
            (Math.random() * .8) + "s"
        );

        if (Math.random() > .5) {

            piece.style.borderRadius = "50%";

        }

        active.appendChild(piece);

        setTimeout(() => {

            piece.remove();

        }, 4200);

    }

}
/* =======================================================
   Letter Typewriter
======================================================= */

let typingStarted = false;

function typewriterLetter() {

    if (typingStarted) return;

    typingStarted = true;

    const body = document.getElementById("letterText");
    const sign = document.getElementById("letterSign");

    body.textContent = "";
    sign.textContent = "";

    let i = 0;

    function type() {

        if (i < LETTER_TEXT.length) {

            body.textContent += LETTER_TEXT.charAt(i);

            i++;

            setTimeout(type, 35);

        } else {

            sign.textContent = LETTER_SIGN;
            sign.classList.add("show");

        }

    }

    type();

}

/* =======================================================
   Cake
======================================================= */

let candlesCreated = false;

function buildCake() {

    if (candlesCreated) return;

    candlesCreated = true;

    const candles = document.getElementById("candles");

    let blown = 0;

    for (let i = 0; i < 5; i++) {

        const candle = document.createElement("div");
        candle.className = "candle";

        candle.innerHTML = `
            <div class="flame"></div>
            <div class="smoke"></div>
        `;

        candle.addEventListener("click", () => {

            if (candle.classList.contains("out"))
                return;

            candle.classList.add("out");

            blown++;

            if (blown === 5) {

              // Big Confetti Celebration
              burstConfetti(150);

              // Celebration Message
              const hint = document.getElementById("cakeHint");
              hint.innerHTML = "🎂 Make a Wish! 🎉<br>Happy Birthday Akka ❤️";

              // Cake Glow
              document.querySelector(".cake")
              .classList.add("cake-finished");

              // Show Next Button
              const next = document.getElementById("cakeNext");

              setTimeout(() => {

                   next.classList.remove("hidden");
                   next.classList.add("show-next");

            },1200);
}

        });

        candles.appendChild(candle);

    }

}

/* =======================================================
   Fireworks
======================================================= */

let fireworkTimer;

function startFireworks() {

    const canvas = document.getElementById("fireworks");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function drawFirework() {

        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * 0.6;

        const colors = [
            "#ff5fa2",
            "#ffd77a",
            "#ffffff",
            "#7b3fe4"
        ];

        for (let i = 0; i < 40; i++) {

            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 90;

            ctx.beginPath();

            ctx.fillStyle =
                colors[Math.floor(Math.random() * colors.length)];

            ctx.arc(
                x + Math.cos(angle) * distance,
                y + Math.sin(angle) * distance,
                3,
                0,
                Math.PI * 2
            );

            ctx.fill();

        }

        setTimeout(() => {

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

        }, 500);

    }

    fireworkTimer = setInterval(drawFirework, 700);

}

function stopFireworks() {

    clearInterval(fireworkTimer);

    const canvas = document.getElementById("fireworks");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

}

/* =======================================================
   Sparkles
======================================================= */

function createSparkles() {

    for (let i = 0; i < 30; i++) {

        const spark = document.createElement("div");

        spark.className = "sparkle";

        spark.style.left = Math.random() * window.innerWidth + "px";
        spark.style.top = Math.random() * window.innerHeight + "px";

        document.body.appendChild(spark);

        setTimeout(() => {

            spark.remove();

        }, 1000);

    }

}

/* =======================================================
   Music
======================================================= */

musicToggle.addEventListener("click", () => {

    if (!musicStarted) {

        bgMusic.play();

        musicStarted = true;

        musicToggle.classList.add("playing");

    } else {

        if (bgMusic.paused) {

            bgMusic.play();

            musicToggle.classList.add("playing");

        } else {

            bgMusic.pause();

            musicToggle.classList.remove("playing");

        }

    }

});

/* =======================================================
   Replay
======================================================= */

document
    .getElementById("replayBtn")
    .addEventListener("click", () => {

        location.reload();

});

/* =======================================================
   Next Buttons
======================================================= */

document
.querySelectorAll("[data-next]")
.forEach(button => {

    button.addEventListener("click", () => {

        goToScreen(currentScreen + 1);

    });

});

/* =======================================================
   Events
======================================================= */

document
.getElementById("openGiftBtn")
.addEventListener("click", openGift);

document
.getElementById("giftbox")
.addEventListener("click", openGift);

document
.getElementById("unlockBtn")
.addEventListener("click", verifyDob);

// ==============================
// Final Hearts
// ==============================

function finalHearts() {

    const screen = document.getElementById("screen-11");

    let total = 0;

    const interval = setInterval(() => {

        const heart = document.createElement("div");

        heart.className = "floating-heart";

        heart.innerHTML = "❤️";

        heart.style.left = Math.random() * 90 + "%";

        heart.style.fontSize =
            (18 + Math.random() * 16) + "px";

        screen.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 2800);

        total++;

        if (total >= 30) {
            clearInterval(interval);
        }

    }, 300);

}

/* =======================================================
   Init
======================================================= */

window.addEventListener("load", () => {

    buildStars();

    buildFloatingHearts();

    buildProgress();

    setTimeout(() => {

        loader.classList.add("hidden");

    }, 2200);

});

window.addEventListener("resize", () => {

    stopFireworks();

    if (currentScreen === 10)
        startFireworks();

});