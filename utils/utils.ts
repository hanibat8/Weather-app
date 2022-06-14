export default function switchWeatherImgArr(key:string,weatherImageObj:{rain:StaticImageData,clouds:StaticImageData,sunny:StaticImageData}){ 
    switch (key) {
        case 'Rain':
           return weatherImageObj.rain;
        case 'Clouds':
           return weatherImageObj.clouds;
        case 'Clear':
            return weatherImageObj.sunny;
        default:
            return weatherImageObj.sunny;
    }
}