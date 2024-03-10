let availSlot = 120;
let totalCars = 0;

function update() {
    document.getElementById("availableSlot").innerText = availSlot;
    document.getElementById("totalCars").innerText = totalCars;
}

update();

function removeSlotCard(event) {
    const slotCard = event.target.closest(".slotCard");
    if (slotCard) {
        const selection = slotCard.querySelector(".availability");
        const selectedValue = selection.value;

        if ((selectedValue === "occupied" || selectedValue === "reserved") && availSlot < 120) {
            availSlot++;
        }

        slotCard.remove();
        update();
    }
}

const modal = document.getElementById("modalContainer");
const save = document.getElementById("save");
const add = document.getElementById("add");
const slots = document.querySelector(".slots");
const closed=document.getElementById("close");

add.addEventListener("click", function() {
    modal.style.display = "block";
});

save.addEventListener("click", function() {
    var slotName = document.getElementById("slotName").value;
    var namee = document.getElementById("name").value;
    var vNumber = document.getElementById("vNumber").value;
    var cDetails = document.getElementById("cDetails").value;
    var request = document.getElementById("request").value;
    modal.style.display = "none";

    const el = document.createElement("div");
    el.classList.add("slotCard");
    el.innerHTML = `    
        <div class="details">
            <p>Slot: ${slotName}</p>
            <p>Name: ${namee}</p>
            <p>Car details: ${cDetails}</p>
            <p>Car Number: ${vNumber}</p>
            <p>Colour: ${request}</p>
            <select name="availability" class="availability">
                <option value="select">Select</option>
                <option value="occupied">Occupied</option>
                <option value="reserved">Reserved</option>
            </select>
            <br>
            <button class="remove">Release</button>
        </div>
    `;
    document.getElementById("slotName").value = "";
    document.getElementById("name").value = "";
    document.getElementById("vNumber").value = "";
    document.getElementById("cDetails").value = "";
    document.getElementById("request").value = "";


    const releaseButton = el.querySelector(".remove");
    releaseButton.addEventListener("click", removeSlotCard);

    const selection = el.querySelector(".availability");
    let prevValue = selection.value;
    selection.addEventListener("change", function() { 
        const selectedValue = selection.value;
        if (prevValue === 'select' && selectedValue === 'occupied') {
            availSlot--;
            totalCars++;
            el.querySelector(".availability").style.backgroundColor="#33B864";
            update();
        } else if (prevValue === 'select' && selectedValue === 'reserved') {
            el.querySelector(".availability").style.backgroundColor ="#FFDB58";

            availSlot--;
            update();
        } else if (prevValue === 'occupied' && selectedValue === 'select') {
            availSlot++;
            el.querySelector(".availability").style.backgroundColor="grey";
            update();
        } else if (prevValue === 'reserved' && selectedValue === 'select') {
            availSlot++;
            el.querySelector(".availability").style.backgroundColor="grey";
            update();
        }
        prevValue = selectedValue;
    });

    slots.appendChild(el);
});

closed.addEventListener("click",function(){
    document.getElementById("slotName").value = "";
    document.getElementById("name").value = "";
    document.getElementById("vNumber").value = "";
    document.getElementById("cDetails").value = "";
    document.getElementById("request").value = "";

    modal.style.display = "none";
})