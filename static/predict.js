// the link to your model provided by Teachable Machine export panel
const URL = `tm-my-image-model/`;

let model, webcam, maxPredictions, happy, sad, angry;
let refresh = true;
let c1n, c2n, c3n, c4n, c5n, c6n;
let c1v, c2v, c3v, c4v, c5v, c6v;
let c1p, c2p, c3p, c4p, c5p, c6p;
let int1, int2, int3, int4, int5, int6;
var array = [];
var highestValue = 0;
var highestIndex;

// Load uploaded files
async function loadImage(event, id) {
  var imageprev = document.getElementById(id + "prev");
  var image = document.getElementById(id);
  image.src = window.URL.createObjectURL(event.target.files[0]);
  imageprev.src = window.URL.createObjectURL(event.target.files[0]);
}

async function loadModel(event, id) {
  var file = document.getElementById(id);
}

// Load the image model and setup the webcam
async function init() {
  if (refresh) {
    refresh = false;
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(400, 300, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    // append elements to the DOM
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    document.getElementById("init").innerHTML = "in progress";
    document.getElementById("init").style.background = " #fcf5e4";
    document.getElementById("init").style.color = " #ffb800";

    document.getElementById("label").style.display = "block";
    document.getElementById("howto").style.display = "none";

    document.getElementById("file").style.display = "none";

    c1n = document.getElementById("class1n");
    c2n = document.getElementById("class2n");
    c3n = document.getElementById("class3n");
    c4n = document.getElementById("class4n");
    c5n = document.getElementById("class5n");
    c6n = document.getElementById("class6n");

    c1v = document.getElementById("class1v");
    c2v = document.getElementById("class2v");
    c3v = document.getElementById("class3v");
    c4v = document.getElementById("class4v");
    c5v = document.getElementById("class5v");
    c6v = document.getElementById("class6v");

    c1p = document.getElementById("1-progress");
    c2p = document.getElementById("2-progress");
    c3p = document.getElementById("3-progress");
    c4p = document.getElementById("4-progress");
    c5p = document.getElementById("5-progress");
    c6p = document.getElementById("6-progress");

    int1 = document.getElementById("int1");
    int2 = document.getElementById("int2");
    int3 = document.getElementById("int3");
    int4 = document.getElementById("int4");
    int5 = document.getElementById("int5");
    int6 = document.getElementById("int6");

    window.requestAnimationFrame(loop);
  } else {
    location.reload();
  }
}

async function loop() {
  webcam.update(); // update the webcam frame
  await predict();
  window.requestAnimationFrame(loop);
}

async function toggle() {
  console.log(document.getElementById("window").style.visibility);
  if (document.getElementById("window").style.visibility === "visible") {
    document.getElementById("window").style.visibility = "hidden";
  } else {
    document.getElementById("window").style.visibility = "visible";
  }

  if (document.getElementById("closeBtn").style.transform === "rotate(0deg)") {
    document.getElementById("closeBtn").style.transform = "rotate(180deg)";
  } else {
    document.getElementById("closeBtn").style.transform = "rotate(0deg)";
  }
}
// run the webcam image through the image model
async function predict() {
  // predict can take in an image, video or canvas html element
  const prediction = await model.predict(webcam.canvas);
  for (let i = 0; i < maxPredictions; i++) {
    // console.log(maxPredictions);
    array[i] = Number(prediction[i].probability.toFixed(2));
    console.log(array);

    highestValue = Math.max(...array);
    highestIndex = array.indexOf(highestValue);

    console.log(highestIndex);

    if (highestIndex === 0) {
      int1.style.display = "block";
      int2.style.display = "none";
      int3.style.display = "none";
      int4.style.display = "none";
      int5.style.display = "none";
      int6.style.display = "none";
    } else if (highestIndex === 1) {
      int1.style.display = "none";
      int2.style.display = "block";
      int3.style.display = "none";
      int4.style.display = "none";
      int5.style.display = "none";
      int6.style.display = "none";
    } else if (highestIndex === 2) {
      int1.style.display = "none";
      int2.style.display = "none";
      int3.style.display = "block";
      int4.style.display = "none";
      int5.style.display = "none";
      int6.style.display = "none";
    } else if (highestIndex === 3) {
      int1.style.display = "none";
      int2.style.display = "none";
      int3.style.display = "none";
      int4.style.display = "block";
      int5.style.display = "none";
      int6.style.display = "none";
    } else if (highestIndex === 4) {
      int1.style.display = "none";
      int2.style.display = "none";
      int3.style.display = "none";
      int4.style.display = "none";
      int5.style.display = "block";
      int6.style.display = "none";
    } else if (highestIndex === 5) {
      int1.style.display = "none";
      int2.style.display = "none";
      int3.style.display = "none";
      int4.style.display = "none";
      int5.style.display = "none";
      int6.style.display = "block";
    }

    if (i === 0) {
      c1n.innerHTML = prediction[i].className;
      c1v.innerHTML = prediction[i].probability.toFixed(2);
      c1p.value = prediction[i].probability.toFixed(2);
    }
    if (i === 1) {
      c2n.innerHTML = prediction[i].className;
      c2v.innerHTML = prediction[i].probability.toFixed(2);
      c2p.value = prediction[i].probability.toFixed(2);
    }
    if (i === 2) {
      c3n.innerHTML = prediction[i].className;
      c3v.innerHTML = prediction[i].probability.toFixed(2);
      c3p.value = prediction[i].probability.toFixed(2);
    }
    if (i === 3) {
      c4n.innerHTML = prediction[i].className;
      c4v.innerHTML = prediction[i].probability.toFixed(2);
      c4p.value = prediction[i].probability.toFixed(2);
    }
    if (i === 4) {
      c5n.innerHTML = prediction[i].className;
      c5v.innerHTML = prediction[i].probability.toFixed(2);
      c5p.value = prediction[i].probability.toFixed(2);
    }
    if (i === 5) {
      c6n.innerHTML = prediction[i].className;
      c6v.innerHTML = prediction[i].probability.toFixed(2);
      c6p.value = prediction[i].probability.toFixed(2);
    }

    // if (prediction[i].className == "hand") {
    //     happy.innerHTML = prediction[i].probability.toFixed(2);
    //     document.getElementById("happy-progress").value = prediction[i].probability.toFixed(2);
    // }

    // if (prediction[i].className == "no hand") {
    //     angry.innerHTML = prediction[i].probability.toFixed(2);
    //     document.getElementById("angry-progress").value = prediction[i].probability.toFixed(2);
    // }
  }
}
