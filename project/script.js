function updateLectureAndClass() {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const hour = now.getHours(); // 0–23

    let message = "No lecture is currently going on.";

    // Define your weekly schedule
    const schedule = {
        1: { // Monday
            10: { lecture: "Intro to Web Development", class: "Class 101" },
            14: { lecture: "HTML & CSS Basics", class: "Class 102" }
        },
        3: { // Wednesday
            13: { lecture: "JavaScript Fundamentals", class: "Class 101" },
            14: { lecture: "Advanced CSS Layouts", class: "Class 103" }
        },
        5: { // Friday
            11: { lecture: "Responsive Design", class: "Class 102" }
        }
    };

    // Get today's schedule
    const todaySchedule = schedule[day] || {};
    const lectureHours = Object.keys(todaySchedule).map(Number).sort((a, b) => a - b);

    let foundCurrent = false;
    let foundNext = false;

    // 1️⃣ Check if there's a lecture going on right now
    if (todaySchedule[hour]) {
        const currentLecture = todaySchedule[hour];
        message = `🧑‍🏫 Currently "${currentLecture.lecture}" is going on in ${currentLecture.class}.`;
        foundCurrent = true;
    } 
    // 2️⃣ If not, find the next upcoming lecture today
    else {
        for (const h of lectureHours) {
            if (h > hour) {
                const nextLecture = todaySchedule[h];
                const formattedTime = h > 12 ? `${h - 12} PM` : `${h} AM`;
                message = `Next lecture: "${nextLecture.lecture}" at ${formattedTime}
                    in ${nextLecture.class}.`;

                foundNext = true;
                break;
            }
        }

        // 3️⃣ If no more lectures today
        if (!foundNext) {
            message = "🎓 No more lectures today.";
        }
    }

    // Update the display
    document.getElementById('current-lecture').innerText = message;
}

// Initial call and repeat every minute
updateLectureAndClass();
setInterval(updateLectureAndClass, 60000);
