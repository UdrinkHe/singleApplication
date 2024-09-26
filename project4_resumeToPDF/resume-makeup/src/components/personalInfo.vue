<template>
<div id="personalInfo">
    <div id="blackBlock" v-show="isLooking" @click="disPreview()"> 
    </div> 
    <previewPage v-if="isLooking" :baseInfo="baseInfo" :personalAbility="personalAbility"
    :education="education" :workEx="workEx" :projectEx="projectEx" :positionView='positionView'
    :positionSalary="positionSalary"></previewPage>
    <div id="resumeMenu">
        <div>
            <div>简历目录</div>
            <div>个人信息</div>
            <div>个人优势</div>
            <div>期望岗位</div>
            <div>教育经历</div>
            <div>项目经历</div>
            <div>工作经历</div>
        </div>
    </div>
    <div id="resumeInfo">
        <div class="funcionBar"><!--功能栏-->
            <el-upload class="avatar-uploader" action="#" :show-file-list="false" :on-change="uploadData" accept=".json">
            <div><i class="el-icon-upload"></i><span>导入数据</span></div>
            </el-upload>
            <div @click="saveData()"><i class="el-icon-download"></i><span>导出数据</span></div>
            <div @click="toPreview()"><i class="el-icon-view"></i><span>预览</span></div>
        </div>
        <div class="contentBlock"><!--内容区-->
            <div id="baseInfo">
                <div class="editorButton" v-show="!isBaseInfoE" @click="editorBaseInfo()">
                                <i class="el-icon-edit"></i>
                                <span >修改</span>
                </div>
                <div class="baseInfoContentMain">
                    <div>
                        <div>
                            <template v-if="isBaseInfoE">
                                <el-input v-model="nameE" placeholder="请输入名字"></el-input>
                            </template>
                            <template v-else>
                                {{baseInfo.name}}
                            </template>
                        </div>
                        <div>
                            <template v-if="isBaseInfoE">
                                <el-input v-model='birthdayE' placeholder="请输入生日"></el-input>
                            </template>
                            <template v-else>
                                生日：{{baseInfo.birthday}}
                            </template>
                        </div>
                        <div>
                            <template v-if="isBaseInfoE">
                                <el-input placeholder="请输入住址" v-model="locationE"></el-input>
                            </template>
                            <template v-else>
                                现居：{{baseInfo.location}}
                            </template>
                        </div>
                        <div>
                            <template v-if="isBaseInfoE">
                                <el-input placeholder="请输入电话" v-model="phoneE"></el-input>
                            </template>
                            <template v-else>
                                电话：{{baseInfo.phone}}
                            </template>
                        </div>
                        <div>
                            <template v-if="isBaseInfoE">
                                <el-input placeholder="请输入邮箱" v-model="emailE"></el-input>
                            </template>
                            <template v-else>
                                邮箱：{{baseInfo.email}}
                            </template>
                        </div>
                    </div>
                    <div class="profileMain" style="flex-grow: 4;">
                        <div>
                            <el-upload  v-show="isBaseInfoE" class="avatar-uploader" action="#" :show-file-list="false" :on-change="getImgSrc">
                            <i class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            <img  v-if="!isBaseInfoE" :src="baseInfo.profile">
                            <img  v-else :src="profileE">
                        </div>
                    </div>
                </div>    
                <div v-show="isBaseInfoE">
                        <el-button @click="cancelBaseC()">取消</el-button>
                        <el-button @click="finishBaseC()">确定</el-button>
                </div>
            </div>
            <div>
                <div class="itemList" style="margin-top: 10px;">
                    <div></div>
                    <div>个人优势</div><!--编辑-->
                    <div class="addbutton"  @click="toAdd('personalAbility')">
                        <i class="el-icon-circle-plus-outline"></i>
                        <span>添加</span>
                    </div>
                </div>
                <div class="infoMain">
                    <template v-for="(item,index) in personalAbility">
                        <div class="InfoList" :key="index+item.id">
                        <div v-if="item.isEditor&&!editorStatus">
                            <el-input placeholder="请输入要更改的值" v-model="personalAbilityChanging">{{item.info}}</el-input>
                            <div class="addButtonBlock">
                            <el-button @click="cancelChange(item.id)">取消</el-button><el-button type="primary" @click="finishChange(item.id)">确定</el-button>
                            </div>
                        </div>
                        <div v-else class="infoShow"> 
                            {{++index+'.'+item.info}}
                            <div class="editorAdelete">
                                <i class="el-icon-delete"></i>
                                <span @click="deleteOne(personalAbility,item.id)">删除</span>
                                <i style="margin-left: 10px;" class="el-icon-edit"></i>
                                <span @click="toEditor('personalAbility',item.id)">修改</span>
                            </div>
                        </div>
                        </div>
                    </template>
                    <div class="addEditor" v-if="addBlock=='personalAbility'">
                        <el-input placeholder="请输入要添加的内容" v-model="personalAbilityAddInfo"></el-input>
                        <div class="addButtonBlock">
                            <el-button @click="cancelAdd()">取消</el-button><el-button type="primary" @click="finishAdd()">确定</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div class="itemList">
                    <div></div>
                    <div>期望岗位</div><!--添加-->
                    <div class="addbutton" v-show="expectedPosition.length<3" @click="toAdd('expectedPosition')">
                        <i class="el-icon-circle-plus-outline"></i>
                        <span>添加</span>
                    </div>
                </div>
                <div class="infoMain">
                    <template v-for="(item,index) in expectedPosition">
                        <div class="InfoList" :key="index+item.id">
                        <div v-if="item.isEditor&&!editorStatus">
                            <el-input placeholder="请输入期望岗位" v-model="exPositionInfoC"></el-input>
                            <el-switch v-model="exPositionTypeC" active-text="全职" inactive-text="兼职" ></el-switch>
                            <el-switch style="margin-left: 20px;" v-model="exPositionFavC" active-text="主要" inactive-text="次要"></el-switch>
                            <el-input  placeholder='最低' v-model="exPositionSalaryLC" style="width: 75px;margin-left: 20px;"></el-input>-
                            <el-input placeholder='最高' v-model="exPositionSalaryHC" style="width: 75px;"></el-input><span style="margin-left: 10px;">k</span>
                            <div class="addButtonBlock">
                                <el-button @click="cancelChange(item.id)">取消</el-button><el-button type="primary" @click="finishChange(item.id)">确定</el-button>
                            </div>
                        </div>
                        <div v-else class="infoShow"> 
                            {{++index+'.'+item.info+'('+item.type+')'+'  '+item.salary}}<i style="color: red;" v-if="item.favourite" class="el-icon-star-on"></i>
                            <div class="editorAdelete">
                                <i class="el-icon-delete"></i>
                                <span @click="deleteOne(expectedPosition,item.id)">删除</span>
                                <i style="margin-left: 10px;" class="el-icon-edit"></i>
                                <span @click="toEditor('expectedPosition',item.id)">修改</span>
                            </div>
                        </div>
                        </div>
                    </template>
                    <div class="addEditor" v-if="addBlock=='expectedPosition'">
                        <el-input placeholder="请输入期望岗位" v-model="exPositionAddInfo"></el-input>
                        <el-switch v-model="exPositionAddType" active-text="全职" inactive-text="兼职" ></el-switch>
                        <el-switch style="margin-left: 20px;" v-model="exPositionAddFav" active-text="主要" inactive-text="次要"></el-switch>
                        <el-input  placeholder='最低' v-model="exPositionAddSalaryLow" style="width: 75px;margin-left: 20px;"></el-input>-
                        <el-input placeholder='最高' v-model="exPositionAddSalaryHigh" style="width: 75px;"></el-input><span style="margin-left: 10px;">k</span>
                        <div class="addButtonBlock">
                            <el-button @click="cancelAdd()">取消</el-button><el-button type="primary" @click="finishAdd()">确定</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div class="itemList">
                    <div></div>
                    <div>教育经历</div>
                    <div class="addbutton" @click="toAdd('education')">
                        <i class="el-icon-circle-plus-outline"></i>
                        <span>添加</span>
                    </div>
                </div>
                <div class="infoMain">
                    <template v-for="(item,index) in education">
                        <div class="InfoList" :key="index+item.id">
                        <div v-if="item.isEditor&&!editorStatus">
                            <!--修改内容区-->
                            <div style="display: flex;justify-content: space-around">
                            <el-input v-model="schoolNameC" style="width: 40%;" placeholder="请输入学院名称"></el-input>
                            <el-input v-model="majorC" style="width: 40%;" placeholder="专业名称"></el-input>
                            </div>
                            <div style="display: flex;justify-content: space-around;margin-top: 10px;">
                                <el-date-picker v-model="schoolDateC" type="monthrange" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份"></el-date-picker>
                                <el-select v-model="diplomaC">
                                    <el-option v-for="item in educationDiploma" :key="item" :label="item" :value="item"></el-option>
                                </el-select>
                                <el-select v-model="educationSystemC">
                                    <el-option v-for="item in educationSystem" :key="item" :label="item" :value="item"></el-option>
                                </el-select>
                            </div>
                        <el-input type="textarea" :autosize="{ minRaw : 5, maxRax : 10}" placeholder="请输入内容" v-model="experienceC"></el-input>
                            <div class="addButtonBlock">
                            <el-button @click="cancelChange(item.id)">取消</el-button><el-button type="primary" @click="finishChange(item.id)">确定</el-button>
                            </div>
                        </div>
                        <div v-else class="infoShow"> 
                            <div style="display: flex;justify-content: space-between;">
                                <div>{{item.schoolName}}</div>
                                <div>{{item.timeFromY+'.'+item.timeFromM+'-'+item.timeToY+'.'+item.timeToM}}</div>
                                <div>{{item.major}}</div>
                                <div>{{item.diploma+'('+item.educationSystem+')'}}</div>
                            </div>
                            <div class="longContent"><span v-html="item.experience"></span></div>
                            <div class="editorAdelete">
                                <i class="el-icon-delete"></i>
                                <span @click="deleteOne(education,item.id)">删除</span>
                                <i style="margin-left: 10px;" class="el-icon-edit"></i>
                                <span @click="toEditor('education',item.id)">修改</span>
                            </div>
                        </div>
                        </div>
                    </template>
                    <div class="addEditor" v-if="addBlock=='education'">
                        <!--添加内容区-->
                        <div style="display: flex;justify-content: space-around">
                            <el-input v-model="schoolNameAdd" style="width: 40%;" placeholder="请输入学院名称"></el-input>
                            <el-input v-model="majorAdd" style="width: 40%;" placeholder="专业名称"></el-input>
                        </div>
                        <div style="display: flex;justify-content: space-around;margin-top: 10px;">
                            <el-date-picker v-model="schoolDateAdd" type="monthrange" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份"></el-date-picker>
                            <el-select v-model="diplomaAdd">
                                <el-option v-for="item in educationDiploma" :key="item" :label="item" :value="item"></el-option>
                            </el-select>
                            <el-select v-model="educationSystemAdd">
                                <el-option v-for="item in educationSystem" :key="item" :label="item" :value="item"></el-option>
                            </el-select>
                        </div>
                        <el-input type="textarea" :autosize="{ minRaw : 5, maxRax : 10}" placeholder="请输入内容" v-model="experienceAdd"></el-input>
                        <div class="addButtonBlock">
                            <el-button @click="cancelAdd()">取消</el-button><el-button type="primary" @click="finishAdd()">确定</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div class="itemList">
                    <div></div>
                    <div>项目经历</div>
                    <div class="addbutton" @click="toAdd('projectEx')">
                        <i class="el-icon-circle-plus-outline"></i>
                        <span>添加</span>
                    </div>
                </div>
                <div class="infoMain">
                    <template v-for="(item,index) in projectEx">
                        <div class="InfoList" :key="index+item.id">
                        <div v-if="item.isEditor&&!editorStatus">
                            <!--修改内容区-->
                            <div style="display: flex;">
                            <el-input v-model="projectNameC" placeholder="请输入项目名"></el-input>
                            <el-date-picker v-model="projectDateC" type="monthrange" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份"></el-date-picker>
                            </div>
                            <el-input type="textarea" v-model="infoC" placeholder="请输入项目描述"></el-input>
                            <el-input  v-model="coreTechC" placeholder="使用技术"></el-input>
                            <div class="addButtonBlock">
                            <el-button @click="cancelChange(item.id)">取消</el-button><el-button type="primary" @click="finishChange(item.id)">确定</el-button>
                            </div>
                        </div>
                        <div v-else class="infoShow"> 
                            <!--展示内容区-->
                            <div style="display: flex;justify-content: space-between;">
                                <span>{{item.projectName}}</span><span>{{item.timeFrom+'-'+item.timeTo}}</span>
                            </div>
                            <div class="longContent" v-html="item.info">
                            </div>
                            <div>核心技术:{{item.coreTech}}</div>
                            <div class="editorAdelete">
                                <i class="el-icon-delete"></i>
                                <span @click="deleteOne(projectEx,item.id)">删除</span>
                                <i style="margin-left: 10px;" class="el-icon-edit"></i>
                                <span @click="toEditor('projectEx',item.id)">修改</span>
                            </div>
                        </div>
                        </div>
                    </template>
                    <div class="addEditor" v-if="addBlock == 'projectEx'">
                        <!--添加内容区-->
                        <div style="display: flex;">
                            <el-input v-model="projectNameA" placeholder="请输入项目名"></el-input>
                            <el-date-picker v-model="projectDateA" type="monthrange" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份"></el-date-picker>
                        </div>
                        <el-input type="textarea" v-model="infoA" placeholder="请输入项目描述"></el-input>
                        <el-input  v-model="coreTechA" placeholder="使用技术"></el-input>
                        <div class="addButtonBlock">
                            <el-button @click="cancelAdd()">取消</el-button><el-button type="primary" @click="finishAdd()">确定</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div class="itemList">
                    <div></div>
                    <div>工作经历</div>
                    <div class="addbutton" @click="toAdd('workEx')">
                        <i class="el-icon-circle-plus-outline"></i>
                        <span>添加</span>
                    </div>
                </div>
                <div class="infoMain">
                    <template v-for="(item,index) in workEx">
                        <div class="InfoList" :key="index+item.id">
                        <div v-if="item.isEditor&&!editorStatus">
                            <!--修改内容区-->
                            <div>
                            <el-input v-model="companyNameC" placeholder="请输入公司名"></el-input>
                            <el-input v-model="positionNameC" placeholder="请输入职位名"></el-input>
                            <el-date-picker v-model="workDateC" type="monthrange" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份"></el-date-picker>
                            </div>
                            <el-input type="textarea" v-model="workInfoC" placeholder="工作内容"></el-input>
                            <el-input type="textarea" v-model="accomplishmentC" placeholder="工作成就"></el-input>
                            <div class="addButtonBlock">
                            <el-button @click="cancelChange(item.id)">取消</el-button><el-button type="primary" @click="finishChange(item.id)">确定</el-button>
                            </div>
                        </div>
                        <div v-else class="infoShow"> 
                            <!--展示内容区-->
                            <div style="display: flex;justify-content: space-between;">
                                <span>{{item.companyName}}</span><span>{{item.positionName}}</span><span>{{item.workTimeForm+'-'+item.workTimeTo}}</span>
                            </div>
                            工作内容:<br/>
                            <div class="longContent">
                                <span v-html="item.info"></span>
                            </div>
                            工作成就:<br/>
                            <div class="longContent">
                                <span v-html="item.accomplishment"></span>
                            </div>
                            <div class="editorAdelete">
                                <i class="el-icon-delete"></i>
                                <span @click="deleteOne(workEx,item.id)">删除</span>
                                <i style="margin-left: 10px ;" class="el-icon-edit"></i>
                                <span @click="toEditor('workEx',item.id)">修改</span>
                            </div>
                        </div>
                        </div>
                    </template>
                    <div class="addEditor" v-if="addBlock == 'workEx'">
                          <!--添加内容区-->
                        <div>
                            <el-input v-model="companyNameA" placeholder="请输入公司名"></el-input>
                            <el-input v-model="positionNameA" placeholder="请输入职位名"></el-input>
                            <el-date-picker v-model="workDateA" type="monthrange" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份"></el-date-picker>
                        </div>
                        <el-input type="textarea" v-model="workInfoA" placeholder="工作内容"></el-input>
                        <el-input type="textarea" v-model="accomplishmentA" placeholder="工作成就"></el-input>
                        <div class="addButtonBlock">
                            <el-button @click="cancelAdd()">取消</el-button><el-button type="primary" @click="finishAdd()">确定</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import previewPage from './previewPage.vue';
