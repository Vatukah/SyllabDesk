export async function resizeImageToBanner(file, width = 1584, height = 396) {
  if (!file?.type.startsWith("image/")) {
    throw new Error("Invalid file type");
  }

  const img = new Image();
  const reader = new FileReader();

  const loadImage = () =>
    new Promise((resolve, reject) => {
      reader.onload = (e) => {
        img.src = e.target.result;
      };
      img.onload = () => resolve();
      img.onerror = reject;
      reader.readAsDataURL(file);
    });

  await loadImage();

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  const originalAspect = img.width / img.height;
  const targetAspect = width / height;

  let sx, sy, sWidth, sHeight;

  if (originalAspect > targetAspect) {
    // Crop horizontally
    sHeight = img.height;
    sWidth = sHeight * targetAspect;
    sx = (img.width - sWidth) / 2;
    sy = 0;
  } else {
    // Crop vertically
    sWidth = img.width;
    sHeight = sWidth / targetAspect;
    sx = 0;
    sy = (img.height - sHeight) / 2;
  }

  ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, width, height);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const resizedFile = new File([blob], file.name, { type: file.type });
      const previewURL = URL.createObjectURL(blob);
      resolve({ file: resizedFile, previewURL });
    }, file.type);
  });
}
