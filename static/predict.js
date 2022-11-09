// the link to your model provided by Teachable Machine export panel
const URL = `tm-my-image-model/`;

let model, webcam, maxPredictions, happy, sad, angry;
let refresh = true;

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
        webcam = new tmImage.Webcam(400, 400, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        // append elements to the DOM
        document.getElementById("webcam-container").appendChild(webcam.canvas);
        happy = document.getElementById("happy");
        angry = document.getElementById("angry");
        window.requestAnimationFrame(loop);
    }
    else {
        location.reload();
    }

}

async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

// run the webcam image through the image model
async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
        // console.log(prediction[i].className)
        if (prediction[i].className == "hand") {
            happy.innerHTML = prediction[i].probability.toFixed(2);
            document.getElementById("happy-progress").value = prediction[i].probability.toFixed(2);
        }

        if (prediction[i].className == "no hand") {
            angry.innerHTML = prediction[i].probability.toFixed(2);
            document.getElementById("angry-progress").value = prediction[i].probability.toFixed(2);
        }
    }
}