let questions;
let currentQuestionIndex = 0;
let correctCount = 0;
let incorrectCount = 0;
let question, radio, submitButton, result;

function preload() {
  // 載入 Excel 檔案
  questions = loadTable('questions.xlsx', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("c8b6ff");
  
  radio = createRadio();
  radio.position(windowWidth / 2 - 50, windowHeight / 2);
  
  submitButton = createButton('送出');
  submitButton.position(windowWidth / 2 - 20, windowHeight / 2 + 50);
  submitButton.mousePressed(checkAnswer);
  
  result = { text: '', color: 'black' };
  
  loadQuestion();
}

function draw() {
  background("e7c6ff");
  textAlign(CENTER);
  textSize(24);
  fill(0);
  text(question, windowWidth / 2, windowHeight / 2 - 50);
  fill(result.color);
  text(result.text, windowWidth / 2, windowHeight / 2 + 100);
}

function loadQuestion() {
  radio.remove(); // 移除上一題的選項
  radio = createRadio(); // 重新建立 radio 物件
  radio.position(windowWidth / 2 - 50, windowHeight / 2); // 設定選項位置
  
  if (currentQuestionIndex < questions.getRowCount()) {
    let row = questions.getRow(currentQuestionIndex);
    question = row.get('question');
    radio.option(row.get('option1'));
    radio.option(row.get('option2'));
    radio.option(row.get('option3'));
    radio.option(row.get('option4'));
  } else {
    question = `測驗結束！正確: ${correctCount} 題，錯誤: ${incorrectCount} 題`;
    radio.hide();
    submitButton.hide();
  }
}

function checkAnswer() {
  let answer = radio.value();
  let correctAnswer = questions.getString(currentQuestionIndex, 'correct');
  if (answer === correctAnswer) {
    result = { text: '正確!', color: 'green' };
    correctCount++;
  } else {
    result = { text: '錯誤，請再試一次。', color: 'red' };
    incorrectCount++;
  }
  radio.hide(); // 隱藏當前題目的選項
  currentQuestionIndex++;
  loadQuestion();
}