import FileSaver from 'file-saver';

export default {
name: 'personalInfo',
components: {
    previewPage
},
data(){
    return{
        isLooking:false,
        baseInfo:{
            name:'',
            phone:'',
            location:'',
            email:'',
            birthday:'',
            profile:''
        },
        isBaseInfoE:false,
        nameE:'',
        phoneE:'',
        locationE:'',
        emailE:'',
        birthdayE:'',
        profileE:'',
        addStatus:true,//信息增加状态，true可修改
        editorStatus:true,//信息修改状态，true状态可修改
        changingBlock:null,//哪个模块的数据更改
        addBlock:null,//数据增加到哪里
        //与表单项绑定的数据
        //增加
        personalAbilityAddInfo:'',//项一：个人优势
        exPositionAddInfo:'',//项二：期望岗位
        exPositionAddType:true,//全/兼职
        exPositionAddSalaryLow:'',//最低
        exPositionAddSalaryHigh:'',//最高,
        exPositionAddFav:true,//偏好

        schoolNameAdd:'',//
        educationSystemAdd:'',
        diplomaAdd:'',
        majorAdd:'',
        schoolDateAdd:'',
        experienceAdd:'',
        //修改
        personalAbilityChanging:'',//个人优势
        exPositionInfoC:'',//期望工作
        exPositionFavC:'',
        exPositionTypeC:'',
        exPositionSalaryHC:'',
        exPositionSalaryLC:'',
        //教育经历
        schoolNameC:'',
        educationSystemC:'',
        diplomaC:'',
        majorC:'',
        schoolDateC:'',
        experienceC:'',
        //个人优势
        personalAbility:[
        
        ],
        //期待岗位
        expectedPosition:[
        
        ],
        positionView:'',
        positionSalary:'',
        education:[
        
        ],
        educationDiploma:['初中及以下','中专/中技','高中','大专','本科','硕士','博士'],
        educationSystem:['全日制','非全日制'],
        projectEx:[
        
        ],
        projectNameA:'',
        infoA:'',
        projectDateA:'',
        coreTechA:'',

        projectNameC:'',
        infoC:'',
        projectDateC:'',
        coreTechC:'',

        workEx:[
      
        ],
        companyNameA:'',
        positionNameA:'',
        workInfoA:'',
        accomplishmentA:'',
        workDateA:'',
            
        companyNameC:'',
        positionNameC:'',
        workInfoC:'',
        accomplishmentC:'',
        workDateC:''
    }
},
methods:{
    toPreview(){
        for(let i = 0;i < this.expectedPosition.length; i++){
            if(this.expectedPosition[i].favourite){
                this.positionView = this.expectedPosition[i].info
                this.positionSalary = this.expectedPosition[i].salary
            }
        }
        this.isLooking = true
    },
    disPreview(){
        this.isLooking = false
    },
    getImgSrc(item){
        console.log(item);
        //let formData = new FormData();
        let file = item.raw;
        this.profileE = URL.createObjectURL(file);
    },
    editorBaseInfo(){
        this.isBaseInfoE = true
        this.nameE = this.baseInfo.name
        this.birthdayE = this.baseInfo.birthday
        this.locationE = this.baseInfo.location
        this.phoneE = this.baseInfo.phone
        this.emailE = this.baseInfo.email
        this.profileE = this.baseInfo.profile
    },
    cancelBaseC(){
        this.isBaseInfoE = false
    },
    finishBaseC(){
        this.baseInfo.name = this.nameE
        this.baseInfo.birthday = this.birthdayE 
        this.baseInfo.location = this.locationE
        this.baseInfo.phone = this.phoneE
        this.baseInfo.email = this.emailE
        this.baseInfo.profile = this.profileE
        this.isBaseInfoE = false
    },
    toAdd(type){
        if(this.addStatus){
            this.addBlock=type;
            this.addStatus=false
        }
        else
        {
            alert('正在添加操作中!')
        }
    },
    cancelAdd()
    {
        if(!this.addStatus)
        {
            switch (this.addBlock){
                case 'personalAbility':
                    this.personalAbilityAddInfo='';
                    break;
                case 'expectedPosition':
                    this.exPositionAddInfo=''
                    this.exPositionAddSalaryLow=''//最低
                    this.exPositionAddSalaryHigh=''//最高,
                    break;
                case 'education' :
                    this.schoolNameAdd = ''
                    this.schoolDateAdd = ''
                    this.educationSystemAdd = ''
                    this.majorAdd = ''
                    this.experienceAdd = ''
                    break;
                case 'projectEx' :
                    this.projectNameA = ''
                    this.infoA = ''
                    this.projectDateA = ''
                    this.coreTechA = ''
                    break;
                case 'workEx' :
                    this.companyNameA = ''
                    this.positionNameA = ''
                    this.workInfoA = ''
                    this.accomplishmentA = ''
                    this.workDateA = ''
                    break;
            }
            this.addStatus=true;
            this.addBlock='';
        }
    },
    finishAdd(){
        console.log(this.addBlock)
        if(!this.addStatus){
            if(this.addBlock=='personalAbility'){//个人优势添加
                //找到最大编号，以免出现重复
                let maxIndex=-1;
                for(let i=0;i<this.personalAbility.length;i++){
                    if(this.personalAbility[i].id>maxIndex)
                    maxIndex=this.personalAbility[i].id
                }
                //添加到个人优势
                let newData={
                    id:++maxIndex,
                    info:this.personalAbilityAddInfo,
                    isEditor:false
                }
                this.personalAbility.push(newData)
                this.personalAbilityAddInfo=''
            }
            else if(this.addBlock=='expectedPosition'){
                if(this.exPositionAddFav){
                    for(let i = 0;i < this.expectedPosition.length;i++){
                        if(this.expectedPosition[i].favourite){
                            let upData = this.expectedPosition[i]
                            upData.favourite = false
                            this.expectedPosition.splice(i,1,upData)
                            this.$message({
                                showClose: true,
                                message: '主选职位只能有一个，已变更为新增项',
                                type: 'warning'
                            });
                        }
                    }
                }
                    
                let maxIndex=-1;
                for(let i=0;i<this.expectedPosition.length;i++){
                    if(this.expectedPosition[i].id>maxIndex)
                    maxIndex=this.expectedPosition[i].id
                }
                let newData={
                    id:++maxIndex,
                    info:this.exPositionAddInfo,
                    salary:this.exPositionAddSalaryLow+'-'+this.exPositionAddSalaryHigh+'k',
                    type:this.exPositionAddType?'全职':'兼职',
                    favourite:this.exPositionAddFav,
                    isEditor:false
                }
                this.expectedPosition.push(newData)
                this.exPositionAddInfo=''
                this.exPositionAddSalaryLow=''
                this.exPositionAddSalaryHigh=''
               
            }
            else if(this.addBlock == 'education'){
                let maxIndex = -1;
                for(let i = 0;i < this.expectedPosition.length;i++){
                    if(this.expectedPosition[i].id > maxIndex)
                    maxIndex = this.expectedPosition[i].id
                }
                let newData = {
                    id:++maxIndex,
                    schoolName:this.schoolNameAdd,//
                    educationSystem:this.educationSystemAdd,
                    diploma:this.diplomaAdd,
                    major:this.majorAdd,
                    timeFromY:this.schoolDateAdd[0].getFullYear(),
                    timeFromM:this.schoolDateAdd[0].getMonth()+1,
                    timeToY:this.schoolDateAdd[1].getFullYear(),
                    timeToM:this.schoolDateAdd[1].getMonth()+1,
                    experience:this.experienceAdd.replace(/\r\n/g,'<br/>').replace(/\n/g,'<br/>').replace(/\s/g,' '),
                    isEditor:false
                }
                this.education.push(newData)
                this.schoolNameAdd = ''
                this.schoolDateAdd = ''
                this.educationSystemAdd = ''
                this.majorAdd = ''
                this.experienceAdd = ''
            }
            else if(this.addBlock == 'projectEx'){
                let maxIndex = -1;
                for(let i = 0;i < this.projectEx.length;i++){
                    if(this.projectEx[i].id > maxIndex)
                    maxIndex = this.projectEx[i].id
                }
                let newData = {
                    id:++maxIndex,
                    isEditor:false,
                    projectName:this.projectNameA,
                    info:this.infoA.replace(/\r\n/g,'<br/>').replace(/\n/g,'<br/>').replace(/\s/g,' '),
                    timeFrom:this.projectDateA[0].getFullYear()+'.'+(this.projectDateA[0].getMonth()+1),
                    timeTo:this.projectDateA[1].getFullYear()+'.'+(this.projectDateA[1].getMonth()+1),
                    coreTech:this.coreTechA
                }
                this.projectEx.push(newData)
                this.projectNameA = ''
                this.infoA = ''
                this.projectDateA = ''
                this.coreTechA = ''
            }
            else if(this.addBlock == 'workEx'){
                let maxIndex = -1;
                for(let i = 0;i < this.workEx.length;i++){
                    if(this.workEx[i].id > maxIndex)
                    maxIndex = this.workEx[i].id
                }
                let newData = {
                    id:++maxIndex,
                    isEditor:false,
                    companyName:this.companyNameA,
                    positionName:this.positionNameA,
                    info:this.workInfoA.replace(/\r\n/g,'<br/>').replace(/\n/g,'<br/>').replace(/\s/g,' '),
                    accomplishment:this.accomplishmentA,
                    workTimeForm:this.workDateA[0].getFullYear()+'.'+(this.workDateA[0].getMonth()+1),
                    workTimeTo:this.workDateA[1].getFullYear()+'.'+(this.workDateA[1].getMonth()+1)
                }
                this.workEx.push(newData)
                this.companyNameA = ''
                this.positionNameA = ''
                this.workInfoA = ''
                this.accomplishmentA = ''
                this.workDateA = ''
            }
            this.addBlock=''
            this.addStatus = true
        }
    },
    toEditor(type,itemId){
        if(!this.editorStatus){
            alert('警告，已有其他编辑项目！')
        }
        else{
            console.log(itemId)
            if(type == 'personalAbility'){
                let editorData = this.oneItemEditorStatus(this.personalAbility,itemId)[1]
                this.personalAbilityChanging = editorData.info
            }
            else if(type == 'expectedPosition'){
                let editorData = this.oneItemEditorStatus(this.expectedPosition,itemId)[1]
                this.exPositionInfoC = editorData.info
                this.exPositionFavC = editorData.favourite
                this.exPositionTypeC = editorData.type=='全职'?true:false
                this.exPositionSalaryLC = editorData.salary.substr(0,1) 
                this.exPositionSalaryHC = editorData.salary.substr(2,1) 
            }
            else if(type == 'education'){
                let editorData = this.oneItemEditorStatus(this.education,itemId)[1]
                this.schoolNameC = editorData.schoolName
                this.diplomaC = editorData.diploma
                this.educationSystemC = editorData.educationSystem
                this.majorC = editorData.major
                this.experienceC = editorData.experience.replace(/<br\/>/g,'\r\n').replace(/&nbsp;/g,' ')
                this.schoolDateC = [new Date(editorData.timeFromY + '-'+editorData.timeFromM + '-1 00:00:00'),new Date(editorData.timeToY+'-'+editorData.timeToM + '-1 00:00:00')]
            }
            else if(type == 'projectEx'){
                let editorData = this.oneItemEditorStatus(this.projectEx,itemId)[1]
                this.projectNameC = editorData.projectName
                this.infoC = editorData.info.replace(/<br\/>/g,'\r\n').replace(/&nbsp;/g,' ')
                this.projectDateC = [new Date(editorData.timeFrom.replace('.','-')+'-1 00:00:00'),new Date(editorData.timeTo.replace('.','-')+'-1 00:00:00')]
                this.coreTechC = editorData.coreTech
            }
            else if(type == 'workEx'){
                let editorData = this.oneItemEditorStatus(this.workEx,itemId)[1]
                this.companyNameC = editorData.companyName
                this.positionNameC = editorData.positionName
                this.workInfoC = editorData.info.replace(/<br\/>/g,'\r\n')
                this.accomplishmentC = editorData.accomplishment.replace(/<br\/>/g,'\r\n').replace(/&nbsp;/g,' ')
                this.workDateC = [new Date(editorData.workTimeForm.replace('.','-')+'-1 00:00:00'),new Date(editorData.workTimeTo.replace('.','-')+'-1 00:00:00')]
            }
        this.changingBlock=type
        }
    },
    oneItemEditorStatus(dataSet,itemId){//让一种数据集的其中一条更改编辑状态,并将数据返回到编辑栏上
        for(let i = 0;i<dataSet.length;i++){
                    if(dataSet[i].id == itemId){
                        dataSet[i].isEditor = !dataSet[i].isEditor;
                        this.editorStatus = !this.editorStatus;//显示或者取消
                        let newData=JSON.parse(JSON.stringify(dataSet[i]))
                        dataSet.splice(i,1,newData)
                        return [i,dataSet[i]]
                    }
                }
    },
    cancelChange(itemId){
        if(this.changingBlock == 'personalAbility'){
            this.oneItemEditorStatus(this.personalAbility,itemId)
        }
        else if(this.changingBlock == 'expectedPosition'){
            this.oneItemEditorStatus(this.expectedPosition,itemId)
        }
        else if(this.changingBlock == 'education'){
            this.oneItemEditorStatus(this.education,itemId)
        }
        else if(this.changingBlock == 'projectEx'){
            this.oneItemEditorStatus(this.projectEx,itemId)
        }
        else if(this.changingBlock == 'workEx'){
            this.oneItemEditorStatus(this.workEx,itemId)
        }
    },
    finishChange(itemId){
        if(this.changingBlock == 'personalAbility'){
            let newData = JSON.parse(JSON.stringify(this.oneItemEditorStatus(this.personalAbility,itemId)))
            newData[1].info = this.personalAbilityChanging
            this.personalAbility.splice(newData[0],1,newData[1]) 
        }
        else if(this.changingBlock=='expectedPosition'){
            if(this.exPositionFavC){
                    for(let i = 0;i < this.expectedPosition.length;i++){
                        if(this.expectedPosition[i].favourite){
                            let upData = this.expectedPosition[i]
                            upData.favourite = false
                            this.expectedPosition.splice(i,1,upData)
                            this.$message({
                                showClose: true,
                                message: '主选职位只能有一个，已变为修改项',
                                type: 'warning'
                            });
                        }
                    }
                }
            let newData = JSON.parse(JSON.stringify(this.oneItemEditorStatus(this.expectedPosition,itemId)))
            newData[1].info = this.exPositionInfoC
            newData[1].type = this.exPositionTypeC?'全职':'兼职'
            newData[1].favourite = this.exPositionFavC
            newData[1].salary = this.exPositionSalaryLC+'-'+this.exPositionSalaryHC+'k'
            this.expectedPosition.splice(newData[0],1,newData[1])
        }
        else if(this.changingBlock == 'education'){
            let newData = JSON.parse(JSON.stringify(this.oneItemEditorStatus(this.education,itemId)))
            newData[1].schoolName=this.schoolNameC,//
            newData[1].educationSystem=this.educationSystemC,
            newData[1].diploma=this.diplomaC,
            newData[1].major=this.majorC,
            newData[1].timeFromY=this.schoolDateC[0].getFullYear(),
            newData[1].timeFromM=this.schoolDateC[0].getMonth()+1,
            newData[1].timeToY=this.schoolDateC[1].getFullYear(),
            newData[1].timeToM=this.schoolDateC[1].getMonth()+1,
            newData[1].experience=this.experienceC.replace(/\r\n/g,'<br/>').replace(/\n/g,'<br/>').replace(/ /g,'&nbsp;'),
            this.education.splice(newData[0],1,newData[1])
        }
        else if(this.changingBlock == 'projectEx'){
            let newData = JSON.parse(JSON.stringify(this.oneItemEditorStatus(this.projectEx,itemId)))
            newData[1].projectName = this.projectNameC
            newData[1].info = this.infoC.replace(/\r\n/g,'<br/>').replace(/\n/g,'<br/>').replace(/ /g,'&nbsp;')
            newData[1].timeFrom = this.projectDateC[1].getFullYear()+'.'+(this.projectDateC[1].getMonth()+1)
            newData[1].timeTo = this.projectDateC[1].getFullYear()+'.'+(this.projectDateC[1].getMonth()+1)
            newData[1].coreTech = this.coreTechC
            this.projectEx.splice(newData[0],1,newData[1])
        }
        else if(this.changingBlock == 'workEx'){
            let newData = JSON.parse(JSON.stringify(this.oneItemEditorStatus(this.workEx,itemId)))
            newData[1].companyName = this.companyNameC,
            newData[1].positionName = this.positionNameC,
            newData[1].info = this.workInfoC.replace(/\r\n/g,'<br/>').replace(/\n/g,'<br/>').replace(/ /g,'&nbsp;'),
            newData[1].accomplishment = this.accomplishmentC,
            newData[1].workTimeForm = this.workDateC[0].getFullYear()+'.'+(this.workDateC[0].getMonth()+1),
            newData[1].workTimeTo = this.workDateC[1].getFullYear()+'.'+(this.workDateC[1].getMonth()+1)
            this.workEx.splice(newData[0],1,newData[1])
        }
    },
    deleteOne(dataSet,itemId){
            for(let i = 0;i < dataSet.length;i++){
                if(itemId == dataSet[i].id){
                    dataSet.splice(i,1)
                }
            }
    },
    saveData(){
        let saveData = {};
        saveData.baseInfo = this.baseInfo
        saveData.expectedPosition = this.expectedPosition
        saveData.workEx  = this.workEx
        saveData.education =  this.education
        saveData.projectEx = this.projectEx
        saveData.personalAbility =  this.personalAbility
        let data = JSON.stringify(saveData);
        let blob = new Blob([data], { type: "application/json" });
        FileSaver.saveAs(blob, `简历数据.json`);
    },
    uploadData(data){
        console.log(data)
        let reader = new FileReader()
        reader.readAsText(data.raw,'UTF-8')
        reader.onload = (evt) => { //读取文件完毕执行此函数
        let dataJson = JSON.parse(evt.target.result)
        this.baseInfo = dataJson.baseInfo
        this.expectedPosition = dataJson.expectedPosition
        this.workEx = dataJson.workEx
        this.projectEx = dataJson.projectEx
        this.education = dataJson.education
        this.personalAbility = dataJson.personalAbility
      }
    }
}
}
</script>

