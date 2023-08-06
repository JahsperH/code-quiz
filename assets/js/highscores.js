const scoreList = document.getElementById("scoreList");
const scores = JSON.parse(localStorage.getItem("scores")) || [];

scores.sort((a, b) => b.score - a.score);

scores.forEach((entry, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${index + 1}. ${entry.initials}: ${entry.score}`;
    scoreList.appendChild(listItem);
});
