const convertFileToBufferService = async (File: File): Promise<Buffer> => {
  //Use Byte schema
  try {
    const FileBuffer = await File.arrayBuffer(); // Convert file to ArrayBuffer

    if (!FileBuffer)
      throw new Error("Image file cannot be converted to ArrayBuffer");

    return Buffer.from(FileBuffer); // Convert ArrayBuffer to Buffer
  } catch (error) {
    console.error("Error while converting image to buffer:", error);
    throw new Error("Failed to convert image into Base64 string");
  }
};

export default convertFileToBufferService;
