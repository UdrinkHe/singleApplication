<template>
<div id="previewPage" ref="previewPage">
    <div class="topBar" @click="printPage()">
        <div>
            <i class="el-icon-printer"></i>
            <span>打印</span>
        </div>
    </div>
    <div class="baseInfoR">
        <div>
            <div>
                <div class="nameFontSize">{{baseInfo.name}}</div>
                <div>求职意向: {{positionView}}</div>
                <div>期望薪资: {{positionSalary}}</div>
            </div>
            <div>
                <div class="baseInfoItem">
                     <i class="el-icon-sugar"></i><span>生日：{{baseInfo.birthday}} </span>
                </div>
                <div class="baseInfoItem">
                    <i class="el-icon-location-information"></i><span>现居：{{baseInfo.location}}</span>
                </div>
            </div>
            <div>
                    <div class="baseInfoItem">
                        <i class="el-icon-phone"></i><span>电话：{{baseInfo.phone}}</span>
                    </div>
                    <div class="baseInfoItem">
                        <i class="el-icon-message"></i><span>邮箱：{{baseInfo.email}} </span>
                    </div>
            </div>
        </div>
        <div class="profileR">
            <div>
                <img :src="baseInfo.profile">
            </div>
        </div>
    </div>
    <div class="contentView">
        <!--箭头标-->
        <div class="arrowBlock">
            <div>
                <i class="el-icon-arrow-left"></i>
                <i class="el-icon-arrow-left"></i>
                <i class="el-icon-arrow-left"></i>
            </div>
            <div>
                <div>教育经历</div>
                <div></div>
            </div>
        </div>
        <!--内容分区-->
        <div class="contentRetail">
            <template v-for="(item,index) in education" >
                <div :key="index+item.id">
                    <div class="topSimple">
                        <div>{{item.schoolName}}</div>
                        <div>{{item.major}}</div>
                        <div>{{item.diploma+'('+item.educationSystem+')'}}</div>
                        <div>{{item.timeFromY+'.'+item.timeFromM+'-'+item.timeToY+'.'+item.timeToM}}</div>
                    </div>
                    <div class="itemDetail"><span v-html="item.experience"></span></div>
                </div>
            </template>
        </div>
        <div class="arrowBlock">
            <div>
                <i class="el-icon-arrow-left"></i>
                <i class="el-icon-arrow-left"></i>
                <i class="el-icon-arrow-left"></i>
            </div>
            <div>
                <div>项目经验</div>
                <div></div>
            </div>
        </div>
        <!--内容分区-->
        <div class="contentRetail">
            <template v-for="(item , index) in projectEx">
                <div :key="index+item.id">
                    <div class="topSimple">
                            <span>{{item.projectName}}</span><span>{{item.timeFrom+'-'+item.timeTo}}</span>
                    </div>
                    <div class="itemDetail" ><span v-html="item.info"></span></div>
                    <div><span style="font-weight: 700;">核心技术:</span>{{item.coreTech}}</div>
                </div>
            </template>
        </div>
        <div class="arrowBlock">
            <div>
                <i class="el-icon-arrow-left"></i>
                <i class="el-icon-arrow-left"></i>
                <i class="el-icon-arrow-left"></i>
            </div>
            <div>
                <div>工作经历</div>
                <div></div>
            </div>
        </div>
        <!--内容分区-->
        <div class="contentRetail">
            <template v-for="(item,index) in workEx">
                <div :key="index+item.id">
                    <div class="topSimple">
                                <span>{{item.companyName}}</span><span>{{item.positionName}}</span><span>{{item.workTimeForm+'-'+item.workTimeTo}}</span>
                            </div>
                            <span style="font-weight: 700;">工作内容:</span><br/>
                    <div class="itemDetail"><span v-html="item.info"></span></div>
                            <span style="font-weight: 700;">工作成就:</span><br/>
                    <div class="itemDetail"><span v-html="item.accomplishment"></span></div>
                </div>
            </template>
        </div>
        <div class="arrowBlock">
            <div>
                <i class="el-icon-arrow-left"></i>
                <i class="el-icon-arrow-left"></i>
                <i class="el-icon-arrow-left"></i>
            </div>
            <div>
                <div>就职优势</div>
                <div></div>
            </div>
        </div>
        <!--内容分区-->
        <div class="contentRetail">
            <template v-for="(item , index) in personalAbility">
                <div :key="index+item.id">
                    {{++index}}.{{item.info}}
                </div>
            </template>
        </div>
    </div>
    <div ref="addHeightBlock"  :style="{height : needAdd + 'px'}"></div>
