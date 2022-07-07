const clock = document.querySelector("h2#clock");

function getClock(){
    const date = new Date();    //날짜 받아오기
    const hours = String(date.getHours()).padStart(2, "0"); //String으로 변환 후 길이 2 로 시작부터 0으로 채우며 padding
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    clock.innerText = (`${hours}:${minutes}:${seconds}`);
}

getClock();
setInterval(getClock, 1000);    //1초 마다 getClock 함수 실행

