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
  // Booking System
const bookingForm = document.getElementById("booking-form");
const bookingSuccess = document.querySelector(".booking-success");

if(bookingForm){
    bookingForm.addEventListener("submit", function(e){
        e.preventDefault();

        const user = firebase.auth().currentUser;
        if(!user){
            alert("Please login to book!");
            return;
        }

        // Get booking info
        const name = document.getElementById("booking-name").value.trim();
        const email = document.getElementById("booking-email").value.trim();
        const contact = document.getElementById("booking-contact").value.trim();
        const date = document.getElementById("booking-date").value;
        const guests = parseInt(document.getElementById("booking-guests").value);
        
        // Assuming listing details are stored in page or passed via URL
        const listingName = document.getElementById("listing-name-title").textContent;
        const location = document.getElementById("listing-location").textContent;
        const type = document.getElementById("listing-type").textContent;

        // Save booking to Firestore
        firebase.firestore().collection("bookings").add({
            userId: user.uid,
            listingName,
            location,
            type,
            name,
            email,
            contact,
            bookingDate: date,
            guests,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(()=>{
            bookingSuccess.style.display = "block";
            bookingForm.reset();
        }).catch(err => alert(err.message));
const db = firebase.firestore();

// ----------- Listings Page ------------
function loadListings() {
    const container = document.getElementById("listings-container");
    container.innerHTML = "";

    db.collection("listings").get().then(snapshot => {
        snapshot.forEach(doc => {
            const data = doc.data();
            const card = document.createElement("div");
            card.className = "listing-card";
            card.innerHTML = `
                <img src="${data.image || 'assets/images/placeholder.jpg'}" alt="${data.name}">
                <h3>${data.name}</h3>
                <p>${data.type} - ${data.location}</p>
                <p>₹${data.price} per night</p>
            `;
            card.addEventListener("click", () => {
                window.location.href = `listing-detail.html?id=${doc.id}`;
            });
            container.appendChild(card);
        });
    });
}

// ----------- Listing Detail Page ------------
function loadListingDetail() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if(!id) return;

    const detailSection = document.getElementById("listing-detail");

    db.collection("listings").doc(id).get().then(doc => {
        if(!doc.exists) return alert("Listing not found");

        const data = doc.data();
        document.getElementById("listing-name").textContent = data.name;
        document.getElementById("listing-type").textContent = data.type;
        document.getElementById("listing-location").textContent = data.location;
        document.getElementById("listing-price").textContent = `₹${data.price} per night`;

        // Load map
        const map = new google.maps.Map(document.getElementById("listing-map"), {
            center: {lat: data.lat || 0, lng: data.lng || 0},
            zoom: 15
        });
        new google.maps.Marker({
            position: {lat: data.lat || 0, lng: data.lng || 0},
            map: map,
            title: data.name
        });

        // Load reviews
        const reviewsContainer = document.getElementById("reviews-container");
        reviewsContainer.innerHTML = "";
        (data.reviews || []).forEach(r => {
            const div = document.createElement("div");
            div.textContent = `${r.user}: ${r.text}`;
            reviewsContainer.appendChild(div);
        });
    });

    // Submit review
    document.getElementById("submit-review").addEventListener("click", () => {
        const user = document.getElementById("review-user").value;
        const text = document.getElementById("review-text").value;
        if(!user || !text) return alert("Enter your name and review");

        const reviewData = { user, text };
        const listingRef = db.collection("listings").doc(id);
        listingRef.update({
            reviews: firebase.firestore.FieldValue.arrayUnion(reviewData)
        }).then(() => {
            alert("Review submitted!");
            document.getElementById("review-user").value = "";
            document.getElementById("review-text").value = "";
            loadListingDetail(); // reload reviews
        });
    });

    // Booking form submission
    document.getElementById("booking-form").addEventListener("submit", e => {
        e.preventDefault();
        const booking = {
            listingId: id,
            name: document.getElementById("booking-name").value,
            email: document.getElementById("booking-email").value,
            phone: document.getElementById("booking-phone").value,
            date: document.getElementById("booking-date").value,
            guests: document.getElementById("booking-guests").value,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        db.collection("bookings").add(booking)
        .then(() => {
            document.getElementById("booking-message").textContent = "Booking successful!";
            document.getElementById("booking-form").reset();
        }).catch(err => {
            document.getElementById("booking-message").textContent = "Booking failed. Try again.";
            console.error(err);
        });
    });
}
auth.onAuthStateChanged(user => {
    if(user){
        // Show booking & review forms
        document.getElementById("booking-section").style.display = "block";
        document.getElementById("review-form").style.display = "block";
        document.getElementById("login-to-book").style.display = "none";
        document.getElementById("login-to-review").style.display = "none";
    }
});

// -------- Review Submission --------
document.getElementById("submit-review")?.addEventListener("click", () => {
    const user = auth.currentUser;
    if(!user) return alert("Login required to post a review.");

    const text = document.getElementById("review-text").value;
    if(!text) return alert("Write your review first.");

    const reviewData = { user: user.displayName || user.email, text };
    const listingRef = db.collection("listings").doc(listingId);
    listingRef.update({
        reviews: firebase.firestore.FieldValue.arrayUnion(reviewData)
    }).then(() => {
        alert("Review submitted!");
        document.getElementById("review-text").value = "";
        loadListingDetail(); // reload reviews
    });
});

// -------- Booking Submission --------
document.getElementById("booking-form")?.addEventListener("submit", e => {
    e.preventDefault();
    const user = auth.currentUser;
    if(!user) return alert("Login required to book.");

    const booking = {
        listingId: listingId,
        userId: user.uid,
        userName: user.displayName || user.email,
        date: document.getElementById("booking-date").value,
        guests: document.getElementById("booking-guests").value,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    db.collection("bookings").add(booking).then(() => {
        alert("Booking successful!");
        document.getElementById("booking-form").reset();
    }).catch(err => console.error(err));
});

// ----------- Initialize Page ------------
if(document.getElementById("listings-container")) loadListings();
if(document.getElementById("listing-detail")) loadListingDetail();

