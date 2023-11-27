var notificationIcon = document.getElementById('notificationIcon');
var notificationWindow = document.getElementById('notificationWindow');

notificationIcon.addEventListener('click', function () {
    notificationWindow.style.bottom = (notificationWindow.style.bottom === '2%' || notificationWindow.style.bottom === '') ? '-50%' : '2%';
});
  
document.addEventListener('click', function (event) {
    var isClickInsideNotification = notificationIcon.contains(event.target) || notificationWindow.contains(event.target);
    if (!isClickInsideNotification) {
      notificationWindow.style.bottom = '-50%';
    }
});

var image = document.getElementById("myImage");
    image.addEventListener("click", function() {
      window.location.href = "index.html";
});


