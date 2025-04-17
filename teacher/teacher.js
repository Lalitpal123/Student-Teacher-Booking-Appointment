auth.onAuthStateChanged(user => {
    if (!user) {
      alert("Login required");
      location.href = '../index.html';
    } else {
      loadAppointments(user.uid);
    }
  });
  
  function loadAppointments(teacherId) {
    db.collection("appointments")
      .where("teacherId", "==", teacherId)
      .onSnapshot(snapshot => {
        const list = document.getElementById("appointmentList");
        list.innerHTML = "";
        snapshot.forEach(doc => {
          const appt = doc.data();
          const li = document.createElement("li");
          li.textContent = `${appt.purpose} - ${new Date(appt.timestamp.toDate()).toLocaleString()} (${appt.status})`;
  
          const approveBtn = document.createElement("button");
          approveBtn.innerText = "Approve";
          approveBtn.onclick = () => updateStatus(doc.id, "approved");
  
          const cancelBtn = document.createElement("button");
          cancelBtn.innerText = "Cancel";
          cancelBtn.onclick = () => updateStatus(doc.id, "cancelled");
  
          li.appendChild(approveBtn);
          li.appendChild(cancelBtn);
          list.appendChild(li);
        });
      });
  }
  
  function updateStatus(id, status) {
    db.collection("appointments").doc(id).update({ status }).then(() => {
      logAction(`Appointment ${status}`, auth.currentUser.uid, { appointmentId: id });
    });
  }
  
