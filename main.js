// main.js
<!-- Firebase -->
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js"></script>
<script>
  // Initialize Firebase
  const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_PROJECT.firebaseapp.com",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_PROJECT.appspot.com",
      messagingSenderId: "SENDER_ID",
      appId: "APP_ID"
  };
  firebase.initializeApp(firebaseConfig);

  // Firestore reference
  const db = firebase.firestore();

  // Auth reference
  const auth = firebase.auth();
</script>

document.addEventListener("DOMContentLoaded", function() {
    // 1. Partner Form Submission
  // Partner Form Submission
partnerForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = partnerForm.name.value.trim();
    const business = partnerForm.business.value.trim();
    const designation = partnerForm.designation.value.trim();
    const contact = partnerForm.contact.value.trim();
    const reference = partnerForm.reference.value.trim();

    if(name && business && designation && contact){
        // Save to Firestore
        db.collection("partners").add({
            name: name,
            business: business,
            designation: designation,
            contact: contact,
            reference: reference,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            formSuccess.style.display = "block";
            partnerForm.reset();
        })
        .catch((error) => {
            alert("Error saving form: " + error.message);
        });
    } else {
        alert("Please fill in all required fields!");
    }
});

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
      // Authentication Modal
const authModal = document.getElementById("auth-modal");
const authForm = document.getElementById("auth-form");
const authTitle = document.getElementById("modal-title");
const authSubmit = document.getElementById("auth-submit");
const toggleAuth = document.getElementById("toggle-auth");
const closeModal = document.querySelector(".modal .close");

let isLogin = true; // Track login/register mode

// Open modal
document.querySelector('a[href="#login"]').addEventListener("click", function(e){
    e.preventDefault();
    authModal.style.display = "block";
});

// Close modal
closeModal.addEventListener("click", function(){
    authModal.style.display = "none";
});

// Toggle login/register
toggleAuth.addEventListener("click", function(){
    isLogin = !isLogin;
    if(isLogin){
        authTitle.textContent = "Login";
        authSubmit.textContent = "Login";
        toggleAuth.textContent = "Register";
    } else {
        authTitle.textContent = "Register";
        authSubmit.textContent = "Register";
        toggleAuth.textContent = "Login";
    }
});

// Handle form submit
authForm.addEventListener("submit", function(e){
    e.preventDefault();
    const email = document.getElementById("auth-email").value.trim();
    const password = document.getElementById("auth-password").value.trim();

    if(isLogin){
        // Login
        auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            alert("Logged in as: " + userCredential.user.email);
            authModal.style.display = "none";
            authForm.reset();
        })
        .catch(error => alert(error.message));
    } else {
        // Register
        auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            alert("Registered: " + userCredential.user.email);
            authModal.style.display = "none";
            authForm.reset();
        })
        .catch(error => alert(error.message));
    }
});

// Close modal when clicking outside content
window.addEventListener("click", function(e){
    if(e.target == authModal){
        authModal.style.display = "none";
    }
});

    });

    // 4. Placeholder for Dynamic Listings / Stories Loading
    // You can later fetch listings/stories from Firebase or JSON
});
