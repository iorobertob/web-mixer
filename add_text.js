    (function() {
      var httpRequest;
      httpRequest = new XMLHttpRequest();

      if (!httpRequest) {
          alert('Giving up :( Cannot create an XMLHTTP instance');
          return false;
      }

      httpRequest.onreadystatechange      = setContents;
      httpRequestIntro.onreadystatechange = setContentsIntro;
      //Open then send the request to your page
      httpRequest.open('GET', "https://dev.ideas-block.com/mixer/files/content_text.txt");
      httpRequest.send();

      httpRequestIntro.open('GET', "https://dev.ideas-block.com/mixer/files/intro.txt");
      httpRequestIntro.send();
       

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

      function setContentsIntro() {
       if (httpRequestIntro.readyState === XMLHttpRequest.DONE) {
         if (httpRequestIntro.status === 200) {
          //Set the contents of your p tag
           document.getElementById("content_text_intro").innerHTML = httpRequestIntro.responseText;
          } else {
           alert('There was a problem with the request.');
          }
        }
      }









    })(); 