</div>
</template>

<script>
import {jsPDF} from 'jspdf'
import html2canvas from 'html2canvas';
import Canvas2Image from '@/js/canvas2image';
export default {
name: 'previewPage',
components: {
},
props:{
    baseInfo:Object,
    personalAbility:Array,
    education:Array,
    workEx:Array,
    projectEx:Array,
    positionView:String,
    positionSalary:String
},
data(){
    return{
        profileSrc : '',
        needAdd : 0,
        intAdd : 0,
    }
},
methods:{
    initPage(){/*根据内容初始化页面高度*/
        let nowHeight = this.$refs.previewPage.offsetHeight
        let intAdd = Math.ceil(nowHeight/1122.5)//需要向上取整乘的倍数   1122.5px
        this.intAdd = intAdd
        this.needAdd = intAdd*1122.5 - nowHeight
    },
    printPage(){
        let pageHeight = this.$refs.previewPage.offsetHeight
        let pageWidth = this.$refs.previewPage.offsetWidth 
        let scale = 5
        html2canvas(this.$refs.previewPage,{
            scale: scale, 
        }).then((canvas) => {
           let img = Canvas2Image.convertToImage(canvas,pageWidth * scale,pageHeight * scale)
        for(let i = 1;i <= this.intAdd;i++){
            const doc = new jsPDF()
            doc.addImage(//w , h为输入的图片高度 pt x , y是截取的位置
                {
                    imageData : img,
                    x : 0,
                    y : -(i - 1) * 297,
                    w : 210,
                    h : 297 * this.intAdd
                }
            )
            doc.save()
        }
    })
    }
},
mounted(){
    this.initPage()
}
}
//1pt = 0.3527mm  pt = px * dpi / 72 a4值尺寸210mm 297mm
</script>

<style scoped>
.topBar{
    width: 100%;
    height: 20pt;
    background-color:#4874cb;
    position: relative;
}
.topBar > div{
    position: absolute;
    right: 0;
    display: none;
    background-color: black;
    color: white;
    cursor: pointer;
}
.topBar:hover > div{
    display: block;
}
#previewPage{
    width: 595pt;
    background-color: white;
    position: absolute;
    z-index: 4;
    font-size: 10.5pt;
}
.baseInfoR{
    display: flex;
    width: 85%;
    margin-left: 7.5%;
    margin-top: 10pt;
}
.baseInfoR > div:nth-of-type(1){
    flex-grow: 6;
}
.baseInfoR > div:nth-of-type(1) > div{
    display: flex;
    align-items: flex-end;
    border-bottom: 1.8pt #4874cb solid;
}
.baseInfoR > div:nth-of-type(1) > div >div{
    flex-grow: 1;
    line-height: 21pt;
}
.baseInfoItem{
    width: 50%;
}
.baseInfoItem > i{
    color: #4874cb
}
.baseInfoItem > span{
    margin-left: 4pt;
}
.baseInfoR > div:nth-of-type(1) > div > .nameFontSize{
    font-size: 24pt;
    font-weight: 900;
    line-height: 36pt;
}
.profileR{
    flex-grow: 4;
}
.profileR > div{
    width: 60pt;
    height: 84pt;
    margin: 0 auto;
}
.profileR > div >img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.contentView{
    width: 90%;
    margin: 0 auto;
}
.arrowBlock{
    display: flex;
    margin-top: 5pt;
    font-size: 14pt;
    height: 28pt;
}
.arrowBlock > div{
    height: 28pt;
    line-height: 28pt;
    color: #4874cb;
    font-weight: 900;
}
.arrowBlock > div:nth-of-type(1){
    font-size: 16pt;
    line-height: 41pt;
    color: #4874cb;
    font-weight: 1000;
}
.arrowBlock > div:nth-of-type(1){
    font-size: 16pt;
    line-height: 41pt;
    color: #4874cb;
    font-weight: 900;
}
.arrowBlock > div:nth-of-type(1) >i:nth-of-type(2){
    transform: translateX(-5pt);
}
.arrowBlock > div:nth-of-type(1) >i:nth-of-type(3){
    transform: translateX(-10pt);
}
.arrowBlock > div:nth-of-type(2){
    width: calc(100% - 50pt);
    border-bottom: 1.5pt #4874cb solid;
    margin-left: -10pt;
}
.contentRetail{
    padding: 10pt 20pt 0pt 20pt;
}
.itemDetail{
    line-height: 1.25rem;
}
.topSimple{
    display: flex;
    justify-content: space-between;
}
.topSimple > div ,.topSimple > span {
    font-weight: 900;
}

</style>