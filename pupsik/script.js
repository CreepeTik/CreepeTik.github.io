document.getElementById("playButton").addEventListener("click", function() {
    // Скрыть кнопку
    this.style.display = "none";
    
    // Показать контейнер с видео
    document.getElementById("videoContainer").style.display = "block";
    
    // Воспроизвести видео
    var video = document.getElementById("videoPlayer");
    video.play();
  });
  