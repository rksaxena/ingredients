/**
 * Created by 8321 on 4/22/17.
 */
function getIngredients(url_extension){
    $.ajax({
        type: "POST",
        url: "url",
        data: {"url_extension" : $.trim(url_extension)},
        success: (result, status, xhr) =>{
            console.log(result);
        },
        error: (xhr,status,error) =>{
            console.log(error);
        }
    })
}


$(document).ready(()=>{
    console.log("Ready!!!")
    $("#submit").click(() => {
        let extension = $("#url").val()
        getIngredients(extension);

    })

})
