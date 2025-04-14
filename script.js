// Logic to fill the table
let tbody = document.querySelector("table tbody");
let data = localStorage.getItem("passwords");

if (data === null || JSON.parse(data).length === 0) {
    tbody.innerHTML = "<tr><td colspan='4'>No data to show</td></tr>";
} else {
    let arr = JSON.parse(data);
    tbody.innerHTML = ""; 
    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        let row = `<tr>
            <td>${element.website}</td>
            <td>
                ${element.username}
                <button class="copy-btn" data-value="${element.username}">Copy</button>
            </td>
            <td>
                <input type="password" value="${element.password}" readonly>
                <button class="copy-btn" data-value="${element.password}">Copy</button>
            </td>
            <td><button class="delete-btn" data-index="${index}">Delete</button></td>
        </tr>`;
        tbody.innerHTML += row;
    }
}


document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault(); 

   
    let website = document.querySelector("#website").value.trim();
    let username = document.querySelector("#username").value.trim();
    let password = document.querySelector("#password").value.trim();

    if (!website || !username || !password) {
        alert("Please fill in all fields");
        return;
    }

    let passwords = localStorage.getItem("passwords");
    let json = passwords ? JSON.parse(passwords) : [];

    json.push({ website, username, password });
    localStorage.setItem("passwords", JSON.stringify(json));
    alert("Password saved");
    location.reload();
});


document.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
        let index = e.target.getAttribute("data-index");
        let passwords = JSON.parse(localStorage.getItem("passwords"));
        passwords.splice(index, 1);
        localStorage.setItem("passwords", JSON.stringify(passwords));
        location.reload();
    }

  
    if (e.target.classList.contains("copy-btn")) {
        let value = e.target.getAttribute("data-value");
        navigator.clipboard.writeText(value).then(() => {
            alert("Copied to clipboard!");
        }).catch(() => {
            alert("Failed to copy!");
        });
    }
});

