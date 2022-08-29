import { fetchAndDisplayImages } from './firebase/listFiles.js';
import { previewFile, uploadFile } from './firebase/uploadFiles.js';

const input = document.getElementById('fileInput');
input.addEventListener('change', upload);

function upload() {
  for (let i = 0; i < input.files.length; i++) {
    const id = `img${Date.now()}`
    previewFile(input.files[i], id)
    uploadFile(input.files[i], id);
  }
}

fetchAndDisplayImages()
