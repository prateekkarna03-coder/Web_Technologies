const formContainer = document.getElementById("formContainer");

formContainer.innerHTML = `
<form id="myForm">

    <label>Name</label>
    <input type="text" id="name" required>

    <label>Email</label>
    <input type="text" id="email" required>

    <label>Password</label>
    <input type="password" 
           id="password" 
           placeholder="8 characters with a number"
           required>

    <label>Confirm Password</label>
    <input type="password" id="confirmPassword" required>

    <label>Gender</label><br>
    <input type="radio" name="gender" value="Male" class="inline"> Male
    <input type="radio" name="gender" value="Female" class="inline"> Female
    <br><br>

    <label>Skills</label><br>
    <input type="checkbox" value="HTML" class="skill inline"> HTML
    <input type="checkbox" value="CSS" class="skill inline"> CSS
    <input type="checkbox" value="JavaScript" class="skill inline"> JavaScript
    <br><br>

    <label>Country</label>
    <select id="country">
        <option>India</option>
        <option>Nepal</option>
        <option>USA</option>
    </select>

    <label>About You</label>
    <textarea id="about"></textarea>

    <button type="submit">Submit</button>

</form>
`;

const form = document.getElementById("myForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!email.value.includes("@") || !email.value.includes(".com")) {
        email.value = "";
        email.classList.add("error-bg", "error-border");
        email.placeholder = "Enter valid email (@ and .com required)";
        return;
    }

    // Password validation (8 chars + number)
    if (password.value.length < 8 || !/\d/.test(password.value)) {
        password.value = "";
        confirmPassword.value = "";
        password.classList.add("error-bg", "error-border");
        confirmPassword.classList.add("error-border");
        password.placeholder = "8 characters with a number";
        return;
    }

    // Confirm match
    if (password.value !== confirmPassword.value) {
        password.value = "";
        confirmPassword.value = "";
        password.classList.add("error-border");
        confirmPassword.classList.add("error-border");
        return;
    }

    const name = document.getElementById("name").value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value || "";
    const country = document.getElementById("country").value;
    const about = document.getElementById("about").value;

    const skills = [];
    document.querySelectorAll(".skill:checked").forEach(s => skills.push(s.value));

    document.getElementById("output").innerHTML = `
    <h3>Submitted Data</h3>
    <p><b>Name:</b> ${name}</p>
    <p><b>Email:</b> ${email.value}</p>
    <p><b>Gender:</b> ${gender}</p>
    <p><b>Skills:</b> ${skills.join(", ")}</p>
    <p><b>Country:</b> ${country}</p>
    <p><b>About:</b> ${about}</p>
`;
});

email.addEventListener("input", () => {
    email.classList.remove("error-bg", "error-border");
});

password.addEventListener("input", () => {
    password.classList.remove("error-bg", "error-border");
});

confirmPassword.addEventListener("input", () => {
    confirmPassword.classList.remove("error-border");
});
