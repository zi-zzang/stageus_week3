// 숫자야구 ( 컴퓨터가 랜덤으로 숫자 백의자리 세개를 생각한다. 그 숫자를 사용자가 맞추는 게임)
// 1. 컴퓨터가 랜덤 숫자를 생각한다.
// 2. 우리는 세자리 숫자를 생각해서 제출한다.
// 3. 숫자가 존재하는데 위치가 같은 경우, 숫자가 존재하는데 위치가 다른 경우
// 4. 위치가 같으면 스트라이크, 위치가 다른 경우 볼로 계산
// 5. 정답이 123, 내가 231일 경우 볼 세개
// 6. 3스트라이크가 나올 경우 정답~

// 컴퓨터가 3개의 숫자 입력하게 하기 //
var num = (Math.floor(Math.random() * (999 - 100 + 1)) + 100).toString();
// (최댓값 - 최소값 + 1) + 최소값
var computer = num.split("").map(Number);

// 전역변수
var count = 0; // 숫자 키패드 카운트
var submitCount = 0; // 게임횟수 카운트

//초기화//
function refreshEventHandler() {
  for (let i = 1; i <= 3; i++) {
    document.getElementById(`num${i}`).innerHTML = "";
    document.getElementById("game-result").innerHTML = "숫자를 입력해 주세요.";
    document.getElementById("game-result").style.color = "red";
    count = 0;
  }
}

//기록 초기화
function deleteEventHandler() {
  document.getElementById("record").innerHTML = null;
}

function randomClickEventHandler() {
  // 버튼을 누를 때마다 새로운 랜덤 숫자
  num = (Math.floor(Math.random() * (999 - 100 + 1)) + 100).toString();
  computer = num.split("").map(Number);
  alert("새로운 랜덤 숫자가 생성됐습니다.");
  deleteEventHandler(); // 기록 초기화
  submitCount = 0; // 게임 횟수 초기화

  // 배열끼리 중복되는 숫자 방지
  // 컴퓨터의 숫자들이 서로 같지 않아야 코드실행 멈춤.
  while (
    computer[0] == computer[1] ||
    computer[0] == computer[2] ||
    computer[1] == computer[2]
  ) {
    num = (Math.floor(Math.random() * (999 - 100 + 1)) + 100).toString();
    computer = num.split("").map(Number);
  }

  console.log("새로운 랜덤 숫자 " + computer);
}

// 내가 3개의 숫자 입력하기 //
var choiceNum1 = null;
var choiceNum2 = null;
var choiceNum3 = null;

// 숫자 키패드 눌렀을 때 이벤트
function calEventHandler(e) {
  //cal 함수를 누르면 count가 1씩 증가.
  count++;
  // console.log(count);

  // 클릭으로 인해 count값이 1이 되었을 때 첫번째 숫자 값이 변수에 들어간다.
  if (count == 1) {
    choiceNum1 = e.innerText;

    // 첫번째 순서에 0을 눌렀을 때 알림창
    // 중첩 if문을 쓴 이유: 0을 누른 순간도 count는 1이 올라가기 때문.
    if (choiceNum1 == 0) {
      alert("첫번째 자리에는 0이 올 수 없습니다.");
      count = 0;
      choiceNum1 = null;
    }
    document.getElementById("num1").innerText = choiceNum1;
  } else if (count == 2) {
    choiceNum2 = e.innerText;
    document.getElementById("num2").innerText = choiceNum2;
  } else if (count == 3) {
    choiceNum3 = e.innerText;
    document.getElementById("num3").innerText = choiceNum3;
  }
  if (count > 3) {
    alert("3개의 숫자를 모두 고르셨습니다.");
  }
}

//등록버튼 누른 후//
document.getElementById("input-submit").addEventListener("click", function () {
  // 내가 선택한 숫자
  var user = [choiceNum1, choiceNum2, choiceNum3].map(Number);
  console.log(user);

  submitCount++;

  var strike = 0;
  var ball = 0;
  if (count == 0) {
    alert("숫자를 입력 후 등록버튼을 눌러주세요.");
    return;
  }

  // i가 컴퓨터의 길이(3)보다 작으면 1씩 증가한다.
  for (let i = 0; i < computer.length; i++) {
    // console.log(`${i}번째 숫자 비교 시작 (i)`);
    //ii가 유저의 길이(3)보다 작으면 1씩 증가한다.
    for (let ii = 0; ii < user.length; ii++) {
      // console.log(`${ii}번째 숫자 비교 시작 (ii)`);
      //0번째 숫자를 3번, 1번째 숫자를 3번, 2번째 숫자를 3번씩 비교한다.
      // console.log(computer[i], user[ii]);
      //인덱스 내 숫자의 값이 같은데
      if (computer[i] == user[ii]) {
        //인덱스 위치도 일치한다면
        if (i == ii) {
          console.log(i, ii);
          strike++; //스트라이크에 +1을 해주고
        } else {
          //아니면 ball에 +1을 해준다.
          ball++;
        }
      }
    }
    document.getElementById(
      "game-result"
    ).innerHTML = `${strike}스트라이크, ${ball}볼`;
  }

  // 기록 저장
  var data = [];
  var result = `${strike}스트라이크, ${ball}볼`;
  data.push(result);
  document.getElementById("record").innerHTML += `<p>(${user})  ${data}</p>`;
  console.log(data);

  //2,3번째 숫자가 빈 값일 때
  if ((choiceNum2, choiceNum3 == null) || choiceNum3 == null) {
    alert("숫자를 모두 입력해 주세요.");
    deleteEventHandler(); // 기록 삭제
    refreshEventHandler(); // 새로 고침
  }

  //3스트라이크일 때
  if (strike == 3) {
    alert("정답입니다!");
    document.getElementById(
      "game-result"
    ).innerHTML = `짝짝짝! ${strike} 스트라이크입니다!`;
    document.getElementById("game-result").style.color = "rgb(11, 199, 11)";
    submitCount = 0;
  }

  if (submitCount > 10) {
    alert("횟수를 모두 소진하셨습니다ㅠㅠ");
    document.getElementById(
      "game-result"
    ).innerHTML = `정답은 ${computer} 입니다.`;
  }
});
