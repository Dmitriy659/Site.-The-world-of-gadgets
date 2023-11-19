var notificationIcon = document.getElementById('notificationIcon');
var notificationWindow = document.getElementById('notificationWindow');

// Обработчик события клика
notificationIcon.addEventListener('click', function () {
    // Переключаем видимость окна с обновлениями
    notificationWindow.style.bottom = (notificationWindow.style.bottom === '2%' || notificationWindow.style.bottom === '') ? '-50%' : '2%';
  });
  
  // Закрываем окно при клике в любой другой области экрана
  document.addEventListener('click', function (event) {
    var isClickInsideNotification = notificationIcon.contains(event.target) || notificationWindow.contains(event.target);
    if (!isClickInsideNotification) {
      notificationWindow.style.bottom = '-50%';
    }
  });