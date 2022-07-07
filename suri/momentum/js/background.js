const images = ["1.jpg", "2.jpg", "3.jpg"]

const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImg = document.createElement("img"); //지금 이 과정은 javascript에서 html을 만드는 과정이다.

bgImg.src = `img/${chosenImage}`;

document.body.append(bgImg); //이렇게 해야지 bgImg가 body에 추가된다.