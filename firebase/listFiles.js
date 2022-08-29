import { getStorage, ref, getDownloadURL, listAll } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-storage.js";

const storage = getStorage();
const listRef = ref(storage, '/');
const imageContainer = document.getElementById('fileContainer');

export async function fetchAndDisplayImages() {
  const res = await listAll(listRef)

  res.items.forEach(async itemRef => {
    const link = await getDownloadURL(itemRef)
    const fileName = itemRef.name.split('.')[0]
    const div = `
      <div class="col-lg-4 col-md-6">
        <div class="card mb-3" data-bs-toggle="modal" data-bs-target="#imageModal" data-bs-link="${link}" data-bs-name="${fileName}">
          <img src="${link}" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">${fileName}</h5>
          </div>
        </div>
      </div>`
    imageContainer.innerHTML += div;
  })
}
