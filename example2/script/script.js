$(function(){
    $("<input id='email' type='text' name='email'>").data("title", "邮箱").appendValidation("email").appendTo("#td2");
    
     $("#btn").click(function () {
        alert($("#t1 *").serialize());
    })
});