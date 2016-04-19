/*表单验证规则*/
var strategys = {
    isNotEmpty: function(value,errorMsg) {
        if($.trim(value) === ''||parseInt(value)===0) {
            return errorMsg;
        }
    },
    isNotNullString: function(value,errorMsg) {
        if($.trim(value) === 'null') {
            return errorMsg;
        }
    },
    isNotNull: function(value,errorMsg) {
        if($.trim(value) === '') {
            return errorMsg;
        }
    },
    isNotSelect: function(value,errorMsg){
        if(value === "0"){
            return errorMsg;
        }
    },
    isNotSelectSpecial: function(value,errorMsg){
        if(value === "-1"){
            return errorMsg;
        }
    },
    // 限制最小长度
    minLength: function(value,length,errorMsg) {
        var value = $.trim(value);
        if(typeof(value) == "undefined"||value=="")
            return errorMsg;
        var strLength=0;
        for(var i=0;i<value.length;i++){
            if(value.charCodeAt(i)>255)
                strLength+=1;
            else
                strLength++;
        }
        if(strLength < length) {
            return errorMsg;
        }
    },
    // 限制最大长度
    maxLength: function(value,length,errorMsg) {
        var value = $.trim(value);
        if(typeof(value) == "undefined"||value=="")
            return errorMsg;
        var strLength=0;
        for(var i=0;i <value.length;i++){
            if(value.charCodeAt(i)>255)
                strLength+=1;
            else
                strLength++;
        }
        if(strLength > length) {
            return errorMsg;
        }
    }
};
var Validator = function(){
    this.cache = [];  // 保存效验规则
};
Validator.prototype.add = function(dom,rules) {
    var self = this;
    for(var i = 0, rule; rule = rules[i++]; ){
        (function(rule){
            var strategyAry = rule.strategy.split(":");
            var errorMsg = rule.errorMsg;
            self.cache.push(function(){
                var strategy = strategyAry.shift();
                strategyAry.unshift(dom.val());
                strategyAry.push(errorMsg);
                return strategys[strategy].apply(dom,strategyAry);
            });
        })(rule);
    }
};
Validator.prototype.start = function(){
    for(var i = 0, validatorFunc; validatorFunc = this.cache[i++]; ) {
        var obj = validatorFunc(); // 开始效验 并取得效验后的返回信息
        if(obj) {
            return obj;
        }
    }
};
//实例化使用
var validator = new Validator();
validator.add(DOM,[{strategy: 'isNotEmpty',errorMsg:'errorMsg'});//可添加多个规则
var errorMsg = validator.start(); // 获得效验结果
if(errorMsg){
    layer.msg(errorMsg,{icon: 7,time: 2000});
    return false;
}
