const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('capture');
const submitButton = document.getElementById('submit');
const status = document.getElementById('status');
const attendanceDetails = document.getElementById('attendanceDetails');
const capturedPhoto = document.getElementById('capturedPhoto');
const employeeName = document.getElementById('employeeName');
const employeeId = document.getElementById('employeeId');
const employeePosition = document.getElementById('employeePosition');

navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        status.innerText = "Unable to access camera.";
        status.style.color = '#e74c3c';
    });

captureButton.addEventListener('click', () => {
    captureFace();
});

submitButton.addEventListener('click', () => {
    submitAttendance();
});

function captureFace() {
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    submitButton.disabled = false;
    submitButton.classList.add('active');
    status.innerText = "Face captured successfully!";
    status.style.color = '#27ae60';
}

function submitAttendance() {
    submitButton.disabled = true;
    submitButton.classList.remove('active');
    status.innerText = "Attendance marked successfully!";
    status.style.color = '#3498db';

    // Simulate fetching employee details
    const employee = {
        name: "John Doe",
        employeeId: "EMP12345",
        position: "Software Developer",
        photoUrl: canvas.toDataURL()  // Use the captured face as the photo URL
    };

    // Display the employee's photo and details
    capturedPhoto.src = employee.photoUrl;
    employeeName.textContent = employee.name;
    employeeId.textContent = employee.employeeId;
    employeePosition.textContent = employee.position;

    // Show the attendance details section
    attendanceDetails.style.display = 'block';
}
