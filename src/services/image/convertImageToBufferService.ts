const convertImageToBuffer = async (imageFile: File): Promise<Buffer> => {
  //Use Byte schema
  try {
    const imageBuffer = await imageFile.arrayBuffer(); // Convert file to ArrayBuffer

    if (!imageBuffer)
      throw new Error("Image file cannot be converted to ArrayBuffer");

    return Buffer.from(imageBuffer); // Convert ArrayBuffer to Buffer
  } catch (error) {
    console.error("Error while converting image to buffer:", error);
    throw new Error("Failed to convert image into Base64 string");
  }
};

export default convertImageToBuffer;
