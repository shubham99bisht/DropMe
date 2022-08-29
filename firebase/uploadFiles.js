import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-storage.js";

const storage = getStorage();
const fileContainer = document.getElementById('fileContainer');

export function previewFile(file, id) {
  const reader = new FileReader();
  const fileName = file.name.split('.')[0];

  reader.readAsDataURL(file);
  reader.onload = function (e) {
    const newImage = `
    <div class="col-lg-4 col-md-6">
      <div class="card mb-3" id="${id}">
        <img src="${e.target.result}" class="card-img-top" data-bs-name="${fileName}">
        <div class="card-img-overlay"></div>
        <div class="card-body">
          <h5 class="card-title">${fileName}</h5>
          <div class="progress">
            <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: 0%;"></div>
          </div>
        </div>
      </div>
    </div>`

    fileContainer.innerHTML += newImage
  };
}

export function uploadFile(file, id) {
  const storageRef = ref(storage, file.name);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on('state_changed', 
    snapshot => handleProgress(snapshot, id), 
    error => console.log(error), 
    () => handleSuccessfulUpload(uploadTask.snapshot.ref, id)
  );
}

function handleProgress(snapshot, id) {
  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  if (!progress) return
  console.log(id, 'Upload is ' + progress + '% done');
  const progressBar = document.querySelector(`#${id} .progress-bar`)
  progressBar.style = `width: ${progress}%`
}

async function handleSuccessfulUpload(imageRef, id) {
  const link = await getDownloadURL(imageRef)
  const card = document.getElementById(id)
  card.setAttribute('data-bs-toggle', 'modal')
  card.setAttribute('data-bs-target', '#imageModal')
  card.setAttribute('data-bs-link', link)
  
  const progressBar = document.querySelector(`#${id} .progress`)
  progressBar.style = "display: none"
}
