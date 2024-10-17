// Fetch JSON file and generate links dynamically
fetch('../Json/writeups.json')
    .then(response => response.json())
    .then(data => {
        const createCard = (title, link) => `
         <div class="col-md-6 mb-4">
             <div class="card h-100">
                 <div class="card-body text-center">
                     <h5 class="card-title"><b>${title}</b></h5>
                     <a href="${link}" target="_blank" class="btn btn-primary mx-2"><i class="icon-eye"></i> view</a>
                     <!-- <a href="${link.replace('/view', '/uc?export=download')}" target="_blank" class="btn btn-success mx-2">Download</a> -->
                 </div>
             </div>
             <br><br>
         </div>
     `;

        // Display practicals
        const practicalsContainer = document.getElementById('practical-list');
        data.practicals.forEach(practical => {
            practicalsContainer.innerHTML += createCard(practical.title, practical.link);
        });

        // Display assignments
        const assignmentsContainer = document.getElementById('assignment-list');
        data.assignments.forEach(assignment => {
            assignmentsContainer.innerHTML += createCard(assignment.title, assignment.link);
        });
    })
    .catch(error => console.error('Error loading JSON:', error));

const titles = [
    "Empower Your Learning: Share & Succeed Together!",
    "Collaborate & Conquer: Your Path to Academic Excellence",
    "Together We Thrive: Share Knowledge, Achieve More!",
    "Ignite Your Potential: Join the Learning Revolution",
    "Unlock Success: Contribute, Collaborate, Celebrate!",
    "Rise Together: Empowering Students Through Shared Knowledge",
    "Inspire & Achieve: The Student Resource Community",
    "Join the Journey: Share Your Knowledge, Boost Your Grades!",
    "Unity in Learning: Together We Achieve Greatness!",
    "Fuel Your Success: Collaborate and Contribute!"
];

// Function to get a random title
function getRandomTitle() {
    const randomIndex = Math.floor(Math.random() * titles.length);
    return titles[randomIndex];
}

// Display the random title on the webpage
document.getElementById('title').innerText = getRandomTitle();