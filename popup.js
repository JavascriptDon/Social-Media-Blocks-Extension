const generateHTML = (pageName) => {
    return `
    <head>  
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css'>
    <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Arvo'>
    </head>
  <body>
    <section class="page_404">
      <div class="container">
          <div class="row">	
          <div class="col-sm-12 ">
          <div class="col-sm-10 col-sm-offset-1  text-center">
          <div class="four_zero_four_bg">
              <h1 class="text-center ">404</h1>
          </div>
          <div class="contant_box_404">
          <h3 class="_1">
          Get back to work
          </h3>
          <p class='_2'>STUDYING > ${pageName}</p>
      </div>
          </div>
          </div>
          </div>
      </div>
  </section>`;
  };
  
  const generateSTYLING = () => {
    return `<style>
    body {
      margin: 0;
      padding: 0;
      font-family: "Tomorrow", sans-serif;
      height: 100vh;
      background-image: linear-gradient(
        to top,
        #2e1753,
        #1f1746,
        #131537,
        #0d1028,
        #050819
      );
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }
    
.page_404{ padding:40px 0; background:#fff; font-family: 'Arvo', serif;
}

.page_404  img{ width:100%;}

.four_zero_four_bg{
 
 background-image: url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif');
    height: 400px;
    background-position: center;
 }

 ._1 {
    text-align: center;
    display: block;
    position: relative;
    letter-spacing: 12px;
    font-size: 4em;
    line-height: 80%;
    margin: 20px;
  }
  ._2 {
    text-align: center;
    display: block;
    position: relative;
    font-size: 20px;
    margin: 60px;
  }
 
 
 .four_zero_four_bg h1{
 font-size:80px;
 }
 
 .four_zero_four_bg h3{
			 font-size:80px;
			 }
			 
 .link_404{			 
	color: #fff!important;
    padding: 10px 20px;
    background: #39ac31;
    margin: 20px 0;
    display: inline-block;}
	.contant_box_404{ margin-top:-50px;}
     </style>`;
  };
  
  switch (window.location.hostname){
    case "www.youtube.com":
        document.head.innerHTML = generateSTYLING();
        document.body.innerHTML = generateHTML('YOUTUBE');
        break;
    case "www.facebook.com":
        document.head.innerHTML = generateSTYLING();
        document.body.innerHTML = generateHTML('FACEBOOK');  
        break;
    case "www.netflix.com":
        document.head.innerHTML = generateSTYLING();
        document.body.innerHTML = generateHTML('NETFLIX'); 
        break;
    case "www.tiktok.com":
        document.head.innerHTML = generateSTYLING();
        document.body.innerHTML = generateHTML('TIKTOK');
        break;
    case "www.discord.com":
        document.head.innerHTML = generateSTYLING();
        document.body.innerHTML = generateHTML('DISCORD');
        break;
    case "www.instagram.com":
        document.head.innerHTML = generateSTYLING();
        document.body.innerHTML = generateHTML('INSTAGRAM');
        break;
    case "web.whatsapp.com":
        document.head.innerHTML = generateSTYLING();
        document.body.innerHTML = generateHTML('WHATSAPP');
        break;
    case "www.linkedin.com":
        document.head.innerHTML = generateSTYLING();
        document.body.innerHTML = generateHTML('LINKEDIN');
        break;
    case "www.twitter.com":
        document.head.innerHTML = generateSTYLING();
        document.body.innerHTML = generateHTML('TWITTER');
        break;
    case "www.reddit.com":
        document.head.innerHTML = generateSTYLING();
        document.body.innerHTML = generateHTML('REDDIT');
        break;
    
  };