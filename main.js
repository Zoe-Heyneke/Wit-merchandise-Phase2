function showPopup() {
    const popup = document.getElementById("popupMessage");
    popup.style.display = "flex"; // or "block" depending on layout
  }

  function closePopup() {
    const popup = document.getElementById("popupMessage");
    popup.style.display = "none";
  }

  // Show popup after 3 seconds (3000 milliseconds)
  setTimeout(showPopup, 2000);

  // Optional: Auto-hide after 10 seconds from appearance
  setTimeout(() => {
    closePopup();
  }, 13000); // 3000ms wait + 10000ms display = 13s total