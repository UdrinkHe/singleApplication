//数据测试样例
//
/*
每一条事项的存储格式为
{
    id:唯一值，用于事项管理
    title:标题
    content:事项内容
    isDone:是否完成
    isDel：是否删除，删除则不会显示，也不计入统计
}
*/
let allResult=[
    {
        id:1,
        title:'刷牙',
        content:'认真刷牙养成好习惯',
        isDone:1,
        isDel:0
    },
    {           
        id:2,
        title:'洗脸',
        content:'认真洗脸养成好习惯',
        isDone:0,
        isDel:1//被删除则无法显示
    },
    {
        id:3,
        title:'学html1',
        content:'学会用标签',
        isDone:0,
        isDel:0
    },
    {
        id:4,
        title:'学html2',
        content:'学会用多媒体标签',
        isDone:0,
        isDel:0
    },
    {
        id:5,
        title:'学css1',
        content:'掌握字体样式',
        isDone:0,
        isDel:0
    },
    {
        id:6,
        title:'学css2',
        content:'掌握盒子模型',
        isDone:0,
        isDel:0
    },
    {
        id:7,
        title:'学css3',
        content:'掌握flex布局',
        isDone:0,
        isDel:0
    },
    {
        id:8,
        title:'学ccss4',
        content:'掌握grid布局',
        isDone:0,
        isDel:0
    },  
    {
        id:9,
        title:'学css5',
        content:'学会切图做网站布局',
        isDone:0,
        isDel:0
    },
    {
        id:10,
        title:'学习js1',
        content:'学会js做网页交互',
        isDone:0,
        isDel:0
    }
]//所有结果，用例测试版
//let allResult=[]//所有结果
let searchContent=null//搜索内容
let nowPage=1;//当前页数
let allPage=1;//总页数
let listResult=[]//显示到列表的结果
let nowResultingId=null;//当前处理的数据编号
let isUpdating=false;//是否为修改
let addId=allResult.length+1;//初始添加id
//初始更新
//根据当前搜索内容生成待显示列表 
function getListResult()
{
    listResult=[];
    let isDoneNum=0
    let notDoneNum=0
    //添加所有匹配项
    for(let i=0;i<allResult.length;i++)
    {   
    
        if(searchContent==null)//无搜索内容且没有被删除
        {
            if(allResult[i].isDel==0)
            {
                let newCopy=JSON.parse(JSON.stringify(allResult[i]))
                listResult.push(newCopy)
            }    
        }
        else
        {   //标题输入匹配搜索栏
            console.log('开始检索'+allResult[i].title)
            nowPage=1;
            let newflag='gi'
            let newReg=new RegExp(searchContent,newflag)
            if(allResult[i].title.match(newReg))
            {   
                console.log('检索成功')
                if(allResult[i].isDel==0)
                {
                    let newCopy=JSON.parse(JSON.stringify(allResult[i]))
                    listResult.push(newCopy)
                } 
            }
        }
    }
    for(let i=0;i<listResult.length;i++)//统计可显示列表中已完成和未完成的项目
    {
        listResult[i].isDone?isDoneNum++:notDoneNum++
    }
    document.getElementsByClassName('isFinish')[0].children[0].children[0].innerHTML='Todo Done:'+isDoneNum;
    document.getElementsByClassName('isFinish')[0].children[1].children[0].innerHTML='Todo On Progress:'+notDoneNum;
    
    //显示总页数
    allPage=Math.ceil(listResult.length/8);
    //修改总页数显示
    document.getElementsByClassName('pageControl')[0].children[1].children[1].innerHTML=allPage;
}

