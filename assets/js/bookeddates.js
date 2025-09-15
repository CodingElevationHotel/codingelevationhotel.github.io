const bookedDates = ["2025-09-20", "2025-09-21"];

// Flatpickr
flatpickr("#checkin", { dateFormat: "Y-m-d", minDate: "today", disable: bookedDates, appendTo: document.body });
flatpickr("#checkout", { dateFormat: "Y-m-d", minDate: "today", disable: bookedDates, appendTo: document.body });

window.addEventListener("load", function() {
  const checkinInput = document.getElementById("checkin");
  const checkoutInput = document.getElementById("checkout");
  const btn = document.getElementById("checkAvailabilityBtn");
  const modal = document.getElementById("availability-modal");
  const modalRooms = document.getElementById("modal-rooms");
  const closeBtn = document.querySelector(".close-modal");

  const rooms = [
    { name: "Standard", price: "80€/βράδυ", description: "Άνετο δωμάτιο με μοντέρνα διακόσμηση.", img: "assets/img/hero.jpg" },
    { name: "Deluxe", price: "120€/βράδυ", description: "Δωμάτιο με θέα στη θάλασσα και μπαλκόνι.", img: "assets/img/luxuries.jpg" },
    { name: "Suite", price: "200€/βράδυ", description: "Μεγάλη σουίτα με σαλόνι και πολυτελή ανέσεις.", img: "assets/img/suites.jpg" }
  ];

  btn.addEventListener("click", function() {
    const checkin = checkinInput.value;
    const checkout = checkoutInput.value;

    if (!checkin || !checkout) { alert("Επιλέξτε ημερομηνίες"); return; }
    if (checkout < checkin) { alert("Η αναχώρηση δεν μπορεί να είναι πριν την άφιξη!"); return; }
    if (bookedDates.includes(checkin) || bookedDates.includes(checkout)) { alert("Η ημερομηνία δεν είναι διαθέσιμη!"); return; }

    // Εμφάνιση δωματίων στο modal
    modalRooms.innerHTML = "";
    rooms.forEach(room => {
      const roomHTML = `
      <div class="room-card">
      <img src="${room.img}" alt="${room.name}">
      <div class="overlay">
        <h3>${room.name}</h3>
        <p>${room.description}</p>
        <strong>${room.price}</strong>
        <button class="book-btn">Κράτηση</button>
      </div>
    </div>
    `;
    modalRooms.innerHTML += roomHTML;

    // Μετά το modalRooms.innerHTML += roomHTML
    const bookButtons = document.querySelectorAll(".book-btn");
    bookButtons.forEach(btn => {
    btn.addEventListener("click", function() {
    alert("Επιτυχής κράτηση!"); // Μπορείς μετά να το αλλάξεις για πραγματικό σύστημα
     });
  });

  });


    // Άνοιγμα modal με animation
    modal.style.display = "flex";
    setTimeout(() => { modal.classList.add("active"); }, 10);
  });

  closeBtn.addEventListener("click", function() {
    modal.classList.remove("active");
    setTimeout(() => { modal.style.display = "none"; }, 500);
  });

  window.addEventListener("click", function(e) {
    if (e.target === modal) {
      modal.classList.remove("active");
      setTimeout(() => { modal.style.display = "none"; }, 500);
    }
  });
});
