var temperature;

function getWeather(lat,lon){
    $.ajax({
        type: 'get',
        url: 'https://fcc-weather-api.glitch.me/api/current?lat='+encodeURIComponent(lat)+'&lon='+encodeURIComponent(lon),
        success: function(data){

            var position1=data.name;
            var position2=data.sys.country;
            temperature=data.main.temp;
            var weather=data.weather[0].main;
            var imgUrl=data.weather[0].icon;

            $('.position1').text(position1);
            $('.position2').text(position2);
            $('.temperature').text(temperature);
            $('.weather').text(weather);
            $('.icon').attr('src',imgUrl);
        }
    });
}

function changeTem(){
    $('.tempUnit').on('click',function(){
        var tempUnit=$('.tempUnit').text();

        var currentTempUnit=tempUnit==='C'?'F':'C';
        $('.tempUnit').text(currentTempUnit);

        if(currentTempUnit==='F'){
            $('.temperature').text(Math.floor(1.8*temperature+32));
        }else{
            $('.temperature').text(temperature);
        }
    });
}

$(document).ready(function(){
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            getWeather(position.coords.latitude, position.coords.longitude);
        });
    }else{
        alert("浏览器不支持定位服务");
    }

    changeTem();
});