<style scoped>
#blackBlock{
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
    width: 100vw;
    height: 100vh;
    z-index: 3;
}
.funcionBar{
    display: flex;
    justify-content: flex-end;
    padding: 10px 30px 0px 30px;
    color:#409EFF;
}
.funcionBar>div{
    cursor: pointer;
}
#baseInfo{
    position: relative;
    min-width: 600px;
    width: 80%;
    margin: 0 auto;
}
#baseInfo>.editorButton{
    display: none;
    position: absolute;
    z-index: 3;
    right: 0;
    color:#409EFF;
    cursor: pointer;
    background-color: black;
}
#baseInfo:hover >.editorButton{
    display: block;
}
.baseInfoContentMain{
    display: flex; 
    height: 122.5px;
}
.baseInfoContentMain>div:nth-of-type(1){
    display: flex;
    justify-content: space-between;
    flex-grow: 6;
    flex-wrap: wrap;
}
.baseInfoContentMain>div:nth-of-type(1)>div{
    height: 33.3%;
    width: 47.5%;
    flex-grow: 1;
    line-height:30.83px;
}
.baseInfoContentMain>div:nth-of-type(1)>div:nth-of-type(1){
    width: 100%;
    text-align: center;
    font-size: 1.2em;
}
.profileMain{
    flex-grow: 4;
}
.profileMain>div{
    position:relative;width:87.5px;height: 122.5px; border: 2px aqua solid;margin: 0 auto
}
.profileMain>div>.avatar-uploader{
    position:absolute;width:87.5px;height: 122.5px;line-height: 122.5px;background: rgba(0, 0, 0, 0.4);display: none;color: white;
}
.profileMain>div:hover >.avatar-uploader{
    display: block;
    text-align: center;
}

