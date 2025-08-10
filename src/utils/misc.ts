export function formatBytes(bytes: number, decimals: number) {
  if (bytes == 0) return "0 Bytes";
  var k = 1024,
    dm = decimals == 0 ? decimals : decimals || 2,
    sizes = [
      "Bytes",
      "KB",
      "MB",
      "GB",
      "TB",
      "PB",
      "EB",
      "ZB",
      "YB",
      "TOOMUCH",
    ],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}