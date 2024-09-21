document.addEventListener('DOMContentLoaded', function() {
    fetch('../Json/blog-data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const blogPosts = data;

            // Sort the posts by date (newest first)
            blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

            // Get unique years from the blog posts
            const uniqueYears = [...new Set(blogPosts.map(post => new Date(post.date).getFullYear()))];

            // Populate the year dropdown
            const yearDropdown = document.getElementById('year-dropdown');
            uniqueYears.forEach(year => {
                const option = document.createElement('option');
                option.value = year;
                option.textContent = year;
                yearDropdown.appendChild(option);
            });

            // Scroll to the appropriate section when a year is selected
            yearDropdown.addEventListener('change', function() {
                const selectedYear = this.value;
                const yearElement = document.querySelector(`#year-${selectedYear}`);
                if (yearElement) {
                    yearElement.scrollIntoView({ behavior: 'smooth' });
                }
            });

            // Function to render posts
            function renderBlogPosts(posts) {
                let html = '';
                let currentYear = null;
                let rowCount = 0;
                let rowHtml = '<div class="row">';
                const container = document.getElementById('blog-container');

                if (!container) {
                    console.error('Container element not found');
                    return;
                }

                container.innerHTML = '';  // Clear the container

                console.log(`Total Posts: ${posts.length}`);

                // Check if the page is index.html
                const isIndexPage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';

                // If it's the index page, limit to the latest 4 posts
                const limitedPosts = isIndexPage ? posts.slice(0, 4) : posts;

                limitedPosts.forEach((post) => {
                    const postDate = new Date(post.date);
                    const year = postDate.getFullYear();

                    if (isIndexPage) {
                        // Generate HTML for index.html page
                        const postHtml = `
                            <div class="col-md-12 ">
                                <a href="blog.html" class="blog-post">
                                    <span class="img" style="background-image: url(${post.image});background-size: contain;"></span>
                                    <div class="desc">
                                        <h3>${post.title}</h3>
                                        <span class="cat">${postDate.toDateString()}</span>
                                    </div>
                                </a>
                            </div>
                        `;
                        container.innerHTML += postHtml;
                    } else {
                        // Non-index page logic: Group posts by year and row
                        if (year !== currentYear) {
                            if (currentYear !== null) {
                                // Close previous row and reset for new year
                                html += rowHtml + '</div>';
                                rowHtml = '<div class="row">';
                            }
                            // Add year heading with an ID for scrolling
                            html += `<h3 id="year-${year}" style="font-size: 3em; margin: 20px 0;">
                                <b style="padding: 5px 25px; background-color: #444; color: #fff; border-radius: 47%;">${year}</b>
                            </h3>`;
                            currentYear = year;
                            rowCount = 0; // Reset row count for new year
                        }

                        // Add a new row if necessary
                        if (rowCount === 3) {
                            html += rowHtml + '</div>'; // Close the row
                            rowHtml = '<div class="row">'; // Start a new row
                            rowCount = 0;
                        }

                        // Create the card HTML
                        rowHtml += `<div class="col-md-4">
                            <div class="fh5co-blog ">
                                <a class="blog-bg" style="background-image: url(${post.image}); background-size: contain;"></a>
                                <div class="blog-text">
                                    <span class="posted_on">${postDate.toDateString()}</span>
                                    <h3><a href="#">${post.title}</a></h3>
                                    <p>${post.description}</p>
                                    <ul class="stuff"></ul>
                                    ${post.certificate_url ? `<a target="_blank" href="${post.certificate_url}">View Certificate</a>` : ''}
                                </div>
                            </div>
                        </div>`;

                        rowCount++;
                    }
                });

                // Close last row if there are remaining posts
                if (rowHtml !== '<div class="row">') {
                    html += rowHtml + '</div>';
                }

                if (!isIndexPage) {
                    container.innerHTML = html;
                }
            }

            // Call the function to render posts
            renderBlogPosts(blogPosts);
        })
        .catch(error => {
            console.error('There has been a problem with fetch operation:', error);
        });
});
