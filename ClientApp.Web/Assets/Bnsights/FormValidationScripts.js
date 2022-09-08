function isFormValid(form) {
    var v = $(form).valid();
    return v;
}
function isFormValid_Modal(form) {
    var v = $(form).valid();
    if (v == true) {
        $('#basic').modal('hide');
        return true;
    }
    else {
        return false;
    }
    return v;
}
function isAnyModalOpen() {
    return $('.modal.in').length > 0;
}
function scrollToDiv(divID) {
    if (!isAnyModalOpen()) {
        if (!divID || divID == 0) {
            return;
        }

        var scrollToPoint = $(divID).offset().top - 100;
        $('html, body').animate({ scrollTop: scrollToPoint }, 400);
    }

}
function fluentValidationCheck(successFunction, e, form, onServerSideValidationFunction) {
    if (!e.val && e.validation && e.validation.length > 0) {
        try {

            var invalidValidation = $(form).find('div.alert-InvalidValidation').first();
            invalidValidation.attr('style', 'display:block');
            $(invalidValidation).delay(20000).hide(400);

            var ul = $(invalidValidation).find('ul');
            ul.html('');

            for (var i = 0; i < e.validation.length; i++) {
                ul.append('<li class="tst_ValidationError">' + e.validation[i] + '</li>');
            }
            scrollToDiv(invalidValidation);
            Bnsights.Helper.UnBlockUI();
            var inputPass = $(form).find('input[name="password"][type="password"]');
            if (inputPass != null && $(inputPass).length > 0) {
                $(inputPass).val('');
            }

            var captchaParent = $(form).find('div.captchaParent');

            if (captchaParent != null && $(captchaParent).length > 0) {
                $(captchaParent).find('a').click();
            }
            if (onServerSideValidationFunction) {
                window[onServerSideValidationFunction].apply(e.validation);
            }

        } catch (e) {
            console.log(e);
            var items = successFunction.split(',');
            $.each(items, function (i, obj) {
                var functionItem = items[i];
                var list = [];
                if (functionItem.indexOf('(') > -1) {
                    var firstIndex = functionItem.indexOf('(') + 1;
                    var parameters =
                        functionItem.substr(firstIndex,
                            functionItem.length - 1 - firstIndex);
                    var paramList = parameters.split(',');
                    for (var i = 0; i < paramList.length; i++) {
                        list.push(paramList[i].replace(/['"]+/g, ''));
                    }
                    functionItem = functionItem.substr(0, functionItem.indexOf('('));
                }
                list.push(e);
                if (functionItem == 'Bnsights.Helper.NotifySuccess')
                    functionItem = '__NotifySuccess';

                window[functionItem].apply(window, list);
            });
        }


    }
    else {
        var items = successFunction.split(',');
        $.each(items, function (i, obj) {
            var functionItem = items[i];
            var list = [];
            if (functionItem.indexOf('(') > -1) {
                var firstIndex = functionItem.indexOf('(') + 1;
                var parameters =
                    functionItem.substr(firstIndex,
                        functionItem.length - 1 - firstIndex);
                var paramList = parameters.split(',');
                for (var i = 0; i < paramList.length; i++) {
                    list.push(paramList[i].replace(/['"]+/g, ''));
                }
                functionItem = functionItem.substr(0, functionItem.indexOf('('));
            }
            list.push(e);
            if (functionItem == 'Bnsights.Helper.NotifySuccess')
                functionItem = '__NotifySuccess';

            window[functionItem].apply(window, list);
        });
        var IsOpenModal = $(form).attr('customOpenModal');
        if (!IsOpenModal) { $('.modal').modal('hide'); }
    }

}
function __NotifySuccess(msg) {
    Bnsights.Helper.NotifySuccess(msg);
}
function __NotifyError(msg) {
    Bnsights.Helper.NotifyError(msg);
}

function ValidateDiv(form) {
    var CustomErrorMessage = $(form).attr('customErrorMessage');
    var invalidValidation = $(form).find('div.alert-InvalidValidation').first();
    if (!invalidValidation.length && CustomErrorMessage && CustomErrorMessage.length != 0)
        $(form).prepend('<div id="tst_ValidationDiv" class="alert alert-danger alert-InvalidValidation" style="display:none;"><button class="close" data-close="alert"></button><ul class="m-0"><li class="tst_ValidationError">' + CustomErrorMessage + '</li></ul></div>');
    else
        $(form).prepend('<div id="tst_ValidationDiv" class="alert alert-danger alert-InvalidValidation" style="display:none;"><button class="close" data-close="alert"></button><ul class="m-0"><li class="tst_ValidationError">' + VAL.RequiredMessage + '</li></ul></div>');

    var error = form.find('.alert-danger:first-child');
    var CustomSuccessHandling = $(form).attr('customSuccessHandling');
    var CustomErrorPlacementHandling = $(form).attr('customErrorHandling');
    var onServerSideValidationFunction = $(form).attr('onServerSideValidationFunction');

    form.validate({
        errorElement: 'div', //default input error message container
        errorClass: 'help-block help-block-error text-danger w-100', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: ".note-editor *",  // validate all fields including form hidden input
        invalidHandler: function (event, validator) { //display error alert on form submit
            error.show();
            if (!isAnyModalOpen()) {
                var label = $(validator.errorList[0].element).parents(".pv-control").find(".b-label");
                var scrollToElement = label.length > 0 ? label : $(validator.errorList[0].element);
                $('html, body').animate({
                    scrollTop: scrollToElement.offset().top
                }, 300);
            }
        },

        errorPlacement: function (error, element) { // render error placement for each input type
            if (error.text().length != 0) {
                if (CustomErrorPlacementHandling && CustomErrorPlacementHandling.length != 0) {
                    window[CustomErrorPlacementHandling](error, element);
                    return;
                }
                var cont = $(element);
                if (cont) {
                    // for handling file upload placment
                    if (cont.hasClass('customFileUploadPlacment')) {
                        cont.parents('.fileUploadParent').append(error);
                    } else if (cont.hasClass('bnspinner')) {
                        cont.parent().after(error);
                    }
                    else if (cont.parent().hasClass('input-group-icon')) { // Icon Textbox
                        cont.parent().after(error);
                    }
                    else if (cont.attr('data-plugin') == 'selectpicker') {   // Bootstrap select
                        cont.parents('.bootstrap-select').find('button').first().after(error);
                    }
                    else if (cont.attr('data-b-plugin') == 'summernote') {   // Summernote
                        cont.siblings('.note-editor').after(error);
                    }
                    else if (cont.hasClass('V-PhoneIntl')) {   // Summernote
                        cont.parent().after(error);
                    }
                    else if (cont.hasClass('V-PhoneIntl')) {   // Summernote
                        cont.parent().after(error);
                    }
                    else if (cont.hasClass('v-check-required')) {   // radiobuttonscheck
                        cont.parents('.validation-container').after(error);
                    }
                    else if (cont.hasClass('v-one-element-required')) {   // radiobuttonscheck
                        cont.parents('.validation-container').after(error);
                    }
                    else if (cont.parent('.input-group').length) {   // inputgroupcheck
                        cont.parent('.input-group').after(error);
                    }
                    else if (cont.parent('.spinnerUi').length) {   // spinnerUi
                        cont.parent('.spinnerUi').after(error);
                    }
                    else if (cont.hasClass('v-dddatepicker')) {
                        cont.closest('.input-form-group').after(error);
                    }
                    else {
                        cont.after(error);
                    }
                } else {
                    element.after(error);
                }
            }
        },

        highlight: function (element) { // hightlight error inputs

            if ($(element).attr('data-plugin') == 'selectpicker') {
                $(element).parents('.bootstrap-select').addClass('is-invalid').removeClass("is-valid");
            }
            else {
                $(element).closest('.form-group').removeClass("has-success").addClass('is-invalid').removeClass("is-valid"); // set error class to the control group
                $(element).addClass('is-invalid').removeClass("is-valid"); // set error class to the control group
            }
        },

        unhighlight: function (element) { // revert the change done by hightlight
            if ($(element).attr('data-plugin') == 'selectpicker') {
                $(element).parents('.bootstrap-select').removeClass('is-invalid').addClass("is-valid");
            }
            else {
                $(element).closest('.form-group').removeClass('is-invalid').addClass("is-valid");
                $(element).removeClass('is-invalid').addClass("is-valid");
            }
        },

        success: function (label) {
            if (CustomSuccessHandling && CustomSuccessHandling.length != 0) {
                window[CustomSuccessHandling](label);
                return;
            }

            label.closest('.form-group').removeClass('is-invalid').addClass("is-valid"); // set success class to the control group
            label.removeClass('is-invalid').addClass("is-valid");
        },

        submitHandler: function (form) {
            if ($(form).attr('data-formSubmit') === "1") {
                form.submit();
            }
            if ($(form).attr('data-disableAjax') === "1") {
                Bnsights.Helper.BlockUI();
                return true;
            }

            error.hide();
            if ($(form).attr('action') == undefined) {
                return true;
            }
            var beginFunction = $(form).attr('data-ajax-begin');
            var completeFunction = $(form).attr('data-ajax-complete');
            var successFunction = $(form).attr('data-ajax-success');
            var errorFunction = $(form).attr('data-ajax-failure');
            var clientSideForm = $(form).attr('data-client-side');
            var disableBlockUI = $(form).attr('disableBlockUI');
            if (disableBlockUI == "True") {
                Bnsights.DisableAjaxBlockUIOnce = true;
            }
            if (clientSideForm === "1") {
                if (successFunction) {
                    var listClientSide = [];
                    if (successFunction.indexOf('(') > -1) {
                        var firstIndex = successFunction.indexOf('(') + 1;
                        var parameters =
                            successFunction.substr(firstIndex,
                                successFunction.length - 1 - firstIndex);
                        var paramList = parameters.split(',');
                        for (var i = 0; i < paramList.length; i++) {
                            listClientSide.push(paramList[i].replace(/['"]+/g, ''));
                        }
                        successFunction = successFunction.substr(0, successFunction.indexOf('('));
                    }
                    if (successFunction == 'Bnsights.Helper.NotifySuccess')
                        successFunction = '__NotifySuccess';
                    window[successFunction].apply(window, listClientSide);
                    // ClearUnsavedChanges(form);
                }

                return false;
            }

            if (beginFunction && window[beginFunction])
                window[beginFunction](form);

            $.ajax({
                type: "POST",
                url: $(form).attr('action'),
                //mimeType: "multipart/form-data",
                contentType: false,
                cache: false,
                processData: false,
                data: (new FormData(form)),
                success: function (e) {

                    if (successFunction) {
                        fluentValidationCheck(successFunction, e, form, onServerSideValidationFunction);


                        // ClearUnsavedChanges(form);
                    }


                },
                error: function (e, statusText) {
                    console.log(statusText)
                    if (statusText === "timeout") {
                        // timeout

                    } else {
                        if (errorFunction) {
                            var list = [];
                            if (errorFunction.indexOf('(') > -1) {
                                var firstIndex = errorFunction.indexOf('(') + 1;
                                var parameters =
                                    errorFunction.substr(firstIndex,
                                        errorFunction.length - 1 - firstIndex);
                                var paramList = parameters.split(',');
                                for (var i = 0; i < paramList.length; i++) {
                                    list.push(paramList[i].replace(/['"]+/g, ''));
                                }
                                errorFunction = errorFunction.substr(0, errorFunction.indexOf('('));
                            }
                            if (errorFunction == 'Bnsights.Helper.NotifyError')
                                errorFunction = '__NotifyError';
                            window[errorFunction].apply(window, list);
                        }
                    }
                },
                complete: function () {
                    if (completeFunction && window[completeFunction]) {
                        window[completeFunction](form);
                    }
                }

            });
            return false;
        }
    });
    AddValidationRulesToDiv(form);
}
function ValidateContainer(elem) {
    //AddValidationRulesToDiv(elem);
    var IsError = true;
    var parentForm = $(elem).closest("form");
    var formValidator = parentForm.validate();
    if (elem.length != 0) {
        $(elem).find('select,input,textarea').each(function () {
            formValidator.element($(this));
        });
        $(elem).find('select,input,textarea').each(function () {
            if (!$(this).valid()) {
                IsError = false;
                return false;
            }
        });
    }
    return IsError;
}
jQuery.validator.addMethod("intRange", function (value, element) {
    try {
        var intValue = parseInt(value);
        var from = 0;
        var to = 100;
        if ($(element).attr('data-from')) {
            from = parseInt($(element).attr('data-from'));
        }
        if ($(element).attr('data-to')) {
            to = parseInt($(element).attr('data-to'));
        }

        return this.optional(element) || (/^(\d+|\d+)$/.test(value) && (intValue <= to && intValue >= from));
    }
    catch (e) {
        return false;
    }
});
jQuery.validator.addMethod("decimalPoint", function (value, element) {
    return this.optional(element) || /^(\d+|\d+.\d{1,3})$/.test(value);
}, VAL.Number);
jQuery.validator.addMethod("intNumber", function (value, element) {
    return this.optional(element) || /^(\d+|\d+)$/.test(value);
}, VAL.Integer);
jQuery.validator.addMethod("greaterThan", function (value, element, params) {

    var parentNode = $(element).attr('data-rowparentnode');
    var startDate;
    if (parentNode == undefined || parentNode.length == 0) {
        startDate = $(params);
    }
    else {
        startDate = $(element).parents(parentNode).find(params);
    }



    if (startDate.val() == "" || value == "")
        return true;

    var splittedEndDate = value.split('/');
    var endDate = new Date(splittedEndDate[2], parseInt(splittedEndDate[1]) - 1, splittedEndDate[0]);
    var splittedStartDate = startDate.val().split('/');
    var startDate = new Date(splittedStartDate[2], parseInt(splittedStartDate[1]) - 1, splittedStartDate[0]);
    return (new Date(endDate) >= new Date(startDate));

}, VAL.EndDateGEStartDate);
jQuery.validator.addMethod("NotEmptyOrSpace", function (value, element) {
    try {

        return (/\S/.test(value))
    }
    catch (e) {
        return false;
    }
}, VAL.NotEmptyOrSpace);

function addExtraRules(elem) {

}

function AddValidationRulesToDiv(elem) {
    var notEmptyOrSpace = elem.find('input.notEmptyOrSpace');
    if (notEmptyOrSpace.length != 0) {
        notEmptyOrSpace.each(function () {
            $(this).rules('add', { NotEmptyOrSpace: this });
        });

    }
    if (elem.length != 0) {

        addExtraRules(elem);
        //var checkSelectRequired = elem.find('select.v-required, select.v-required-select');
        //if (checkSelectRequired.length != 0) {

        //    $.validator.addMethod("checkSelectRequiredFunction", function (value, element, params) {
        //        var val = value;

        //        if (val.length == 0) {
        //            return false;
        //        }

        //        return true;

        //    }, VAL.Required);

        //    checkSelectRequired.each(function () {
        //        $(this).rules('add', { checkSelectRequiredFunction: true });
        //    });
        //}

        //v-required
        //elem.find('select.v-required, select.v-required-select').each(function () {
        //    var errorMsg = VAL.Required
        //    //@*var errorMsg = '@System.Web.HttpContext.GetGlobalResourceObject("ADAEP.Common|ResourceFiles.Validation", "Required", BaseController.GetCulture("en"))';
        //    //if ($(this).parents('.form-group').length != 0 && $(this).parents('.form-group').hasClass('ar')) {
        //    //    errorMsg = '@System.Web.HttpContext.GetGlobalResourceObject("ADAEP.Common|ResourceFiles.Validation", "Required", BaseController.GetCulture("ar"))';
        //    //}*@
        //    $(this).rules('add', {
        //        required: true,
        //        messages: {
        //            required: errorMsg
        //        }
        //    });
        //});
        var checkInputRequired = elem.find('input.v-required,textarea.v-required,select.v-required, select.v-required-select');
        if (checkInputRequired.length != 0) {
            $.validator.addMethod("checkInputRequiredFunction", function (value, element, params) {
                if (value == null)
                    return false;

                var val = value;

                if (!$(element).is('select')) {
                    if (val.length == 0 || val.trim().length == 0) {
                        return false;
                    }
                }
                else {
                    if (!val || (val && val.length == 0)) {
                        return false;
                    }
                }
                return true;

            }, VAL.Required);

            checkInputRequired.each(function () {
                $(this).rules('add', { checkInputRequiredFunction: true });
            });
        }

        //formbuilder 
        $.validator.addMethod("checkDynamicFieldComparisonFunction", function (value, element, params) {
            var val = value;
            if ($(element).data("dynamicvalue") && $(element).data("dynamicoperator")) {
                var requiredvalue = $(element).data("dynamicvalue");
                var requiredoperator = $(element).data("dynamicoperator");
                if (requiredoperator == 1) {
                    var url = requiredvalue + val;
                    Bnsights.DisableAjaxBlockUIOnce = true;
                    var response = $.ajax({
                        type: "GET",
                        url: url,
                        async: false
                    }).responseText;
                    console.log(JSON.parse(response).val);
                    return JSON.parse(response).val;
                }
                else {
                    if ($(element).hasClass("toggleSwitch")) {
                        val = $(element).is(':checked').toString();
                    }

                    if (!isNaN(parseFloat(val))) {
                        val = parseFloat(val);
                    }
                    if (!isNaN(parseFloat(requiredvalue))) {
                        requiredvalue = parseFloat(requiredvalue);
                    }
                    else {
                        requiredvalue = requiredvalue.toLowerCase();
                    }
                    return Bnsights.Helper.Compare(val, requiredoperator, requiredvalue);
                }
            }
            else {
                return true;
            }
        },
            function (params, element) {
                return $(element).data('dynamicmsg');

            }
        );
        var checkDynamicFieldComparison = elem.find('input.v-dynamiccase,textarea.v-dynamiccase,select.v-dynamiccase');
        if (checkDynamicFieldComparison.length != 0) {

            checkDynamicFieldComparison.each(function () {
                $(this).rules('add', {
                    checkDynamicFieldComparisonFunction: true,
                });
            });
        }
        //end formbuilder

        //v-required-msg
        elem.find('input.v-required-msg, select.v-required-msg, textarea.v-required-msg').each(function () {
            $(this).rules('add', {
                required: true,
                messages: {
                    required: $(this).data("required-msg")
                }
            });
        });

        //v-email
        elem.find('input.v-email').each(function () {
            $(this).rules('add', {
                email: true,
                messages: {
                    email: VAL.Email,
                }
            });
        });

        elem.find('input.v-email').each(function () {

            $.validator.addMethod("checkemailcharacters", function (email, element) {
                if ($(element).val().length == 0) {
                    return true;
                }
                var reg = /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
                return reg.test(email.toLowerCase());

            }, VAL.Email);

            try {
                $('input.v-email').each(function () {
                    $(this).rules('add', { checkemailcharacters: $('input.v-email') });
                });
            } catch (e) {
                $(this).rules('add', { checkemailcharacters: $('input.v-email') });
            }

        });
        //v-email-msg
        elem.find('input.v-email-msg').each(function () {
            $(this).rules('add', {
                email: true,
                messages: {
                    email: $(this).data("email-msg")
                }
            });
        });


        //v-maxlength
        elem.find('input.v-maxlength').each(function () {
            $(this).rules('add', {
                maxlength: $(this).data("maxlength"),
                messages: {
                    maxlength: $(this).data("maxlength-msg")
                }
            });
        });

        //v-min3Max5
        var dateMustBeLowerThanToday = elem.find('input.v-dateLowerThanToday');
        if (dateMustBeLowerThanToday.length != 0) {
            $.validator.addMethod("checkEndDate", function (value, element, params) {

                //var paramsArr = $(params).val().split("/");
                var valueStr = value;
                if (value.length == 0) {
                    return true;
                }
                var paramsStr = params;

                if (valueStr.indexOf("-") >= 0) {
                    //dp-year datepicker, mm/yyyy format
                    var valueArr = value.split("-");
                    var paramsArr = paramsStr.split("-");
                    if (valueArr.length === 2) {
                        return (new Date(valueArr[2], valueArr[1], 1) < new Date(paramsArr[2], paramsArr[1], paramsArr[0]));
                    }
                    else if (valueArr.length == 3) {
                        return (new Date(valueArr[2], valueArr[1], valueArr[0]) < new Date(paramsArr[2], paramsArr[1], paramsArr[0]));
                    }


                }

                if (!/Invalid|NaN/.test(new Date(valueStr))) {
                    return (new Date(valueStr) < new Date(paramsStr));
                }
                else if ($().datepicker) {

                    var elementArr = $(element).datepicker("getDate").split("-");
                    var paramsElemArr = $(params).datepicker("getDate").split("-");
                    var elementStr = elementArr[1] + "/" + elementArr[0] + "/" + elementArr[2];
                    var paramsElemStr = paramsElemArr[1] + "/" + paramsElemArr[0] + "/" + paramsElemArr[2];


                    return (new Date(elementArr) > new Date(paramsElemStr));
                }


                return isNaN(value) && isNaN($(params).val())
                    || (Number(value) >= Number($(params).val()));
            }, VAL.DateLowerThanToday);

            var dateNow = new Date();

            dateMustBeLowerThanToday.rules('add', { checkEndDate: dateNow.getDate() + '-' + (dateNow.getMonth() + 1) + '-' + dateNow.getFullYear() });

        }

        var checkRequired = elem.find('input.v-check-required');
        if (checkRequired.length != 0) {
            $.validator.addMethod("checkRequiredFunction", function (value, element, params) {

                var container = $(element).parents('.validation-container');
                if (container) {
                    return container.find('input[type=checkbox]:checked, input[type=radio]:checked').length == 0 ? false : true;
                }
                else
                    return false

            }, VAL.Required);

            checkRequired.each(function () {
                $(this).rules('add', { checkRequiredFunction: true });
            });
        }

        var oneElementCheckedRequired = elem.find('input.v-one-element-required');
        $.validator.addMethod("oneElementRequiredFunction", function (value, element, params) {

            var container = $(element).parents('.validation-container');
            if (container) {
                return container.find('input[type=checkbox]:checked, input[type=radio]:checked').length == 0 ? false : true;
            }
            else
                return false

        }, VAL.Required);
        if (oneElementCheckedRequired.length != 0) {
            oneElementCheckedRequired.each(function () {
                $(this).rules('add', { oneElementRequiredFunction: true });
            });
        }

        var dateMustBeHigherThanToday = elem.find('input.v-dateHigherThanToday');
        if (dateMustBeHigherThanToday.length != 0) {
            $(dateMustBeHigherThanToday).each(function () {
                var dateNow = new Date();

                $(this).rules('add', { checkHigherDate: dateNow.getDate() + '-' + (dateNow.getMonth() + 1) + '-' + dateNow.getFullYear() });
            });
            $.validator.addMethod("checkHigherDate", function (value, element, params) {

                //var paramsArr = $(params).val().split("/");
                var valueStr = value;
                var ua = window.navigator.userAgent;

                if (value.length == 0) {
                    return true;
                }
                var paramsStr = params;

                if (valueStr.indexOf("-") >= 0) {
                    //dp-year datepicker, mm/yyyy format
                    var valueArr = value.split("-");
                    var paramsArr = paramsStr.split("-");
                    if (valueArr.length === 2) {
                        return (new Date(valueArr[2], valueArr[1], 1) > new Date(paramsArr[2], paramsArr[1], paramsArr[0]));
                    }
                    else if (valueArr.length == 3) {
                        return (new Date(valueArr[2], valueArr[1], valueArr[0]) > new Date(paramsArr[2], paramsArr[1], paramsArr[0]));
                    }


                }

                if (!/Invalid|NaN/.test(new Date(valueStr))) {
                    return (new Date(valueStr) < new Date(paramsStr));
                }
                else if ($().datepicker) {

                    var elementArr = $(element).datepicker("getDate").split("-");
                    var paramsElemArr = $(params).datepicker("getDate").split("-");
                    var elementStr = elementArr[1] + "/" + elementArr[0] + "/" + elementArr[2];
                    var paramsElemStr = paramsElemArr[1] + "/" + paramsElemArr[0] + "/" + paramsElemArr[2];


                    return (new Date(elementArr) < new Date(paramsElemStr));
                }


                return isNaN(value) && isNaN($(params).val())
                    || (Number(value) >= Number($(params).val()));
            }, VAL.DateExpired);


        }

        // B-MultipleFileUpload Validations
        var multipleFilesRequired = elem.find('input.v-required-multiplefiles');
        if (multipleFilesRequired.length != 0) {
            $.validator.addMethod("checkMultipleFileUploadRequired", function (value, element, params) {
                var parent = $(element).parents('.pv-multiplefileupload');
                return $(parent).find('.fileInfoContainer').length != 0;
            }, VAL.Required);

            $(multipleFilesRequired).each(function () {
                $(this).rules('add', { checkMultipleFileUploadRequired: this });
            });

        }

        var multipleFilesMAX = elem.find('.pv-multiplefileupload input.v-multiplefiles-max');
        if (multipleFilesMAX.length != 0) {
            $.validator.addMethod("checkMultipleFileUploadMaxFiles", function (value, element, params) {
                if ($(element).attr('data-maxfiles') && $(element).attr('data-maxfiles').length == 0)
                    return true;

                var parent = $(element).parents('.pv-multiplefileupload');
                var max = parseInt($(element).attr('data-maxfiles'));

                return $(parent).find('.fileInfoContainer').length <= max;
            });
            multipleFilesMAX.each(function () {
                var max = $(this).attr('data-maxfiles');
                var message = VAL.MultipleFilesMax.replace('{{max}}', max);
                $(this).rules('add', {
                    checkMultipleFileUploadMaxFiles: this,
                    messages: {
                        checkMultipleFileUploadMaxFiles: message,
                    }
                });
            })
        }

        var multipleFilesMIN = elem.find('.pv-multiplefileupload input.v-multiplefiles-min');
        if (multipleFilesMIN.length != 0) {
            $.validator.addMethod("checkMultipleFileUploadMinFiles", function (value, element, params) {
                if ($(element).attr('data-minfiles') && $(element).attr('data-minfiles').length == 0)
                    return true;

                var parent = $(element).parents('.pv-multiplefileupload');
                var min = parseInt($(element).attr('data-minfiles'));

                return $(parent).find('.fileInfoContainer').length >= min;
            });
            multipleFilesMIN.each(function () {
                var min = $(this).attr('data-minfiles');
                var message = VAL.MultipleFilesMin.replace('{{min}}', min);
                $(this).rules('add', {
                    checkMultipleFileUploadMinFiles: this,
                    messages: {
                        checkMultipleFileUploadMinFiles: message,
                    }
                });
            })
        }
        // END B-MultipleFileUpload Validations

        var yearLowerThanCurrent = elem.find('input.v-yearlowerthancurrent');
        if (yearLowerThanCurrent.length != 0) {
            $.validator.addMethod("checkYearLowerThanThis", function (value, element, params) {

                return (value <= params);


                return isNaN(value) && isNaN(params)
                    || (Number(value) > Number(params));
            }, VAL.InvalidYear);

            yearLowerThanCurrent.rules('add', { checkYearLowerThanThis: new Date().getFullYear() });
        }

        var tablerequired = elem.find('input.v-tablerequired');
        if (tablerequired.length != 0) {
            $.validator.addMethod("checkTableRequired", function (value, element, params) {

                var table = $(element).parent().prev('table');
                if (table) {
                    return table.find('tbody tr').length == 0 ? false : true;
                }
                else
                    return false

            }, VAL.TableRequired);

            tablerequired.each(function () {

                $(this).rules('add', { checkTableRequired: $(this) });
            });
        }
        var mapautocomplete = elem.find('.mapAutoCompelete');
        if (mapautocomplete.length != 0) {
            $.validator.addMethod("checkvalidmap", function (value, element) {
                if ($(element).val() != '') {
                    if ($(element).parents().closest('.b-mapautocomplete').find('.txtLat').val() == '' || $(element).parents().closest('.b-mapautocomplete').find('.txtLng').val() == '') {
                        return false;
                    }
                    else {
                        return true;
                    }
                }
                else {
                    return true;
                }

            }, VAL.ValidMap);
            mapautocomplete.each(function () {
                $(this).rules('add', { checkvalidmap: $(this) });
            });
        }
        var checkAllDateInputs = elem.find('.pv-dropdowndatepicker .date-value input');
        $.validator.addMethod("checkAllDateInputsFunction", function (value, element, params) {
            var container = $(element).parents('.pv-dropdowndatepicker');
            var valid = [];
            var hasValue = false;
            var output = true;
            container.find('select').each(function () {
                if ($(this).val()) {
                    valid.push(true);
                    hasValue = true;
                }
                else if (!$(this).val()) {
                    valid.push(false);
                }

            });
            if (hasValue) {
                return valid.every(Boolean);
            }
            else {
                return true;
            }
        }, VAL.DateNotValidNotAllInputSelected);
        if (checkAllDateInputs.length != 0) {
            checkAllDateInputs.each(function () {
                $(this).rules('add', { checkAllDateInputsFunction: true });
            });
        }
        var startDate = elem.find('input.v-startdate');
        var endDate = elem.find('input.v-enddate');
        if (endDate.length != 0) {
            $.validator.addMethod("checkEndDate", function (value, element, params) {
                if (!$(startDate).parent().siblings("select.v-startdate").hasClass("v-required") || !$(endDate).parent().siblings("select.v-enddate").hasClass("v-required")) {                    return true;                }
                if (value.indexOf('-') > -1) {
                    var valueArr = value.split('-');
                    var paramsArr = $(params).val().split('-');
                    var valueStr = valueArr[1] + "/" + valueArr[0] + "/" + valueArr[2];
                    var paramsStr = paramsArr[1] + "/" + paramsArr[0] + "/" + paramsArr[2];

                    if ($(element).hasClass("v-dateTimePicker")) {
                        var elementArr = Date.parse($(element).val());
                        var paramsElemArr = Date.parse($(params).val());
                        return (elementArr > paramsElemArr);
                    }

                    if (!/Invalid|NaN/.test(new Date(valueStr))) {
                        return (new Date(valueStr) > new Date(paramsStr));
                    }

                }
                else {
                    var valueArr = value.split('/');
                    var paramsArr = $(params).val().split('/');
                    var valueStr = valueArr[1] + "/" + valueArr[0] + "/" + valueArr[2];
                    var paramsStr = paramsArr[1] + "/" + paramsArr[0] + "/" + paramsArr[2];
                    //if ($(element).hasClass(".v-dateTimePicker")) {
                    //    var elementArr = Date.parse($(element).val());
                    //    var paramsElemArr = Date.parse($(params).val());
                    //    return (elementArr > paramsElemArr);
                    //}


                    if (!/Invalid|NaN/.test(new Date(valueStr))) {
                        return (new Date(valueStr) > new Date(paramsStr));
                    }
                }



                return isNaN(value) && isNaN($(params).val())
                    || (Number(value) >= Number($(params).val()));
            }, VAL.EndDateGEStartDate);

            endDate.rules('add', { checkEndDate: startDate });
        }


        //v-number
        elem.find('input.v-number').each(function () {
            $(this).rules('add', {
                number: true,
                messages: {
                    number: VAL.Number
                }
            });
        });


        //v-number
        elem.find('input.v-int').each(function () {
            $(this).rules('add', {
                intNumber: true
            });
        });

        //v-min-max data-group data-level(min/max)
        elem.find('input.v-min-max').each(function () {

            $.validator.addMethod("checkMinMax", function (url, element) {
                var currentElement = $(element);

                var group = currentElement.data("group");

                var otherElement = $("input.v-min-max[data-group='" + group + "']");

                var min, max;

                if (currentElement.data("level") == "min") {
                    min = currentElement;
                    max = otherElement;
                } else {
                    max = currentElement;
                    min = otherElement;
                }

                if (parseInt(min.val()) > parseInt(max.val())) {
                    return false;
                }
                return true;
            }, VAL.MinMax);

            try {
                $('input.v-min-max').each(function () {
                    $(this).rules('add', { checkMinMax: $('input.v-min-max') });
                });
            } catch (e) {
                $(this).rules('add', { checkMinMax: $('input.v-min-max') });
            }

        });

        //Decimal Range
        elem.find('input.v-decimalRange').each(function () {
            var from = 0;
            var to = 100;
            if ($(this).attr('data-from')) {
                from = parseInt($(this).attr('data-from'));
            }
            if ($(this).attr('data-to')) {
                to = parseInt($(this).attr('data-to'));
            }

            $(this).rules('add', {
                range: [from, to],
                messages: {
                    range: VAL.NotFallInRange.replace('{{to}}', to).replace('{{from}}', from)
                }
            });

        });

        // Int Range
        elem.find('input.v-intRange').each(function () {
            var from = 0;
            var to = 100;
            if ($(this).attr('data-from')) {
                from = parseInt($(this).attr('data-from'));
            }
            if ($(this).attr('data-to')) {
                to = parseInt($(this).attr('data-to'));
            }

            $(this).rules('add', {
                intRange: true,
                messages: {
                    intRange: VAL.NotFallInRange.replace('{{to}}', to).replace('{{from}}', from)
                }
            });
        });

        //v-number
        elem.find('input.v-decimal').each(function () {
            $(this).rules('add', {
                decimalPoint: true
            });
        });





        //v-imgonly
        elem.find('input.v-imgonly').each(function () {
            $(this).rules('add', {
                accept: "image/*",
                messages: {
                    accept: "Only Images are accepted"
                }
            });
        });

        //v-require-from-group
        elem.find('input.v-require-from-group').each(function () {
            $(this).rules('add', {
                require_from_group: [$(this).data("require-counter"), $(this).data("require-group")],
                messages: {
                    require_from_group: $(this).data("require-msg")
                }
            });
        });

        elem.find('input.v-requiredAtleastOne').each(function () {
            var tr = $(this).parents('tr');

            var inputs = tr.find('input.v-required-from-trgroup');

            $(inputs).each(function () {
                $(this).rules('remove', 'require_from_group');

                $(this).rules('add', {
                    require_from_group: [1, '.' + $(this).data("require-group")],
                    messages: {
                        require_from_group: VAL.FillAtleastOneOfTheseFields
                    }
                });
            });

        });
        //v-no-special-characters
        elem.find('input.v-no-special-characters').each(function () {
            $.validator.addMethod("checkText", function (url, element) {
                if ($(element).val().length == 0) {
                    return true;
                }
                var reg = /^[A-Z0-9\u0600-\u06FF ]+$/i;
                return reg.test(url.toLowerCase());
            }, VAL.NoSpecialCharacters);
            try {
                $('input.v-no-special-characters').each(function () {
                    $(this).rules('add', { checkText: $('input.v-no-special-characters') });
                });
            } catch (e) {
                $(this).rules('add', { checkText: $('input.v-no-special-characters') });
            }
        });
        //v-url
        elem.find('input.v-url').each(function () {

            $.validator.addMethod("checkUrl", function (url, element) {
                if ($(element).val().length == 0) {
                    return true;
                }
                var reg = /^(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})*\/?$/;
                return reg.test(url.toLowerCase());

            }, VAL.URL);

            try {
                $('input.v-url').each(function () {
                    $(this).rules('add', { checkUrl: $('input.v-url') });
                });
            } catch (e) {
                $(this).rules('add', { checkUrl: $('input.v-url') });
            }

        });

        //v-urlFB
        elem.find('input.v-urlFB').each(function () {

            $.validator.addMethod("checkFBUrl", function (url, element) {
                if ($(element).val().length == 0) {
                    return true;
                }
                var reg = /(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/?/;
                return reg.test(url.toLowerCase());

            }, VAL.URL_Facebook);

            try {
                $('input.v-urlFB').each(function () {
                    $(this).rules('add', { checkFBUrl: $('input.v-urlFB') });
                });
            } catch (e) {
                $(this).rules('add', { checkFBUrl: $('input.v-urlFB') });
            }

        });

        //v-urlTwitter
        elem.find('input.v-urlTwitter').each(function () {

            $.validator.addMethod("checkTwitterUrl", function (url, element) {
                if ($(element).val().length == 0) {
                    return true;
                }
                var reg = /(?:(?:http|https):\/\/)?(?:www.)?twitter.com\/?/;
                return reg.test(url.toLowerCase());

            }, VAL.URL_Twitter);

            try {
                $('input.v-urlTwitter').each(function () {
                    $(this).rules('add', { checkTwitterUrl: $('input.v-urlTwitter') });
                });
            } catch (e) {
                $(this).rules('add', { checkTwitterUrl: $('input.v-urlTwitter') });
            }

        });

        //v-urlInstagram
        elem.find('input.v-urlInstagram').each(function () {

            $.validator.addMethod("checkInstagramUrl", function (url, element) {
                if ($(element).val().length == 0) {
                    return true;
                }
                var reg = /(?:(?:http|https):\/\/)?(?:www.)?instagram.com\/?/;
                return reg.test(url.toLowerCase());

            }, VAL.URL_Instagram);

            try {
                $('input.v-urlInstagram').each(function () {
                    $(this).rules('add', { checkInstagramUrl: $('input.v-urlInstagram') });
                });
            } catch (e) {
                $(this).rules('add', { checkInstagramUrl: $('input.v-urlInstagram') });
            }

        });

        //v-urlYoutube
        elem.find('input.v-urlYoutube').each(function () {

            $.validator.addMethod("checkYoutubeUrl", function (url, element) {
                if ($(element).val().length == 0) {
                    return true;
                }
                var reg = /(?:(?:http|https):\/\/)?(?:www.)?youtube.com\/?/;
                return reg.test(url.toLowerCase());

            }, VAL.URL_Youtube);

            try {
                $('input.v-urlYoutube').each(function () {
                    $(this).rules('add', { checkYoutubeUrl: $('input.v-urlYoutube') });
                });
            } catch (e) {
                $(this).rules('add', { checkYoutubeUrl: $('input.v-urlYoutube') });
            }

        });

        var editor = elem.find('input.v-phone');
        if (editor.length != 0) {
            $.validator.addMethod("checkPhone", function (phone_number, element) {
                phone_number = phone_number.replace(/\s+/g, "");

                phone_number = phone_number.replace(/-/g, "");


                return this.optional(element) ||
                    phone_number.length < 9 || phone_number.length > 13 ? this.optional(element) : phone_number


            }, VAL.Phone);

            editor.each(function () {
                $(this).rules('add', { checkPhone: $('input.v-phone') });
            });
        }


        var internationalMobile = elem.find('input.v-intl-phone');
        if (internationalMobile.length != 0) {
            $.validator.addMethod("checkInternationalMobile", function (value, element, params) {

                if ($(element).val().length == 0) {
                    return true;
                }
                var reg = /^(\+|00)(972|93|355|213|1684|376|244|1264|1268|54|374|297|61|43|994|1242|973|880|1246|375|32|501|229|1441|975|387|267|55|246|359|226|257|855|237|1|238|345|236|235|56|86|61|57|269|242|682|506|385|53|537|420|45|253|1767|1849|593|20|503|240|291|372|251|298|679|358|33|594|689|241|220|995|49|233|350|30|299|1473|590|1671|502|224|245|595|509|504|36|354|91|62|964|353|972|39|1876|81|962|77|254|686|965|996|371|961|266|231|423|370|352|261|265|60|960|223|356|692|596|222|230|262|52|377|976|382|1664|212|95|264|674|977|31|599|687|64|505|227|234|683|672|1670|47|968|92|680|507|675|595|51|63|48|351|1939|974|40|250|685|378|966|221|381|248|232|65|421|386|677|27|500|34|94|249|597|268|46|41|992|66|228|690|676|1868|216|90|993|1649|688|256|380|971|44|1|598|998|678|681|967|260|263|591|673|61|243|225|500|44|379|852|98|44|44|850|82|856|218|853|389|691|373|258|970|872|262|7|590|290|1869|1758|590|508|1784|239|252|47|963|886|255|670|58|84|1284|1340)\d{7,13}$/;

                return reg.test($(element).val().toLowerCase());
            }, VAL.Phone);

            internationalMobile.rules('add', { checkInternationalMobile: this });
        }
        var MinLengthInput = elem.find('input.v-minlength');
        if (MinLengthInput.length != 0) {
            var MinLength = 3;
            $.validator.addMethod("checkMinLength", function (input_value, element) {
                MinLength = $(element).data("minlength");
                if (input_value.length < $(element).data("minlength") && $(element).hasClass("v-required"))
                    return false;
                else
                    return true;

            });

            MinLengthInput.each(function () {
                var min = $(this).attr('data-minlength');
                var message = VAL.Min_Length.replace('{{min}}', min);
                $(this).rules('add', {
                    checkMinLength: this,
                    messages: {
                        checkMinLength: message,
                    }
                });
            })
        }

        var editorEID = elem.find('input.v-required.v-required-eid');
        if (editorEID.length != 0) {
            $.validator.addMethod("checkEID", function (eid_value, element) {
                eid_value = eid_value.replace(/-/g, "");
                if ($.trim(eid_value).length == 0)
                    return false;
                else
                    return true;

            }, VAL.Required);

            editorEID.each(function () {
                $(this).rules('add', { checkEID: this });
            });
        }

        var editorEIDFormat = elem.find('input.v-eid');
        if (editorEIDFormat.length != 0) {
            $.validator.addMethod("checkEIDFormat", function (eid_value, element) {
                var selectorHidden = $(element).parent().find('.v-hidden');
                var eid_value = $(selectorHidden).val();
                if (eid_value.length == 0)
                    return true;
                var maxLength = $(element).data('pattern').replaceAll('}').replaceAll('{').replaceAll('-').length;// read the length from the pattern
                if ($.trim(eid_value).length != maxLength && $.trim(eid_value).length != 0) {
                    return false;
                }

                var startsWith = $(element).attr("data-startsWith");
                if (startsWith)
                    return $.trim(eid_value).length > 0 && eid_value.startsWith(startsWith);

                return true;
            }, VAL.EID);

            editorEIDFormat.each(function () {
                $(this).rules('add', { checkEIDFormat: this });
            });
        }

        var phoneintl = elem.find('input.V-PhoneIntl');
        if (phoneintl.length != 0) {
            $.validator.addMethod("checkPhoneValidation", function (phone_value, element) {
                if (phone_value != "") {
                    if ($.trim(phone_value)) {
                        var reg = /^\+?[0-9\s\-]*$/;
                        var testPhone = reg.test(phone_value);
                        if (testPhone && $(element).intlTelInput("isValidNumber")) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                }
                else {
                    return true;
                }
            }, VAL.Phone); phoneintl.each(function () {
                $(this).rules('add', { checkPhoneValidation: this });
            });
        }

        var captcha = elem.find('input.v-captcha');
        if (captcha.length != 0) {

            $.validator.addMethod("checkCaptcha", function (captcha, element) {
                var encryptedCaptcha = $(element).parents('.input-icon').find('img').attr('data-rc');
                var response = $.ajax({
                    type: "POST",
                    url: "/Handlers/GenericHandler.ashx",
                    data: " {enteredCaptcha: '" + captcha + "', encryptedCaptcha: '" + encryptedCaptcha + "' }",
                    contentType: "application/json",
                    dataType: "json",
                    async: false
                }).responseText;
                return response == "True";
            }
                , VAL.Captcha);

            $('input.v-captcha').each(function () {
                $(this).rules('add', { checkCaptcha: $('input.v-captcha') });
            });
        }

        var editor = elem.find('input.v-officePhone');
        if (editor.length != 0) {
            $.validator.addMethod("checkOffice", function (phone_number, element) {

                phone_number = phone_number.replace(/\s+/g, "");
                phone_number = phone_number.replace(/-/g, "");
                return this.optional(element) ||
                    phone_number.match(/^0\d{8}$/);

            }, VAL.Phone);

            editor.each(function () {
                $(this).rules('add', { checkOffice: $('input.v-officePhone') });
            });

            elem.find('input:not(.v-officePhone)').each(function () {
                $(this).rules('remove', 'checkOffice');
            });
        }

        var emailNom = elem.find('input.v-emailNomination');
        if (emailNom.length != 0) {

            $.validator.addMethod("emailNomination", function (email, element) {
                var status = emailNom.parents('.col-md-6').find('#hdnStatusID').val();
                var response = $.ajax({
                    type: "POST",
                    url: "ListView.aspx/IsEmailAvailable",
                    data: "{email: '" + email + "', submissionStatusID: '" + status + "' }",
                    contentType: "application/json",
                    dataType: "json",
                    async: false
                }).responseText;
                return JSON.parse(response).d;
            }, VAL.EmailNominationUsed);

            $('input.v-emailNomination').each(function () {
                $(this).rules('add', { emailNomination: $('input.v-emailNomination') });
            });
        }
        $.validator.addMethod("CheckGreaterToday", function (date, element) {
            var splittedEndDate = "";
            var input = "";
            if ($(element).parents().closest(".pv-dropdowndatepicker").hasClass('dddp-Y')) {
                splittedEndDate = date;
                input = new Date(splittedEndDate, new Date().getMonth(), new Date().getDay());

                return input.getFullYear() <= new Date().getFullYear();
            }
            else {
                if ($(element).hasClass('v-dateTimePicker')) {                    date = $(element).siblings('input:hidden').val();                    input = Date.parse(date);                }                else {
                    if (date) {
                        splittedenddate = date.split('-');
                        var year = splittedenddate[2].split(' ')[0]; // skip time
                        input = new Date(year, parseInt(splittedenddate[1]) - 1, splittedenddate[0]);
                    } else {
                        return true;
                    }
                }
            }
            if (isNaN(input.getDate())) {
                return true;
            }
            return input <= new Date().setHours(0, 0, 0, 0);
        }, VAL.NotGreaterThanToday);
        var greaterToday = elem.find('input.v-notGreaterToday');
        if (greaterToday.length != 0) {
            greaterToday.each(function () {
                $(this).rules('add', { CheckGreaterToday: this });
            });
        }
        $.validator.addMethod("CheckLessThanToday", function (date, element) {

            var splittedEndDate = "";
            var input = "";
            if ($(element).parents().closest(".pv-dropdowndatepicker").hasClass('dddp-Y')) {
                splittedEndDate = date;
                input = new Date(splittedEndDate, new Date().getMonth(), new Date().getDay());
                return input.getFullYear() >= new Date().getFullYear();
            }
            else {
                if ($(element).hasClass('v-dateTimePicker')) {                    date = $(element).siblings('input:hidden').val();                    input = Date.parse(date);                }                else {
                    if (date) {
                        splittedenddate = date.split('-');
                        var year = splittedenddate[2].split(' ')[0]; // skip time
                        input = new Date(year, parseInt(splittedenddate[1]) - 1, splittedenddate[0]);
                    } else {
                        return true;
                    }
                }
            }
            return input >= new Date().setHours(0, 0, 0, 0);
        }, VAL.NotLessThanToday);
        var lessthanToday = elem.find('input.v-notLessThanToday');
        if (lessthanToday.length != 0) {
            lessthanToday.each(function () {
                $(this).rules('add', { CheckLessThanToday: this });
            });
        }
        var unique = elem.find('input.v-unique, select.v-unique');
        if (unique.length != 0) {
            $.validator.addMethod("checkUnique", function (input, element) {

                var uniquegroup = $(element).data('unique-group');
                var value = $(element).val();
                var valid = true;


                $('.' + uniquegroup).not(element).each(function () {
                    if ($(this).val() == value)
                        valid = false;
                });

                return valid;
            }, $(unique).first().data("unique-msg"));

            unique.each(function () {
                $(this).rules('add', { checkUnique: true });
            });
        }

        var emptyRecord = elem.find('input.v-emptyRecord');
        if (emptyRecord.length != 0) {

            $.validator.addMethod("emptyRecord", function (value, element) {

                return value.length == 0 ? true : false;


            }, VAL.EmptyRow);

            $(emptyRecord).rules('add', { emptyRecord: true });
        }

        var employeesCount = elem.find('input.v-employeesCount');
        if (employeesCount.length != 0) {

            $.validator.addMethod("checkEmployeesCount", function (value, element) {

                return parseInt(value) <= 10000;

            }, VAL.MaxEmployeesCount);

            employeesCount.each(function () {
                $(this).rules('add', { checkEmployeesCount: true });
            });
        }

        var emailValidationUrl = '@Url.Action("IsEmailAvailable", "Validation",new {area=""})';
        var emailV = elem.find('input.v-emailVerification');
        if (emailV.length != 0) {
            $.validator.addMethod("emailVerification", function (email, element) {
                var response = $.ajax({
                    type: "POST",
                    url: emailValidationUrl,
                    data: "{email:'" + email + "'}",
                    contentType: "application/json",
                    dataType: "json",
                    async: false
                }).responseText;
                return JSON.parse(response);
            }, VAL.EmailVerify);

            emailV.each(function () {
                $(this).rules('add', { emailVerification: $('input.v-emailVerification') });
            });
        }

        var emailV = elem.find('input.v-emailVerificationJury');
        if (emailV.length != 0) {
            $.validator.addMethod("emailVerificationJury", function (email, element) {
                var response = $.ajax({
                    type: "POST",
                    url: "ListCreate.aspx/IsEmailAvailable",
                    data: "{email:'" + email + "'}",
                    contentType: "application/json",
                    dataType: "json",
                    async: false
                }).responseText;
                return JSON.parse(response).d;
            }, VAL.EmailVerify);

            emailV.each(function () {
                $(this).rules('add', { emailVerificationJury: $('input.v-emailVerificationJury') });
            });
        }

        var uploader = elem.find('.RadAsyncUpload.v-required').children('input');
        if (uploader.length != 0) {
            $.validator.addMethod("checkUploader", function (value, element, params) {

                var upload = $find(params.parent('.RadAsyncUpload').attr('id'));
                return isNaN(upload.getUploadedFiles());

            }, VAL.Required);

            uploader.rules('add', { checkUploader: uploader });
        }

        var uploader = elem.find('.RadAsyncUpload.v-required-fileuploaded').children('input');
        if (uploader.length != 0) {
            $.validator.addMethod("checkuploadfiles", function (value, element, params) {

                var filesDiv = $('.' + $(element).parents('.v-required-fileuploaded').data('filesdivclass')).parent();
                if (filesDiv != null && filesDiv.find('input[type=hidden]') != null) {
                    var file = filesDiv.find('input[type=hidden]');
                    if (file.val() != "" && file.val() != null) {
                        return true;
                    }
                    else {
                        var upload = $find(params.parent('.RadAsyncUpload').attr('id'));
                        return isNaN(upload.getUploadedFiles());
                    }
                }
                else {
                    var upload = $find(params.parent('.RadAsyncUpload').attr('id'));
                    return isNaN(upload.getUploadedFiles());
                }
            }, VAL.Required);

            uploader.rules('add', { checkuploadfiles: uploader });
        }

        var profileuploader = elem.find('.v-required-profileimage').children('input');
        if (profileuploader.length != 0) {
            $.validator.addMethod("checkImage", function (value, element) {

                if ($(element).get(0).files.length === 0 && $(element).parent().find('img.valid-image').length == 0) {
                    return false;
                }
                else {
                    return true;
                }

            }, VAL.Required);
            profileuploader.each(function () {
                $(this).rules('add', { checkImage: $(this) });
            });
        }

        var profilepicturecropper = elem.find('.v-required-profilepicturecropper').children('input');
        if (profilepicturecropper.length != 0) {
            $.validator.addMethod("checkCroppedImage", function (value, element) {
                if (!$(element).parents('.profile-userpic').hasClass('v-required-profilepicturecropper'))
                    return true;

                if ($(element).parent().find('.name-file-required').val().length == 0 && $(element).parent().find('img.valid-image').length == 0) {
                    return false;
                }
                else {
                    return true;
                }

            }, VAL.Required);
            profilepicturecropper.each(function () {
                $(this).rules('add', { checkCroppedImage: $(this) });
            });
        }

        var passwordConfirm = elem.find('input.v-password-confirmation');
        if (passwordConfirm.length != 0) {
            $.validator.addMethod("passwordConfirm", function (input, element) {
                try {
                    var parent = $(element).parents('.validation');
                    var newPass = parent.find('.v-password');

                    ; if ($(element).val() === newPass.val()) {
                        return true;
                    } else {
                        return false;
                    }
                } catch (ex) {
                    return false;
                }
            }, VAL.Login_PasswordConfirmation);

            $('input.v-password-confirmation').each(function () {
                $(this).rules('add', { passwordConfirm: $('input.v-password-confirmation') });
            });
        }
        var English = elem.find('input.v-english, textarea.v-english');
        if (English.length != 0) {
            $.validator.addMethod("checkEnglish", function (input, element) {
                try {
                    if (input.match('[\u0600-\u06FF]') != null)
                        return false;
                    else
                        return true;
                } catch (ex) {
                    return false;
                }
            }, VAL.EnglishOnly);

            English.each(function () {
                $(this).rules('add', { checkEnglish: $(this) });
            });
        }
        var Arabic = elem.find('input.v-arabic, textarea.v-arabic');
        if (Arabic.length != 0) {
            $.validator.addMethod("checkArabic", function (input, element) {
                try {
                    if (input.length == 0) {
                        return true;
                    }
                    //CHECK FOR ARABIC
                    if (input.match('[\u0600-\u06FF]')) {
                        if (input.match('[A-Za-z]') != null) {
                            if ($(element).hasClass('v-strict-arabic'))// added to be able to disable English tolerance in arabic text
                                return false;

                            //FOUND ENGLISH CHARS
                            var length = input.replace(/\W/g, '').replace(/[0-9]/g, '').length;
                            if (length > 50) {
                                return false;
                            } else {
                                return true;
                            }
                        } else {
                            //NO ENGLISH CHARACTERS AT ALL
                            return true;
                        }
                    }
                    else {
                        return false;
                    }
                } catch (ex) {
                    return false;
                }
            }, function (params, element) {
                if ($(element).hasClass('v-strict-arabic'))
                    return VAL.ArabicIsRequired;
                else
                    return VAL.ArabicIsRequiredAndOnly50CharactersEnglish;
            });
            Arabic.each(function () {
                $(this).rules('add', { checkArabic: $(this) });
            });
        }
        var notEmptyOrSpace = elem.find('input.notEmptyOrSpace');
        if (notEmptyOrSpace.length != 0) {
            notEmptyOrSpace.each(function () {
                $(this).rules('add', { NotEmptyOrSpace: this });
            });
        }


        var imageacceptSize = elem.find('input.v-image-validator-size');
        if (imageacceptSize.length != 0) {
            $.validator.addMethod("acceptsize", function (value, element, params) {
                var maxFileSizeInJquery = $(element).attr("data-acceptSize") * 1000000;
                if ($(element).attr("type") === "file") {
                    // Check if the element has a FileList before checking each file
                    if (element.files && element.files.length) {
                        for (i = 0; i < element.files.length; i++) {
                            file = element.files[i];
                            if (file.size > maxFileSizeInJquery) {
                                return false;
                            }
                        }
                    }
                }
                return true;

            });
            $(imageacceptSize).each(function () {
                var message = VAL.ImageSizeNotSupported.replace('{{maxsize}}', $(this).attr("data-acceptSize"));
                $(this).rules('add', {
                    acceptsize: this,
                    messages: {
                        acceptsize: message,
                    }
                });
            });
        }
        // Accept a value from a file input based on a required mimetype



        $.validator.addMethod("accept", function (value, element, params) {
            var param = params;
            var typeParam = typeof param === "string" ? param.replace(/\s/g, "").replace(/,/g, "|") : "image/*",
                optionalValue = this.optional(element),
                i, file;
            // Element is optional
            if (optionalValue) {
                return optionalValue;
            }
            if ($(element).attr("type") === "file") {
                // If we are using a wildcard, make it regex friendly
                typeParam = typeParam.replace(/\*/g, ".*");
                // Check if the element has a FileList before checking each file
                if (element.files && element.files.length) {
                    for (i = 0; i < element.files.length; i++) {
                        file = element.files[i];
                        var type = file.type;
                        var fileName = file.name;
                        var extension = fileName.substr(fileName.lastIndexOf('.'));
                        if (extension.length > 0) {
                            type = getFileType(extension);
                            if (type.length === 0) {
                                type = extension;
                            }
                        }
                        // Grab the mimetype from the loaded file, verify it matches
                        if (type !== "image/svg+xml" && typeParam.includes("image/svg+xml")) {
                            if (!type.match(new RegExp("\\.?(" + typeParam + ")$", "i"))) {
                                return false;
                            }
                        }
                        else {
                            if (!typeParam.includes(type)) {
                                return false;
                            }
                        }
                    }
                }
            }

            // Either return true because we've validated each file, or because the
            // browser does not support element.files and the FileList feature
            return true;

        }, customFormater);
        //}, jQuery.validator.format("Please enter the correct value for {0}"));

        function customFormater(params) {

            return VAL.FileExtensionNotSupported.replace('{{fileExtensions}}', $('[accept="' + params + '"]').attr('data-extension'));

        }

        var decimalPoints = elem.find('input.v-decimalPoints');
        if (decimalPoints.length != 0) {
            //range 0-> 100, decimals 3 points
            $.validator.addMethod("decimalPointsCheck", function (val, element) {
                var val = $(element).val();
                return val.match(/(?=^\s*(?=.*[0-9])\d*(?:\.\d{1,3})?\s*$)/);

            }, VAL.NumberMaxDecimalPoints);

            $(decimalPoints).each(function () {
                $(this).rules('add', { decimalPointsCheck: $(this) });
            });


        }
        var maxWordCountTextArea = elem.find('textarea.wordCount');
        if (maxWordCountTextArea.length != 0) {
            //range 0-> 100, decimals 3 points
            $.validator.addMethod("wordCountcheck", function (val, element) {
                var maxwordCount = parseInt($(element).attr('data-maxwordcount'));
                var currentwordCount = parseInt($(element).attr('data-currentwordcount'));
                return maxwordCount >= currentwordCount;

            }, ''); // there is a [word count card] will display message

            $(maxWordCountTextArea).each(function () {
                $(this).rules('add', { wordCountcheck: $(this) });
            });
        }
        var editor = elem.find('input.v-pc');
        if (editor.length != 0) {
            var password = editor.val();
            var passwordComplexityMsg = "";
            var username = editor.attr('data-Email');

            if (!password.match(/(?=^.{8,}$).*$/)) {

                passwordComplexityMsg = '<li>' + VAL.PCLength + '</li>';
            }

            if (!password.match(/(?=.*\d).*$/)) {
                if (passwordComplexityMsg == null || passwordComplexityMsg == '')
                    passwordComplexityMsg = '<li>' + VAL.PCNumbers + '</li>';

                else
                    passwordComplexityMsg = passwordComplexityMsg + '<br/><li>' + VAL.PCNumbers + '</li>';

            }
            if (!password.match(/(?=.*[A-Z]).*$/)) {
                if (passwordComplexityMsg == null || passwordComplexityMsg == '')
                    passwordComplexityMsg = '<li>' + VAL.PCUppercase + '</li>';
                else
                    passwordComplexityMsg = passwordComplexityMsg + '<br/><li>' + VAL.PCUppercase + '</li>';
            }
            if (!password.match(/(?=.*[a-z]).*$/)) {
                if (passwordComplexityMsg == null || passwordComplexityMsg == '') {
                    passwordComplexityMsg = '<li>' + VAL.PCLowercase + '</li>';

                } else
                    passwordComplexityMsg = passwordComplexityMsg + '<br/><li>' + VAL.PCLowercase + '</li>';
            }

            if (!password.match(/(?=.*[@@#$%_^&+=]).*$/)) {
                if (passwordComplexityMsg == null || passwordComplexityMsg == '') {
                    passwordComplexityMsg = '<li>' + VAL.PCMustAtleastHaveOneSpecialChar + '</li>';

                } else
                    passwordComplexityMsg = passwordComplexityMsg + '<br/><li>' + VAL.PCMustAtleastHaveOneSpecialChar + '</li>';
            }

            if ((password.toLowerCase().indexOf(username.toLowerCase()) >= 0)) {

                if (passwordComplexityMsg == null || passwordComplexityMsg == '') {
                    passwordComplexityMsg = '<li>' + VAL.PasswordContainsUNAME + '</li>';

                } else
                    passwordComplexityMsg = passwordComplexityMsg + '<br/><li>' + VAL.PasswordContainsUNAME + '</li>';
            }


            $.validator.addMethod("passwordComplexity", function (password, element) {
                var email = $(element).attr('data-Email');

                return password.match(/(?=^.{8,}$)(?=.*\d)(?![.\n])(?=.*[@@#_$%^&+=])(?=.*[A-Z])(?=.*[a-z]).*$/) && !(password.toLowerCase().indexOf(email.toLowerCase()) >= 0);

            }, passwordComplexityMsg);

            editor.each(function () {
                $(this).rules('add', { passwordComplexity: $('input.v-pc') });
            });

        }
        var tagsInputWithDivRequired = elem.find('.auto-complete-with-tags-input').parent().find('.validationClass');
        if (tagsInputWithDivRequired.length != 0) {
            $.validator.addMethod("validateAutoCompleteWithTagsInputRequired", function (value, element, params) {
                var hidden = $(element).parent().parent().find('.hidden-class');
                if (hidden.children().length == 0)
                    return false;

                else return true;
            }, VAL.TagsRequired);
            tagsInputWithDivRequired.each(function () {

                $(this).rules('add', { validateAutoCompleteWithTagsInputRequired: $(this) });
            });
        }

        // validate date inputs are logical, exmple: reject 31 feb 
        var validDates = elem.find('.pv-dropdowndatepicker.dddp-DMY').find('.date-value').find('input');
        if (validDates.length != 0) {
            $.validator.addMethod("dropdownDatePickerValidDate", function (value, element, params) {
                var value = $(element).val();
                if (!value)
                    return true;

                var arr = value.split('-');
                if (arr.length != 3)
                    return true;

                var day = parseInt(arr[0]);
                var month = parseInt(arr[1]) - 1;// Remember that the month is 0-based so February is actually 1...
                var year = parseInt(arr[2]);
                var d = new Date(year, month, day);
                if (d.getFullYear() == year && d.getMonth() == month && d.getDate() == day) {
                    return true;
                }
                return false;
            }, VAL.Date);

            validDates.each(function () {
                $(this).rules('add', { dropdownDatePickerValidDate: $(this) });
            });
        }
    }
}
$(document).ready(function () {
    $.validator.methods.URL = function (value, element, param) {
        var reg = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        return re.test(value);
    }

    //sortBulletLabes();
    //sortMultilineLabes();
    //InitializeMask();
    try {
        initWordCount();
        initAutoSize();

    } catch (e) {

    }

});
function initAutoSize() {
    var items = $('textarea');
    autosize(items);
    setTimeout(function () { autosize.update(items) }, 1500);
}

function initWordCount() {
    $('body').on("keydown paste change", '.wordCount[data-maxwordcount]', function (e, salutation, name) {
        var that = this;
        setTimeout(function () {
            var cleanText = $.trim($(that).val().replace(/•/g, ''));
            var wordsCount = cleanText.split(/\s+/).length;

            if (!/\S/.test(cleanText)) {
                wordsCount = 0;
            }

            //console.log(cleanText);


            var maxWordsCount = $(that).attr('data-maxwordcount');

            var text = $.trim($(that).val());
            //var bulletCount = (text.match(/\s+•\s+/g) || []).length + 1;
            //var dummyBullet = (text.match(/•\s+•/g) || []).length + 1;

            //bulletCount = bulletCount - dummyBullet;

            var trimCounter = 0;
            var isSpecialInput = $(that).hasClass('bullet-text');

            var bulletMargin = -1;
            if (isSpecialInput) {
                bulletMargin = 0;
            }

            if (wordsCount - bulletMargin > maxWordsCount) {
                for (var i = 0; i < text.length; i++) {
                    var ch = text[i];

                    if ($.trim(ch) == '') {
                        trimCounter++;

                        for (var j = i + 1; j < text.length; j++) {
                            var nextChar = text[j];
                            if ($.trim(nextChar) != '' && nextChar != "•") {
                                i = j;
                                break;
                            }
                        }

                    }

                    if (trimCounter - bulletMargin > maxWordsCount) {
                        that.value = text.substring(0, i);
                        e.preventDefault();
                        break;

                    }
                }

            }


        }, 50);

    });
    $('body').on("keyup", '.wordCount[data-maxwordcount]', function (event, salutation, name) {
        var cleanText = $.trim($(this).val().replace(/•/g, ''));

        var wordsCount = cleanText.split(/\s+/).length;

        if (!/\S/.test(cleanText)) {
            wordsCount = 0;
        }

        var maxWordsCount = $(this).attr('data-maxwordcount');
        // var remaining = parseInt(maxWordsCount) - parseInt(wordsCount);

        var span = $(this).parent().parent().find('.word-counter');

        var validationMessage = "";
        if (wordsCount == maxWordsCount) {
            validationMessage = wordsCount + " / " + maxWordsCount + " " + VAL["MaxWordCount"];
        } else {
            validationMessage = wordsCount + " / " + maxWordsCount;
        }

        span.text(validationMessage);
        //console.log(maxWordsCount, wordsCount);
        if (wordsCount >= maxWordsCount) {
            span.removeClass('label-success');
            span.removeClass('kt-badge--success');
            span.addClass('kt-badge--danger');
            span.addClass('label-danger');
        }
        else if (span.hasClass('label-danger')) {
            span.removeClass('label-danger');
            span.removeClass('kt-badge--danger');
            span.addClass('kt-badge--success');
            span.addClass('label-success');
        }

        $(this).parent().parent().find('.word-counter').show();

    });
    $('body').on("focus", '.wordCount[data-maxwordcount]', function (event, salutation, name) {
        var cleanText = $.trim($(this).val().replace(/•/g, ''));

        var wordsCount = cleanText.split(/\s+/).length;

        if (!/\S/.test(cleanText)) {
            wordsCount = 0;
        }

        var maxWordsCount = $(this).attr('data-maxwordcount');
        // var remaining = parseInt(maxWordsCount) - parseInt(wordsCount);

        var span = $(this).parent().parent().find('.word-counter');

        var validationMessage = "";
        if (wordsCount == maxWordsCount) {
            validationMessage = wordsCount + " / " + maxWordsCount + " " + VAL["MaxWordCount"];
        } else {
            validationMessage = wordsCount + " / " + maxWordsCount;
        }

        span.text(validationMessage);
        if (wordsCount >= maxWordsCount) {
            span.removeClass('label-success');
            span.removeClass('kt-badge--success');
            span.addClass('kt-badge--danger');
            span.addClass('label-danger');
        }
        else if (span.hasClass('label-danger')) {
            span.removeClass('label-danger');
            span.removeClass('kt-badge--danger');
            span.addClass('kt-badge--success');
            span.addClass('label-success');
        }

        $(this).parent().parent().find('.word-counter').show();
    });
    $('body').on("blur", '.wordCount[data-maxwordcount]', function (event, salutation, name) {
        $(this).parent().parent().find('.word-counter').hide();
    });
    // Autosize


}
function sortBulletLabes() {
    var toReplace = /\n/g;
    var toBeReplaced = '<br>';
    $('label.bullet-text').each(function () { $(this).html($(this).html().replace(toReplace, toBeReplaced)); });
}
function sortMultilineLabes() {
    var toReplace = /\n/g;
    var toBeReplaced = '<br>';
    $('.pv-multilingual-label .label').each(function () { $(this).html($(this).html().replace(toReplace, toBeReplaced)); });
    $('.pv-label .label').each(function () { $(this).html($(this).html().replace(toReplace, toBeReplaced)); });
}

var InitializeMask = function () {
    if (!$().inputmask) {
        return;
    }

    ////$('.v-officePhone').inputmask("99-9999-999");
    //$('.v-phone').inputmask("999-9999-999");
    $('.eID').inputmask("999-9999-9999999-9");

}

function errorFunc(error) {
    console.log(error.error());
}
function BeginAjaxModal() {
    $.blockUI();
    $('.modal').modal('hide');
}