.profileMain>div>img{
    height: 100%;width: 100%;object-fit: cover;
}
#personalInfo{
    width: 100%;
    min-width: 850px;
    max-width: 1250px;
    display: flex;
    justify-content: center;
    margin: 0 auto;
    position: relative;
}
#resumeMenu{
    width: 200px;
    border-radius: 10px;
    text-align: center;
    height: 180px;
}
#resumeMenu>div{
    position: fixed;
    background-color: #F2F6FC;
    width: 200px;
    border-radius: 10px;
    text-align: center;
    height: 180px;
}
#resumeMenu>div>div{
    height: 1.5rem;
    line-height: 1.5rem;
    cursor: pointer;
}
#resumeMenu>div>div:nth-of-type(1){
    background: #409EFF;
    border-radius: 10px;
}
#resumeInfo{
    flex-grow: 1;
    margin-left: 25px;
    background: #F2F6FC;
    border-radius: 10px;
    position: relative;
}
.contentBlock{
    padding: 20px 30px 20px 30px;
    width: 100%;
}
.contentBlock>div{
    width: 100%;
}
.itemList{
    width: 100%;
    height: 1.8rem;
    line-height: 1.8rem;
    font-size: 1.5rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
}
.itemList>div:nth-of-type(1)
{
    width: 5px;
    border-radius: 2.5px;
    height: 1.2rem;
    background: blue;
}
.itemList>div:nth-of-type(2)
{
    margin-left: 25px;
}
.addbutton{
    font-size: 0.6em;
    color: #409EFF;
    position: absolute;
    right: 0;
    cursor: pointer;
}
.addEditor{
    margin-top: 10px;
}
.addButtonBlock{
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
}
.infoMain{
    padding: 15px;
}
.infoShow{
    position: relative;
}
.infoShow:hover{
    background: #EBEEF5;
}
.infoShow:hover >.editorAdelete{
    display: block;
    background: black;
}
.infoShow>.editorAdelete{
    display: none;
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
    color: #409EFF;
}
.longContent{
    font-size: 0.9em;
    max-width: 800px;
    white-space:pre-wrap;
    padding: 10px;
}
</style>