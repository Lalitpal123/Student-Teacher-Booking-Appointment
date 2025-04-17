function addTeacher() {
    const name = document.getElementById('name').value;
    const department = document.getElementById('dept').value;
    const subject = document.getElementById('subject').value;
    const email = document.getElementById('email').value;
  
    db.collection("users").add({
      name,
      department,
      subject,
      email,
      role: "teacher",
      approved: true
    }).then(docRef => {
      logAction("Added Teacher", "admin", { teacherId: docRef.id });
      alert("Teacher added!");
    });
  }
  
