$(document).ready(function() {
    $(document).on('submit', '#form', function() {

        function youtube_parser(url){
            var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
            var match = url.match(regExp);
            return (match&&match[7].length==11)? match[7] : false;
        }
        const input_link = document.getElementById('youtube_link').value;
        const id = youtube_parser(input_link);
        const youtube_link = 'https://youtube-mp36.p.rapidapi.com/dl?id='+ id;
        const settings = {
            "async": true,
            "crossDomain": true,
            "url": youtube_link,
            "method": "GET",
            "headers": {
                "X-RapidAPI-Key": "bb203db9d5msh1363e1edc7adfcbp1d83dajsn3403a4372d25",
                "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com"
            }
        };
        $.ajax(settings).done(function (response) {

            console.log(response);

            const title = response.title;
            const link = response.link;
            const form = document.getElementById('form');
            const link_btn = document.getElementById('href');
            const title_html = document.getElementById('title')
            if(response.msg == 'Invalid Video Id'){
                Toast.fire({
                    icon: 'error',
                    title: 'Invalid Video Id!'
                  })
            }else{
                form.style.display='none';
                Toast.fire({
                    icon: 'success',
                    title: 'Prossesing Please Wait!'
                  });
                  title_html.innerText = title;
                  link_btn.href = link;
                  setTimeout(() => {
                        document.getElementById('download').style.display='flex';
                  }, 3000)
            }
            
        });

      return false
     });
});