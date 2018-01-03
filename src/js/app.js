(function () {

    /*
    * 判断手机系统，为安卓系统下的input添加'capture','camera'属性
    * */
    var userAgent = navigator.userAgent;
    var isIOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    var isAndroid = userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1;
    if (isAndroid) {
        document.getElementById('upload-img').setAttribute('capture', 'camera')
    }

    /*
    * @synopsis 变量
    * */
    //背景图
    var bg,
        //背景图下标
        bgIndex = 0,
        //背景图片是否是PNG格式
        isPng = false,
        //上传的图片
        targetImg,
        //上传图片的base64编码
        imgData,
        //上传图片的旋转参数，[0度=1，顺时针90度=6，逆时针90度=8，180度=3]
        Orientation,
        //上传的图片的初始属性：位置、缩放比例、旋转角度
        imgProps = {
            scale: 1,
            offsetX: 0,
            offsetY: 0,
            orientation: 0,
            regX: 0,
            regY: 0
        },
        //缩放比例
        scale = 1,
        //手指旋转时的角度
        angle = 0,
        //图片最大大小（204800=200*1024）
        maxImgSize = 204800;
    //过滤文件类型
    var rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;

    //canvas属性
    var myCanvas = document.getElementById('myCanvas'),
        canvasWidth = myCanvas.width,
        canvasHeight = myCanvas.height;

    /*创建canvas画布*/
    //创建舞台
    var stage = new createjs.Stage("myCanvas");
    //创建背景颜色
    var rect = new createjs.Shape();
    rect.graphics.beginFill("#dccbad").drawRect(0, 0, 500, 707);
    rect.x = rect.y = 0;
    stage.addChild(rect);

    //创建背景图
    bg = new createjs.Bitmap(bgList[bgIndex]);
    //判断是否是PNG格式
    isPng = /data:image\/png;/.test(bgList[bgIndex]);
    bg.x = bg.y = 0;

    //添加背景图到舞台
    stage.addChild(bg);

    //更新画布
    createjs.Ticker.setFPS(5);
    createjs.Ticker.addEventListener("tick", function () {
        stage.update();
    });

    /**********************更改背景图**********************/
    document.getElementsByClassName('change-bg')[0].onclick = function () {
        //移除原来的背景图
        stage.removeChild(bg);
        //更新背景图下标并判断
        bgIndex++;
        if (bgIndex > 2) {
            bgIndex = 0;
        }
        if (!bgList[bgIndex]) {
            bg = new createjs.Bitmap('');
        } else {
            bg = new createjs.Bitmap(bgList[bgIndex]);
        }

        //判断是否是PNG格式
        isPng = /data:image\/png;/.test(bgList[bgIndex]);

        stage.addChild(bg, targetImg);
        if (isPng) {
            stage.swapChildren(bg, targetImg);
        }
        stage.update();
    };

    /**********************上传图片**********************/
    document.getElementById('upload-img').onchange = function () {
        //获取图片信息对象
        var oFile = document.getElementById('upload-img').files[0];
        if (document.getElementById('upload-img').files.length === 0) {
            return;
        }

        if (!rFilter.test(oFile.type)) {
            alert("You must select a valid image file!");
            return;
        }

        //获取图片旋转参数
        EXIF.getData(oFile, function () {
            Orientation = EXIF.getTag(this, 'Orientation');
        });

        //FileReader实例对象
        var oFReader = new FileReader();

        //文件开始读取
        oFReader.onloadstart = function () {
            console.log('开始')
            document.getElementsByClassName('loading-toast')[0].style.display = 'block';
        };

        //文件读取完成
        oFReader.onload = function (oFREvent) {
            stage.removeChild(targetImg);
            //创建image
            var image = new Image();
            image.src = oFREvent.target.result;
            imgData = oFREvent.target.result;

            //图片加载完成
            image.onload = function () {
                if (oFile.size > maxImgSize) {
                    console.log('压缩')
                    var data = compressImg(image);
                    targetImg = new createjs.Bitmap(data);
                } else {
                    console.log('不压缩')
                    targetImg = new createjs.Bitmap(oFREvent.target.result);
                }
                console.log('stardraw');
                var imgWidth = image.width;
                var imgHeight = image.height;

                /*
                * 图片缩放比例:[500:取的canvas的宽度]
                * canvas的宽除以图片的宽得出缩放比例值
                * */
                var sizescale = 500 / imgWidth;
                scale = sizescale;
                imgProps.scale = sizescale;

                //图片的X/Y轴偏移量:在canvas中间位置
                imgProps.offsetX = (canvasWidth - imgWidth * sizescale) / 2;
                imgProps.offsetY = (canvasHeight - imgHeight * sizescale) / 2;

                //根据旋转参数判断旋转角度
                if (typeof Orientation != 'undefined') {
                    switch (Orientation) {
                        case 1:
                            imgProps.orientation = 0;
                            break;
                        case 3:
                            imgProps.orientation = 180;
                            break;
                        case 6:
                            /*
                            * IOS系统下，竖着拍照,照片会出现逆时针旋转90度的情况
                            * 所以这时要将图片顺时针旋转，恢复正确
                            * 此时要重新设置下X/Y轴的定位：[取值分别和之前的X/Y轴的定位相反并乘以2倍]
                            * */
                            imgProps.orientation = 90;
                            sizescale = 500 / imgHeight;
                            scale = sizescale;
                            imgProps.scale = sizescale;
                            imgProps.offsetX = (canvasHeight - imgHeight * sizescale) / 2;
                            imgProps.offsetY = (canvasHeight - imgWidth * sizescale) / 2;
                            break;
                        case 8:
                            /*
                            * IOS系统下，将手机倒着竖着拍照,照片会出现顺时针旋转90度的情况
                            * */
                            imgProps.orientation = -90;
                            sizescale = 500 / imgHeight;
                            scale = sizescale;
                            imgProps.scale = sizescale;
                            imgProps.offsetX = (canvasHeight - imgHeight * sizescale) / 2;
                            imgProps.offsetY = (canvasHeight - imgWidth * sizescale) / 2;
                            break;
                    }
                } else {
                    imgProps.orientation = 0;
                }

                //设置上传后图片属性
                targetImg.scaleX = sizescale;
                targetImg.scaleY = sizescale;
                targetImg.x = imgProps.offsetX;
                targetImg.y = imgProps.offsetY;
                targetImg.rotation = imgProps.orientation;

                document.getElementsByClassName('loading-toast')[0].style.display = 'none';

                //将目标图片添加到舞台
                stage.addChild(targetImg);
                if (isPng) {
                    stage.swapChildren(bg, targetImg);
                }
                console.log('draw end');
            };
        };
        oFReader.readAsDataURL(oFile);
    };

    /*********************调整图片位置**********************/
        //手势区域
    var gestureArea = document.getElementById('gesture-area');
    interact(gestureArea).gesturable({
        onstart: function (event) {
            console.log('star')
        },
        onmove: function (event) {
            console.log(event)
            if (typeof targetImg == 'undefined') {
                return;
            }
            scale = scale * (1 + event.ds);
            angle += event.da;
            var x = (parseFloat(imgProps.offsetX) || 0) + event.dx,
                y = (parseFloat(imgProps.offsetY) || 0) + event.dy;

            imgProps.offsetX = x;
            imgProps.offsetY = y;
            imgProps.scale = scale;

            targetImg.x = imgProps.offsetX;
            targetImg.y = imgProps.offsetY;
            targetImg.scaleX = imgProps.scale;
            targetImg.scaleY = imgProps.scale;
            targetImg.rotation = imgProps.orientation + angle;

            stage.update();
        },
        onend: function (event) {
            console.log('end')
        }
    }).draggable({
        onmove: function (event) {
            if (typeof targetImg == 'undefined') {
                return
            }
            console.log('dragMove')
            var x = (parseFloat(imgProps.offsetX) || 0) + event.dx,
                y = (parseFloat(imgProps.offsetY) || 0) + event.dy,
                s = (parseFloat(imgProps.scale) || 1);

            targetImg.scaleX = imgProps.scale;
            targetImg.scaleY = imgProps.scale;
            targetImg.x = imgProps.offsetX;
            targetImg.y = imgProps.offsetY;

            imgProps.offsetX = x;
            imgProps.offsetY = y;
            stage.update();
        }
    });

    /**********************生成图片**********************/
    document.getElementById('upload').onclick = function () {
        var context = myCanvas.getContext('2d');
        var inputName = document.getElementById('input-name').value;
        var inputScore = document.getElementById('input-score').value;
        var uploadImg = document.getElementById('upload-img').value;

        //判断是否上传照片、填好信息
        if (inputName != '' && uploadImg != '' && inputScore != '') {

            //设置姓名和金额的位置及内容
            var name = {
                    text: '',
                    x: 250,
                    y: 580
                },
                score = {
                    text: '$:',
                    x: 250,
                    y: 620
                };
            if (!isPng) {
                name.text = '通缉：';
                name.y = 500;
                score.text = '悬赏金额：';
                score.y = 540;
            }
            //绘制名字
            context.beginPath();
            context.font = '36px 微软雅黑 bold';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillStyle = '#333';
            context.fillText(name.text + inputName, 250, name.y, 400);
            context.closePath();

            //绘制金额
            context.beginPath();
            context.font = '36px 微软雅黑';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillStyle = '#333';
            context.fillText(score.text + inputScore, 250, score.y, 400);
            context.closePath();

            document.getElementById('content1').style.display = 'none';
            document.getElementById('content2').style.display = 'block';

            //获取cvavas的data信息，并转换图片base64的格式
            var imgDatadahe = myCanvas.toDataURL().replace("image/png", "image/octet-stream");
            //生成合成的图片
            document.getElementById('show').src = imgDatadahe;

        } else {
            alert('请上传照片，并填上姓名和悬赏金额！');
        }

    };

    /***********************继续生成***********************/
    document.getElementsByClassName('replay')[0].onclick = function () {
        setTimeout(function () {
            document.getElementById('content1').style.display = 'block';
            document.getElementById('content2').style.display = 'none';
        }, 300);
    };

    /**********************压缩图片**********************/
    function compressImg(img) {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;

        //将图片绘制到canvas里
        ctx.drawImage(img, 0, 0);
        //将原来图片的质量压缩到原先的0.4倍
        var data = canvas.toDataURL('image/jpeg', 0.2);
        return data;
    }

})();