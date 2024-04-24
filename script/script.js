

// <Register Modal>
const registerModal = document.getElementById("registerModal");
const openRegisterModal = document.getElementById("openRegisterModal");
const closeRegisterModal = document.getElementById("closeRegisterModal");
const registerForm = document.getElementById("registerForm");
const studentRef = ref(database, "students"); //-gpt
// const studentRef = firebase.database().ref(`students`)

const showRegisterModal = () => {
  registerModal.classList.toggle("is-active");
};

openRegisterModal.addEventListener("click", showRegisterModal);
closeRegisterModal.addEventListener("click", showRegisterModal);
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = registerForm["nombre"].value;
  const apodo = registerForm["apodo"].value;
  const whatsapp = registerForm["whatsapp"].value;
  const estado = registerForm["estado"].value;
  const observacion = registerForm["observacion"].value;

  // Guarda los datos en Firebase
  // const registerStudent = push(ref(database, "students")) //-gpt
  //   set(registerStudent, { //-gpt
  const registerStudent = studentRef.push()
  registerStudent.set({
    Uid: registerStudent.pat.pieces_[1],
    Nombre: nombre,
    Apodo: apodo,
    Whatsapp: whatsapp,
    Estado: estado,
    Observacion: observacion,
  })
});
showRegisterModal(); // Open 

window.addEventListener("DOMContentLoaded", async (e) => {
  // await onValue(studentRef, (students) => { //-gpt
  await studentRef.on('value', (students) => {
    studentsTable.innerHTML = ""; // Limpia la tabla
    students.forEach((student) => {
      let studentData = student.val();
      studentsTable.innerHTML += `<tr>

      <td>
        <button class="button is-warning" data-id="${studentData.Uid}">
          <i class="bi bi-pencil-square"></i>
      </button>
    </td>
    <td>${studentData.Nombre}</td>
    <td>${studentData.Apodo}</td>
    <td>${studentData.Whatsapp}</td>
    <td>${studentData.Estado}</td>
    <td>${row}</td> <!-- Muestra la línea actual -->
    <td>
      <button class="button is-danger" data-id="${studentData.Uid}">
        <i class="bi bi-journal-x"></i>
      </button>
    </td>
    <td class="fs-m">${studentData.Uid}</td>
  </tr>`;



      const updateButtons = document.querySelectorAll(".is-warning");
      updateButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          showUpdateModal();
          firebaseConfig
          .database()
          .ref(`students/${e.target.dataset.id}`)
          .once('value')
          .then((student) => {
            const data = student.val()
            console.log(data)
          })

        });
      });
    });
  })
});





// Update Modal
const updateModal = document.getElementById("updateModal");
const openUpdateModal = document.getElementById("openUpdateModal");
const closeUpdateModal = document.getElementById("closeUpdateModal");
const updateForm = document.getElementById("updateForm");

const showUpdateModal = () => { // Mostrar Modal de Actualización
  updateModal.classList.toggle("is-active");
};

openUpdateModal.addEventListener("click", showUpdateModal);
closeUpdateModal.addEventListener("click", showUpdateModal);

// Escucha el evento submit del formulario de actualización
updateForm.addEventListener("submit", (e) => {
  e.preventDefault();
})  // <--- cierra la funcion
