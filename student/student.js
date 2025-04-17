auth.onAuthStateChanged(user => {
    if (!user) {
      alert("Login required");
      location.href = '../index.html';
    }
  });
  
  function bookAppointment() {
    const teacherId = document.getElementById('teacherId').value;
    const dateTime = document.getElementById('dateTime').value;
    const purpose = document.getElementById('purpose').value;
  
    const appointment = {
      studentId: auth.currentUser.uid,
      teacherId,
      timestamp: new Date(dateTime),
      status: "pending",
      purpose
    };
  
    db.collection("appointments").add(appointment).then(() => {
      logAction("Booked Appointment", auth.currentUser.uid, appointment);
      alert("Appointment booked successfully.");
    });
  }
  
