const auth = firebase.auth();
const db = firebase.firestore();

// -------- REGISTER --------
document.getElementById("register-btn").addEventListener("click", () => {
    const name = document.getElementById("register-name").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    let role = document.getElementById("register-role").value;

    // Superadmin check
    const superadminEmail = "shrrajbhar12340@gmail.com";
    if(email === shrrajbhar12340@gmail.com) role = "superadmin";
    if(!name || !email || !password) return alert("Fill all fields");

    auth.createUserWithEmailAndPassword(email, password)
    .then(cred => {
        return db.collection("users").doc(cred.user.uid).set({
            name,
            email,
            role,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    })
    .then(() => {
        document.getElementById("auth-message").textContent = "Registration successful!";
        document.getElementById("register-name").value = "";
        document.getElementById("register-email").value = "";
        document.getElementById("register-password").value = "";
    })
    .catch(err => {
        document.getElementById("auth-message").textContent = err.message;
        console.error(err);
    });
});

// -------- LOGIN --------
document.getElementById("login-btn").addEventListener("click", () => {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    if(!email || !password) return alert("Enter email and password");

    auth.signInWithEmailAndPassword(email, password)
    .then(cred => {
        // Check role and redirect
        db.collection("users").doc(cred.user.uid).get().then(doc => {
            const role = doc.data().role;
            if(role === "superadmin"){
                window.location.href = "superadmin-dashboard.html";
            } else if(role === "partner"){
                window.location.href = "partner-dashboard.html";
            } else {
                window.location.href = "index.html";
            }
        });
    })
    .catch(err => {
        document.getElementById("auth-message").textContent = err.message;
        console.error(err);
    });
});

// -------- AUTH STATE CHECK --------
auth.onAuthStateChanged(user => {
    if(user){
        db.collection("users").doc(user.uid).get().then(doc => {
            const role = doc.data().role;
            if(role === "superadmin"){
                window.location.href = "superadmin-dashboard.html";
            } else if(role === "partner"){
                window.location.href = "partner-dashboard.html";
            } else {
                window.location.href = "index.html";
            }
        });
    }
});
// Open & Close Modal
const modal = document.getElementById("login-modal");
document.getElementById("open-login").addEventListener("click", ()=> modal.style.display="block");
document.getElementById("close-login").addEventListener("click", ()=> modal.style.display="none");
window.addEventListener("click", e=>{ if(e.target==modal) modal.style.display="none"; });

// Modal Login/Register buttons
document.getElementById("modal-register-btn").addEventListener("click", ()=>{
    const name=document.getElementById("modal-register-name").value;
    const email=document.getElementById("modal-register-email").value;
    const password=document.getElementById("modal-register-password").value;
    let role=document.getElementById("modal-register-role").value;
    if(email==="shrrajbhar12340@gmail.com") role="superadmin";
    if(!name||!email||!password) return alert("Fill all fields");

    auth.createUserWithEmailAndPassword(email,password).then(cred=>{
        return db.collection("users").doc(cred.user.uid).set({name,email,role,createdAt:firebase.firestore.FieldValue.serverTimestamp()});
    }).then(()=>{ document.getElementById("modal-auth-message").textContent="Registration successful!"; }).catch(err=>{ document.getElementById("modal-auth-message").textContent=err.message; console.error(err); });
});

document.getElementById("modal-login-btn").addEventListener("click", ()=>{
    const email=document.getElementById("modal-login-email").value;
    const password=document.getElementById("modal-login-password").value;
    if(!email||!password) return alert("Enter email & password");

    auth.signInWithEmailAndPassword(email,password).then(cred=>{
        db.collection("users").doc(cred.user.uid).get().then(doc=>{
            const role=doc.data().role;
            if(role==="superadmin") window.location.href="superadmin-dashboard.html";
            else if(role==="partner") window.location.href="partner-dashboard.html";
            else window.location.href="index.html";
        });
    }).catch(err=>{ document.getElementById("modal-auth-message").textContent=err.message; console.error(err); });
});
