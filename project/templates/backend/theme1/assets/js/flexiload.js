var rootURL = "http://project/bdload/dashboard.php/";
var msg = "";

$(document).ready(function() {
    $(".confirm").click(function() { // Click to only happen on announce links
        $("#fload_number").text($("#load_number").val());
        $("#fload_amount").text($("#load_amount").val());
        $("#fload_type").text($("#load_type").val());

        $('#confirm-box').modal('show');
    });
});


$(document).ready(function() {
    $(".confirmflexiload").click(function() { // Click to only happen on announce links
        addFlexiload();

    });
});


function formToJSON() {
    return JSON.stringify(
            {
                "load_number": $('#load_number').val()
                , "load_amount": $('#load_amount').val()
                , "load_type": $('#load_type').val()

            }
    );
}


function showAlert(containerId, alertType, message) {
    $("#" + containerId).append('<div class="alert alert-' + alertType + '" id="alert' + containerId + '">' + message + '</div>');
    $("#alert" + containerId).alert();
    window.setTimeout(function() {
        $("#alert" + containerId).alert('close');
    }, 5000);
}



function addFlexiload() {
    console.log('addFlexiload');

    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: rootURL + 'flexiload/add',
        dataType: "json",
        data: formToJSON(),
        success: function(data, textStatus, jqXHR) {
            var responseText = jQuery.parseJSON(jqXHR.responseText);
            $('#confirm-box').modal('hide');

            if (responseText.msg == 'success') {
                msg = 'Succesfully Flexiload Request Completed.';
                showAlert('alerts', 'info', msg);
            }
            else {
                msg = responseText.msg;
                showAlert('alerts', 'warning', responseText.msg);

            }




        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('addWine error: ' + textStatus);
        }
    });
}


/*Script For User Add**/



$(document).ready(function() {
    $(".confirm").click(function() { // Click to only happen on announce links
        $("#fuserName").text($("#userName").val());
        $("#fuserEmail").text($("#userEmail").val());
        $("#fuserPhone").text($("#userPhone").val());

        var offerText = '';

        if ($('#offerFlexiload').is(":checked")) {
            offerText += '  <a href="#" class="btn btn-success btn-sm">Flexiload</a> ';
        }

        if ($('#offerBkash').is(":checked")) {
            offerText += '<a href="#" class="btn btn-default btn-sm">Bkash</a> ';
        }


        if ($('#offerSms').is(":checked")) {
            offerText += '<a href="#" class="btn btn-success btn-sm">Sms</a> ';
        }

        if ($('#offerGroup').is(":checked")) {
            offerText += '<a href="#" class="btn btn-info btn-sm">Group </a>';
        }



        $("#offer").html(offerText);

        $('#confirm-box').modal('show');
    });
});

function createUserFormToJSON() {
    return JSON.stringify(
            {
                "newUserName"     :  $('#userName').val()
                , "newUserEmail"  :  $('#userEmail').val()
                , "newUserPhone"  :  $('#userPhone').val()
                , "offerFlexiload": ($('#offerFlexiload').is(":checked")) ? 1 : 0
                , "offerBkash"    : ($('#offerBkash').is(":checked"))     ? 1 : 0
                , "offerSms"      : ($('#offerSms').is(":checked"))       ? 1 : 0
                , "offerGroup"    : ($('#offerGroup').is(":checked"))     ? 1 : 0
            }
    );
}



$(document).ready(function() {
    $(".confirmAddUser").click(function() { // Click to only happen on announce links
        addUser();

    });
});


function addUser() {
    console.log('addUser');

    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: rootURL + 'user/add',
        dataType: "json",
        data: createUserFormToJSON(),
        success: function(data, textStatus, jqXHR) {
            var responseText = jQuery.parseJSON(jqXHR.responseText);
            $('#confirm-box').modal('hide');

            if (responseText.msg == 'success') {
                msg = 'Succesfully User Creation Completed.';
                showAlert('alerts', 'info', msg);
            }
            else {
                msg = responseText.msg;
                showAlert('alerts', 'warning', responseText.msg);

            }




        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('addWine error: ' + textStatus);
        }
    });
}



      