let input;
let slider;
let button;
let colorButton;
let weekSelect;
let iframe;
let isJumping = false;
let isColorChanging = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(10); // 設置畫布的更新頻率為10幀每秒
  input = createInput();
  input.position(10, 10); // 將文字框放在畫布的左上角
  input.size(200, 50); // 設置文字框的大小
  input.value("淡江大學"); // 設置文字框的初始值
  slider = createSlider(28, 50, 32); // 創建滑桿，範圍從28到50，初始值為32
  slider.position(input.x + input.width + 40, 27); // 將滑桿放在文字框的右邊

  button = createButton('跳動文字');
  button.position(slider.x + slider.width + 20, 27); // 將按鈕放在滑桿的右邊
  button.mousePressed(toggleJumping); // 設置按鈕點擊事件

  colorButton = createButton('變換顏色');
  colorButton.position(button.x + button.width + 20, 27); // 將按鈕放在跳動按鈕的右邊
  colorButton.mousePressed(toggleColorChanging); // 設置按鈕點擊事件

  weekSelect = createSelect();
  weekSelect.position(colorButton.x + colorButton.width + 20, 30); // 將下拉式選單放在變換顏色按鈕的右邊
  weekSelect.option('淡江大學');
  weekSelect.option('淡江教科');
  weekSelect.option('本周筆記');
  weekSelect.option('數學算數'); // 添加新的選項
  weekSelect.changed(goToWeek); // 設置選單變更事件

  iframe = createElement('iframe');
  iframe.position(100, 100);
  iframe.size(windowWidth - 200, windowHeight - 200);
  iframe.hide(); // 初始隱藏 iframe
}

function draw() {
  background("#e9edc9"); // 設置背景顏色
  let txt = input.value(); // 獲取文字框的值
  textAlign(CENTER, CENTER); // 設置文字對齊方式
  textSize(slider.value()); // 根據滑桿的值設置文字大小
  let spacing = 40; // 每段話之間的間隔

  for (let y = spacing; y < height; y += spacing) { // 逐行繪製文字
    for (let x = spacing; x < width; x += textWidth(txt) + spacing) { // 逐列繪製文字
      if (isColorChanging) {
        fill(random(255), random(255), random(255)); // 隨機變換顏色
      } else {
        fill("#d4a373"); // 設置文字顏色
      }
      if (isJumping) {
        let jitter = random(-5, 5); // 產生隨機跳動效果
        text(txt, x + jitter, y + jitter); // 繪製跳動文字
      } else {
        text(txt, x, y); // 繪製靜止文字
      }
    }
  }
}

function toggleJumping() {
  isJumping = !isJumping; // 切換跳動狀態
}

function toggleColorChanging() {
  isColorChanging = !isColorChanging; // 切換顏色變換狀態
}

function goToWeek() {
  let selectedWeek = weekSelect.value();
  if (selectedWeek === '淡江大學') {
    iframe.attribute('src', 'https://www.tku.edu.tw/');
    iframe.show(); // 顯示 iframe
  } else if (selectedWeek === '淡江教科') {
    iframe.attribute('src', 'http://www.et.tku.edu.tw/');
    iframe.show(); // 顯示 iframe
  } else if (selectedWeek === '本周筆記') {
    window.open('https://hackmd.io/@aaaiiirrr/Sk8-XtGsye', '_blank');
    iframe.hide(); // 隱藏 iframe
  } else if (selectedWeek === '數學算數') {
    iframe.attribute('src', 'https://air1823.github.io/math/');
    iframe.show(); // 顯示 iframe
  }
}