// for dynamically adding the components to the page 


// footer
document.addEventListener("DOMContentLoaded", function() {
    fetch('./component/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });
});
