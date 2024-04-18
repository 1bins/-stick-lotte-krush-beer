let beer = document.querySelector('.beer-body');

// 디바이스 좌우 기울기 값 구하기
function handleOrientation(event) {
    let alpha = event.alpha;
    let beta = event.beta;
    let gamma = event.gamma;

    updateFieldIfNotNull(alpha, beta, gamma);
}


// 좌우로 기울일 때 마다 발생하는 이벤트
function updateFieldIfNotNull(alpha, beta, gamma){
    if (gamma != null){
        let absGamma = Math.abs(gamma);

        if(gamma > -45 && gamma < 45){
            $('#beer').addClass('paused')
            gsap.to('.beer-wrap', {rotation: 0})        
        }
        else {
            $('#beer').removeClass('paused')
            $('#beer').addClass('active')

            if(absGamma > 60){
                // $('.beer-wrap').css({'transform': `rotate(30deg)`})
                gsap.to('.beer-wrap', {rotation: 24})
            }else {
                gsap.to('.beer-wrap', {rotation: `${gamma * 0.4}`})
            }
        }
        
    }

}

// 디바이스 기울임 허용
let demo_button = document.getElementById("start_demo");
demo_button.onclick = function(e) {
    e.preventDefault();

    // Request permission for iOS 13+ devices
    if (
        DeviceMotionEvent &&
        typeof DeviceMotionEvent.requestPermission === "function"
    ) {
        DeviceMotionEvent.requestPermission();
    }

    window.addEventListener("deviceorientation", handleOrientation);
};