function getWeather(lat,lon){
    $.ajax({
        type: 'get',
        url: 'https://fcc-weather-api.glitch.me/api/current?lat='+encodeURIComponent(lat)+'&lon='+encodeURIComponent(lon),
        success: function(json){
            var data=JSON.parse(json);

            var position=data.base;
            var temperature=data.temp;
            var weather=data.weather[0].main;
            var imgUrl=data.weather[0].icon;
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
});