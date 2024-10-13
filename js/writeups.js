// Fetch JSON file and generate links dynamically
fetch('../Json/writeups.json')
 .then(response => response.json())
 .then(data => {
     const createCard = (title, link) => `
         <div class="col-md-6 mb-4">
             <div class="card h-100">
                 <div class="card-body text-center">
                     <h5 class="card-title"><b>${title}</b></h5>
                     <a href="${link}" target="_blank" class="btn btn-primary mx-2">View</a>
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