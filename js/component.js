// for dynamically adding the components to the page 

//header component
// Function to load the header HTML and insert it into the page
function loadHeader() {
    setTimeout(loadHeader, 100);
    const timestamp = new Date().getTime(); // Get the current timestamp
    const headerUrl = `./component/header.html?v=${Date.now()}`; // Append timestamp to URL
    fetch(headerUrl)
        .then(response => response.text())
        .then(data => {
            // Insert the fetched HTML into the beginning of the body or another target element
            document.getElementById("header").innerHTML = data;

            // After inserting the HTML, set the active class
            setActiveNavLink();
        })
        .catch(error => console.error('Error loading header:', error));
}

// Function to set the active class on the current page link
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.fh5co-nav ul li a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.parentElement.classList.add('active');
        } else {
            link.parentElement.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded',loadHeader());


// footer component 
document.addEventListener("DOMContentLoaded", function () {
    // Fetch and load the footer HTML
    fetch('./component/footer.html')
        .then(response => response.text())
        .then(data => {
            // Insert the footer HTML into the DOM
            document.getElementById('footer').innerHTML = data;

            // Now fetch the blog data to get the first 4 post titles
            return fetch('./Json/blog-data.json');
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(blogPosts => {
            // Sort posts by date in descending order (latest first)
            blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

            // Get the first 4 posts
            const latestPosts = blogPosts.slice(0, 4);

            // Create HTML for the post titles
            let postsHtml = '<ul class="fh5co-footer-links">';
            latestPosts.forEach(post => {
                postsHtml += `<li><a href="${post.link || 'blog.html'}">${post.title}</a></li>`;
            });
            postsHtml += '</ul>';

            // Add the post titles to the footer
            const footerPostsContainer = document.getElementById('footer-posts'); // Assuming this ID exists in footer.html
            if (footerPostsContainer) {
                footerPostsContainer.innerHTML = postsHtml;
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
});

