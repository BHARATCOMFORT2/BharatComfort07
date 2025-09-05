// main.js

document.addEventListener("DOMContentLoaded", function() {
    // 1. Partner Form Submission
    const partnerForm = document.getElementById("partner-form");
    const formSuccess = document.querySelector(".form-success");

    partnerForm.addEventListener("submit", function(e) {
        e.preventDefault();

        // Get form values
        const name = partnerForm.name.value.trim();
        const business = partnerForm.business.value.trim();
        const designation = partnerForm.designation.value.trim();
        const contact = partnerForm.contact.value.trim();
        const reference = partnerForm.reference.value.trim();

        if(name && business && designation && contact){
            // For now, just show success message
            formSuccess.style.display = "block";

            // Reset the form
            partnerForm.reset();

            // TODO: Add Firebase or Email/Google Sheet submission here
            console.log("Partner Form Submitted:", {name, business, designation, contact, reference});
        } else {
            alert("Please fill in all required fields!");
        }
    });

    // 2. Search Bar Functionality
    const searchInput = document.querySelector(".hero .search-bar input");
    const searchButton = document.querySelector(".hero .search-bar button");

    searchButton.addEventListener("click", function() {
        const query = searchInput.value.trim();
        if(query){
            // For now, alert the search query
            alert("Searching for: " + query);
            // TODO: Implement dynamic search functionality
        } else {
            alert("Please enter a search term!");
        }
    });

    // 3. Travel Planner Search
    const travelInput = document.querySelector(".travel-planner input");
    const travelButton = document.querySelector(".travel-planner button");

    travelButton.addEventListener("click", function() {
        const destination = travelInput.value.trim();
        if(destination){
            alert("Planning travel to: " + destination);
            // TODO: Connect to AI or Travel API for routes & options
        } else {
            alert("Please enter a destination!");
        }
    });

    // 4. Placeholder for Dynamic Listings / Stories Loading
    // You can later fetch listings/stories from Firebase or JSON
});
