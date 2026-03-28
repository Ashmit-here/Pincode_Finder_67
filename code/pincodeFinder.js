let allData = [];


async function getData() {
    let pin = document.getElementById("pincode").value;
    let loader = document.getElementById("loader");
    let results = document.getElementById("results");

    results.innerHTML = "";
    loader.classList.remove("hidden");

    try {
        let response = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
        let data = await response.json();

        loader.classList.add("hidden");

        if (data[0].Status === "Success") {
            allData = data[0].PostOffice;
            displayData(allData);
        } else {
            results.innerHTML = "<h3>No Data Found ❌</h3>";
        }

    } catch (error) {
        loader.classList.add("hidden");
        results.innerHTML = "<h3>Error fetching data ⚠️</h3>";
        console.log(error);
    }
}




function displayData(data) {
    let results = document.getElementById("results");

    results.innerHTML = data.map(item => `
        <div class="card">
            <h3>${item.Name}</h3>
            <p><b>📍 District:</b> ${item.District}</p>
            <p><b>🏢 Branch:</b> ${item.BranchType}</p>
            <p><b>📦 Delivery:</b> ${item.DeliveryStatus}</p>
            <p><b>🌎 State:</b> ${item.State}</p>
        </div>
    `).join("");
}




function applyFilters() {
    let delivery = document.getElementById("deliveryFilter").value;
    let branch = document.getElementById("branchFilter").value;

    let filtered = allData.filter(item => {
        return (delivery === "all" || item.DeliveryStatus === delivery) &&
               (branch === "all" || item.BranchType === branch);
    });

    displayData(filtered);
}



function sortByName() {
    let sorted = [...allData].sort((a, b) => 
        a.Name.localeCompare(b.Name)
    );

    displayData(sorted);
}