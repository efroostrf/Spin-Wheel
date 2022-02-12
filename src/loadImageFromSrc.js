async function loadImageFromSrc(src) {
  return new Promise(resolve => {
    var image = new Image();

    image.src = src;
    image.onload = () => {
      resolve(image);
    };
    image.onerror = () => resolve(false);
  });
}

export {
  loadImageFromSrc
}