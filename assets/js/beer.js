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
        // 감마 절대값
        let absGamma = Math.abs(gamma);
        let absBeta = Math.abs(beta);

        const leftSide = (alpha >= 180 && alpha <= 360 && absBeta >= 90 && absBeta <= 180 && gamma > 0) || 
                        (alpha >= 0 && alpha < 180 && absBeta >= 0 && absBeta < 90 && gamma < 0);

        const rightSide = (alpha >= 0 && alpha < 180 && absBeta >= 90 && absBeta <= 180 && gamma < 0) || 
                        (alpha >= 180 && alpha <= 360 && absBeta >= 0 && absBeta < 90 && gamma > 0);

        let tl = gsap.timeline();

        // 감마가 0일 경우
        if (gamma === 0) {
            $('#beer').addClass('paused');
            tl.to('.beer-wrap', {rotation: 0});
        }
        // 감마가 -60와 60사이
        else if (gamma > -60 && gamma < 60) {
            $('#beer').addClass('paused');
            if (leftSide) {
                tl.to('.beer-wrap', {rotation: `${absGamma * 0.4}`});
            } else if (rightSide) {
                tl.to('.beer-wrap', {rotation: `${absGamma * -0.4}`});
            }
        }
        // 그 외의 경우
        else {
            $('#beer').removeClass('paused');
            if (leftSide) {
                tl.to('.beer-wrap', {rotation: 24});
            } else if (rightSide) {
                tl.to('.beer-wrap', {rotation: -24});
            }
        }

        
    }

}

// 디바이스 기울임 허용
let demo_button = document.getElementById("start_demo");
demo_button.onclick = function(e) {
    e.preventDefault();
    $('.btn-wrap').fadeOut(200);

    // Request permission for iOS 13+ devices
    if (
        DeviceMotionEvent &&
        typeof DeviceMotionEvent.requestPermission === "function"
    ) {
        DeviceMotionEvent.requestPermission();
    }

    window.addEventListener("deviceorientation", handleOrientation);
};