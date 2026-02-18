document.addEventListener("DOMContentLoaded", function () {

    const report = document.getElementById("reportContent");

    if (report) {

        setTimeout(() => {
            report.classList.add("show");

            let cards = document.querySelectorAll(".subject-card");
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add("show");
                }, index * 150);
            });
        }, 100);

        let percentage = report.dataset.percentage;
        let result = report.dataset.result;

        document.getElementById("progressBar").style.width = percentage + "%";

        if (result === "Pass") {
            confetti({
                particleCount: 120,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    }
});

function toggleMode() {
    document.body.classList.toggle("light");
}

// Cursor Glow Movement
const glow = document.getElementById("cursorGlow");

document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
});

// Smooth Reveal Animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
        }
    });
});

document.querySelectorAll(".subject-card").forEach(card => {
    card.style.opacity = 0;
    card.style.transform = "translateY(30px)";
    observer.observe(card);
});

function openModal() {
    document.body.classList.add("modal-open");
    document.getElementById("modalOverlay").classList.add("active");
    document.getElementById("reportModal").classList.add("active");

    // Animate progress bar
    const report = document.getElementById("reportContent");
    if (report) {
        let percentage = report.dataset.percentage;
        document.getElementById("progressBar").style.width = percentage + "%";
    }
}

function closeModal() {
    document.body.classList.remove("modal-open");
    document.getElementById("modalOverlay").classList.remove("active");
    document.getElementById("reportModal").classList.remove("active");
}

let subjectCount = 0;

function addSubject() {
    subjectCount++;

    const container = document.getElementById("subjectsContainer");

    const row = document.createElement("div");
    row.classList.add("subject-row");

    row.innerHTML = `
        <input type="text" placeholder="Subject Name" class="subject-name" required>
        <input type="number" placeholder="Marks" class="subject-mark" required>
        <button type="button" onclick="removeSubject(this)">×</button>
    `;

    container.appendChild(row);

    updateHiddenInput();
}

function removeSubject(button) {
    button.parentElement.remove();
    updateHiddenInput();
}

function updateHiddenInput() {
    const names = document.querySelectorAll(".subject-name");
    const marks = document.querySelectorAll(".subject-mark");

    let result = [];

    for (let i = 0; i < names.length; i++) {
        if (names[i].value && marks[i].value) {
            result.push(names[i].value + "-" + marks[i].value);
        }
    }

    document.getElementById("subjectsInput").value = result.join(",");
}

// Update hidden input when typing
document.addEventListener("input", function(e) {
    if (e.target.classList.contains("subject-name") ||
        e.target.classList.contains("subject-mark")) {
        updateHiddenInput();
    }
});

function openModal(percentage, result) {
    document.body.classList.add("modal-open");
    document.getElementById("modalOverlay").classList.add("active");
    document.getElementById("reportModal").classList.add("active");

    animatePercentage(percentage);
    document.getElementById("progressBar").style.width = percentage + "%";

    if (result === "Pass") {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}

function closeModal() {
    document.body.classList.remove("modal-open");
    document.getElementById("modalOverlay").classList.remove("active");
    document.getElementById("reportModal").classList.remove("active");
}

function animatePercentage(finalValue) {
    let current = 0;
    const element = document.getElementById("percentageNumber");

    const interval = setInterval(() => {
        current++;
        element.textContent = current + "%";
        if (current >= finalValue) clearInterval(interval);
    }, 15);
}
