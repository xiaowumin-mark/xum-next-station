// 当前幻灯片的索引
let slideIndex = 1;

// 初始化轮播图
showSlides(slideIndex);

// 切换到下一张幻灯片
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// 切换到指定幻灯片
function currentSlide(n) {
    showSlides(slideIndex = n);
}

// 显示幻灯片
function showSlides(n) {
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    
    // 隐藏所有幻灯片
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    // 清除所有指示器的活动状态
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    // 显示当前幻灯片
    slides[slideIndex - 1].style.display = "block";
    // 将当前指示器标记为活动状态
    dots[slideIndex - 1].className += " active";
}
// 自动播放
let slideInterval = setInterval(() => plusSlides(1), 3000);

// 鼠标悬停时停止自动播放
document.querySelector(".slideshow-container").addEventListener("mouseenter", () => {
    clearInterval(slideInterval);
});

// 鼠标离开时继续自动播放
document.querySelector(".slideshow-container").addEventListener("mouseleave", () => {
    slideInterval = setInterval(() => plusSlides(1), 3000);
});
// 获取轮播图的上一个和下一个按钮
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

// 为上一个和下一个按钮添加点击事件
prevButton.addEventListener("click", () => plusSlides(-1));
nextButton.addEventListener("click", () => plusSlides(1));

// 获取轮播图的指示器圆点
const dots = document.getElementsByClassName("dot");

// 为每个指示器圆点添加点击事件
for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener("click", () => currentSlide(i + 1));
}