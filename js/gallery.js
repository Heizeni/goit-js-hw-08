const images = [
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
      description: 'Hokkaido Flower',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
      description: 'Container Haulage Freight',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
      description: 'Aerial Beach View',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
      description: 'Flower Blooms',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
      description: 'Alpine Mountains',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
      description: 'Mountain Lake Sailing',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
      description: 'Alpine Spring Meadows',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
      description: 'Nature Landscape',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
      description: 'Lighthouse Coast Sea',
    },
  ];
  
  const galleryContainer = document.querySelector('.gallery');

  const markup = images
    .map(
      ({ preview, original, description }) => `
      <li class="gallery-item">
        <a class="gallery-link" href="${original}">
          <img
            class="gallery-image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>
    `
    )
    .join('');
  
  galleryContainer.innerHTML = markup;
  
  let currentIndex = null;
  let instance = null;
  
  galleryContainer.addEventListener('click', onGalleryClick);
  
  function onGalleryClick(evt) {
    evt.preventDefault();
  
    const isImageEl = evt.target.classList.contains('gallery-image');
    if (!isImageEl) return;
  
    const clickedImageURL = evt.target.dataset.source;
    currentIndex = images.findIndex(image => image.original === clickedImageURL);
  
    showImage(currentIndex);
  }
  
  function showImage(index) {
  const { original, description } = images[index];

  instance = basicLightbox.create(
    `
    <div class="modal-wrapper" style="width: 1112px; height: 640px; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: rgba(46, 47, 66, 0.8);">
      <img src="${original}" alt="${description}" />
      <p class="modal-caption" style="color: white; margin-top: 0px; font-size: 18px;">${description}</p>
    </div>
    `,
    {
      onShow: (instance) => {
        window.addEventListener('keydown', onKeyPress);

        const modalElement = instance.element();
        modalElement.addEventListener('click', (event) => {
          if (event.target.tagName !== 'IMG') {
            instance.close();
          }
        });
      },
      onClose: () => {
        window.removeEventListener('keydown', onKeyPress);
      },
    }
  );

  instance.show();
}
  
  function onKeyPress(evt) {
    if (evt.key === 'Escape') {
      instance.close();
    } else if (evt.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % images.length;
      updateModalImage(currentIndex);
    } else if (evt.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateModalImage(currentIndex);
    }
  }
  
  function updateModalImage(index) {
  const modalWrapper = instance.element().querySelector('.modal-wrapper');
  const img = modalWrapper.querySelector('img');
  const caption = modalWrapper.querySelector('.modal-caption');

  img.src = images[index].original;
  img.alt = images[index].description;
  caption.textContent = images[index].description;
}
  