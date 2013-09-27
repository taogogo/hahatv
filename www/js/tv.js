
function showInfo(msg){
    //$("#announce").html('<span class="alert">'+msg+'</span>');
    hideLoader();
    alert(msg);
}

/////////////////////////////////////////////////////////////////////
//显示加载器
function showLoader() {
    //显示加载器.for jQuery Mobile 1.2.0
    $.mobile.loading('show', {
                     text: '加载中...', //加载器中显示的文字
                     textVisible: true, //是否显示文字
                     theme: 'a',        //加载器主题样式a-e
                     textonly: false,   //是否只显示文字
                     html: ""           //要显示的html内容，如图片等
                     });
}

//隐藏加载器.for jQuery Mobile 1.2.0
function hideLoader()  
{  
    //隐藏加载器  
    $.mobile.loading('hide');  
}
/////////////////////////////////////////////////////////////////////
function refresh(needConfirm){
    if(needConfirm==true){
        if(!confirm('确认更换视频节目？')){
            return false;
        }
    }
    //显示加载器
    showLoader();
    var ajaxSettings={
    url: "http://gx.tiancai.sinaapp.com/cat13/",
    timeout: 7000,
    error: function (xmlHttpRequest, error) {
        showInfo('连接出错!');
    },
    success: function(data) {
        if(data == ''){
            showInfo('换“台”失败，请检查网络!');
        }else{
            jsonobj=eval('('+data+')');
            if(needConfirm ==true){
                $('#videoBox').html('<video id="myVideo"  controls="controls" preload="auto" width="100%" style="min-height: 200px;" autoplay="autoplay"><source src="'+jsonobj.videoUrl+'"></video>');
                $('#announce').html('当前节目：《'+jsonobj.title+'》');
            }else{
                $('#videoBox').html('<video id="myVideo"  controls="controls" preload="auto" width="100%" style="min-height: 200px;" ><source src="'+jsonobj.videoUrl+'"></video>');

            }

            //隐藏加载器
            hideLoader();
        }
    },
    }
    $.ajax(ajaxSettings);
}

function hideOrshow(obj){
    if(obj.innerHTML=="显示提示"){
        obj.innerHTML="小提示：点击电视机屏幕即可播放视频，不喜欢可以点击下方按钮换台~~";
    }else{
        obj.innerHTML="显示提示";
    }
}
function closeTv(){
    if(!confirm('确认退出《高校电视台》？常回来看看哦~~')){
        return false;
    }
    if(navigator.app){
        navigator.app.exitApp();
    }else if(navigator.device){
        navigator.device.exitApp();
    }

}

///////////////////////////自动执行
$(document).ready(function(){refresh();})