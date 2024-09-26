<template>
  <div id="app">
    <div id="phoneBG"></div>
    <div id="appSon">
        <div class="searchBar"><!--搜索栏-->
            <input type="text" v-model="searchCity" placeholder="请输入要搜索的城市">
            <button @click="toSearchCity" >搜索</button>
        </div>
        <div class="currentTime"><!--当前地区时间-->
            <div class="weatherTypePhone"><!--天气类型:手机版本-->
                <div><i :class="cityMain.weatherTypeIcon"></i></div>
                {{cityMain.weatherType}} 
            </div>
            <div>{{currentCity}}</div>
            <div>{{currentTime}}</div>
            <div>{{currentDate}}</div>
        </div>
        <div class="weatherMain"><!--当天详细天气状况-->
            <div class="tempAndSun"><!--气温日出日落-->
                <div>{{cityMain.nowTemp}}</div>
                <div>
                    <span>最低:{{cityMain.minTemp}}</span>
                    <span>最高:{{cityMain.maxTemp}}</span>
                </div>
                <div>
                    <div class="sunRAandS">
                        <img src="./assets/sunRise.png">
                            <br class="phoneVersion">日出<br>
                            {{cityMain.sunRise}}
                    </div>
                    <div class="sunRAandS">
                        <img src="./assets/sunSet.png">
                        <br class="phoneVersion">日落<br>
                        {{cityMain.sunSet}}
                    </div>
                </div>
            </div>
            <div class="weatherType"><!--天气类型-->
                <div><i :class="cityMain.weatherTypeIcon"></i></div>
                {{cityMain.weatherType}} 
            </div>
            <div class="otherAttribute"><!--湿度、风速、气压、紫外线-->
                <div><img src="./assets/humidity.png"><br><span>湿度</span><br>{{cityMain.humidity}}</div>
                <div><img src="./assets/windSpeed.png"><br><span>风速</span><br>{{cityMain.windSpeed}}</div>
                <div><img src="./assets/pressure.png"><br><span>气压</span><br>{{cityMain.pressure}}</div>
                <div><img src="./assets/uv.png"><br><span>紫外线</span><br>{{cityMain.uv}}</div>
            </div>
        </div>
        <div class="fiveDaySimpleBox">
            <div>未来五天：</div>
            <template v-for="(item,index) in fiveDayLike">
                <div :key="index">
                    <div><i :class='item.weatherIcon'></i></div>
                    <div>{{item.averageTemp}}</div>
                    <div>{{item.dayOfWeekCH}}，{{item.todayBefore}}天后</div>
                </div>
            </template>
        </div><!--近五天天气-->
        <div class="laterHourlyBox">
            <div>未来十二小时：</div>
            <template v-for="(item,index) in hourlyLike">
                <div :key="index">
                    <div>{{item.time}}</div>
                    <div>
                        <i :class="item.weatherTypeIcon"></i>
                    </div>
                    <div>
                        {{item.averageTemp}}
                    </div>
                    <div>
                        <img 
                        :src ="require(`@/assets/${item.windDirectionIcon}.png`)"
                        >
                    </div>
                    <div>
                        {{item.windSpeed}}
                    </div>
                </div>
            </template>
        </div><!--接下来几小时天气-->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'App',
    data(){
    return{
      searchCity:'',//搜索的城市
        currentCity:'',//当前城市
        currentTime:'',//当前时间
        currentDate:'',//当前日期
        cityMain:{  //城市详细天气数据(最高温、最低温、日出时间、日落时间、湿度、气压、风速、紫外线、天气类型)
            nowTemp:'',
            maxTemp:'',
            minTemp:'',
            sunRise:'',
            sunSet:'',
            humidity:'',
            pressure:'',
            windSpeed:'',
            uv:'',
            weatherType:'',
            weatherTypeIcon:''
        },
        fiveDayLike:[ //五天气候(类型、温度、星期)
            {
                todayBefore:1,//一天之后
                dayOfWeekCH:'',
                dayOfWeekEN:'',
                averageTemp:'',
                weatherType:'',
                weatherIcon:''
            },
            {
                todayBefore:2,//一天之后
                dayOfWeekCH:'',
                dayOfWeekEN:'',
                averageTemp:'',
                weatherType:'',
                weatherIcon:''
            },
            {
                todayBefore:3,//一天之后
                dayOfWeekCH:'',
                dayOfWeekEN:'',
                averageTemp:'',
                weatherType:'',
                weatherIcon:''
            },
            {
                todayBefore:4,//一天之后
                dayOfWeekCH:'',
                dayOfWeekEN:'',
                averageTemp:'',
                weatherType:'',
                weatherIcon:''
            },
            {
                todayBefore:5,//一天之后
                dayOfWeekCH:'',
                dayOfWeekEN:'',
                averageTemp:'',
                weatherType:'',
                weatherIcon:''
            }
        ],
        hourlyLike:[ //当天未来天气(类型、温度、时间、风向)
            {
                time:'',//三小时之后
                averageTemp:'',
                weatherTypeIcon:'',
                windDirectionIcon:'',
                windSpeed:''
            },
            {
                time:'',//六小时之后
                averageTemp:'',
                weatherTypeIcon:'',
                windDirectionIcon:'',
                windSpeed:''
            },
            {
                time:'',//九小时之后
                averageTemp:'',
                weatherTypeIcon:'',
                windDirectionIcon:'',
                windSpeed:''
            },
            {
                time:'',//十二小时之后
                averageTemp:'',
                weatherTypeIcon:'',
                windDirectionIcon:'',
                windSpeed:''
            },
        ]
    }
  },
  methods:{
    toSearchCity(){ //根据键盘输入的城市名搜索相关天气信息
            this.getWeatherMainByName(this.searchCity);
        },
        getWeatherMainByName(locationName){
            let locationId=0;
            const mykey='b38053db3dee4ae39586a04fbff4ff1c'
            axios({
                method:'get',
                url:'https://geoapi.qweather.com/v2/city/lookup',//根据城市名字查询城市id
                params:{
                    location:locationName,     //无结果是404
                    key:mykey
                }
            }).then((respose)=>{//用箭头函数可以使下文this指向上文
                console.log(locationName)
                console.log(respose.data)
                let data=respose.data;
                console.log(data.location)
                if(data.code!=200){//请求错误
                    alert('请求错误')
                }
                else{
                    for(let i in data.location){
                        if(data.location[i].name===locationName){
                            console.log('搜寻成功,id为'+data.location[i].id)
                            this.currentCity=locationName;
                            locationId=data.location[i].id;//找到城市或区id之后查找详细天气状况
                        }
                    }
                    if(locationId==0){
                        alert('请输入正确的城市或城区名字')
                    }
                    else{//获取到locationId则继续寻找
                        //获取当天天气以及未来五天天气状况
                        axios({
                            methods:'get',
                            url:'https://devapi.qweather.com/v7/weather/now',
                            params:{
                                key:mykey,
                                location:locationId
                            }
                        }).then((respose)=>{
                            console.log('实时天气')
                            console.log(respose.data)
                            
                            if(respose.data.code!=200){
                                alert('请求错误，获取当天天气失败')
                            }
                            else{
                                //实时时间变更
                                this.currentDate=respose.data.updateTime.substr(0,4)+'年'+respose.data.updateTime.substr(5,2)+'月'+respose.data.updateTime.substr(8,2)+'日'
                                this.currentTime=respose.data.updateTime.substr(11,5)
                                //更新今日天气
                                let nowData=respose.data.now
                                // this.cityMain.maxTemp=nowData[0].tempMax;//最高温度
                                // this.cityMain.minTemp=nowData[0].tempMax;//最低温度
                                this.cityMain.nowTemp=nowData.temp+'°C';//当前温度温度
                                // this.cityMain.sunRise=nowData[0].tempMax;//日出
                                // this.cityMain.sunSet=nowData[0].tempMax;//日落
                                this.cityMain.humidity=nowData.humidity+'%';//湿度
                                this.cityMain.pressure=nowData.pressure+'hPa';//大气压
                                this.cityMain.windSpeed=nowData.windSpeed+'km/h';//风速
                                this.cityMain.weatherType=nowData.text;//当前天气类型
                                this.cityMain.weatherTypeIcon='qi-'+nowData.icon;//天气类型图标
                                //更新当天以及未来五天天气
                                axios({
                                    methods:'get',
                                    url:'https://devapi.qweather.com/v7/weather/7d',
                                    params:{
                                        key:mykey,
                                        location:locationId
                                    }
                                }).then((respose)=>{
                                    console.log('未来几天天气')
                                    console.log(respose.data)
                                    if(respose.data.code!=200){
                                        alert('获取未来五天天气失败')
                                    }
                                    else{//获取未来几天天气
                                        let dailyData=respose.data.daily;
                                        this.cityMain.maxTemp=dailyData[0].tempMax;//最高温度
                                        this.cityMain.minTemp=dailyData[0].tempMin;//最低温度
                                        this.cityMain.sunRise=dailyData[0].sunrise;//日出
                                        this.cityMain.sunSet=dailyData[0].sunset;//日落
                                        this.cityMain.uv=dailyData[0].uvIndex;//紫外线指数
                                        this.fiveDayLike=[];
                                        const weekArray = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
                                        for(let i=1;i<=5;i++)//未来五天粗略天气
                                        {  

                                           let newDailyData={
                                            todayBefore:i,
                                            dayOfWeekCH:weekArray[new Date(dailyData[i].fxDate).getDay()],//星期几
                                            averageTemp:(parseInt(dailyData[i].tempMax)+parseInt(dailyData[i].tempMin))/2+'°C',//平均温度
                                            weatherIcon:'qi-'+dailyData[i].iconDay
                                           }
                                           this.fiveDayLike.push(newDailyData);
                                        }
                                        //获取小时天气信息
                                        axios({
                                            methods:'get',
                                            url:'https://devapi.qweather.com/v7/weather/24h',
                                            params:{
                                                key:mykey,
                                                location:locationId
                                            }
                                        }).then((respose)=>{
                                            console.log('小时天气')
                                            console.log(respose.data)
                                            if(respose.data.code!=200){
                                                alert('获取小时天气失败')
                                            }
                                            else{
                                                this.hourlyLike=[];
                                                let horlyData=respose.data.hourly;
                                                for(let i=2;i<=11;i+=3){
                                                    let newHourlyData={
                                                        time:horlyData[i].fxTime.substr(11,5),
                                                        averageTemp:horlyData[i].temp+'°C',
                                                        weatherTypeIcon:'qi-'+horlyData[i].icon,
                                                        windDirectionIcon:horlyData[i].windDir,
                                                        windSpeed:horlyData[i].windSpeed+'km/h'
                                                    }
                                                    this.hourlyLike.push(newHourlyData)
                                                }
                                                console.log(this.hourlyLike)
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                }
            })
            console.log('完毕')
            console.log(this.hourlyLike)
        },
    },
    created() {
        const mykey='b38053db3dee4ae39586a04fbff4ff1c';
        let that=this;
        function showPositionAndWeather(position)
        {
            axios({
                methods:'get',
                url:'https://geoapi.qweather.com/v2/city/lookup',
                                    params:{
                                        key:mykey,
                                        location:''+position.coords.longitude.toFixed(2)+','+position.coords.latitude.toFixed(2)
                                    }
                }
            ).then((res)=>{
                if(res.data.code==200)
                {
                    that.getWeatherMainByName(res.data.location[0].name);       
                }
                else
                {
                    alert('请求失败，刷新页面重试')
                }
            })
        }

        function showError(error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    alert('用户拒绝地址请求');
                    break;
            }
        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPositionAndWeather, showError)
        } 
        else {
            console.log('当前浏览器不支持定位');
        }
    }
}
</script>

<style>
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
@media screen and (max-width:900px)
{
    html{
        font-size: 4vw;
        position: relative;
       }
    #phoneBG{
        position:fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: linear-gradient(to bottom right,blue,pink);
        z-index: -99;
    }
    .searchBar{
        text-align: center;
    }
    .searchBar>input{
        width: 65vw;
        height: 1.5rem;
        line-height: 1.5rem;
        border-radius: 4vw;
        text-align: center;
    }
    .searchBar>button{
        width: 20vw;
        height: 1.5rem;
        line-height: 1.5rem;
        border-radius: 4vw;
        background-color:rgba(255, 255, 255, 0.7);
        color: white;
    }
    .currentTime{
        color: white;
        border-bottom: 0.25rem double greenyellow;
        position: relative;
    }
    .currentTime>div:nth-of-type(1)
    {
        text-align: center;
        position:absolute;
        top: 0rem;
        left: 85vw;
    }
    .currentTime>div:nth-of-type(1)>div{
        font-size: 3rem;
    }
    .currentTime>div:nth-of-type(2)
    {  
        font-size: 2.5rem;
    }
    .currentTime>div:nth-of-type(3)
    {
        font-size: 2rem;
    }
    .currentTime>div:nth-of-type(4)
    {
        font-size: 1.5rem;
    }
    .tempAndSun{
        text-align: center;
    }
    .tempAndSun>div:nth-of-type(1)
    {
        font-size: 3rem;
        color: aliceblue;
    }
    .tempAndSun>div:nth-of-type(2)
    {
        font-size: 1.5rem;
        color: aliceblue;
    }
    .tempAndSun>div:nth-of-type(3)
    {
        display: flex;
        justify-content: center;
    }
    .sunRAandS
    {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 3rem;
    }
    .sunRAandS:nth-of-type(2)
    {
        margin-left: 10vw;
    }
    .sunRAandS>img
    {
        width: 15vw;
    }
    .weatherType
    {
        display: none;
    }
   .otherAttribute{
        color: white;
        display: flex;
        text-align: center;
        justify-content: space-between;
   }
   .otherAttribute>div{
    width: 20vw;
   }
   .otherAttribute>div>img{
    width: 18vw;
   }
   .fiveDaySimpleBox
   {
    color:white;
   }
   .fiveDaySimpleBox>div{
       display: flex;
       height: 15vw;
       line-height: 15vw;
       font-size: 1.25rem;
       justify-content: space-around;
    }
    .fiveDaySimpleBox>div>div>i{
        font-size: 1.8rem;
    }
    .fiveDaySimpleBox>div:nth-of-type(1){
        font-size: 1.8rem;
        justify-content: flex-start;
    }
   .laterHourlyBox>div{
    display: flex;
    line-height: 18vw;
    color: white;
    justify-content: space-around;
    font-size: 1.25rem;
   }
   .laterHourlyBox>div:nth-of-type(1)
   {
    justify-content: flex-start;
    font-size: 1.8rem;
   }
   .laterHourlyBox>div i{
    font-size: 1.8rem;
   }
   .laterHourlyBox>div img{
    width: 15vw;
   }
}

@media screen and (min-width:901px)
{  
   html{
    font-size: 1vw;
   }
   #phoneBG,br.phoneVersion,.weatherTypePhone
   {
    display: none;
   }
   #appSon{
    background: linear-gradient(to bottom right,blue,pink);
    width: 90vw;
    height: 50vw;
    margin: 0 auto;
    border-radius: 2vw;
    padding-left: 5vw;
    padding-right: 5vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
   }
   #appSon>div{
       background: rgba(0, 0, 0, 0.3);
       color: whitesmoke;
       border-radius: 1vw;
       padding:1vw;

    }
    #appSon>div:nth-of-type(1){
        background: none;
        padding: 0;
    }
    .searchBar{
    width: 80vw;
    display: flex;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 4vw;
   }
   .searchBar>input:nth-of-type(1){
    width: 50%;
    height: 2vw;
    font-size: 1.5rem;
    line-height: 1.5rem;
    border-radius: 0.5vw;
    padding: 0.1rem;
    padding-left: 0.5rem;
   }
   .searchBar>button:nth-of-type(1)
   {
    width: 10%;
    height: 2vw;
    font-size: 1.5rem;
    line-height: 1.5rem;
    border-radius: 0.5vw;
   }
   .currentTime{
    width: 30vw;
    height: 16vw;
    text-align: center;
   }
   .currentTime>div:nth-of-type(2){
       font-size: 2.5vw;
       line-height: 6vw;
       height: 6vw;
    }
    .currentTime>div:nth-of-type(3){
        font-size: 5vw;
    }
    .weatherMain
   {
    width: 46vw;
    height: 16vw;
    display: flex;
    justify-content: space-between;
   }
   .weatherMain>div{
    background: rgba(255, 255, 255, 0.1);
    width: 14vw;
   }
   .tempAndSun>div:nth-of-type(1){
    font-size: 3.5vw;
    line-height: 4vw;
   }
   .tempAndSun>div:nth-of-type(3){
       height: 8vw;
       margin-top: 0.5vw;
    }
    .sunRAandS{
        margin: 0 auto;
        width: 10vw;
        height: 4vw;
        display: flex;
        line-height: 2vw;
    }
    .weatherType
    {   
        font-size: 2vw;
        text-align: center;
    }
    .weatherType>div{
       font-size: 8vw;
    }
    .otherAttribute
    {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-content: space-around;
    }
    .otherAttribute>div
    {
        width: 6.5vw;
        height: 6.5vw;
        text-align: center;
    }
    .otherAttribute>div>img{
        width: 3.2vw;
        height: 3.2vw;
    }
    .otherAttribute>div>span{
        font-size: 1.2rem;
        font-weight: 1000;
    }
   .fiveDaySimpleBox
   {
    width: 24vw;
    height: 25vw;
    text-align: center;
   }
   .fiveDaySimpleBox>div
   {
    display: flex;
    height: 3.8vw;
    margin-top: 0.25vw;
   }
   .fiveDaySimpleBox>div:nth-of-type(1)
   {
    font-size: 2vw;
    height: 3vw;
    line-height: 3vw;
    margin: 0;
   }
   .fiveDaySimpleBox>div>div:nth-of-type(1)
   {
       width: 3.8vw;
       font-size: 3.6vw;
       line-height: 3.8vw;
    }
    .fiveDaySimpleBox>div>div:nth-of-type(2)
    {
        width: 7.5vw;
        line-height: 3vw;
        font-size: 1.5vw; 
    }
    .fiveDaySimpleBox>div>div:nth-of-type(3)
    {
        width: 12vw;
        line-height: 3vw;
        font-size: 1.25vw;
    }
   .laterHourlyBox{
    width: 52vw;
    height: 25vw;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content:space-around;
   }
   .laterHourlyBox>div:nth-of-type(1)
   {
    font-size: 2vw;
    width: 50vw;
    height: 2.5vw;
    line-height: 2.5vw;
   }
   .laterHourlyBox>div
   {
    width: 12vw;
   }
   .laterHourlyBox>div>div:nth-of-type(1)
   {
    font-size: 1.5vw;
   }
   .laterHourlyBox>div>div:nth-of-type(3),.laterHourlyBox>div>div:nth-of-type(5)
   {
    font-size: 1.25vw;
   }
   .laterHourlyBox>div>div:nth-of-type(2)
   {
    font-size: 5vw;
   }
   .laterHourlyBox>div>div:nth-of-type(4)>img
   {
    width: 5vw;
    height: 5vw;
   }
}
</style>
