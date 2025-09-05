document.addEventListener("DOMContentLoaded", function(){

    const auth = firebase.auth();
    const db = firebase.firestore();

    // ---------------- Partner Dashboard ----------------
    const addListingBtn = document.getElementById("add-listing-btn");
    const listingFormContainer = document.getElementById("listing-form-container");
    const listingForm = document.getElementById("listing-form");
    const partnerListingsTable = document.querySelector("#partner-listings tbody");

    if(addListingBtn){
        addListingBtn.addEventListener("click", () => {
            listingFormContainer.style.display = listingFormContainer.style.display === "none" ? "block" : "none";
        });
    }

    // Save Listing
    if(listingForm){
        listingForm.addEventListener("submit", function(e){
            e.preventDefault();
            const name = document.getElementById("listing-name").value.trim();
            const location = document.getElementById("listing-location").value.trim();
            const type = document.getElementById("listing-type").value.trim();
            const image = document.getElementById("listing-image").value.trim();
            const rating = parseFloat(document.getElementById("listing-rating").value.trim());

            const user = auth.currentUser;
            if(user){
                db.collection("listings").add({
                    partnerId: user.uid,
                    name, location, type, image, rating,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }).then(()=>{
                    alert("Listing added successfully!");
                    listingForm.reset();
                    loadPartnerListings();
                }).catch(err=>alert(err.message));
            }
        });
    }

    // Load Partner Listings
    function loadPartnerListings(){
        const user = auth.currentUser;
        if(user && partnerListingsTable){
            partnerListingsTable.innerHTML = "";
            db.collection("listings").where("partnerId","==",user.uid)
            .orderBy("timestamp","desc")
            .get().then(snapshot => {
                snapshot.forEach(doc => {
                    const data = doc.data();
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td>${data.name}</td>
                        <td>${data.location}</td>
                        <td>${data.type}</td>
                        <td>${data.rating}</td>
                        <td><button onclick="deleteListing('${doc.id}')">Delete</button></td>
                    `;
                    partnerListingsTable.appendChild(tr);
                });
            });
        }
    }

    window.deleteListing = function(id){
        if(confirm("Delete this listing?")){
            db.collection("listings").doc(id).delete()
            .then(()=>{ loadPartnerListings(); })
            .catch(err=>alert(err.message));
        }
    }

    // Logout Partner
    const logoutPartner = document.getElementById("logout-partner");
    if(logoutPartner){
        logoutPartner.addEventListener("click", function(e){
            e.preventDefault();
            auth.signOut().then(()=>{ window.location.href = "index.html"; });
        });
    }

    // ---------------- User Dashboard ----------------
    const storyForm = document.getElementById("story-form");
    const userStories = document.getElementById("user-stories");
    const userBookingsTable = document.querySelector("#user-bookings tbody");

    // Post Story
    if(storyForm){
        storyForm.addEventListener("submit", function(e){
            e.preventDefault();
            const title = document.getElementById("story-title").value.trim();
            const content = document.getElementById("story-content").value.trim();
            const image = document.getElementById("story-image").value.trim();
            const user = auth.currentUser;

            if(user){
                db.collection("stories").add({
                    userId: user.uid,
                    title, content, image,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }).then(()=>{
                    alert("Story posted!");
                    storyForm.reset();
                    loadUserStories();
                }).catch(err=>alert(err.message));
            }
        });
    }

    // Load User Stories
    function loadUserStories(){
        const user = auth.currentUser;
        if(user && userStories){
            userStories.innerHTML = "";
            db.collection("stories").where("userId","==",user.uid)
            .orderBy("timestamp","desc")
            .get().then(snapshot=>{
                snapshot.forEach(doc=>{
                    const data = doc.data();
                    const div = document.createElement("div");
                    div.className = "story-card";
                    div.innerHTML = `
                        <h4>${data.title}</h4>
                        <p>${data.content}</p>
                        ${data.image ? `<img src="${data.image}" alt="${data.title}">` : ""}
                    `;
                    userStories.appendChild(div);
                });
            });
        }
    }

    // Load User Bookings
    function loadUserBookings(){
        const user = auth.currentUser;
        if(user && userBookingsTable){
            userBookingsTable.innerHTML = "";
            db.collection("bookings").where("userId","==",user.uid)
            .orderBy("timestamp","desc")
            .get().then(snapshot=>{
                snapshot.forEach(doc=>{
                    const data = doc.data();
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td>${data.listingName}</td>
                        <td>${data.location}</td>
                        <td>${data.type}</td>
                        <td>${data.bookingDate}</td>
                    `;
                    userBookingsTable.appendChild(tr);
                });
            });
        }
    }

    // Logout User
    const logoutUser = document.getElementById("logout-user");
    if(logoutUser){
        logoutUser.addEventListener("click", function(e){
            e.preventDefault();
            auth.signOut().then(()=>{ window.location.href = "index.html"; });
        });
    }

    // On Dashboard Load
    auth.onAuthStateChanged(user=>{
        if(user){
            // Load Partner Listings if on partner-dashboard
            if(partnerListingsTable) loadPartnerListings();

            // Load User data if on user-dashboard
            if(userBookingsTable){
                loadUserBookings();
                loadUserStories();
            }
        } else {
            // Not logged in → redirect to homepage
            if(window.location.pathname.includes("dashboard")){
                window.location.href = "index.html";
            }
        }
    });
});
