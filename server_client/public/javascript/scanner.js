/* eslint-disable prettier/prettier */
const fileInput = document.getElementById('fileID');
const chooseVideoBtn = document.getElementById('chooseVideoBtn');
const detectVideoBtn = document.getElementById('detectVideoBtn');
const selectTxt = document.getElementById('selectTxt');
const formData = new FormData(); // Move the declaration here
const style = `text-decoration: none;
        background-color: #ffffff;
        color: dodgerblue;
        padding: 10px 20px;
        border: none;
        outline: 1px solid #010101;`;
// Add an event listener to the file input element
fileInput.addEventListener('change', () => {
    const file = fileInput.files[0]; // Get the selected file
    if (file) {
        // Append the file to the FormData object
        formData.append('video', file);
        console.log('Uploading file:', file);
        console.log(formData);
        chooseVideoBtn.title = 'Uploading...'; // Change the button title text
        chooseVideoBtn.textContent = 'Uploading...'; // Change the button text
        chooseVideoBtn.disabled = true; // Disable the button
        chooseVideoBtn.style = style;
        console.log('Uploading file:', file.name);
        selectTxt.textContent = `${file.name}`; // Hide the text

        setTimeout(() => {
            chooseVideoBtn.style.display = 'none'; // Hide the button
            detectVideoBtn.style.display = 'block'; // Show the button
        }, 2000); // Delay execution for 2 seconds (2000 milliseconds)
    }
});

// Add an event listener to the choose video button
chooseVideoBtn.addEventListener('click', () => {
            
    fileInput.click(); // Trigger the file input click event
});

// Add an event listener to the detect video button
detectVideoBtn.addEventListener('click', () => {
    detectVideoBtn.title = 'Detecting...'; // Change the button title text
    detectVideoBtn.textContent = 'Detecting...'; // Change the button text
    detectVideoBtn.disabled = true; // Disable the button
    detectVideoBtn.style = style;
    // Make an AJAX request to upload the file
    fetch('/api/v1/deepfake/', {
        method: 'POST',
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            // Handle the response from the server
            console.log('Upload response:', data);
            // Check if the response indicates a successful upload
            // Redirect the user to the desired page
            window.location.href = '/api/v1/deepfake/';
        })
        .catch((error) => {
            // Handle any errors that occur during the upload process
            console.error('Upload error:', error);
        });
});
