const images = ["0.jpg", "1.jpeg", "2.jpg"];

const chosenImage = images[Math.floor(Math.random()*images.length)];    //랜덤 이미지 이름 가져오기

const bgImage = document.createElement("img");  //img html 생성

bgImage.src = `img/${chosenImage}`; //src 설정

document.body.appendChild(bgImage); //html body에 추가
