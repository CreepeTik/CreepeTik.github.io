document.getElementById('downloadButton').addEventListener('click', function() {
  const fileURL = '/files/RobloxNoobRig.zip';
  const fileName = 'RobloxNoobRig';
  const a = document.createElement('a');
  a.href = fileURL;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});