//根据待显示列表和页数填充显示一页的内容
function getOnePageItem()
{   
    document.getElementsByClassName('contentBlock')[0].innerHTML=null;//先清除
    //查询当前搜索结果和页数的总子个Z
    let listResultLength=listResult.length;
    console.log('当前可载入个数为'+listResultLength)
    if(listResultLength==1)
    {
        console.log(listResult[0]);
    }
    //第一个元素编号是0+(页数-1)*8
    if(listResultLength)
    {   
        for(let i=(nowPage-1)*8;i<=listResultLength-1&&i<=(nowPage-1)*8+7;i++)//一页至多搜索8条且不能超过待显示序号。
        {
            showOneItem(i)
        }
        //修改当前页数显示
        document.getElementsByClassName('pageControl')[0].children[1].children[0].innerHTML=nowPage;
    }
}
//页面显示元素更新
// function refreshPage(pageNum,searchContent)//页数，搜索内容
// {
//     getListResult(searchContent);
//     getOnePageItem(pageNum)
// }
//更改搜索
function changeSearchValue()
{
    searchContent=document.getElementsByClassName('longContent')[0].children[0].value;
    getListResult();
    getOnePageItem();

}
//添加 
//打开添加
function openAdd(){
    document.getElementsByClassName('zhezhao')[0].style.display='block'
    document.getElementById('editBlock').style.display='block'
    document.getElementById('editBlock').children[1].children[0].value='';
    document.getElementById('editBlock').children[2].children[0].value='';
}
//修改
//打开修改
function openEdit(e)
{   
    console.log('打开修改')
    nowResultingId=e.getAttribute('itemID');//得到属性值
    isUpdating=true;
    document.getElementsByClassName('zhezhao')[0].style.display='block'
    document.getElementById('editBlock').style.display='block'
    //同步数据
    for(let i=0;i<allResult.length;i++)
    {
        if(allResult[i].id==nowResultingId)
        {   
            document.getElementById('editBlock').children[1].children[0].value=allResult[i].title;
            //document.getElementById('editBlock').children[1].children[0].setAttribute('value',allResult[i].title)
            document.getElementById('editBlock').children[2].children[0].value=allResult[i].content
        }
    }
    
}
//编辑确认
function editChange()
{
    if(isUpdating)//修改
    { 
       isUpdating=false;
       for(let i=0;i<allResult.length;i++)
       {
        if(allResult[i].id==nowResultingId)
        { 
            allResult[i].title=document.getElementById('editBlock').children[1].children[0].value;
            allResult[i].content=document.getElementById('editBlock').children[2].children[0].value;
            console.log(allResult[i].title)
        }
       }
       document.getElementsByClassName('zhezhao')[0].style.display='none'
       document.getElementById('editBlock').style.display='none'
       getListResult();
       getOnePageItem();
    }
    else//添加
    {
        console.log('添加完毕')
        document.getElementsByClassName('zhezhao')[0].style.display='none'
        document.getElementById('editBlock').style.display='none'
        let newCopy={}
        newCopy.id=addId;
        newCopy.title=document.getElementById('editBlock').children[1].children[0].value;
        newCopy.content=document.getElementById('editBlock').children[2].children[0].value;
        newCopy.isDel=0;
        newCopy.isDone=0;
        allResult.push(JSON.parse(JSON.stringify(newCopy)))
        addId+=1;
        getListResult();
        getOnePageItem();
    }
}
//跳转页面
function turnToPage()
{   
    if(!document.getElementsByClassName('pageControl')[0].children[3].children[0].value)
    {
        alert('不能输入空页数!')
    }
    else{
        if(document.getElementsByClassName('pageControl')[0].children[3].children[0].value<=allPage)
        {
            nowPage=document.getElementsByClassName('pageControl')[0].children[3].children[0].value
            getListResult();
            getOnePageItem();
        }
        else
        {
            alert('不能超出总页数！')
        }
    }
   
}
//取消编辑
function cancelEdit()
{
    document.getElementsByClassName('zhezhao')[0].style.display='none'
    document.getElementById('editBlock').style.display='none'
    isUpdating=false;
}
//删除
function itemDel(e)
{
    nowResultingId=e.getAttribute('itemID');
    for(let i=0;i<allResult.length;i++)
    {
        if(allResult[i].id==nowResultingId)
        {
            allResult[i].isDel=1;
        }
    }
    //一页中最后一个元素被删除,则需要跳转到上一页
    if(nowPage>Math.ceil((listResult.length-1)/8)&&nowPage!=1)
    {
        nowPage--;
    }
    //页面重排
    getListResult();
    getOnePageItem();
}
//设置为已完成
function itemFin(e)
{
    nowResultingId=e.getAttribute('itemID');
    for(let i=0;i<allResult.length;i++)
    {
        if(allResult[i].id==nowResultingId)
        {
            allResult[i].isDone=1;
        }
    }
     //页面重排
     getListResult();
     getOnePageItem();
}

//上一页
function lastPage()
{
    if(nowPage>1)
    {
        nowPage-=1;
        document.getElementsByClassName('contentBlock')[0].innerHTML=null;
        getOnePageItem();
    }
}
//下一页
function nextPage()
{
    if(nowPage<allPage)
    {
        nowPage+=1;
        document.getElementsByClassName('contentBlock')[0].innerHTML=null;
        getOnePageItem();
    }
    
}


//测试用例之添加一条事项的方法(参数是编号)
function showOneItem(listResultIndex)
{
    //向内容栏中添加这一条
    let motherNode=document.getElementsByClassName('contentBlock')[0];
    let sonNode=document.createElement('div')
    sonNode.setAttribute('class','listItem')

    console.log(listResultIndex)
    //如果已经完成，设置为绿色背景
    if(listResult[listResultIndex].isDone)
    {
        sonNode.style.backgroundColor='green';
    }

    let sonSonNode1=document.createElement('div')
    sonSonNode1.innerHTML=listResult[listResultIndex].title //标题
    sonSonNode1.setAttribute('class','longContent')

    let sonSonNode2=document.createElement('div')
    sonSonNode2.setAttribute('class','ButtonBlock')
    let buttonDel=document.createElement('button')
    let buttonEdit=document.createElement('button')
    let buttonFin=document.createElement('button')
    buttonDel.setAttribute('itemId',listResult[listResultIndex].id)//三个按钮对应这个事项编号
    buttonEdit.setAttribute('itemId',listResult[listResultIndex].id)
    buttonFin.setAttribute('itemId',listResult[listResultIndex].id)

    buttonDel.setAttribute('onclick','itemDel(this)')
    buttonEdit.setAttribute('onclick','openEdit(this)')
    buttonFin.setAttribute('onclick','itemFin(this)')

    sonSonNode2.appendChild(buttonDel);
    sonSonNode2.appendChild(buttonEdit);
    sonSonNode2.appendChild(buttonFin);
    

    sonNode.appendChild(sonSonNode1);
    sonNode.appendChild(sonSonNode2);
    motherNode.appendChild(sonNode);
    // <div class="listItem">      
    //             <div class="longContent">123</div>
    //             <div class="ButtonBlock">
    //                 <button></button>
    //                 <button></button>
    //                 <button></button>
    //             </div>
    //         </div>
}
//打开网页首先初始化数据 注意需要等网页节点加载完毕，不然会出现读取不了节点的情况
window.onload=()=>{
    getListResult();
    getOnePageItem();
}
