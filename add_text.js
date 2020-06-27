    (function() {
      var httpRequest;
      httpRequest = new XMLHttpRequest();

      if (!httpRequest) {
          alert('Giving up :( Cannot create an XMLHTTP instance');
          return false;
      }

      httpRequest.onreadystatechange = setContents;
      //Open then send the request to your page
      httpRequest.open('GET', "https://dev.ideas-block.com/mixer/files/content_text.txt");
      httpRequest.send();
       

      function setContents() {
       if (httpRequest.readyState === XMLHttpRequest.DONE) {
         if (httpRequest.status === 200) {
          //Set the contents of your p tag
           document.getElementById("content_text").innerHTML = httpRequest.responseText;
          } else {
           alert('There was a problem with the request.');
          }
        }
      }









    })(); 