var Bnsights = {
    isEnglish: $('html').attr('lang') == 'en',
    isArabic: $('html').attr('lang') == 'ar',
    DisableAjaxBlockUIOnce: false,
    DisableAjaxErrorHandling: false,
    DisablePagingUpdate: false,
    LangMode: $('[name="BBSF_App_LangMode"]').val(),
    Helper: {
        Mobilecheck: function () {
            var check = false;
            (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
            return check;
        },
        Compare: function (post, operator, value) {
            switch (operator) {
                case '>': return post > value;
                case '<': return post < value;
                case '>=': return post >= value;
                case '<=': return post <= value;
                case '==': return post == value;
                case '!=': return post != value;
                case '===': return post === value;
                case '!==': return post !== value;
            }
        },
        setItemWidth: function (autoNav, autoNavMore) {
            var $autoNav = autoNav;
            var $autoNavMore = autoNavMore;
            if ($(window).width() >= 1025) {
                $autoNav.children().each(function (i, elem) {
                    $(elem).attr("baseWidth", $(elem).outerWidth());
                });
            } else {
                $autoNav.children().each(function (i, elem) {
                    $(elem).attr("baseWidth", $(elem).find('.menuName').outerWidth() + 30);
                });
                $autoNavMore.attr("baseWidth", 0);
            }

        },
        LoadAsyncTab: function (tabElem) {
            var url = $(tabElem).data("url");
            if (url) {
                var panelBody = $($(tabElem).find('.nav-link').attr('href'));
                var elem = $(tabElem);
                $.get(url, function (result, status) {
                    if (result.val)
                        panelBody.html(result.val);
                    else
                        panelBody.html(result);
                    Bnsights.MainModule.reinitialize(panelBody);

                    $(elem).data("loaded", true);
                });
            }
        },
        RemoveAllRules: function (container) {
            $(container).find('input, select, textarea').each(function () {
                try {
                    var currentrules = $(this).rules();
                    var currentelem = $(this);
                    var RemovedClasses = "";
                    $.each(currentrules, function (index, rule) {
                        for (var i = 0; i < Formdict.length; i++) {
                            if (Formdict[i].key == index) {
                                var className = Formdict[i].value;
                                $(currentelem).removeClass(className);
                                $(currentelem).rules('remove', index);
                                RemovedClasses += className + ",";
                            }
                            //break;
                        }

                    });
                    $(currentelem).data("removedClasses", RemovedClasses);

                } catch (e) {
                    console.log('Could not remove rules from : ' + $(this).attr('id'));
                }
            });
        },
        AddRules: function (container, classCommaSeparated) {
            var classes = classCommaSeparated.split(',');
            $(container).find('input, select, textarea').not('.file-fake-input').each(function () {
                try {
                    var currentelem = $(this);
                    jQuery.each(classes, function (i, val) {
                        for (var i = 0; i < Formdict.length; i++) {
                            if (Formdict[i].value == val) {
                                var rulename = Formdict[i].key;
                                if (val == "v-notGreaterToday" || val == "v-notLessThanToday") {
                                    if (!$(currentelem).parent().hasClass("bs-searchbox") && $(currentelem).is('input')) {
                                        $(currentelem).addClass(val);
                                        $(currentelem).rules('add', rulename);
                                    }
                                }
                                else if (!$(currentelem).hasClass("hidden") && !$(currentelem).parent().hasClass("bs-searchbox")) {
                                    $(currentelem).addClass(val);
                                    $(currentelem).rules('add', rulename);
                                }

                            }

                        }

                    });

                } catch (e) {
                    console.log('Could not add rules from : ' + $(this).attr('id'));
                }
            });
        },
        RemoveRules: function (container, classCommaSeparated) {
            var classes = classCommaSeparated.split(',');

            $(container).find('input, select, textarea').each(function () {
                try {
                    var currentelem = $(this);
                    jQuery.each(classes, function (i, val) {
                        for (var i = 0; i < Formdict.length; i++) {
                            if (Formdict[i].value == val && $(currentelem).hasClass(val)) {
                                var rulename = Formdict[i].key;
                                $(currentelem).removeClass(val);
                                $(currentelem).rules('remove', rulename);
                            }

                        }

                    });

                } catch (e) {
                    console.log('Could not remove rules from : ' + $(this).attr('id'));
                }
            });
        },
        ReAddAllRules: function (container) {
            $(container).find('input, select, textarea').not('.file-fake-input').each(function () {
                try {
                    var classes = $(this).data("removedClasses").split(',');
                    var currentelem = $(this);
                    jQuery.each(classes, function (i, val) {
                        for (var i = 0; i < Formdict.length; i++) {
                            if (Formdict[i].value == val) {
                                var rulename = Formdict[i].key;
                                if (!$(currentelem).hasClass("hidden") && !$(currentelem).parent().hasClass("bs-searchbox")) {
                                    $(currentelem).addClass(val);
                                    $(currentelem).rules('add', rulename);
                                }
                            }

                        }

                    });

                } catch (e) {
                    console.log('Could not add rules from : ' + $(this).attr('id'));
                }
            });
        },
        refreshCalendar: function (calendarselector) {
            $(calendarselector).fullCalendar("refetchEvents");
        },
        //ToBeCalled EX: Bnsights.Helper.copyTextToClipboard("#ID" / ".class")
        copyTextToClipboard: function (input) {
            $(input).focus();
            $(input).select();
            document.execCommand('copy');
        },
        trimTextInput: function (emailInput) {
            emailInput.value = emailInput.value.replace(/(^\s*)|(\s*$)/gi, ""). // removes leading and trailing spaces
                replace(/[ ]{2,}/gi, " ").       // replaces multiple spaces with one space
                replace(/\n +/, "\n");           // Removes spaces after newlines
        },
        SelectAllSwitcheryInTable: function (updatedValue, tableSelector) {
            var table = $(tableSelector);
            table.find(".switchery").each(function () {
                if (updatedValue != $(this).prev().is(":checked"))
                    this.click();
            });
        },
        GetDropdownSelectedItems: function (dropdown) {
            var items = [];
            dropdown.find("option").each(function () {
                var option = $(this);
                if (option.is(":selected"))
                    items.push(option.val());
            });
            return items;
        },
        RemoveRequiredRules: function (container) {
            $(container).find('input, select, textarea').each(function () {
                try {
                    if ($(this).hasClass('v-eid')) {
                        $(this).removeClass('v-required-eid');
                        $(this).rules('remove', 'checkEID');
                        $(this).rules('remove', 'checkEIDFormat');
                    }
                    $(this).removeClass('v-required');
                    $(this).rules('remove', 'checkInputRequiredFunction');
                } catch (e) {
                    console.log('Could not remove rules from : ' + $(this).attr('id'));
                }
            });

            $(container).find('.pv-control.pv-profileimageupload').each(function () {
                $(this).find('.input-form-group.profile-userpic').each(function () {
                    $(this).removeClass('v-required-profilepicturecropper');
                });
            });
        },
        GetQueryUrlParameter: function (sParam) {
            var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                }
            }
        },
        AddRequiredRules: function (container) {

            $(container).find('input, select, textarea').not('.file-fake-input,.v-hidden').each(function () {
                try {
                    if ($(this).hasClass("fileSelector")) {
                        var parent = $(this).parents('.fileUploadParent');
                        var fileContainer = $(parent).find('.fileInfoContainer');
                        if ($(fileContainer).css('display') != 'none') { // if the file exist then add attribute (data-input-required) and on remove file will check if it contains this attribute then remove it , add required and validate div 
                            $(this).attr('data-input-required', 'true');
                        }
                        else {
                            $(this).addClass('v-required');
                            $(this).rules('add', 'checkInputRequiredFunction');
                        }
                    }
                    if (!$(this).hasClass("sizeMB") && !$(this).hasClass("hidden") && !$(this).is('[readonly]') && !$(this).hasClass("fileSelector") && !$(this).hasClass("tt-hint") && !$(this).hasClass("tt-input") && !$(this).parent().hasClass("bs-searchbox") && !($(this).attr('type') == "hidden" && $(this).parent().hasClass("intl-tel-input"))) {
                        $(this).addClass('v-required');
                        $(this).rules('add', 'checkInputRequiredFunction');
                    }
                    if ($(this).hasClass("v-eid")) {
                        $(this).addClass('v-required-eid');
                        $(this).rules('add', 'checkEID');
                        $(this).rules('add', 'checkEIDFormat');
                    }
                } catch (e) {
                    console.log('Could not add rules from : ' + $(this).attr('id'));
                }
            });
            $(container).find('.pv-control.pv-profileimageupload').each(function () {
                $(this).find('.input-form-group.profile-userpic').each(function () {
                    $(this).addClass('v-required-profilepicturecropper');
                });
            });
        },
        AdapteNumber: function (repeater, bindingName) {
            for (var i = 0; i < repeater.length; i++) {
                var $item = $(repeater[i]);

                var selectedItems = $item.find("[name*='[']");

                for (var j = 0; j < selectedItems.length; j++) {
                    var $localItem = $(selectedItems[j]);

                    var name = $localItem.attr('name');
                    var id = $localItem.attr('id');
                    if (bindingName) {
                        var regx = new RegExp(bindingName + '\\[.*?\\]\\s?')
                        name = name.replace(regx, bindingName + '[' + i + ']');
                    }
                    else {
                        name = name.replace(/\[.*?\]\s?/g, '[' + i + ']');
                    }
                    if (id) {
                        id = id.substr(id.indexOf('_') + 1);
                        id = id + i.toString();
                    } else {
                        id = name;
                    }
                    if ($localItem.is(':checkbox')) {
                        $localItem.parent().attr('for', id);
                    }
                    $localItem.attr('name', name);
                    $localItem.attr('id', id);
                    $localItem.attr('aria-describedby', id + '-error');


                    try {
                        var requireFromGroup = $localItem.attr('data-require-group');
                        if (requireFromGroup) {

                            requireFromGroup = requireFromGroup + i.toString();
                            if ($localItem.attr('class').indexOf("grp") == -1) {
                                $localItem.attr('data-require-group', requireFromGroup);
                                $localItem.addClass(requireFromGroup);
                            }

                        }



                    } catch (e) {
                        console.log(e);
                    }


                }
            }
        },
        IsValidDate: function (str) {
            var d = moment(str, 'D-M-YYYY');
            if (d == null || !d.isValid()) return false;
            return str.indexOf(d.format('D-M-YYYY')) >= 0
                || str.indexOf(d.format('DD-MM-YYYY')) >= 0
                || str.indexOf(d.format('D-M-YY')) >= 0
                || str.indexOf(d.format('DD-MM-YY')) >= 0;
        },
        ClearControls: function (divID) {
            var elements = $('#' + divID).children();
            var validationErrors = $('#' + divID).find('.help-block-error');
            $(validationErrors).each(function () {
                $(this).hide();
            });
            var serverSideValidation = $(elements).find('.alert-InvalidValidation');
            if (serverSideValidation) {
                $(serverSideValidation).hide();
            }
            // Clear  Stuff
            $(elements).find('.input-icon').each(function () {
                $(this).children('i').removeClass('fa-warning').removeClass('fa-check');
            });
            elements.find('.is-invalid,.has-success').removeClass('is-invalid').removeClass('has-success');
            elements.find('.toggle-lang').each(function () {
                $(this).popover('destroy');
            });
            elements.find('.bootstrap-tagsinput').each(function () {
                $(this).find("span.label-info").remove();
                $(this).find(".tt-input").attr("placeholder", $(this).find(".tt-input").attr("data-oldplaceholder"));
                $(this).next().tagsinput('removeAll');

            })
            elements.find('input.form-control, textarea.form-control').each(function () {
                $(this).val('').removeClass('edited');
                if ($(this).hasClass('v-eid')) {
                    // $(this).formatter().resetPattern();
                }
            });
            elements.find('input[type=file]').each(function () {
                if (/MSIE/.test(navigator.userAgent)) {
                    $(this).replaceWith($(this).clone(true));
                } else {
                    $(this).val('');
                }
                $(this).parents('.fileUploadParent').find('.fileInfoContainer').hide().removeClass("d-table");
                $(this).parents('.fileUploadParent').find('input.isFileRemoved').val("true");
                var parentdiv = $(this).parents('.fileinput');
                parentdiv.find('img').attr('src', '/Assets/no-img.png');
            });
            elements.find('select.form-control').each(function () {
                var firstOption = $(this).find('option').first();
                if (firstOption && (firstOption.attr('value') == null || firstOption.attr('value') == ''))
                    $(this).prop('selectedIndex', 0).removeClass('edited');
            });

            // Telerik Async FileUpload
            elements.find('.RadAsyncUpload.RadUpload').each(function () {
                var control = $find($(this).attr('id'));
                if (control._uploadedFiles != undefined && control._uploadedFiles.length > 0) {
                    Array.removeAt(control._uploadedFiles, 0);
                    control.deleteFileInputAt(0);
                    control.updateClientState();
                }
            });
            elements.find('.bootstrap-select select').each(function () {
                $(this).find('option').removeAttr('selected');
                $(this).find('option:first-child').attr("selected", "selected");
                $(this).selectpicker('refresh');
            });

            // Clear Table Logic
            elements.find('.repeater-dgep-create tbody').each(function () {
                $(this).html('');
            });
            // Clear Bootstrap Select
            elements.find('select[data-plugin=selectpicker]').each(function () {
                $(this).selectpicker('deselectAll');
            });
            // clear dropdown datepickers
            $('#' + divID).find('.pv-dropdowndatepicker').each(function () {
                $(this).find('select').each(function () {
                    $(this).selectpicker('refresh');
                });
                $(this).find('input').each(function () {
                    $(this).val('');
                });
            });

            $(elements).find('.fileUploadParent').each(function () {
                $(this).find('.fileInfoContainer').hide().removeClass("d-table");
                $(this).find('.btn-primary').show();
                $(this).find('.input-group-file').show();
            });
            //ClearMultipleFileUpload
            $(elements).find('.pv-multiplefileupload').each(function () {
                var correlationID = Bnsights.Helper.GenerateGuid();
                $(this).attr('data-controlid', correlationID);
                $(this).find('.filesListing').html('');
                //RemovedFiles JSON CorrelationID_GUID maxSizeExceeded
                $(this).find('#RemovedFiles').val('');
                $(this).find('#JSON').val('');
                $(this).find('#CorrelationID_GUID').val(correlationID);
                $(this).find('#maxSizeExceeded').html('');
                $(this).find('.fileSelector').attr('data-correlationid', correlationID);
            });
            elements.find('.bootstrap-tagsinput').each(function () {
                $(this).find("span.label-info").remove();
                $(this).find(".tt-input").attr("placeholder", $(this).find(".tt-input").attr("data-oldplaceholder"));
            })
            elements.find('.toggleSwitch').each(function () {
                $(this).prop('checked', false);
            });

            if (!$().datepicker || !$().selectpicker) {
                return;
            }

        },
        BlockUI: function () {
            if (!Bnsights.DisableAjaxBlockUIOnce) {
                $.blockUI({
                    css: {
                        border: 'none',
                        padding: '5px',
                        backgroundColor: '#fff',
                        '-webkit-border-radius': '5px',
                        '-moz-border-radius': '5px',
                        opacity: 1,
                        color: 'rgba(0,0,0,0.4)',
                        width: 200,
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)'
                    },
                    message: '<span style=" margin-top: 3px;  padding: 0;display:block;">' + (typeof VAL === 'undefined' ? "" : VAL.PleaseWait + " ...") + ' </span> <img src="/Assets/Bnsights/images/rolling-loading.gif" style="width:24px; height: 24px; margin-right: 15px;" />',
                    baseZ: 11100
                });
            }
            else {
                Bnsights.DisableAjaxBlockUIOnce = false;
            }
        },
        BlockUIContainer: function (container) {

            $(container).block({
                css: {
                    border: 'none',
                    padding: '5px',
                    backgroundColor: '#fff',
                    '-webkit-border-radius': '5px',
                    '-moz-border-radius': '5px',
                    opacity: 1,
                    color: 'rgba(0,0,0,0.4)',
                    maxWidth: 250,
                    transform: 'translate(-50%, -50%)'
                },
                message: '<span style=" margin-top: 3px; padding: 0;display:block;">' + VAL.PleaseWait + ' ... </span> <img src="/Assets/Bnsights/images/rolling-loading.gif" style="width:24px; height: 24px; margin-right: 15px;" />',
                baseZ: 'auto'
            });
            $(container).find(".blockOverlay").addClass("blockUIContainerBgColor");

        },
        UnBlockUI: function (container) {
            if (!container) {
                if ($.unblockUI !== undefined)
                    $.unblockUI();
            }
            else {
                $(container).unblock();
            }
        },
        ToastrSide: function () {
            toastr.options = {
                "closeButton": false,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-top-full-width",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            };

        },
        NotifySuccess: function (msg) {
            Bnsights.Helper.ToastrSide();
            if (!msg) {
                if (Bnsights.isEnglish) {
                    msg = "Saved successfully";
                }
                else {
                    msg = "تم الحفظ بنجاح";
                }

            }
            toastr.success(msg);
        },
        NotifyError: function (msg) {
            console.log(Bnsights.Helper.NotifyError.caller);
            Bnsights.Helper.ToastrSide();
            if (!msg) {
                if (Bnsights.isEnglish) {
                    msg = "An unexpected error has occured.";
                }
                else {
                    msg = "لقد حدث خطأ غير متوقع";
                }
            }
            toastr.error(msg);
        },
        NotifyWarning: function (msg) {
            console.log(Bnsights.Helper.NotifyError.caller);
            Bnsights.Helper.ToastrSide();
            if (!msg) {
                if (Bnsights.isEnglish) {
                    msg = "You have one warning.";
                }
                else {
                    msg = "لديك تحذير";
                }
            }
            toastr.warning(msg);

        },
        ToggleResourceEditor: function () {
            var height = window.screen.availHeight;
            var width = window.screen.availWidth;
            Bnsights.toggleEditMode = !Bnsights.toggleEditMode;
            if (Bnsights.toggleEditMode)
                ww.resourceEditor.showResourceIcons({
                    adminUrl: "/Localizations/EditSingle/",
                    editorWindowOpenOptions: "height=" + height + ",width=" + width + ",top=0,left=0"
                });
            else
                ww.resourceEditor.removeResourceIcons();
        },
        GenerateGuid: function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },
        ValidateByContainer: function (container) {
            return ValidateContainer(container);
        },
    },
    ControlsHelper:
    {
        ImageCropper:
        {
            OpenCropper: function (selec) {
                $(selec).parents('.pv-imageCropperUpload').find('.fileCropperhidden').click();//inputimageclick
                Bnsights.ControlsHelper.ImageCropper.initImageCropper(selec);
                return false;
            },
            initImageCropper: function (selec) {
                var parentSelector = $(selec).parents('.pv-imageCropperUpload');
                var AspectRatio = $(parentSelector).data('aspectratio');
                var ControlId = $(parentSelector).data('controlid');
                var minCroppedWidth = parseFloat($(parentSelector).data('canvaswidth'));
                var minCroppedHeight = parseFloat($(parentSelector).data('canvasheight'));
                $("#imageCropper_" + ControlId + " img").cropper({
                    preview: "#imageCropperPreview_" + ControlId + " > .img-preview",
                    responsive: true,
                    cropBoxMovable: true,
                    cropBoxResizable: false,
                    dragMode: 'move',
                    viewMode: 0,
                    ready: function () {

                        $("#imageCropper_" + ControlId + " img.cropper_img.cropper-hidden").cropper('setCropBoxData', { width: minCroppedWidth, height: minCroppedHeight });
                    },
                });
            },
        },
        MenuLayout: {
            autoNavMore: function (mainMenu, autoNav, autoNavMore, autoNavMoreList) {
                var childNumber = 2;
                console.log('Executing AutoNav More function');
                if ($(window).width() >= 1025) { // Mobile check
                    // GET MENU AND NAV WIDTH
                    var $menuWidth = mainMenu.outerWidth();          // Window Container Width
                    var $autoNavWidth = 0;        // Current Menu Width
                    autoNav.children().each(function (i, elem) {
                        $autoNavWidth += parseInt($(elem).attr('baseWidth'));
                    });

                    if ($autoNavWidth > $menuWidth) {
                        // CODE FIRES WHEN WINDOW SIZE GOES DOWN
                        var elem = autoNav.children('li:nth-last-child(' + childNumber + ')');
                        elem.attr('itemmenuwidth', elem.outerWidth());
                        autoNav.children('li:nth-last-child(' + childNumber + ')').prependTo(autoNavMoreList);
                        autoNav.attr("data-width", $autoNavWidth);
                        Bnsights.ControlsHelper.MenuLayout.autoNavMore(mainMenu, autoNav, autoNavMore, autoNavMoreList);
                    } else {
                        // CODE FIRES WHEN WINDOW SIZE GOES UP
                        var $autoNavMoreFirst = parseInt(autoNavMoreList.children("li:first-child").attr('itemmenuwidth'));
                        // CHECK IF ITEM HAS ENOUGH SPACE TO PLACE IN MENU                       
                        if ($autoNavWidth + $autoNavMoreFirst < $menuWidth && $autoNavMoreFirst > 0) {
                            autoNavMoreList.children("li:first-child").insertBefore(autoNavMore);
                            Bnsights.ControlsHelper.MenuLayout.autoNavMore(mainMenu, autoNav, autoNavMore, autoNavMoreList);
                        }
                    }
                    if (autoNavMoreList.children().length > 0) {
                        autoNavMore.show();
                        childNumber = 2;
                    } else {
                        autoNavMore.hide();
                        childNumber = 1;
                    }
                }
            }
        }
    },
    MainModule: function () {
        var InitializeLangMode = function (elem) {
            var LangMode = Bnsights.LangMode;

            if (LangMode && LangMode != "") {
                //var englishFields = $(elem).find('div[class*="-en"]');
                //var arabicFields = $(elem).find('div[class*="-ar"]');

                var englishFields = $(elem).find('.multilingual-textbox-en,.multilingual-Editor-en,.multilingual-textarea-en');
                var arabicFields = $(elem).find('.multilingual-textbox-ar,.multilingual-Editor-ar,.multilingual-textarea-ar');

                if (LangMode == "33001") {
                    $(arabicFields).each(function () {
                        $(this).find(".ar-value").removeClass("v-required");
                        $(this).attr("hidden", true);
                    });
                    $(englishFields).each(function () {
                        if ($(this).find(".en-value").hasClass("config-required")) {
                            $(this).find(".en-value").addClass("v-required");
                        }
                    });
                }
                else if (LangMode == "33002") {
                    $(arabicFields).each(function () {
                        if ($(this).find(".ar-value").hasClass("config-required")) {
                            $(this).find(".ar-value").addClass("v-required");
                        }
                    });
                    $(englishFields).each(function () {
                        $(this).find(".en-value").removeClass("v-required");
                        $(this).attr("hidden", true);
                    });
                }
                else if (LangMode == '33003') {
                    $(englishFields).each(function () {
                        if ($(this).find(".en-value").hasClass("config-required")) {
                            $(this).find(".en-value").addClass("v-required");
                        }
                    });
                    $(arabicFields).each(function () {
                        $(this).find(".ar-value").removeClass("v-required");
                        $(this).find(".required").remove();

                    });

                }
                else if (LangMode == '33004') {
                    $(englishFields).each(function () {
                        $(this).find(".en-value").removeClass("v-required");
                        $(this).find(".required").remove();

                    });
                    $(arabicFields).each(function () {
                        if ($(this).find(".ar-value").hasClass("config-required")) {
                            $(this).find(".ar-value").addClass("v-required");
                        }
                    });

                }
                else if (LangMode == '33005') {

                    if (Bnsights.isArabic) {
                        $(arabicFields).each(function () {
                            if ($(this).find(".ar-value").hasClass("config-required")) {
                                $(this).find(".ar-value").addClass("v-required");
                            }
                        });
                        $(englishFields).each(function () {
                            $(this).remove();
                        });
                    }
                    else {
                        $(englishFields).each(function () {
                            if ($(this).find(".en-value").hasClass("config-required")) {
                                $(this).find(".en-value").addClass("v-required");
                            }
                        });
                        $(arabicFields).each(function () {
                            $(this).remove();
                        });

                    }
                }

                else if (LangMode == '33006') {
                    $(englishFields).each(function () {
                        if ($(this).find(".en-value").hasClass("config-required")) {
                            $(this).find(".en-value").addClass("v-required");
                        }
                    });
                    $(arabicFields).each(function () {
                        if ($(this).find(".ar-value").hasClass("config-required")) {
                            $(this).find(".ar-value").addClass("v-required");
                        }
                    });
                }
                else {

                    if (Bnsights.isArabic) {
                        $(arabicFields).each(function () {
                            if ($(this).find(".ar-value").hasClass("config-required")) {
                                $(this).find(".ar-value").addClass("v-required");
                            }
                        });
                        $(englishFields).each(function () {
                            if ($(this).find(".en-value").hasClass("config-required")) {
                                $(this).find(".en-value").removeClass("v-required");
                                $(this).find(".required").remove();
                            }

                        });
                    }
                    else {
                        $(englishFields).each(function () {
                            if ($(this).find(".en-value").hasClass("config-required")) {
                                $(this).find(".en-value").addClass("v-required");
                            }
                        });
                        $(arabicFields).each(function () {
                            if ($(this).find(".ar-value").hasClass("config-required")) {
                                $(this).find(".ar-value").removeClass("v-required");
                                $(this).find(".required").remove();
                            }

                        });
                    }


                }
            }
        }
        var InitializeAllPlugins = function (elem) {
            elem.find('[data-plugin]').each(function () {
                var plugin = $(this).attr('data-plugin');
                // check if plugin exists
                if (typeof jQuery()[plugin] != "undefined") {
                    var data = $(this).data();
                    // Call the plugin name to initialize it to the element and pass the data attributes as parameter
                    $(this)[plugin](data);
                }
                else {
                    __logMissingPlugin(plugin, $(this));
                }
            });
        }
        var InitializeAllCustomPlugins = function (elem) {
            elem.find('[data-b-custom-plugin]').each(function () {
                var plugin = $(this).attr('data-b-custom-plugin');
                // check if plugin exists
                if (typeof jQuery()[plugin] != "undefined") {
                    var data = $(this).data();
                    // Call the plugin name to initialize it to the element and pass the data attributes as parameter
                    $(this)[plugin](data);
                }
                else {
                    __logMissingPlugin(plugin, $(this));
                }
            });

        }
        var InitializeTitleToTooltip = function (elem) {
            try {
                KTApp.initTooltips();
            } catch (e) {

            }
            $(elem).find('[title]:not(.dropdown-toggle,.selected-flag,[data-animation])').each(function (i) {
                if (!$(this).attr('data-original-title')) {
                    $(this).attr('data-original-title', $(this).attr('title'));
                    $(this).tooltip();
                }

            });
        }
        var InitializeCheckBoxes = function (elem) {

            var checkBoxes = elem.find(".checkbox-custom .b-label");
            if (checkBoxes) {
                $(checkBoxes).each(function () {
                    var propValue = $(this).prop("for");
                    if (propValue) {
                        $(this).removeAttr("for");
                        $(this).attr("data-id", "B_" + propValue);
                        $(this).click(function () {
                            $(this).parents(".checkbox-custom").find('#' + propValue).click();
                        });
                    }
                });
            }
        }
        var InitializeReadMore = function (elem) {
            $(elem).find('.readmore-1line').each(function () {
                if (this.scrollHeight > this.clientHeight + 5) {

                    $(this).css('display', 'inline-block').css("max-height", $(this).css('line-height'));
                    $(this).parent().css("position", "relative").addClass('readmore-1line-container');
                    $(this).after('<span class="readmore-container">... <a href="javascript:void(0)" class="btn btn-outline btn-default btn-xs">' + VAL.ReadMore + '</a></span><span class="readless-container" style="display:none;"><a href="#" class="btn btn-outline btn-default btn-xs">' + VAL.ReadLess + '</a></span>')
                }
            });

            $(elem).find('.readmore-1line-container .readmore-container a').click(function () {
                $(this).parent().siblings('.readmore-1line').animate({
                    maxHeight: "1000px",
                    display: "block"
                }, 500);
                $(this).parent().siblings('.readless-container').show();
                $(this).parent().hide();
                return false;
            });
            $(elem).find('.readmore-1line-container .readless-container a').click(function () {
                var elem = this;
                var height = $(this).css('line-height');
                $(this).parent().siblings('.readmore-1line').animate({
                    maxHeight: height,
                }, 200, function () {
                    $(elem).parent().siblings('.readmore-container').show();
                    $(elem).parent().hide();
                });
                return false;
            });
        }
        var InitializeDeleteConfirmation = function (elem) {
            if (jQuery().confirm) {
                $(elem).find("[data-custom-plugin='DeleteConfirmation']").each(function () {
                    var text = $(this).data('text');
                    var confirmFunction = $(this).data('confirmfunction');
                    var cancelFunction = $(this).data('cancelfunction');
                    var yesText = Bnsights.isEnglish ? "Yes" : "نعم";
                    var noText = Bnsights.isEnglish ? "No" : "لا";

                    $(this).confirm({
                        target: '_self',
                        text: text,
                        confirm: function (button) {
                            if (confirmFunction)
                                window[confirmFunction](button);
                        },
                        cancel: function (button) {
                            if (cancelFunction)
                                window[cancelFunction](button);
                        },
                        confirmButton: yesText,
                        cancelButton: noText,
                        post: true,
                        confirmButtonClass: "btn-danger",
                        cancelButtonClass: "btn-default",
                        dialogClass: "modal-dialog modal-lg" // Bootstrap classes for large modal
                    });
                });
            }
        };
        var InitializeMaxLength = function (elem) {
            if (jQuery().maxlength) {
                if (Bnsights.isEnglish) {
                    (elem).find("[maxlength]:not(.hide-maxlength,.bnspinner,.v-number,.V-PhoneIntl)").maxlength({
                        placement: 'bottom-right-inside',
                        warningClass: "badge badge-info",
                        limitReachedClass: "badge badge-danger",
                        //preText: 'Characters: '
                        message: 'You cannot exceed %charsTotal% characters, currently %charsTyped% characters used.'
                    });
                }
                else {
                    (elem).find("[maxlength]:not(.hide-maxlength,.bnspinner,.v-number,.V-PhoneIntl)").maxlength({
                        placement: 'bottom-left-inside',
                        warningClass: "badge badge-info",
                        limitReachedClass: "badge badge-danger",
                        // preText: 'حروف: ',
                        message: 'لا يمكنك أن تتجاوز %charsTotal% حرف, حاليا %charsTyped% حرف مستخدم.',
                        utf8: false,
                        alwaysShow: false
                    });
                }
            }
        }
        var InitializeValidations = function (elem) {
            var form = elem.find('form');
            if (form) {
                $('form').each(function () {
                    ValidateDiv($(this));
                });
            }

        }
        var InitializeToggleSwitch = function (elem) {
            var toggleSwitch = elem.find('[data-plugin="switchery"]');
            if (toggleSwitch) {
                $(toggleSwitch).each(function () {

                    if ($(this).data('switchery') === true) {
                    }
                    else {
                        if (Switchery) {
                            var switchery = new Switchery(this, {
                                color: null
                                , jackColor: null
                                , size: 'small'
                            });
                        }
                    }
                });
            }
        }
        var InitializeMap = function (elem) {

            if ($(elem).find('[data-b-plugin=mapautocomplete]').length != 0) {
                if (!google.maps.Map) {
                    __logMissingPlugin('Google Maps', this);
                    return;
                }

                $(elem).find('[data-b-plugin=mapautocomplete]').each(function () {
                    if ($(this).attr("name") == "ModalText") {

                    }
                    else {
                        var parentElem = $(this).parents('.b-mapautocomplete');
                        var map = new google.maps.Map(parentElem.find('.map')[0], {
                            zoom: 17,
                            center: { lat: 25.254175, lng: 55.366673000000015 }
                        });

                        google.maps.event.addListenerOnce(map, 'idle', function () {

                        });

                        initializeAutoCompCreate(this, parentElem, map);
                    }


                    if ($(parentElem).attr('data-loadmodal') == "True") {
                        initializeAutocompleteModalMap(this, parentElem);
                    }

                })


                function createMarker(parentElem, lat, lng, map, marker, placeid) {
                    if (!marker) {
                        marker = new google.maps.Marker({
                            map: map,
                            draggable: true,
                            animation: google.maps.Animation.DROP,
                            title: "Location"
                        });
                        google.maps.event.addListener(marker, 'dragend', function () {
                            var position = marker.getPosition();
                            setPositionManually(parentElem, position.lat(), position.lng());
                        });
                        map.setZoom(17);
                    }
                    setPositionManually(parentElem, lat, lng, placeid);

                    var loc = { lat: lat, lng: lng };
                    marker.setPosition(loc);
                    map.setCenter(loc);

                }

                var emiratesHamming = ({
                    getAppropriateEmirate: function (input) {
                        var appropriateId = this.uaeEmirates[0].id;
                        if (!input)
                            return appropriateId;
                        var minValue = 0;
                        var emara = "";

                        var isEnglish = /[a-zA-Z]+$/.test(input);
                        if (isEnglish) {
                            emara = this.uaeEmirates[0].en;
                        }
                        else {
                            emara = this.uaeEmirates[0].en;
                        }

                        minValue = this.compute(emara, input);

                        for (var i = 1; i < this.uaeEmirates.length; i++) {

                            if (isEnglish) {
                                emara = this.uaeEmirates[i].en;
                            }
                            else {
                                emara = this.uaeEmirates[i].ar;
                            }

                            var currentValue = this.compute(emara, input);
                            if (currentValue < minValue) {
                                minValue = currentValue;
                                appropriateId = this.uaeEmirates[i].id;
                            }

                        }

                        return appropriateId;
                    },
                    compute: function (input1, input2) {
                        input1 = input1.toLocaleLowerCase();
                        input2 = input2.toLocaleLowerCase();
                        var diff = 0;
                        for (i = 0; i < input1.length; i++) {
                            if (input1[i] != input2[i]) {
                                diff = diff + 1;
                            }
                        }
                        return diff;
                    },
                    init: function () {
                        this.uaeEmirates.push({
                            ar: 'أبوظبي',
                            en: 'Abu Dhabi',
                            id: 40
                        });
                        this.uaeEmirates.push({
                            ar: 'دبي',
                            en: 'Dubai',
                            id: 42
                        });
                        this.uaeEmirates.push({
                            ar: 'رأس الخيمة',
                            en: 'Ras al Khaimah',
                            id: 44
                        });
                        this.uaeEmirates.push({
                            ar: 'الشارقةّ',
                            en: 'Sharjah',
                            id: 45
                        });
                        this.uaeEmirates.push({
                            ar: 'عجمان',
                            en: 'Ajman',
                            id: 41
                        });
                        this.uaeEmirates.push({
                            ar: 'الفجيرة',
                            en: 'Fujairah',
                            id: 43
                        });
                        this.uaeEmirates.push({
                            ar: 'أم القيوين',
                            en: 'Umm al Quwain',
                            id: 46
                        });
                        return this;
                    },
                    uaeEmirates: []
                }).init();
                function initializeAutoCompCreate(input, parentElem, map) {
                    try {
                        var options = {}
                        var restrictedCountry = $(parentElem).data("restrictedcountry");
                        if (restrictedCountry != "") {
                            var countries = restrictedCountry.split(',');
                            options = {
                                componentRestrictions: { country: countries }
                            };
                        }
                        var autocomplete = new google.maps.places.Autocomplete(input, options);
                        var marker = void 0;
                        autocomplete.bindTo('bounds', map);


                        $(input).on('change', function (e) {
                            if ($(this).val().length == 0) {
                                setPositionManually(parentElem, "", "");
                            }
                        });
                        $(input).on('keypress', function (e) {
                            if (e.keyCode === 13) {
                                e.preventDefault();
                            }
                            setPositionManually(parentElem, "", "");
                        });
                        autocomplete.addListener('place_changed', function () {
                            var place = autocomplete.getPlace();
                            if (place.geometry) {
                                if (place.geometry.viewport) {
                                    map.fitBounds(place.geometry.viewport);
                                } else {
                                    map.setCenter(place.geometry.location);
                                    map.setZoom(17);
                                }

                                if (place.address_components.length > 1) {
                                    var address = place.address_components[place.address_components.length - 2];
                                    var emaraid = emiratesHamming.getAppropriateEmirate(address.long_name);

                                    $(parentElem).find('#hdnEmaraID').val(emaraid);
                                }
                                else {
                                    // no emara found set the drop down to the default value
                                    $(parentElem).find('#hdnEmaraID').val(0);
                                }

                                createMarker(parentElem, place.geometry.location.lat(), place.geometry.location.lng(), map, marker, place.place_id);
                            } else {
                                setPositionManually(parentElem, "", "", "");
                            }

                        });
                        autocomplete.setTypes([]);
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
                function initializeAutocompleteModalMap(input, parentElem) {
                    var modalid = parentElem.attr('data-modalid');
                    var defaultLng = $("#" + modalid).attr("data-defaultLng");
                    var defaultLat = $("#" + modalid).attr("data-defaultLat");
                    var controlId = $("#" + modalid).attr("data-controlid");
                    var modalInput = $("#" + modalid).find("input")[0];
                    var latInput = document.getElementsByClassName("txtLat_" + controlId)[0];
                    var lngInput = document.getElementsByClassName("txtLng_" + controlId)[0];
                    if (latInput.value.length == 0 && lngInput.value.length == 0) {
                        latInput.value = defaultLat;
                        lngInput.value = defaultLng;
                    }


                    var place_id_Input = document.getElementsByClassName("txtPlaceID_" + controlId)[0];

                    var options = {
                        center: { lat: parseFloat(latInput.value), lng: parseFloat(lngInput.value) },
                        zoom: 14,
                        mapTypeId: 'roadmap',
                        fullscreenControl: false,
                        streetViewControl: false
                    };

                    var restrictedCountry = $(parentElem).data("restrictedcountry");
                    if (restrictedCountry != "") {
                        var countries = restrictedCountry.split(',');
                        options["componentRestrictions"] = { country: countries };

                    }
                    var modalMap = new google.maps.Map(elem.find('#' + modalid).find('.modalMap')[0], options);

                    modalMap.controls[google.maps.ControlPosition.TOP_LEFT].push(modalInput);


                    var modalMarker = new google.maps.Marker({
                        map: modalMap,
                        position: { lat: parseFloat(latInput.value), lng: parseFloat(lngInput.value) },
                        clickable: true,
                    });

                    var modalGeocoder = new google.maps.Geocoder;
                    modalGeocoder.geocode({
                        'location': { lat: parseFloat(latInput.value), lng: parseFloat(lngInput.value) }
                    }, function (results, status) {
                        if (status === 'OK') {
                            if (results[0]) {
                                place_id_Input.value = results[0].place_id;
                                modalInput.value = results[0].formatted_address;
                            }
                        }
                    });


                    $("#" + modalid).on("keydown", function (e) {
                        if (e.which == 13) {
                            if ($("#" + modalid).is(':visible')) {
                                e.preventDefault();
                                elem.find('#' + modalid).find(".btn-modaladd").click();
                            }
                        }
                    });





                    $(parentElem).find(".openMapModal").click(function () {
                        if (latInput.value.length != 0 && lngInput.value.length != 0) {
                            modalMap.panTo({ lat: parseFloat(latInput.value), lng: parseFloat(lngInput.value) });
                            modalMarker.setPosition({ lat: parseFloat(latInput.value), lng: parseFloat(lngInput.value) });
                            modalGeocoder.geocode({
                                'location': { lat: parseFloat(latInput.value), lng: parseFloat(lngInput.value) }
                            }, function (results, status) {
                                if (status === 'OK') {
                                    if (results[0]) {
                                        place_id_Input.value = results[0].place_id;
                                        modalInput.value = results[0].formatted_address;
                                    }
                                }
                            });
                        }
                        else {
                            latInput.value = modalMarker.getPosition().lat;
                            lngInput.value = modalMarker.getPosition().lng;
                            modalGeocoder.geocode({
                                'location': { lat: parseFloat(latInput.value), lng: parseFloat(lngInput.value) }
                            }, function (results, status) {
                                if (status === 'OK') {
                                    if (results[0]) {
                                        place_id_Input.value = results[0].place_id;
                                        modalInput.value = results[0].formatted_address;
                                    }
                                }
                            });

                        }
                        $("#" + modalid).modal("show");
                    });


                    elem.find('#' + modalid).find(".btn-modaladd").click(function () {
                        input.value = modalInput.value;
                        $("#" + modalid).modal("hide");
                        $(input).valid();

                    });


                    var modalAutocomplete = new google.maps.places.Autocomplete(modalInput);

                    modalAutocomplete.bindTo('bounds', modalMap);





                    google.maps.event.addListener(modalMap, "click", function (markerPos) {
                        modalMarker.setPosition(markerPos.latLng);

                        var latLng = markerPos.latLng;
                        currentLatitude = latLng.lat();
                        currentLongitude = latLng.lng();
                        var latlng = {
                            lat: currentLatitude,
                            lng: currentLongitude,
                            placeId: markerPos.place_id,
                        };

                        latInput.value = currentLatitude;
                        lngInput.value = currentLongitude;

                        modalGeocoder.geocode({
                            'location': latlng
                        }, function (results, status) {
                            if (status === 'OK') {
                                if (results[0]) {
                                    place_id_Input.value = results[0].place_id;
                                    modalInput.value = results[0].formatted_address;
                                }
                            }
                        });



                    });
                    modalAutocomplete.addListener('place_changed', function () {
                        var place = modalAutocomplete.getPlace();
                        if (!place.geometry) {
                            return;
                        }
                        if (place.geometry.viewport) {
                            modalMap.fitBounds(place.geometry.viewport);
                        } else {
                            modalMap.setCenter(place.geometry.location);
                        }
                        modalMarker.setPosition(place.geometry.location);
                        currentLatitude = place.geometry.location.lat();
                        currentLongitude = place.geometry.location.lng();

                        latInput.value = currentLatitude;
                        lngInput.value = currentLongitude;
                        place_id_Input.value = place.place_id;


                    });

                }
                function setPositionManually(parentElem, lat, lng, placeid) {
                    $(parentElem).find('.txtLat').val(lat);
                    $(parentElem).find('.txtLng').val(lng);
                    $(parentElem).find('.txtPlaceID').val(placeid);
                    Bnsights.Helper.ValidateByContainer($(parentElem));
                }
            }
        }
        var InitializeTableSearch = function (elem) {

            $(elem).find(".search-text").each(function () {
                var element = $(this);
                var Container = element.attr("data-targetcontainer");
                var Selector = element.attr("data-targetselector");
                if (Selector) {
                    if (!Selector.match('tbody')) {
                        var SelectorsArray = Selector.split(".");
                        if (SelectorsArray.length > 0) {
                            var ChildSelector = "." + SelectorsArray[SelectorsArray.length - 1].trim();
                            var parentSelector = '.' + SelectorsArray[1].trim();
                            var noresult = 0;
                            if (Container) {
                                Container = $("#" + Container);
                                element.keyup(function () {
                                    var val = element.val().toLowerCase();
                                    if (val == '') {
                                        Container.find(parentSelector).show();
                                    }
                                    else {
                                        Container.find(parentSelector).each(function () {
                                            var text = $(this).text().toLowerCase();
                                            var match = text.indexOf(val);
                                            if (match >= 0) {
                                                $(this).show();
                                                noresult = 1;
                                                $('.no-results-found').remove();
                                            } else {
                                                $(this).hide();
                                            }
                                        });

                                    }
                                });
                                //element.data("target", "");
                            }


                        }
                    }
                    else {
                        var noresult = 0;
                        if (Container) {
                            Container = $("#" + Container);
                            element.keyup(function () {
                                var val = element.val().toLowerCase();
                                if (val == '') {
                                    Container.find(Selector).show();
                                } else {
                                    Container.find(Selector).each(function () {
                                        var text = $(this).text().toLowerCase();
                                        var match = text.indexOf(val);
                                        if (match >= 0) {
                                            $(this).show();
                                            noresult = 1;
                                            $('.no-results-found').remove();
                                        } else {
                                            $(this).hide();
                                        }
                                    });

                                }
                            });
                            //element.data("target", "");
                        }


                    }
                    var searchFn = element.data("searchfn");
                    if (searchFn) {
                        element.keyup(function (e) {
                            if (e && e.keyCode && e.keyCode == 13) {
                                window[searchFn](element.val());
                            }
                        })
                        element.next().click(function () {
                            window[searchFn](element.val());
                        })
                    }
                }

            });
        }
        var InitializeTableLogic = function () {
            $('body').off('click', '.repeater-remove').on('click', '.repeater-remove', function () {
                var $this = $(this);
                var $table = $this.closest('table');
                var bindingName = $table.attr('data-binding-name');
                var $tr = $this.closest('tr');
                var dataTable = $table.attr('data-table');
                Bnsights.Helper.RemoveAllRules($tr);
                $tr.remove();
                if (dataTable) {
                    Bnsights.Helper.AdapteNumber(($table.find("tbody tr:not(.odd)." + dataTable + "")), bindingName);
                }
                else {
                    Bnsights.Helper.AdapteNumber(($table.find("tbody tr:not(.odd)")), bindingName);
                }
            });

            $('body').off('click', '.repeater-add').on('click', '.repeater-add', function (e) {
                var template = $($(this).attr('data-template'));
                var templateID = $(template).attr('id');
                var table = template.closest("[data-table='" + templateID + "']");
                if (!table.length) {
                    table = template.closest('table');
                }
                var bindingName = table.attr('data-binding-name');
                template.addClass(templateID);
                table.find('tbody:first').append(template.clone(true));
                var addedHtml = $(table.find('tbody tr:last'));
                if (template.closest("[data-table='" + templateID + "']").length) {
                    addedHtml = $(table.find('tbody tr.' + templateID)).last();
                }
                addedHtml.show();
                addedHtml.find('[data-validation-classes]').each(function () {
                    var that = $(this);
                    that.addClass(that.attr('data-validation-classes'));
                    that.removeAttr('data-validation-classes');
                });
                InitializeLangMode(addedHtml);
                if (template.closest("[data-table='" + templateID + "']").length) {
                    Bnsights.Helper.AdapteNumber((table.find("tbody tr:not(.odd)." + templateID + "")), bindingName);
                }
                else {
                    Bnsights.Helper.AdapteNumber((table.find("tbody tr:not(.odd)")), bindingName);
                }

                addedHtml.removeAttr('id');
                addedHtml.find('.bootstrap-select').replaceWith(function () {
                    var select = $('select', this);
                    select.data("selectpicker", null);
                    return select;
                });
                var selectpickerElem = addedHtml.find('select');
                if (selectpickerElem.length > 0) {
                    selectpickerElem.selectpicker();
                }
                AddValidationRulesToDiv(addedHtml);
                Bnsights.MainModule.reinitialize(addedHtml);
            });
        };
        var InitializeInputColoring = function (elem) {
            elem.find(".appCount").change(function () {
                var element = $(this);
                applyColoring(element);
            });
            elem.find(".appCount").each(function () {
                applyColoring($(this));
            });
        };
        var InitializeTabs = function (elem) {
            $(elem).find('.nav-item[data-url]').click(function () {
                var strIndex = window.location.href.indexOf('#');
                var tabName = $(this).children("a").attr('href').replace('#', '');
                var removeappendUrl = $(this).children("a").attr('data-removeappendurl');
                if (!removeappendUrl || removeappendUrl == "false") {
                    var url;
                    if (strIndex > -1) {
                        var url = encodeURI(window.location.href.substring(0, strIndex) + '#' + sanitizeHTML(tabName));
                    } else {
                        var url = encodeURI(window.location.href + '#' + sanitizeHTML(tabName));
                    }
                    isOriginSameAsLocation(url);
                    window.location.href = url;
                    if (!$(this).data("loaded") || $(this).data("force-reload")) {
                        Bnsights.Helper.LoadAsyncTab($(this));
                    }
                }
            });
            $(elem).find('.nav-tabs').each(function () {
                var strIndex = window.location.href.indexOf('#');
                var targetTab;
                var tabsContainer = $(this);
                if (strIndex > -1) {
                    var hashes = window.location.hash.substring(1).split(',');
                    for (var i = 0; i < hashes.length; i++) {
                        var tabAnchor = $(tabsContainer).find("a[href='#" + hashes[i] + "']");
                        if (tabAnchor.length != 0) {
                            targetTab = tabAnchor.parent();
                            break;
                        }
                    }
                }
                if (!targetTab) {
                    targetTab = $(this).find('.nav-item').first();
                }
                if (targetTab && !$(targetTab).data("loaded")) {
                    var removeappendUrl = targetTab.find('a').attr('data-removeappendurl');
                    if (!removeappendUrl || removeappendUrl == "false") {
                        targetTab.find('a').click();
                    }
                }
            });
            //Fix for bootstrap 4
            $(elem).find('.nav-tabs').on('shown.bs.tab', 'a', function (e) {
                if (e.relatedTarget) {
                    $(e.relatedTarget).removeClass('active');
                    $($(e.relatedTarget).attr('href')).removeClass('active')
                }
            });
        };
        var InitWordCount = function () {
            $('.wordCount[data-maxwordcount]').each(function () {
                var cleanText = $.trim($(this).val().replace(/•/g, ''));
                var wordsCount = cleanText.split(/\s+/).length;
                if (!/\S/.test(cleanText)) {
                    wordsCount = 0;
                }
                $(this).attr("data-currentwordcount", wordsCount);
            });
            $('body').on("keydown paste change", '.wordCount[data-maxwordcount]', function (e, salutation, name) {
                var that = this;
                setTimeout(function () {
                    var cleanText = $.trim($(that).val().replace(/•/g, ''));
                    var wordsCount = cleanText.split(/\s+/).length;

                    if (!/\S/.test(cleanText)) {
                        wordsCount = 0;
                    }

                    var maxWordsCount = $(that).attr('data-maxwordcount');

                    var text = $.trim($(that).val());

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
                $(this).attr("data-currentwordcount", wordsCount);
                $(this).parent().parent().find('.word-counter').css("display", "inline-flex");

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
                $(this).attr("data-currentwordcount", wordsCount);
                $(this).parent().parent().find('.word-counter').css("display", "inline-flex");
            });
            $('body').on("blur", '.wordCount[data-maxwordcount]', function (event, salutation, name) {
                $(this).parent().parent().find('.word-counter').hide();
            });
        }
        var InitializeAvatarSwitch = function (elem) {
            elem.find('.user-avatar-container').each(function () {
                $(this).prepend("<i class='fa fa-retweet edit-avatar'  data-toggle='modal' data-target='#replaceUser'></i>");
            });
        }
        var InitializeDisabledSelect = function (elem) {
            setTimeout(function () {            // SetTimeout to wait till the plugin is initalized 
                elem.find('.read-only-select').each(function () {
                    var parent = $(this).parents('.bootstrap-select').find('.dropdown-toggle, .dropdown-menu li').each(function () {
                        $(this).addClass('disabled');
                    })
                });
            }, 500)
        }
        var InitializeSlidePanel = function () {
            //$('body').on('click', '[data-toggle="slidePanel"]', function (e) {
            //    var url = $(this).data('url');
            //    if (url) {
            //        $.slidePanel.show({
            //            url: url
            //        });
            //    }
            //});

            //$.slidePanel.setDefaults({
            //    mouseDrag: false,
            //    touchDrag: false,
            //    pointerDrag: false,
            //    template: function template(options) {
            //        return '<div class="' + options.classes.base + ' ' + options.classes.base + '-' + options.direction + '">\n                  <div class="' + options.classes.base + '-scrollable">\n                    <div><div class="' + options.classes.content + '"></div></div>\n                  </div>\n                  <div class="' + options.classes.base + '-handler"></div>\n                </div>';
            //    },
            //    afterShow: function afterShow() {
            //        Bnsights.MainModule.reinitialize($('.slidePanel-content'));
            //        var _this2 = this;

            //        $(document).on('click.slidePanelShow', function (e) {
            //            if ($(e.target).closest('.slidePanel').length === 0 && $(e.target).closest('html').length === 1 && $('.slidePanel-content').html().length != 0) {
            //                _this2.hide();
            //            }
            //        });
            //        $(document).on('click', '.close-panel', function (e) {
            //            _this2.hide();
            //        });
            //    },
            //    afterHide: function afterHide() {
            //        $(document).off('click.slidePanelShow');
            //        $(document).off('click.slidePanelDatepicker');
            //    }
            //});
        }
        var InitializeTableFilters = function (elem) {
            $(elem).find("table.filtered-table thead th:not(.filter-hidden)").each(function () {
                _InjectHeaderFilters(this);
                $(this).find('.filter-button').click(function () {
                    _ShowFilterOption($(this).parents('th'));
                });
            });
            function _InjectHeaderFilters(tdObject) {
                $(tdObject).append(
                    '<div class="filter-container">'
                    + '<button type="button" class="btn btn-xs btn-flat float-right filter-button" data-toggle="tooltip" data-original-title="Filter">'
                    + '<i class="fa fa-filter filter-icon"></i>'
                    + '</button>'
                    + '<div class="filter" style="display: none;"></div > '
                    + '</div >'
                )
            }
            function _ShowFilterOption(tdObject) {
                var arrayMap = {};
                var filterGrid = $(tdObject).find(".filter");

                if (filterGrid.is(":visible")) {
                    filterGrid.hide();
                    return;
                }

                $(".filter").hide();

                var index = 0;
                var filterValueMap = [];
                var filterClass = "f-" + filterGrid.index();
                var currentIndex = $(tdObject).index();
                filterGrid.empty();
                var allSelected = true;
                filterGrid.append('<div class="grid-item-all"><div class="checkbox-custom checkbox-default"><input type="checkbox" checked /><label>(Select All)</label></div></div>');

                var filterUsedBefore = false;
                if (filterGrid.hasClass(filterClass))
                    filterUsedBefore = true;

                var $rows;
                if (filterUsedBefore)
                    $rows = $(tdObject).parents("table").find("tbody tr");
                else
                    $rows = $(tdObject).parents("table").find("tbody tr:visible");

                $rows.each(function (ind, ele) {
                    var currentTd = $(ele).children()[currentIndex];
                    var filterValue = currentTd.innerHTML;
                    if ($.inArray(filterValue, filterValueMap) != -1) {	// Check if value is already added as a filter
                        arrayMap[$.inArray(filterValue, filterValueMap)].push(ele);
                        return;
                    }
                    var div = document.createElement("div");
                    div.classList.add("grid-item")
                    var str = $(ele).is(":visible") ? 'checked' : '';
                    if ($(ele).is(":hidden")) {
                        allSelected = false;
                    }

                    div.innerHTML = '<div class="checkbox-custom checkbox-default">'
                        + '<input type="checkbox" ' + str + ' class="filter-input"/>'
                        + '<label >' + filterValue + '</label>'
                        + '</div>';

                    filterGrid.append(div);

                    var elemArr = [];
                    elemArr.push(ele);
                    arrayMap[index] = elemArr;

                    filterValueMap[index] = filterValue;
                    index++;
                });

                if (!allSelected) {
                    filterGrid.find(".grid-item-all input[type='checkbox']").removeAttr("checked");
                }

                filterGrid.append('<div class="pt-20"><input id="ok" type="button" value="Ok" class="btn btn-outline btn-default btn-sm mr-5"/><input id="close" type="button" value="Close"  class="btn btn-outline btn-default btn-sm"/></div>');
                filterGrid.show();

                var $filterContainer = filterGrid.parents('.filter-container');
                var $closeBtn = filterGrid.find("#close");
                var $okBtn = filterGrid.find("#ok");
                var $checkElems = filterGrid.find("input[type='checkbox']");
                var $filterInputs = filterGrid.find("input.filter-input");
                var $gridItems = filterGrid.find(".grid-item");
                var $allInput = filterGrid.find(".grid-item-all input[type='checkbox']");
                var $gridall = filterGrid.find(".grid-item-all");

                // Handle Filter Click on Input
                $filterInputs.click(function (event) {
                    if ($(this).is(':checked')) {
                        if (filterGrid.find(".grid-item [type='checkbox']:not(:checked)").length == 0) {
                            $allInput.prop("checked", true);
                        }
                    }
                    else {
                        $allInput.prop("checked", false);
                    }
                    event.stopPropagation();
                });
                // Handle Filter Click on Label
                $gridItems.click(function (event) {
                    var chk = $(this).find("input[type='checkbox']");
                    $(chk).prop("checked", !$(chk).is(":checked"));

                    if ($(chk).is(':checked')) {
                        if (filterGrid.find(".grid-item [type='checkbox']:not(:checked)").length == 0) {
                            $allInput.prop("checked", true);
                        }
                    }
                    else {
                        $allInput.prop("checked", false);
                    }
                    event.stopPropagation();
                });
                // Handle All Filter Click on Input
                $allInput.click(function (event) {
                    var chked = $(this).is(":checked");
                    filterGrid.find(".grid-item [type='checkbox']").prop("checked", chked);

                    event.stopPropagation();
                })
                // Handle All Filter Click on Label
                $gridall.click(function (event) {
                    var chk = $(this).find("input[type='checkbox']");
                    $(chk).prop("checked", !$(chk).is(":checked"));
                    var chked = $(chk).is(":checked");

                    filterGrid.find(".grid-item [type='checkbox']").prop("checked", chked);
                    event.stopPropagation();
                });
                // Close Button
                $closeBtn.click(function () {
                    filterGrid.hide();
                    return false;
                });
                // Ok Button
                $okBtn.click(function () {
                    if (filterGrid.find(".grid-item-all input[type='checkbox']:checked").length == 1) {
                        filterGrid.removeClass(filterClass);
                        $filterContainer.removeClass('active');
                    }
                    else {
                        filterGrid.addClass(filterClass);
                        $filterContainer.addClass('active');
                    }

                    filterGrid.find(".grid-item").each(function (ind, ele) {
                        if ($(ele).find("input").is(":checked")) {
                            $(arrayMap[ind]).each(function () {
                                $(this).show()
                            })
                        } else {
                            $(arrayMap[ind]).each(function () {
                                $(this).hide();
                            })
                        }
                    });
                    filterGrid.hide();
                    return false;
                });
                $(document).on('click', function (e) {
                    if ($(".filter:visible").length != 0 && $(e.target).closest(".filter-button").length === 0) {
                        if ($(e.target).closest(".filter").length === 0) {
                            $closeBtn.click();
                        }
                    }
                });

                return filterGrid;
            }
        }
        var InitializeAutocompleteTextbox = function (elem) {
            if ($(elem).find('[data-b-plugin=typeahead]:not(.auto-complete-with-tags-input)').length != 0) {
                if (jQuery().typeahead) {
                    $(elem).find("[data-b-plugin=typeahead]:not(.auto-complete-with-tags-input)").each(function () {
                        var actionURL = $(this).data('actionurl');
                        //var name = $(this).data('name');
                        var name = $(this).attr('name');
                        var map;
                        $(this).typeahead({
                            hint: false,
                            highlight: false,
                            minLength: 2
                        }, {
                            source: function (query, syncResults, asyncResults) {
                                Bnsights.DisableAjaxBlockUIOnce = true;
                                if (!actionURL.endsWith("?query="))
                                    actionURL += "?query=";

                                $.get(actionURL + query, function (data) {
                                    var objects = [];
                                    var map = [];
                                    data = JSON.parse(data);
                                    $.each(data, function (key, value) {
                                        map[value] = key;
                                        objects.push(value);
                                    });
                                    window['autocompleteMap_' + name] = map;
                                    asyncResults(objects);
                                });
                            },
                            limit: 100
                        });

                        $(this).bind('typeahead:change', function (ev, suggestion) {
                            var controlID = $(this).data('controlid');
                            var map = window['autocompleteMap_' + name];
                            if (map[suggestion])
                                $('[data-controlid=' + controlID + '] .autocomplete-key').val(map[suggestion]);
                            else
                                $('[data-controlid=' + controlID + '] .autocomplete-key').val('');
                        }).keypress(function (event) {
                            if (event.keyCode == 13) {
                                var controlID = $(this).data('controlid');
                                var map = window['autocompleteMap_' + name];
                                var suggestion = $(this).val();

                                if (map[suggestion])
                                    $('[data-controlid=' + controlID + '] .autocomplete-key').val(map[suggestion]);
                                else
                                    $('[data-controlid=' + controlID + '] .autocomplete-key').val('');
                            }
                        });
                    });
                }
                else {
                    __logMissingPlugin('typeahead', this);
                }
            }
        }
        var InitializeSummerNotePlugins = function (elem) {

            var currentLanguage = 'en';
            if (Bnsights.isArabic) {
                currentLanguage = 'ar';
            }
            if ($(elem).find('[data-b-plugin=summernote]').length != 0) {
                if (jQuery().froalaEditor) {
                    elem.find('[data-b-plugin=summernote]').each(function () {
                        $(this).froalaEditor({
                            toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline',
                                'strikeThrough', '|', 'fontFamily',
                                'fontSize', 'color', 'inlineClass', 'inlineStyle', 'paragraphStyle', 'lineHeight',
                                '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent',
                                'quote', '-', 'insertLink', 'insertImage', 'embedly',
                                'insertTable', '|', 'fontAwesome',
                                'insertHR', 'selectAll', 'clearFormatting',
                                '|', 'print', 'spellChecker', 'help', 'html', '|', 'undo', 'redo'],
                            imageInsertButtons: ['imageByURL'],
                            language: currentLanguage
                        });

                        $(this).on('froalaEditor.contentChanged', function (e, editor) {
                            var validationMessage = $(this).parent().find('.help-block-error');
                            if (validationMessage && validationMessage.length > 0) {
                                $(validationMessage).hide();
                            }
                        });
                    });

                } else if (jQuery().summernote) {
                    elem.find('[data-b-plugin=summernote]').each(function () {
                        $(this).summernote({
                            dialogsInBody: true,
                            height: $(this).val() != '' ? null : 100,
                            toolbar: [
                                ['style', ['style']],
                                ['font', ['bold', 'underline', 'clear']],
                                ['fontname', ['fontname']],
                                ['color', ['color']],
                                ['para', ['ul', 'ol', 'paragraph']],
                                ['table', ['table']],
                                ['insert', ['link', 'picture', 'video']],
                                ['view', ['fullscreen', 'codeview']]
                            ]
                        });
                    })
                }
                else {
                    __logMissingPlugin('summernote', this);
                }
            }

        }
        var InitializeImageUpload = function (elem) {
            $(elem).find('.fileinput-preview').click(function (e) {
                e.preventDefault();
                $(this).parent('.fileinput-new').find('.image-selector').click();
            });
            $(elem).find('.image-selector').change(function () {
                readURL(this);
                $(this).parents('.is-invalid').removeClass('is-invalid');
                $(this).siblings('.help-block-error').remove()

                var profileMainSelector = $('.profileMainSelector');
                profileMainSelector.removeClass('is-invalid');
                var validationError = profileMainSelector.find('.fileinput').find('.help-block');
                validationError.html('');
            });
            function readURL(input) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $(input).parent().find('.previewImage').attr('src', e.target.result);
                        //$('.previewImage').attr('src', e.target.result);
                    }
                    reader.readAsDataURL(input.files[0]);
                }
            }
        }
        var InitializeDropDownDateTimePicker = function () {
            $('body').on('change', '.pv-dropdowndatepicker.dddp-DMY select', function () {
                var parent = $(this).parents('.pv-dropdowndatepicker');
                var input = parent.find('input.v-dddatepicker');

                var day = parent.find("select[name *= 'ddlDay']");
                var month = parent.find("select[name *= 'ddlMonth']");
                var year = parent.find("select[name *= 'ddlYear']");

                if (!month.val() || !day.val() || !year.val()) {

                    if ($(month).hasClass('v-required')) {
                        input.val('');

                    } else {
                        if (!month.val() && !day.val() && !year.val()) {
                            input.val('');
                        } else {
                            input.val('0-0-2016');
                        }

                    }

                    return;
                }

                input.val(day.val() + '-' + month.val() + "-" + year.val());
                input.valid();
            });
            $('body').on('change', '.pv-dropdowndatepicker.dddp-MY select', function () {
                var parent = $(this).parents('.pv-dropdowndatepicker');
                var input = parent.find('input.v-dddatepicker');

                var month = parent.find("select[name *= 'ddlMonth']");
                var year = parent.find("select[name *= 'ddlYear']");


                if (!month.val() || !year.val()) {
                    if ($(month).hasClass('v-required')) {
                        input.val('');

                    } else {
                        if (!month.val() && !year.val()) {
                            input.val('');
                        } else {
                            input.val('0-0-2016');
                        }

                    }

                    return;
                }

                input.val('1-' + month.val() + "-" + year.val());
                input.valid();
            });
            $('body').on('change', '.pv-dropdowndatepicker.dddp-Y select', function () {
                var parent = $(this).parents('.pv-dropdowndatepicker');
                var input = parent.find('input.hidden');

                var year = parent.find("select[name *= 'ddlYear']");

                if (!year.val()) {
                    input.val('');
                    return;
                }

                input.val('1' + '-' + '1' + "-" + year.val());
                input.valid();
            });

            $('body').on('change', '.pv-dropdowndatepicker.dddp-HM input[type=radio]', function () {
                var Selector = "";
                if ($(this).is(":checked")) {
                    Selector = $(this).val();
                }

                var parent = $(this).parents('.pv-dropdowndatepicker');
                var input = parent.find('input[type=text]');
                var hour = parent.find("select[name *= 'ddlHour']");
                var minute = parent.find("select[name *= 'ddlMinute']");
                if (!hour.val() || !minute.val()) {

                    if ($(hour).hasClass('v-required')) {
                        input.val('');

                    } else {
                        if (!hour.val() && !minute.val()) {
                            input.val('');
                        } else {
                            input.val('--:--');
                        }
                    }
                    return;
                }
                var ConvertedHour = "";
                if (hour.val) {
                    if (Selector == "AM") {
                        if (hour.val() == "12") {
                            ConvertedHour = "00";
                        }
                        else {
                            ConvertedHour = hour.val();
                        }

                    }
                    else if (Selector == "PM") {
                        if (hour.val() == "12") {
                            ConvertedHour = "12";
                        }
                        else {
                            ConvertedHour = parseInt(hour.val()) + 12;
                        }
                    }
                }
                input.val(ConvertedHour + ":" + minute.val());
                input.valid();
            });
            $('body').on('change', '.pv-dropdowndatepicker.dddp-HM select', function () {
                var parent = $(this).parents('.pv-dropdowndatepicker');
                var input = parent.find('input[type=text]');
                var hourType = parent.find('input[type=radio]:checked');

                var hour = parent.find("select[name *= 'ddlHour']");
                var minute = parent.find("select[name *= 'ddlMinute']");

                if (!hour.val() || !minute.val()) {

                    if ($(hour).hasClass('v-required')) {
                        input.val('');

                    } else {
                        if (!hour.val() && !minute.val()) {
                            input.val('');
                        } else {
                            input.val('--:--');
                        }
                    }
                    return;
                }
                var ConvertedHour = "";
                if (hour.val) {
                    if ($(hourType).val() == "AM") {
                        if (hour.val() == "12") {
                            ConvertedHour = "00";
                        }
                        else {
                            ConvertedHour = hour.val();
                        }

                    }
                    else if ($(hourType).val() == "PM") {
                        if (hour.val() == "12") {
                            ConvertedHour = "12";
                        }
                        else {
                            ConvertedHour = parseInt(hour.val()) + 12;
                        }
                    }
                }
                input.val(ConvertedHour + ":" + minute.val());
                input.valid();
            });
            $('body').on('change', '.pv-dropdowndatepicker.dddp-DMYHM select', function () {
                var parent = $(this).parents('.pv-dropdowndatepicker');
                var input = parent.find('input[type=text]');
                var hourType = parent.find('input[type=radio]:checked');
                var hour = parent.find("select[name *= 'ddlHour']");
                var minute = parent.find("select[name *= 'ddlMinute']");
                var day = parent.find("select[name *= 'ddlDay']");
                var month = parent.find("select[name *= 'ddlMonth']");
                var year = parent.find("select[name *= 'ddlYear']");

                if (!month.val() || !day.val() || !year.val() || !hour.val() || !minute.val()) {

                    if ($(month).hasClass('v-required')) {
                        input.val('');

                    } else {
                        if (!month.val() && !day.val() && !year.val() && !hour.val() && !minute.val()) {
                            input.val('');
                        } else {
                            input.val('0-0-2016 --:--');
                        }
                    }
                    return;
                }
                var ConvertedHour = "";
                if (hour.val) {
                    if ($(hourType).val() == "AM") {
                        if (hour.val() == "12") {
                            ConvertedHour = "00";
                        }
                        else {
                            ConvertedHour = hour.val();
                        }

                    }
                    else if ($(hourType).val() == "PM") {
                        if (hour.val() == "12") {
                            ConvertedHour = "12";
                        }
                        else {
                            ConvertedHour = parseInt(hour.val()) + 12;
                        }
                    }
                }

                input.val(day.val() + '-' + month.val() + "-" + year.val() + " " + ConvertedHour + ":" + minute.val());
                input.valid();
            });
            $('body').on('change', '.pv-dropdowndatepicker.dddp-DMYHM input[type=radio]', function () {
                var Selector = "";
                if ($(this).is(":checked")) {
                    Selector = $(this).val();
                }
                var parent = $(this).parents('.pv-dropdowndatepicker');
                var input = parent.find('input[type=text]');
                var hour = parent.find("select[name *= 'ddlHour']");
                var minute = parent.find("select[name *= 'ddlMinute']");
                var day = parent.find("select[name *= 'ddlDay']");
                var month = parent.find("select[name *= 'ddlMonth']");
                var year = parent.find("select[name *= 'ddlYear']");

                if (!month.val() || !day.val() || !year.val() || !hour.val() || !minute.val()) {

                    if ($(month).hasClass('v-required')) {
                        input.val('');

                    } else {
                        if (!month.val() && !day.val() && !year.val() && !hour.val() && !minute.val()) {
                            input.val('');
                        } else {
                            input.val('0-0-2016 --:--');
                        }
                    }
                    return;
                }
                var ConvertedHour = "";
                if (hour.val) {
                    if (Selector == "AM") {
                        if (hour.val() == "12") {
                            ConvertedHour = "00";
                        }
                        else {
                            ConvertedHour = hour.val();
                        }

                    }
                    else if (Selector == "PM") {
                        if (hour.val() == "12") {
                            ConvertedHour = "12";
                        }
                        else {
                            ConvertedHour = parseInt(hour.val()) + 12;
                        }
                    }
                }
                input.val(day.val() + '-' + month.val() + "-" + year.val() + " " + ConvertedHour + ":" + minute.val());
                input.valid();
            });
        }
        var InitializeMultipleFileUpload = function (elem) {
            $(function () {
                // Attach ajax success event
                $(elem).find('.pv-multiplefileupload').each(function () {
                    var controlID = $(this).attr('data-controlid');
                    var functionCalling = ",MultipleFileUploadAfterSubmit('" + controlID + "')";
                    var formAjaxSuccessValue = $(this).parents('form').attr('data-ajax-success');
                    if (formAjaxSuccessValue) {
                        if (!formAjaxSuccessValue.indexOf(controlID) != -1) {    // Make sure its not added before
                            $(this).parents('form').attr('data-ajax-success', formAjaxSuccessValue + functionCalling);
                        }
                    }

                });
            })
        }
        var InitializeCalendar = function (elem) {
            $(elem).find('.b-calendar').each(function () {
                Bnsights.Helper.refreshCalendar(this);
                var isRTL = false;
                var localecode = 'en';
                if (Bnsights.isArabic) {
                    isRTL = true;
                    localecode = 'ar-sa'
                }
                var parentselector = $(this).parent();
                var defaultView = $(parentselector).attr('data-defaultview');
                var defaultdate = $(parentselector).attr('data-defaultdate');
                var eventsourceurl = $(parentselector).attr('data-eventsourceurl');
                var ondayclickfn = $(parentselector).attr('data-ondayclickfn');
                var oneventclickfn = $(parentselector).attr('data-oneventclickfn');
                $(this).fullCalendar({
                    //defaultView: defaultView,
                    allDayText: VAL.AllDay,
                    buttonText: {
                        today: VAL.Today,
                        month: VAL.Month,
                        week: VAL.Week,
                        day: VAL.Day,
                        year: VAL.Year
                    },
                    header: {
                        left: 'today',
                        center: 'prev,title,next',
                        right: defaultView
                    },
                    defaultDate: defaultdate,
                    isRTL: isRTL,
                    locale: localecode,
                    timeFormat: 'h:mm t',
                    selectable: true,
                    selectHelper: true,
                    navLinks: true, // can click day/week names to navigate views
                    editable: false,
                    eventLimit: false, // allow "more" link when too many events
                    eventSources: [
                        // your event source
                        {
                            url: eventsourceurl,
                            type: 'GET',

                        }

                        // any other sources...

                    ],
                    dayClick: function (date, jsEvent, view) {
                        if (ondayclickfn != "") {
                            window[ondayclickfn](date.format("DD-MM-YYYY"));
                        }
                    },
                    eventClick: function (event) {
                        if (oneventclickfn != "") {
                            window[oneventclickfn](event.id);
                        }
                    },
                    eventMouseover: function (event, element) {
                        $(this).tooltip({ title: event.description });
                    },
                    eventRender: function (event, element) {
                        if (event.Colour != String.empty || event.Colour != null) {
                            element.css('background-color', event.Colour);
                        }
                    },

                });

                $(this).find('.fc-icon-left-single-arrow').removeClass('fc-icon-left-single-arrow').addClass('fa fa-arrow-left');
                $(this).find('.fc-icon-right-single-arrow').removeClass('fc-icon-right-single-arrow').addClass('fa fa-arrow-right');
                $(this).find('.fc-center h2').addClass('mx-3 mt-0');
                $(this).find('.fc-center button').addClass('btn btn-sm btn-icon p-0');
            });

        }
        var InitializePhone = function (elem) {
            $(elem).find('.b-phoneinternational').each(function () {
                var parentselector = $(this).parent();
                var hiddenInputName = $(parentselector).attr('data-name');
                var placeHolder = $(parentselector).attr('data-placeholder');
                var excludeCountries = $(parentselector).attr('data-excludecountries');
                var allowDropdown = ($(parentselector).attr('data-allowdropdown') == 'true');
                var initialCountry = $(parentselector).attr('data-initialcountry');
                var preferredCountries = $(parentselector).attr('data-preferredcountries');
                var autoPlaceholder = $(parentselector).attr('data-autoplaceholder');
                var placeholderNumberType = $(parentselector).attr('data-placeholdertype');
                var isUAE = $(this).attr("uaeonly");
                var onlyCountries = isUAE ? ["ae"] : [];
                $(this).intlTelInput({
                    hiddenInput: hiddenInputName,
                    excludeCountries: [excludeCountries],
                    allowDropdown: allowDropdown,
                    initialCountry: initialCountry,
                    preferredCountries: [preferredCountries],
                    autoPlaceholder: autoPlaceholder,
                    customPlaceholder: function (selectedCountryPlaceholder, selectedCountryData) {
                        if (selectedCountryData.iso2 == 'ae' && placeHolder != "")
                            return placeHolder;
                        else
                            return selectedCountryPlaceholder;
                    },
                    placeholderNumberType: placeholderNumberType,
                    onlyCountries: onlyCountries,
                    separateDialCode: true,
                });
                $(this)[0].addEventListener("countrychange", function () {
                    var prevValue = $(this).intlTelInput('getNumber');
                    var code = "+" + $(this).intlTelInput("getSelectedCountryData").dialCode;
                    if (code != prevValue)
                        $(this).siblings('input:hidden').val(prevValue);
                    else
                        $(this).siblings('input:hidden').val(null);
                });
                var value = $(this).intlTelInput('getNumber');
                var code = "+" + $(this).intlTelInput("getSelectedCountryData").dialCode;
                if (code != value)
                    $(this).siblings('input:hidden').val(value);
                else
                    $(this).siblings('input:hidden').val(null);
                $(this).keyup(function () {
                    var value = $(this).intlTelInput('getNumber');
                    var code = "+" + $(this).intlTelInput("getSelectedCountryData").dialCode;
                    if (code != value)
                        $(this).siblings('input:hidden').val(value);
                    else
                        $(this).siblings('input:hidden').val(null);
                });
            });

        }
        var initializeEid = function (elem) {

            var eidControls = $(elem).find('.v-eid');

            if (eidControls) {
                $(eidControls).each(function () {
                    var eidControl = $(this);
                    if (!eidControl.hasClass('eidInit')) {
                        eidControl.attr('type', 'tel');
                        var pattern = eidControl.data('pattern');
                        if (!pattern)
                            pattern = '{{999}}-{{9999}}-{{9999999}}-{{9}}';

                        var formatter = new Formatter(this, {
                            'pattern': pattern,
                            persistent: true
                        });
                        eidControl.addClass('eidInit');

                        var val = eidControl.val().replace(/[^a-zA-Z 0-9]+/g, "").trim();
                        if (val) {
                            var eidval = eidControl.val();
                            var selectorHidden = eidControl.parent().find('.v-hidden');
                            eidval = eidval.replace(/[^a-zA-Z 0-9]+/g, "");
                            eidval = $.trim(eidval);
                            selectorHidden.val(eidval);
                        }

                    }
                    eidControl.on('keyup', function (e) {
                        var eidval = $(this).val();
                        var selectorHidden = $(this).parent().find('.v-hidden');
                        eidval = eidval.replace(/[^a-zA-Z 0-9]+/g, "");
                        eidval = $.trim(eidval);
                        selectorHidden.val(eidval);
                    });
                });
            }
        }
        var InitializeTooltipTrimmedInput = function (elem) {
            $(elem).find('.hide-1line,.hide-2lines,.hide-3lines,.hide-4lines').each(function (i) {
                if (this.scrollHeight > this.clientHeight) {
                    if (!$(this).hasClass('ignoretooltip')) {
                        $(this).attr('data-original-title', $(this).html());
                        $(this).tooltip();
                    }

                }
            });
        }
        var InitializeImagesErrors = function (elem) {
            $(elem).find("img").each(function () {
                $(this).attr("onerror", "this.src='/assets/bnsights/images/imagenotfound.png'");
            });
        }
        var InitializeDropDownErrors = function (elem) {
            $('body').on('change', '.select.v-required, .select.v-required-select', function () {
                if ($(this).val() != "") {
                    $(this).parents('.form-group').find('.bootstrap-select').removeClass('is-invalid');
                    $(this).parents('.form-group').find('.help-block-error').remove();
                }
            });
        }
        var InitializeMenuLayout = function () {
            // MAIN MENU
            if ($('.kt-menu__nav').length && $('.kt-menu__nav').parent().hasClass('bnsights-horizontal-menu')) {
                var $moreMenuItem = '<li id="autoNavMore" class="auto-nav-more kt-menu__item kt-menu__item--submenu" data-ktmenu-submenu-toggle="hover" aria-haspopup="true"> <a href="javascript:;" class="more-btn kt-menu__link kt-menu__toggle"> <span class="kt-menu__link-text text-lg-center d-lg-block brand_primary-fontcolor"><i class="fa fa-ellipsis-h d-lg-block"></i></span> </a> <div class="kt-menu__submenu kt-menu__submenu--classic kt-menu__submenu--right"> <ul id="autoNavMoreList" class="auto-nav-more-list kt-menu__subnav"> </ul> </div> </li>';

                if (!$('li.auto-nav-more').length)
                    $(".kt-menu__nav").append($moreMenuItem)

                var $mainMenu = $(".kt-header-menu-wrapper");
                var $autoNav = $(".kt-menu__nav");
                var $autoNavMore = $("#autoNavMore");
                var $autoNavMoreList = $("#autoNavMoreList");

                $autoNav.addClass('main-nav');

                // INIT
                Bnsights.Helper.setItemWidth($autoNav, $autoNavMore);
                Bnsights.ControlsHelper.MenuLayout.autoNavMore($mainMenu, $autoNav, $autoNavMore, $autoNavMoreList);
                $(window).resize(function () {
                    setTimeout(function () {
                        Bnsights.Helper.setItemWidth($autoNav, $autoNavMore);
                        Bnsights.ControlsHelper.MenuLayout.autoNavMore($mainMenu, $autoNav, $autoNavMore, $autoNavMoreList);
                    }, 300);
                });
                // MAIN MENU END
            }
        }
        var InitializeImageCropper = function (elem) {
            $(function () {
                $(elem).find('.pv-imageCropperUpload-modal').each(function () {
                    $(this).appendTo('body');
                });
            })
            $(elem).on("click", ".pv-imageCropperUpload-modal [data-imagecropper-method]", function () {

                var parentSelector = $(this).closest('.modal');
                var CanvasWidth = $(parentSelector).data('canvaswidth');
                var CanvasHeight = $(parentSelector).data('canvasheight');
                var ControlId = $(parentSelector).data('controlid');
                var $inputImage = $("#inputImage_" + ControlId + "");
                var $imageCropper = $("#imageCropper_" + ControlId + " img.cropper_img");
                //getdatawidth/dataheight/datacontrolid
                var data = $(this).data(),
                    method = $(this).data('imagecropper-method'),
                    result;
                var SelectorName = $(this).data('control-name');
                var Selector = $(parentSelector).siblings().find($('div[data-control-container="' + SelectorName + '"]'));;
                if (method === 'getCroppedCanvas') {
                    Bnsights.Helper.BlockUI();
                    var src = $imageCropper.attr('src');
                    var res = src.split(";");
                    var imageextension = res[0].split(":")[1];
                    if (imageextension == 'image/jpeg') {
                        var pp = $imageCropper.cropper('getCroppedCanvas', {
                            height: CanvasHeight,
                            width: CanvasWidth,
                            maxWidth: 1050,
                            maxHeight: 200,
                            imageSmoothingEnabled: true,
                            imageSmoothingQuality: 'high',
                        }).toDataURL('image/jpeg', 1);
                        $(Selector).find('.previewImage').attr('src', pp);
                        $(Selector).find('.original-file').val(pp);
                        $(Selector).find('.edit-profilepicture').removeClass('hidden');

                    }
                    else {
                        var pp = $imageCropper.cropper('getCroppedCanvas', {
                            height: CanvasHeight,
                            width: CanvasWidth,
                            maxWidth: 1050,
                            maxHeight: 200,
                            imageSmoothingEnabled: true,
                            imageSmoothingQuality: 'high',
                        }).toDataURL("", 1);
                        $(Selector).find('.previewImage').attr('src', pp);
                        $(Selector).find('.original-file').val(pp);
                        $(Selector).find('.edit-profilepicture').removeClass('hidden');

                    }


                    $(parentSelector).modal('hide');
                    Bnsights.Helper.UnBlockUI();
                    return false;
                }
                else if (method === 'upload') {
                    $inputImage.click();
                    return false;
                }

                if (method) {
                    result = $imageCropper.cropper(method, data.option);
                }

            });
            $(document).on("change", ".pv-imageCropperUpload .fileCropperhidden", function (e) {
                var selectorParent = $(this).parents('.pv-imageCropperUpload');
                var ControlId = $(selectorParent).data("controlid");
                var $imageCropper = $("#imageCropper_" + ControlId + " img.cropper_img");
                var fileReader = new FileReader(),
                    files = this.files,
                    file;

                if (!files.length) {
                    return;
                }

                file = files[0];

                if (/^image\/\w+$/.test(file.type)) {

                    if ($('#imageCropperModal_' + ControlId + '.show').length != 1) {
                        $('#imageCropperModal_' + ControlId + '').modal('show');
                    }
                    fileReader.readAsDataURL(file);
                    fileReader.onload = function () {
                        Bnsights.Helper.BlockUI();
                        var result = this.result;
                        if ($('#imageCropperModal_' + ControlId + '.show').length != 1) {
                            $("#imageCropperModal_" + ControlId + "").on('shown.bs.modal', function () {
                                $imageCropper.cropper("reset", true).cropper("replace", result);
                            });
                        }
                        else {
                            $imageCropper.cropper("reset", true).cropper("replace", result);
                        }
                        $(selectorParent).find('.name-file').val(file.name);
                        $(selectorParent).find('.help-block-error').remove();
                        Bnsights.Helper.UnBlockUI();

                    };
                    $("#imageCropperModal_" + ControlId + "").on('hide.bs.modal', function () {
                        $imageCropper.cropper("destroy");
                        $(this).val('');

                    });
                } else {
                    $(this).parents('form').validate().element(this);
                    Bnsights.Helper.UnBlockUI();
                }
            });
            $("div.modal[id^=imageCropperModal]").on("hidden.bs.modal", function (e) {
                var parentSelector = $(this);
                var SelectorName = $(this).closest('.pv-imageCropperUpload-modal [data-imagecropper-method]').data('control-name');
                var Selector = $(parentSelector).siblings().find($('div[data-control-container="' + SelectorName + '"]'));;
                if ($(Selector).find('.original-file').val() == "" || $(Selector).find('.original-file').val() == undefined) {
                    $('.fileCropperhidden').val('');
                    $(Selector).find('.previewImage').attr('src', '');
                }
            });
        }
        var InitializeTagsInput = function (elem) {
            ($(elem).find('.tagsInput')).each(function (index, value) {
                var tagsInput = this;
                var dataValue = $(tagsInput).data("val");
                if (dataValue != null) {
                    $(this).attr("value", dataValue.Name);
                }
                var hidetagsHead = $(tagsInput).attr("data-hideHead");
                var limit = $(tagsInput).attr("data-limit");
                var onItemAddedFunc = $(tagsInput).attr("data-itemadded");
                var onItemRemovedFunc = $(tagsInput).attr("data-itemremoved");
                var minLengthtoSearch = $(tagsInput).attr("data-minlength");
                var noResult = $(tagsInput).data("noresult");
                $(tagsInput).tagsinput({
                    itemValue: $(this).attr("data-itemValue"), //From the options itemValue
                    itemText: $(this).attr("data-itemText"),// from the options NameVale
                    maxTags: $(this).attr("data-maxtags"),
                    typeaheadjs: [
                        {
                            minLength: parseInt(minLengthtoSearch),
                            highlight: true
                        }, {
                            name: 'engine',
                            displayKey: 'Name',
                            limit: limit,
                            source: function (query, syncresults, asyncresults) {
                                var url = $(tagsInput).data("url");
                                var paramsFilter = $(tagsInput).data('filterparam');
                                var searchQuery = $(tagsInput).data('queryparam');
                                var qs = "?";
                                if (url.indexOf('?') > -1) {
                                    qs = "&";
                                }
                                var currentItems = $(tagsInput).val();
                                if (paramsFilter) {
                                    url = url + qs + searchQuery + "=" + query + "&" + paramsFilter + "=" + currentItems;
                                }
                                else {
                                    url = url + qs + searchQuery + "=" + query;
                                }

                                Bnsights.DisableAjaxBlockUIOnce = true;
                                $.get(encodeURI(url), function (data) {

                                    asyncresults(JSON.parse(data));
                                });
                            },
                            templates: {
                                empty: [
                                    '<div class="kt-notification__item py-2 px-3">' +
                                    '<div class="kt-notification__item-details">' +
                                    '<div class="kt-notification__item-title  text-center">' +
                                    noResult +
                                    '</div>' +
                                    '</div>' +
                                    '</div >'
                                ].join('\n'),
                                suggestion: function (data) {
                                    var userData;
                                    var mode = $(tagsInput).data("mode");
                                    var defaulturl = $(tagsInput).attr("data-defaultImageUrl");
                                    if (mode == "Name") {
                                        userData = '<div class="kt-notification__item py-2 px-3">' +
                                            '<div class="kt-notification__item-details">' +
                                            '<div class="kt-notification__item-title">' +
                                            data.Name +
                                            '</div>' +
                                            '</div>' +
                                            '</div >'
                                    }
                                    else if (mode == "NameandTitle") {
                                        userData = '<div class="kt-notification__item py-2 px-3">' +
                                            '<div class="kt-notification__item-details">' +
                                            '<div class="kt-notification__item-title">' +
                                            data.Name +
                                            '</div>' +
                                            '<div class="kt-notification__item-time">' +
                                            data.Title +
                                            '</div>' +
                                            '</div>' +
                                            '</div >'
                                    }
                                    else if (mode == "NameandTitleandImage") {

                                        userData = '<div class="kt-widget19">' +
                                            '<div class="kt-widget19__wrapper">' +
                                            ' <div class="kt-widget19__content">' +

                                            ' <div class="kt-widget19__userpic">' +
                                            ' <img src=' + data.ImageURL + '>' +
                                            ' </div>' +

                                            ' <div class="kt-widget19__info">' +
                                            ' <span  class="kt-widget19__username">' +
                                            data.Name +
                                            ' </span>' +
                                            '<span class="kt-widget19__time">' +
                                            data.Title +
                                            ' </span>' +
                                            ' </div>' +
                                            '  </div>' +

                                            ' </div>' +
                                            '</div>';
                                    }
                                    else {
                                        userData = '<div class="kt-widget19">' +
                                            '<div class="kt-widget19__wrapper">' +
                                            ' <div class="kt-widget19__content">' +

                                            ' <div class="kt-widget19__userpic">' +
                                            ' <img src=' + data.ImageURL + '>' +
                                            ' </div>' +

                                            ' <div class="kt-widget19__info">' +
                                            ' <span  class="kt-widget19__username">' +
                                            data.Name +
                                            ' </span>' +

                                            ' </div>' +
                                            '  </div>' +

                                            ' </div>' +
                                            '</div>';
                                    }
                                    return userData;
                                }
                            }
                        }]
                });
                if (dataValue != null && dataValue.length > 0) {
                    for (var i = 0; i < dataValue.length; i++) {
                        $(this).tagsinput('add', dataValue[i]);
                    }
                }

                $(tagsInput).on('itemAdded', function (event) {
                    if (hidetagsHead == "True") {
                        $(tagsInput).parents('.pv-tags-input').find(".tag.label.label-info").hide();
                    }
                    var input = $(event.currentTarget).parent().find('.bootstrap-tagsinput input.tt-input');

                    if ($(event.currentTarget).val() != "0" && $(event.currentTarget).val() != "") {

                        $(input).attr('data-oldplaceholder', $(input).attr('placeholder'));
                        $(input).removeAttr('placeholder');

                        if (onItemAddedFunc) {
                            window[onItemAddedFunc](event, tagsInput);
                        }
                    }
                }).on('itemRemoved', function (event) {
                    var input = $(event.currentTarget).parent().find('.bootstrap-tagsinput input.tt-input');
                    if ($(event.currentTarget).val() == "")
                        $(input).attr('placeholder', $(input).attr('data-oldplaceholder'));

                    if (onItemRemovedFunc) {
                        window[onItemAddedFunc](event, tagsInput);

                    }

                });
            });
        }
        var InitializePerfectScrollbar = function (elem) {
            if (window["PerfectScrollbar"] != "undefined") {
                var scrollableElements = $(elem).find('.bnsights-scrollable');
                $(scrollableElements).each(function (index, item) {
                    var scrollX = $(item).attr('data-scroll-x');
                    var scrollY = $(item).attr('data-scroll-y');
                    var ps = new PerfectScrollbar(item, {
                        suppressScrollX: scrollX,
                        suppressScrollY: scrollY
                    });
                });
            }
        }
        var InitializeAutocompleteTagsInput = function (elem) {

            ($(elem).find('.autocompleteTagsInput')).each(function (index, value) {
                var i = 0;
                var obj = [];
                var tagsInput = this;
                var dataValue = $(tagsInput).data("val");
                if (dataValue != null) {
                    $(this).attr("value", dataValue.Name);
                }
                var hidetagsHead = $(tagsInput).attr("data-hideHead");
                var limit = $(tagsInput).attr("data-limit");
                var onItemAddedFunc = $(tagsInput).attr("data-itemadded");
                var onItemRemovedFunc = $(tagsInput).attr("data-itemremoved");
                var minLengthtoSearch = $(tagsInput).attr("data-minlength");
                var noResult = $(tagsInput).data("noresult");
                var allowFreeText = $(tagsInput).data("allowfreetext");
                var name = $(this).data('name');
                var controlID = $(this).data('controlid');
                $(tagsInput).tagsinput({
                    itemValue: $(this).attr("data-itemValue"), //From the options itemValue
                    itemText: $(this).attr("data-itemText"),// from the options NameVale
                    maxTags: $(this).attr("data-maxtags"),
                    allowDuplicates: $(this).attr("data-allowfreetext"),
                    typeaheadjs: [
                        {
                            minLength: parseInt(minLengthtoSearch),
                            highlight: true,

                        }, {
                            name: 'engine',
                            displayKey: 'Name',
                            limit: limit,
                            source: function (query, syncresults, asyncresults) {
                                var url = $(tagsInput).data("url");
                                var paramsFilter = $(tagsInput).data('filterparam');
                                var searchQuery = $(tagsInput).data('queryparam');
                                var qs = "?";
                                if (url.indexOf('?') > -1) {
                                    qs = "&";
                                }
                                var currentItems = $(tagsInput).val();
                                if (paramsFilter) {
                                    url = url + qs + searchQuery + "=" + query + "&" + paramsFilter + "=" + currentItems;
                                }
                                else {
                                    url = url + qs + searchQuery + "=" + query;
                                }

                                Bnsights.DisableAjaxBlockUIOnce = true;
                                $.get(encodeURI(url), function (data) {

                                    asyncresults(JSON.parse(data));
                                });
                            },
                            templates: {
                                empty: [
                                    '<div class="kt-notification__item py-2 px-3">' +
                                    '<div class="kt-notification__item-details">' +
                                    '<div class="kt-notification__item-title  text-center">' +
                                    noResult +
                                    '</div>' +
                                    '</div>' +
                                    '</div >'
                                ].join('\n'),
                                suggestion: function (data) {
                                    var userData;
                                    var mode = $(tagsInput).data("mode");
                                    var defaulturl = $(tagsInput).attr("data-defaultImageUrl");
                                    if (mode == "Name") {
                                        userData = '<div class="kt-notification__item py-2 px-3">' +
                                            '<div class="kt-notification__item-details">' +
                                            '<div class="kt-notification__item-title">' +
                                            data.Name +
                                            '</div>' +
                                            '</div>' +
                                            '</div >'
                                    }
                                    else if (mode == "NameandTitle") {
                                        userData = '<div class="kt-notification__item py-2 px-3">' +
                                            '<div class="kt-notification__item-details">' +
                                            '<div class="kt-notification__item-title">' +
                                            data.Name +
                                            '</div>' +
                                            '<div class="kt-notification__item-time">' +
                                            data.Title +
                                            '</div>' +
                                            '</div>' +
                                            '</div >'
                                    }
                                    else if (mode == "NameandTitleandImage") {

                                        userData = '<div class="kt-widget19">' +
                                            '<div class="kt-widget19__wrapper">' +
                                            ' <div class="kt-widget19__content">' +

                                            ' <div class="kt-widget19__userpic">' +
                                            ' <img src=' + data.ImageURL + '>' +
                                            ' </div>' +

                                            ' <div class="kt-widget19__info">' +
                                            ' <span  class="kt-widget19__username">' +
                                            data.Name +
                                            ' </span>' +
                                            '<span class="kt-widget19__time">' +
                                            data.Title +
                                            ' </span>' +
                                            ' </div>' +
                                            '  </div>' +

                                            ' </div>' +
                                            '</div>';
                                    }
                                    else {
                                        userData = '<div class="kt-widget19">' +
                                            '<div class="kt-widget19__wrapper">' +
                                            ' <div class="kt-widget19__content">' +

                                            ' <div class="kt-widget19__userpic">' +
                                            ' <img src=' + data.ImageURL + '>' +
                                            ' </div>' +

                                            ' <div class="kt-widget19__info">' +
                                            ' <span  class="kt-widget19__username">' +
                                            data.Name +
                                            ' </span>' +

                                            ' </div>' +
                                            '  </div>' +

                                            ' </div>' +
                                            '</div>';
                                    }
                                    return userData;
                                }
                            },
                            change: function (ev, suggestion) {
                                var controlID = $(this).data('controlid');
                                var map = window['autocompleteMap_' + name];

                                if (map[suggestion])
                                    $('[data-controlid=' + controlID + '] .autocomplete-key').val(map[suggestion]);
                                else
                                    $('[data-controlid=' + controlID + '] .autocomplete-key').val('');
                            }

                        }],
                    freetext: allowFreeText
                });
                if (dataValue != null && dataValue.length > 0) {

                    for (var i = 0; i < dataValue.length; i++) {

                        $(this).tagsinput('add', dataValue[i]);
                        $("div[data-controlid=" + controlID + "] .hiddenInputsCrrier").append('<input type="hidden" id="' + name + '[' + i + ']_ID" name="' + name + '[' + i + '].ID" data-namevalue="' + dataValue[i].Name + dataValue[i].ID + '" value="' + dataValue[i].ID + '"/>');
                        $("div[data-controlid=" + controlID + "] .hiddenInputsCrrier").append('<input type="hidden" id="' + name + '[' + i + ']_Name" name="' + name + '[' + i + '].Name" data-namevalue="' + dataValue[i].Name + dataValue[i].ID + '" value="' + dataValue[i].Name + '"/>');
                        obj.push({ index: i, ID: dataValue[i].ID, value: dataValue[i].Name });

                    }
                }
                var count = 0;
                $('body').on('keydown', '.tt-input', function (e) {

                    if (e.keyCode === 13 && allowFreeText == "True") {
                        e.preventDefault();

                        $(tagsInput).tagsinput('add', {
                            ID: "null",
                            Name: $('.tt-input').val(),

                        });

                        $('.tt-input').val("");

                    }
                });
                $(tagsInput).on('itemAdded', function (event) {
                    var controlID = $(this).data('controlid');

                    var newItem = event.item;
                    if (newItem) {
                        obj.push({ index: i, ID: newItem.ID, value: newItem.Name });

                        $("div[data-controlid=" + controlID + "] .hiddenInputsCrrier").append('<input type="hidden" id="' + name + '[' + i + ']_ID" name="' + name + '[' + i + '].ID" data-namevalue="' + newItem.Name + newItem.ID + '" value="' + newItem.ID + '"/>');
                        $("div[data-controlid=" + controlID + "] .hiddenInputsCrrier").append('<input type="hidden" id="' + name + '[' + i + ']_Name" name="' + name + '[' + i + '].Name" data-namevalue="' + newItem.Name + newItem.ID + '" value="' + newItem.Name + '"/>');
                        i++;

                    }

                    if (hidetagsHead == "True") {
                        $(tagsInput).parents('.pv-tags-input').find(".tag.label.label-info").hide();
                    }
                    var input = $(event.currentTarget).parent().find('.bootstrap-tagsinput input.tt-input');

                    if ($(event.currentTarget).val() != "0" && $(event.currentTarget).val() != "") {

                        $(input).attr('data-oldplaceholder', $(input).attr('placeholder'));
                        $(input).removeAttr('placeholder');

                        if (onItemAddedFunc) {
                            window[onItemAddedFunc](event, tagsInput);
                        }
                    }
                }).on('itemRemoved', function (event) {
                    i--;
                    var controlID = $(this).data('controlid');

                    var newItem = event.item;
                    if (newItem) {

                        var deletedID = 0;
                        // data - namevalue="' + newItem.Name + newItem.ID + '"
                        $("input[data-namevalue=" + newItem.Name + newItem.ID + "]").each(function () {
                            var name = $(this).attr("name").split(['[']);
                            var namepart2 = name[1].split([']']);
                            deletedID = namepart2[0];


                            $(this).parents("div[data-controlid=" + controlID + "] .hiddenInputsCrrier").children().remove();

                        });
                        obj.splice(deletedID, 1);
                        for (var h = 0; h < obj.length; h++) {

                            $("div[data-controlid=" + controlID + "] .hiddenInputsCrrier").append('<input type="hidden" id="' + name + '[' + h + ']_ID" name="' + name + '[' + h + '].ID" data-namevalue="' + obj[h].value + obj[h].ID + '" value="' + obj[h].ID + '"/>');
                            $("div[data-controlid=" + controlID + "] .hiddenInputsCrrier").append('<input type="hidden" id="' + name + '[' + h + ']_Name" name="' + name + '[' + h + '].Name" data-namevalue="' + obj[h].value + obj[h].ID + '" value="' + obj[h].value + '"/>');
                        }

                    }
                    var input = $(event.currentTarget).parent().find('.bootstrap-tagsinput input.tt-input');
                    if ($(event.currentTarget).val() == "")
                        $(input).attr('placeholder', $(input).attr('data-oldplaceholder'));

                    if (onItemRemovedFunc) {
                        window[onItemAddedFunc](event, tagsInput);

                    }

                });
            });

        }
        var InitializeAutocompleteWithTagsDiv = function (elem) {
            if ($(elem).find('.auto-complete-with-tags-input').length != 0) {
                if (jQuery().typeahead) {
                    $('body').off('click', '.remove-tag').on('click', '.remove-tag', function () {
                        var $this = $(this);
                        var controlID = sanitizeHTML($this.attr('data-controlid'));
                        var clientSideID = sanitizeHTML($this.attr('data-client-side-id'));
                        var parent = $this.parent();
                        var divToRemove = $("div[data-controlid=" + controlID + "] .hidden-class").find('#' + clientSideID);
                        parent.remove();
                        divToRemove.remove();
                        Bnsights.Helper.AdapteNumber($("div[data-controlid=" + controlID + "] .hidden-class").children());
                    });
                    $(elem).find(".auto-complete-with-tags-input").each(function () {
                        var actionURL = $(this).attr('data-actionurl');
                        var name = sanitizeHTML($(this).attr('name'));
                        var nameAttr = sanitizeHTML($(this).attr("data-name"));
                        var minLength = parseInt($(this).attr("data-min-length-char"));
                        var limit = parseInt($(this).attr("data-max-result"));
                        $(this).typeahead({
                            hint: false,
                            highlight: false,
                            minLength: minLength
                        },
                            {
                                source: function (query, syncResults, asyncResults) {
                                    Bnsights.DisableAjaxBlockUIOnce = true;
                                    if (!actionURL.endsWith("?query="))
                                        actionURL += "?query=";
                                    $.get(actionURL + query, function (data) {
                                        var objects = [];
                                        var map = [];
                                        data = JSON.parse(data);
                                        $.each(data, function (key, value) {
                                            map[value.Name] = value.ID;
                                            objects.push(value.Name);
                                        });
                                        window['autocompleteMap_' + name] = map;
                                        asyncResults(objects);
                                    });
                                },
                                limit: limit
                            });
                        $(this).bind('typeahead:selected', function (ev, suggestion) {
                            var controlID = $(this).data('controlid');
                            var map = window['autocompleteMap_' + name];
                            addTagToMapAutoComplete(map, suggestion, controlID, nameAttr);
                            map = [];
                            $("#" + controlID).typeahead('val', '');
                        }).keypress(function (event) {
                            if (event.keyCode == 13) {
                                event.preventDefault();
                                var controlID = $(this).data('controlid');
                                var map = window['autocompleteMap_' + name];
                                var suggestion = sanitizeHTML($(this).val());
                                if (suggestion == '')
                                    return;
                                addTagToMapAutoComplete(map, suggestion, controlID, nameAttr);
                                $("#" + controlID).typeahead('val', '');
                            }
                        });
                    });
                }
                else {
                    __logMissingPlugin('typeahead', this);
                }
            }
        }
        // Trimming Fn
        var InitializeLineTrimming = function (elem) {
            //if ($(document).line != undefined) {
            //    $(elem).find('.text-to-truncate4').line(4);
            //    $(elem).find('.text-to-truncate3').line(3);
            //    $(elem).find('.text-to-truncate2').line(2);
            //    $(elem).find('.text-to-truncate1').line(1);
            //}
            function isIE() {
                var ua = navigator.userAgent;
                /* MSIE used to detect old browsers and Trident used to newer ones*/
                var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
                return is_ie;
            }
            if (typeof $clamp != "undefined" && $clamp) {
                $($(elem).find('.text-to-truncate4')).each(function (i, element) {
                    $(element).attr("data-desc", element.innerHTML);
                    if (isIE()) {
                        if (element.parentElement.nodeName == "TD") {
                            $clamp(element, { clamp: 6 });
                        } else {
                            $clamp(element, { clamp: 5 });
                        }
                    } else {
                        $clamp(element, { clamp: 4 });
                    }
                    $(element).attr("data-short-desc", element.innerHTML);
                });
                $($(elem).find('.text-to-truncate3')).each(function (i, element) {
                    $(element).attr("data-desc", element.innerHTML);
                    if (isIE()) {
                        if (element.parentElement.nodeName == "TD") {
                            $clamp(element, { clamp: 5 });
                        } else {
                            $clamp(element, { clamp: 4 })
                        }
                    } else {
                        $clamp(element, { clamp: 3 });
                    }
                    $(element).attr("data-short-desc", element.innerHTML);
                });
                $($(elem).find('.text-to-truncate2')).each(function (i, element) {
                    $(element).attr("data-desc", element.innerHTML);
                    if (isIE())
                        $clamp(element, { clamp: 3 });
                    else
                        $clamp(element, { clamp: 2 });
                    $(element).attr("data-short-desc", element.innerHTML);
                });
                $($(elem).find('.text-to-truncate1')).each(function (i, element) {
                    $(element).attr("data-desc", element.innerHTML);
                    if (isIE())
                        $clamp(element, { clamp: 2 });
                    else
                        $clamp(element, { clamp: 1, splitOnChars: ['.', '–', '—', ' '] });
                    $(element).attr("data-short-desc", element.innerHTML);
                });
            }
        }
        return {
            initialize: function () {
                var elem = $('body');
                InitializeAllPlugins(elem);
                InitializeAllCustomPlugins(elem);
                InitializeMenuLayout();
                InitializeMap(elem);
                InitializeTableSearch(elem);
                InitializeTableLogic();
                InitializeTabs(elem);
                InitWordCount();
                InitializeDisabledSelect(elem);
                InitializeSlidePanel();
                InitializeTableFilters(elem);
                InitializeAutocompleteTextbox(elem);
                InitializeSummerNotePlugins(elem);
                InitializeDropDownDateTimePicker();
                InitializeDeleteConfirmation(elem);
                InitializeMultipleFileUpload(elem);
                InitializeMaxLength(elem);
                InitializeCalendar(elem);
                InitializePhone(elem);
                InitializeTooltipTrimmedInput(elem);
                InitializeImagesErrors(elem);
                InitializeTitleToTooltip(elem);
                InitializeReadMore(elem);
                InitializeImageUpload(elem);
                InitializeToggleSwitch(elem);
                InitializeCheckBoxes(elem);
                InitializeDropDownErrors(elem);
                InitializeImageCropper(elem);
                InitializeLangMode(elem);
                InitializeValidations(elem);
                initializeEid(elem);
                InitializeTagsInput(elem);
                InitializeAutocompleteTagsInput(elem);
                var appFunction = elem.attr('data-mainModuleInitializeFunction');
                if (appFunction && appFunction.length != 0)
                    window[appFunction](elem);

                InitializePerfectScrollbar(elem);
                InitializeLineTrimming(elem);
                InitializeAutocompleteWithTagsDiv(elem);

                Bnsights.ClientInitialize(elem);
            },
            reinitialize: function (elem) {
                InitializeTabs(elem);
                InitializeAllPlugins(elem);
                InitializeAllCustomPlugins(elem);
                InitializeLangMode(elem);
                InitWordCount();
                InitializeValidations(elem);
                InitializeTableSearch(elem);
                InitializeMap(elem);
                InitializeInputColoring(elem);
                InitializeDisabledSelect(elem);
                InitializeTableFilters(elem);
                InitializeAutocompleteTextbox(elem);
                InitializeSummerNotePlugins(elem);
                InitializeDropDownDateTimePicker();
                InitializeImageUpload(elem);
                InitializeDeleteConfirmation(elem);
                //InitializeAvatarSwitch(elem);
                InitializeMultipleFileUpload(elem);
                InitializeMaxLength(elem);
                InitializeCalendar(elem);
                InitializePhone(elem);
                InitializeTooltipTrimmedInput(elem);
                InitializeToggleSwitch(elem);
                InitializeImagesErrors(elem);
                InitializeTitleToTooltip(elem);
                InitializeReadMore(elem);
                InitializeCheckBoxes(elem);
                InitializeDropDownErrors(elem);
                InitializeImageCropper(elem);
                initializeEid(elem);
                InitializeTagsInput(elem);
                InitializeAutocompleteTagsInput(elem);
                var appFunction = $('body').attr('data-mainModuleInitializeFunction');
                if (appFunction && appFunction.length != 0)
                    window[appFunction](elem);

                InitializePerfectScrollbar(elem);
                InitializeLineTrimming(elem);
                InitializeAutocompleteWithTagsDiv(elem);
                Bnsights.ClientReinitialize(elem);
            },
        };
    }(),
    ClientInitialize: function (elem) { },
    ClientReinitialize: function (elem) { },
    MultipleFileUploadPostback: function (containerQuery, multipleFilesUploadDTO) {
        var arr;
        if (Array.isArray(multipleFilesUploadDTO))
            arr = multipleFilesUploadDTO;
        else {
            arr = [];
            arr.push(multipleFilesUploadDTO);
        }

        for (var i = 0; i < arr.length; i++) {
            var dto = arr[i];

            var myContainer = containerQuery.find('.pv-multiplefileupload').has(".fileSelector[data-correlationid='" + dto.CorrelationID_GUID + "']");
            for (var j = 0; j < dto.UploadedFiles.length; j++) {
                var file = dto.UploadedFiles[j];

                var removeBtn = myContainer.find(".removeUIFile[data-id='" + file.ScreenID_GUID + "']");
                removeBtn.data("id", file.ID_GUID);
                var newOnclick = removeBtn.attr('onclick').replace(file.ScreenID_GUID, file.ID_GUID);
                removeBtn.attr('onclick', newOnclick);

                removeBtn.removeClass('removeUIFile');
                removeBtn.addClass('removeServerFile');
            }
            myContainer.find('#JSON').val('');
            myContainer.find('#RemovedFiles').val('');
        }
    }
}

$(document).ready(function () {
    $(document).ajaxStart(function () {
    });

    $(document).ajaxSend(function (evt, request, settings) {
        if (typeof settings.headers !== 'undefined') {
            var blockUI = settings.headers["DisableBlockUI"];
            if (typeof blockUI !== 'undefined' && blockUI) {
                return;
            }
        }

        if (!Bnsights.DisableSiteAjaxBlockUI) {
            Bnsights.Helper.BlockUI();
        }
    });
    $(document).ajaxSuccess(function () {
        if ($.active <= 1) {
            Bnsights.Helper.UnBlockUI();
        }
    });
    $.ajaxSetup({
        cache: false,
        beforeSend: function (xhr) {
            var token = $('head').data('token');
            var permset = $('head').data('permset');
            if (token) {
                xhr.setRequestHeader('token', token);
            }
            if (permset) {
                xhr.setRequestHeader('permset', permset);
            }
            ajaxSetup_beforeSend(xhr);
        }
    });
    $(document).ajaxError(function (event, jqXHR, settings, exception) {
        //if (!Bnsights.DisableAjaxErrorHandling) {
        //    Bnsights.Helper.UnBlockUI();
        //    if (exception == "timeout" || jqXHR.readyState == 0 || jqXHR.status === 401) {
        //        if (Bnsights.isEnglish) {
        //            Bnsights.Helper.NotifyError("Connection Error! Please check your connection.");
        //        } else {
        //            Bnsights.Helper.NotifyError("حدث خطأ في الاتصال, من فضلك التحقق من الاتصال");
        //        }
        //    } else if (exception == "Unauthorized") {
        //        location.href = "/Home/Login?au=1";
        //    }
        //    else Bnsights.Helper.NotifyError();
        //}
        if (!Bnsights.DisableAjaxErrorHandling) {
            Bnsights.Helper.UnBlockUI();
            if (exception == "timeout" || jqXHR.readyState == 0 || jqXHR.status === 401)
                Bnsights.Helper.NotifyError(Bnsights.isEnglish ? "Connection Error! Please check your connection." : "حدث خطأ في الاتصال, من فضلك التحقق من الاتصال");
            else if (exception == "Unauthorized")
                location.href = "/Home/Login?au=1";
            else if (jqXHR.status === 402) {
                if (jqXHR.responseJSON) {
                    var model = jqXHR.responseJSON;
                    if (model.mode === "redirect") {
                        var encodedUrl = encodeURI(model.redirect_url);
                        isOriginSameAsLocation(encodedUrl);
                        location.href = encodedUrl;
                    }
                    else if (model.mode === "reload") {
                        var encodedUrl = encodeURI(window.location.href);
                        isOriginSameAsLocation(encodedUrl);
                        location.href = encodedUrl;
                    }
                    else
                        showUnAuthorizedModal();
                }
                else
                    location.href = encodeURI(jqXHR.responseText + "?" + Bnsights.RedirectKey + "=" + window.location.href);
            }
            else Bnsights.Helper.NotifyError();
        }
    });
    // in case of nested modals, maintains the modal-open class on the body, fixes Scrolling Gets Disabled
    $('body').on('hidden.bs.modal', function () {
        if ($('.modal.show').length > 0) {
            $('body').addClass('modal-open');
        }
    });
    Bnsights.MainModule.initialize();
});
function __logMissingPlugin(plugin, elem) {
    console.log('Bnsights: Plugin "' + plugin + '" is not referenced and it is used by the below element');
    console.log($(elem)[0]);
}
function addTagToMapAutoComplete(map, suggestion, controlID, nameAttr) {
    var currentValues = getCurrentTagsControlValue(controlID);
    if (jQuery.inArray(suggestion, currentValues) !== -1)
        return;

    var id = Bnsights.Helper.GenerateGuid();
    var currentLength = $("div[data-controlid=" + controlID + "] .hidden-class").children().length;
    if (map[suggestion]) {
        var newItem = map[suggestion];
        $("div[data-controlid=" + controlID + "] .hidden-class").append('<div id=' + id + '><input type="hidden" id="' + nameAttr + '[' + currentLength + ']_ID" name="' + nameAttr + '[' + currentLength + '].ID" ' + '" value="' + newItem + '"/>' +
            '<input type="hidden" class="name" id="' + nameAttr + '[' + currentLength + ']_Name" name="' + nameAttr + '[' + currentLength + '].Name" ' + '" value="' + suggestion + '"/>' +
            '<input type="hidden" id="' + nameAttr + '[' + currentLength + ']_ClienSideID" name="' + nameAttr + '[' + currentLength + '].ClienSideID"' + '" value="' + id + '"/></div>');
    }
    else {
        $("div[data-controlid=" + controlID + "] .hidden-class").append('<div id=' + id + '><input type="hidden" class="name" id="' + nameAttr + '[' + currentLength + ']_Name" name="' + nameAttr + '[' + currentLength + '].Name" ' + '" value="' + suggestion + '"/>' +
            '<input type="hidden" id="' + nameAttr + '[' + currentLength + ']_ClienSideID" name="' + nameAttr + '[' + currentLength + '].ClienSideID"' + '" value="' + id + '"/> </div>');
    }
    $("div[data-controlid=" + controlID + "] .tags-class").append('<span class="chip px-2 py-1 mr-2"><label>' + suggestion + '</label><a href="javascript:;" class="remove-tag ml-2" data-controlid=' + controlID + ' data-client-side-id=' + id + '><i class="fas fa-times"></i></a> </span>');
}
function getCurrentTagsControlValue(controlID) {
    var currenValues = [];
    $.each($("div[data-controlid=" + controlID + "] .hidden-class").children(), function (key, elem) {
        currenValues.push($(elem).find('.name').val());
    });
    return currenValues;
}
// replaces all occurences of a string in a string
String.prototype.replaceAll = function (find, replaceWith) {
    if (!replaceWith)
        replaceWith = '';

    return this.split(find).join(replaceWith)
};
function getFileType(extension) {
    var dict = [];
    dict.push({ key: '.msg', value: 'application/vnd.ms-outlook' }); dict.push({ key: '.eml', value: 'application/octet-stream' });
    dict.push({ key: '.323', value: 'text/h323' }); dict.push({ key: '.3g2', value: 'video/3gpp2' }); dict.push({ key: '.3gp', value: 'video/3gpp' }); dict.push({ key: '.3gp2', value: 'video/3gpp2' }); dict.push({ key: '.3gpp', value: 'video/3gpp' }); dict.push({ key: '.7z', value: 'application/x-7z-compressed' }); dict.push({ key: '.aa', value: 'audio/audible' }); dict.push({ key: '.AAC', value: 'audio/aac' }); dict.push({ key: '.aaf', value: 'application/octet-stream' }); dict.push({ key: '.aax', value: 'audio/vnd.audible.aax' }); dict.push({ key: '.ac3', value: 'audio/ac3' }); dict.push({ key: '.aca', value: 'application/octet-stream' }); dict.push({ key: '.accda', value: 'application/msaccess.addin' }); dict.push({ key: '.accdb', value: 'application/msaccess' }); dict.push({ key: '.accdc', value: 'application/msaccess.cab' }); dict.push({ key: '.accde', value: 'application/msaccess' }); dict.push({ key: '.accdr', value: 'application/msaccess.runtime' }); dict.push({ key: '.accdt', value: 'application/msaccess' }); dict.push({ key: '.accdw', value: 'application/msaccess.webapplication' }); dict.push({ key: '.accft', value: 'application/msaccess.ftemplate' }); dict.push({ key: '.acx', value: 'application/internet-property-stream' }); dict.push({ key: '.AddIn', value: 'text/xml' }); dict.push({ key: '.ade', value: 'application/msaccess' }); dict.push({ key: '.adobebridge', value: 'application/x-bridge-url' }); dict.push({ key: '.adp', value: 'application/msaccess' }); dict.push({ key: '.ADT', value: 'audio/vnd.dlna.adts' }); dict.push({ key: '.ADTS', value: 'audio/aac' }); dict.push({ key: '.afm', value: 'application/octet-stream' }); dict.push({ key: '.ai', value: 'application/postscript' }); dict.push({ key: '.aif', value: 'audio/aiff' }); dict.push({ key: '.aifc', value: 'audio/aiff' }); dict.push({ key: '.aiff', value: 'audio/aiff' }); dict.push({ key: '.air', value: 'application/vnd.adobe.air-application-installer-package+zip' }); dict.push({ key: '.amc', value: 'application/mpeg' }); dict.push({ key: '.anx', value: 'application/annodex' }); dict.push({ key: '.apk', value: 'application/vnd.android.package-archive' }); dict.push({ key: '.application', value: 'application/x-ms-application' }); dict.push({ key: '.art', value: 'image/x-jg' }); dict.push({ key: '.asa', value: 'application/xml' }); dict.push({ key: '.asax', value: 'application/xml' }); dict.push({ key: '.ascx', value: 'application/xml' }); dict.push({ key: '.asd', value: 'application/octet-stream' }); dict.push({ key: '.asf', value: 'video/x-ms-asf' }); dict.push({ key: '.ashx', value: 'application/xml' }); dict.push({ key: '.asi', value: 'application/octet-stream' }); dict.push({ key: '.asm', value: 'text/plain' }); dict.push({ key: '.asmx', value: 'application/xml' }); dict.push({ key: '.aspx', value: 'application/xml' }); dict.push({ key: '.asr', value: 'video/x-ms-asf' }); dict.push({ key: '.asx', value: 'video/x-ms-asf' }); dict.push({ key: '.atom', value: 'application/atom+xml' }); dict.push({ key: '.au', value: 'audio/basic' }); dict.push({ key: '.avi', value: 'video/x-msvideo' }); dict.push({ key: '.axa', value: 'audio/annodex' }); dict.push({ key: '.axs', value: 'application/olescript' }); dict.push({ key: '.axv', value: 'video/annodex' }); dict.push({ key: '.bas', value: 'text/plain' }); dict.push({ key: '.bcpio', value: 'application/x-bcpio' }); dict.push({ key: '.bin', value: 'application/octet-stream' }); dict.push({ key: '.bmp', value: 'image/bmp' }); dict.push({ key: '.c', value: 'text/plain' }); dict.push({ key: '.cab', value: 'application/octet-stream' }); dict.push({ key: '.caf', value: 'audio/x-caf' }); dict.push({ key: '.calx', value: 'application/vnd.ms-office.calx' }); dict.push({ key: '.cat', value: 'application/vnd.ms-pki.seccat' }); dict.push({ key: '.cc', value: 'text/plain' }); dict.push({ key: '.cd', value: 'text/plain' }); dict.push({ key: '.cdda', value: 'audio/aiff' }); dict.push({ key: '.cdf', value: 'application/x-cdf' }); dict.push({ key: '.cer', value: 'application/x-x509-ca-cert' }); dict.push({ key: '.cfg', value: 'text/plain' }); dict.push({ key: '.chm', value: 'application/octet-stream' }); dict.push({ key: '.class', value: 'application/x-java-applet' }); dict.push({ key: '.clp', value: 'application/x-msclip' }); dict.push({ key: '.cmd', value: 'text/plain' }); dict.push({ key: '.cmx', value: 'image/x-cmx' }); dict.push({ key: '.cnf', value: 'text/plain' }); dict.push({ key: '.cod', value: 'image/cis-cod' }); dict.push({ key: '.config', value: 'application/xml' }); dict.push({ key: '.contact', value: 'text/x-ms-contact' }); dict.push({ key: '.coverage', value: 'application/xml' }); dict.push({ key: '.cpio', value: 'application/x-cpio' }); dict.push({ key: '.cpp', value: 'text/plain' }); dict.push({ key: '.crd', value: 'application/x-mscardfile' }); dict.push({ key: '.crl', value: 'application/pkix-crl' }); dict.push({ key: '.crt', value: 'application/x-x509-ca-cert' }); dict.push({ key: '.cs', value: 'text/plain' }); dict.push({ key: '.csdproj', value: 'text/plain' }); dict.push({ key: '.csh', value: 'application/x-csh' }); dict.push({ key: '.csproj', value: 'text/plain' }); dict.push({ key: '.css', value: 'text/css' }); dict.push({ key: '.csv', value: 'text/csv' }); dict.push({ key: '.cur', value: 'application/octet-stream' }); dict.push({ key: '.cxx', value: 'text/plain' }); dict.push({ key: '.dat', value: 'application/octet-stream' }); dict.push({ key: '.datasource', value: 'application/xml' }); dict.push({ key: '.dbproj', value: 'text/plain' }); dict.push({ key: '.dcr', value: 'application/x-director' }); dict.push({ key: '.def', value: 'text/plain' }); dict.push({ key: '.deploy', value: 'application/octet-stream' }); dict.push({ key: '.der', value: 'application/x-x509-ca-cert' }); dict.push({ key: '.dgml', value: 'application/xml' }); dict.push({ key: '.dib', value: 'image/bmp' }); dict.push({ key: '.dif', value: 'video/x-dv' }); dict.push({ key: '.dir', value: 'application/x-director' }); dict.push({ key: '.disco', value: 'text/xml' }); dict.push({ key: '.divx', value: 'video/divx' }); dict.push({ key: '.dll', value: 'application/x-msdownload' }); dict.push({ key: '.dll.config', value: 'text/xml' }); dict.push({ key: '.dlm', value: 'text/dlm' }); dict.push({ key: '.doc', value: 'application/msword' }); dict.push({ key: '.docm', value: 'application/vnd.ms-word.document.macroEnabled.12' }); dict.push({ key: '.docx', value: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }); dict.push({ key: '.dot', value: 'application/msword' }); dict.push({ key: '.dotm', value: 'application/vnd.ms-word.template.macroEnabled.12' }); dict.push({ key: '.dotx', value: 'application/vnd.openxmlformats-officedocument.wordprocessingml.template' }); dict.push({ key: '.dsp', value: 'application/octet-stream' }); dict.push({ key: '.dsw', value: 'text/plain' }); dict.push({ key: '.dtd', value: 'text/xml' }); dict.push({ key: '.dtsConfig', value: 'text/xml' }); dict.push({ key: '.dv', value: 'video/x-dv' }); dict.push({ key: '.dvi', value: 'application/x-dvi' }); dict.push({ key: '.dwf', value: 'drawing/x-dwf' }); dict.push({ key: '.dwp', value: 'application/octet-stream' }); dict.push({ key: '.dxr', value: 'application/x-director' }); dict.push({ key: '.eml', value: 'message/rfc822' }); dict.push({ key: '.emz', value: 'application/octet-stream' }); dict.push({ key: '.eot', value: 'application/vnd.ms-fontobject' }); dict.push({ key: '.eps', value: 'application/postscript' }); dict.push({ key: '.etl', value: 'application/etl' }); dict.push({ key: '.etx', value: 'text/x-setext' }); dict.push({ key: '.evy', value: 'application/envoy' }); dict.push({ key: '.exe', value: 'application/octet-stream' }); dict.push({ key: '.exe.config', value: 'text/xml' }); dict.push({ key: '.fdf', value: 'application/vnd.fdf' }); dict.push({ key: '.fif', value: 'application/fractals' }); dict.push({ key: '.filters', value: 'application/xml' }); dict.push({ key: '.fla', value: 'application/octet-stream' }); dict.push({ key: '.flac', value: 'audio/flac' }); dict.push({ key: '.flr', value: 'x-world/x-vrml' }); dict.push({ key: '.flv', value: 'video/x-flv' }); dict.push({ key: '.fsscript', value: 'application/fsharp-script' }); dict.push({ key: '.fsx', value: 'application/fsharp-script' }); dict.push({ key: '.generictest', value: 'application/xml' }); dict.push({ key: '.gif', value: 'image/gif' }); dict.push({ key: '.gpx', value: 'application/gpx+xml' }); dict.push({ key: '.group', value: 'text/x-ms-group' }); dict.push({ key: '.gsm', value: 'audio/x-gsm' }); dict.push({ key: '.gtar', value: 'application/x-gtar' }); dict.push({ key: '.gz', value: 'application/x-gzip' }); dict.push({ key: '.h', value: 'text/plain' }); dict.push({ key: '.hdf', value: 'application/x-hdf' }); dict.push({ key: '.hdml', value: 'text/x-hdml' }); dict.push({ key: '.hhc', value: 'application/x-oleobject' }); dict.push({ key: '.hhk', value: 'application/octet-stream' }); dict.push({ key: '.hhp', value: 'application/octet-stream' }); dict.push({ key: '.hlp', value: 'application/winhlp' }); dict.push({ key: '.hpp', value: 'text/plain' }); dict.push({ key: '.hqx', value: 'application/mac-binhex40' }); dict.push({ key: '.hta', value: 'application/hta' }); dict.push({ key: '.htc', value: 'text/x-component' }); dict.push({ key: '.htm', value: 'text/html' }); dict.push({ key: '.html', value: 'text/html' }); dict.push({ key: '.htt', value: 'text/webviewhtml' }); dict.push({ key: '.hxa', value: 'application/xml' }); dict.push({ key: '.hxc', value: 'application/xml' }); dict.push({ key: '.hxd', value: 'application/octet-stream' }); dict.push({ key: '.hxe', value: 'application/xml' }); dict.push({ key: '.hxf', value: 'application/xml' }); dict.push({ key: '.hxh', value: 'application/octet-stream' }); dict.push({ key: '.hxi', value: 'application/octet-stream' }); dict.push({ key: '.hxk', value: 'application/xml' }); dict.push({ key: '.hxq', value: 'application/octet-stream' }); dict.push({ key: '.hxr', value: 'application/octet-stream' }); dict.push({ key: '.hxs', value: 'application/octet-stream' }); dict.push({ key: '.hxt', value: 'text/html' }); dict.push({ key: '.hxv', value: 'application/xml' }); dict.push({ key: '.hxw', value: 'application/octet-stream' }); dict.push({ key: '.hxx', value: 'text/plain' }); dict.push({ key: '.i', value: 'text/plain' }); dict.push({ key: '.ico', value: 'image/x-icon' }); dict.push({ key: '.ics', value: 'application/octet-stream' }); dict.push({ key: '.idl', value: 'text/plain' }); dict.push({ key: '.ief', value: 'image/ief' }); dict.push({ key: '.iii', value: 'application/x-iphone' }); dict.push({ key: '.inc', value: 'text/plain' }); dict.push({ key: '.inf', value: 'application/octet-stream' }); dict.push({ key: '.ini', value: 'text/plain' }); dict.push({ key: '.inl', value: 'text/plain' }); dict.push({ key: '.ins', value: 'application/x-internet-signup' }); dict.push({ key: '.ipa', value: 'application/x-itunes-ipa' }); dict.push({ key: '.ipg', value: 'application/x-itunes-ipg' }); dict.push({ key: '.ipproj', value: 'text/plain' }); dict.push({ key: '.ipsw', value: 'application/x-itunes-ipsw' }); dict.push({ key: '.iqy', value: 'text/x-ms-iqy' }); dict.push({ key: '.isp', value: 'application/x-internet-signup' }); dict.push({ key: '.ite', value: 'application/x-itunes-ite' }); dict.push({ key: '.itlp', value: 'application/x-itunes-itlp' }); dict.push({ key: '.itms', value: 'application/x-itunes-itms' }); dict.push({ key: '.itpc', value: 'application/x-itunes-itpc' }); dict.push({ key: '.IVF', value: 'video/x-ivf' }); dict.push({ key: '.jar', value: 'application/java-archive' }); dict.push({ key: '.java', value: 'application/octet-stream' }); dict.push({ key: '.jck', value: 'application/liquidmotion' }); dict.push({ key: '.jcz', value: 'application/liquidmotion' }); dict.push({ key: '.jfif', value: 'image/pjpeg' }); dict.push({ key: '.jnlp', value: 'application/x-java-jnlp-file' }); dict.push({ key: '.jpb', value: 'application/octet-stream' }); dict.push({ key: '.jpe', value: 'image/jpeg' }); dict.push({ key: '.jpeg', value: 'image/jpeg' }); dict.push({ key: '.jpg', value: 'image/jpeg' }); dict.push({ key: '.js', value: 'application/javascript' }); dict.push({ key: '.json', value: 'application/json' }); dict.push({ key: '.jsx', value: 'text/jscript' }); dict.push({ key: '.jsxbin', value: 'text/plain' }); dict.push({ key: '.latex', value: 'application/x-latex' }); dict.push({ key: '.library-ms', value: 'application/windows-library+xml' }); dict.push({ key: '.lit', value: 'application/x-ms-reader' }); dict.push({ key: '.loadtest', value: 'application/xml' }); dict.push({ key: '.lpk', value: 'application/octet-stream' }); dict.push({ key: '.lsf', value: 'video/x-la-asf' }); dict.push({ key: '.lst', value: 'text/plain' }); dict.push({ key: '.lsx', value: 'video/x-la-asf' }); dict.push({ key: '.lzh', value: 'application/octet-stream' }); dict.push({ key: '.m13', value: 'application/x-msmediaview' }); dict.push({ key: '.m14', value: 'application/x-msmediaview' }); dict.push({ key: '.m1v', value: 'video/mpeg' }); dict.push({ key: '.m2t', value: 'video/vnd.dlna.mpeg-tts' }); dict.push({ key: '.m2ts', value: 'video/vnd.dlna.mpeg-tts' }); dict.push({ key: '.m2v', value: 'video/mpeg' }); dict.push({ key: '.m3u', value: 'audio/x-mpegurl' }); dict.push({ key: '.m3u8', value: 'audio/x-mpegurl' }); dict.push({ key: '.m4a', value: 'audio/m4a' }); dict.push({ key: '.m4b', value: 'audio/m4b' }); dict.push({ key: '.m4p', value: 'audio/m4p' }); dict.push({ key: '.m4r', value: 'audio/x-m4r' }); dict.push({ key: '.m4v', value: 'video/x-m4v' }); dict.push({ key: '.mac', value: 'image/x-macpaint' }); dict.push({ key: '.mak', value: 'text/plain' }); dict.push({ key: '.man', value: 'application/x-troff-man' }); dict.push({ key: '.manifest', value: 'application/x-ms-manifest' }); dict.push({ key: '.map', value: 'text/plain' }); dict.push({ key: '.master', value: 'application/xml' }); dict.push({ key: '.mda', value: 'application/msaccess' }); dict.push({ key: '.mdb', value: 'application/x-msaccess' }); dict.push({ key: '.mde', value: 'application/msaccess' }); dict.push({ key: '.mdp', value: 'application/octet-stream' }); dict.push({ key: '.me', value: 'application/x-troff-me' }); dict.push({ key: '.mfp', value: 'application/x-shockwave-flash' }); dict.push({ key: '.mht', value: 'message/rfc822' }); dict.push({ key: '.mhtml', value: 'message/rfc822' }); dict.push({ key: '.mid', value: 'audio/mid' }); dict.push({ key: '.midi', value: 'audio/mid' }); dict.push({ key: '.mix', value: 'application/octet-stream' }); dict.push({ key: '.mk', value: 'text/plain' }); dict.push({ key: '.mmf', value: 'application/x-smaf' }); dict.push({ key: '.mno', value: 'text/xml' }); dict.push({ key: '.mny', value: 'application/x-msmoney' }); dict.push({ key: '.mod', value: 'video/mpeg' }); dict.push({ key: '.mov', value: 'video/quicktime' }); dict.push({ key: '.movie', value: 'video/x-sgi-movie' }); dict.push({ key: '.mp2', value: 'video/mpeg' }); dict.push({ key: '.mp2v', value: 'video/mpeg' }); dict.push({ key: '.mp3', value: 'audio/mpeg' }); dict.push({ key: '.mp4', value: 'video/mp4' }); dict.push({ key: '.mp4v', value: 'video/mp4' }); dict.push({ key: '.mpa', value: 'video/mpeg' }); dict.push({ key: '.mpe', value: 'video/mpeg' }); dict.push({ key: '.mpeg', value: 'video/mpeg' }); dict.push({ key: '.mpf', value: 'application/vnd.ms-mediapackage' }); dict.push({ key: '.mpg', value: 'video/mpeg' }); dict.push({ key: '.mpp', value: 'application/vnd.ms-project' }); dict.push({ key: '.mpv2', value: 'video/mpeg' }); dict.push({ key: '.mqv', value: 'video/quicktime' }); dict.push({ key: '.ms', value: 'application/x-troff-ms' }); dict.push({ key: '.msi', value: 'application/octet-stream' }); dict.push({ key: '.mso', value: 'application/octet-stream' }); dict.push({ key: '.mts', value: 'video/vnd.dlna.mpeg-tts' }); dict.push({ key: '.mtx', value: 'application/xml' }); dict.push({ key: '.mvb', value: 'application/x-msmediaview' }); dict.push({ key: '.mvc', value: 'application/x-miva-compiled' }); dict.push({ key: '.mxp', value: 'application/x-mmxp' }); dict.push({ key: '.nc', value: 'application/x-netcdf' }); dict.push({ key: '.nsc', value: 'video/x-ms-asf' }); dict.push({ key: '.nws', value: 'message/rfc822' }); dict.push({ key: '.ocx', value: 'application/octet-stream' }); dict.push({ key: '.oda', value: 'application/oda' }); dict.push({ key: '.odb', value: 'application/vnd.oasis.opendocument.database' }); dict.push({ key: '.odc', value: 'application/vnd.oasis.opendocument.chart' }); dict.push({ key: '.odf', value: 'application/vnd.oasis.opendocument.formula' }); dict.push({ key: '.odg', value: 'application/vnd.oasis.opendocument.graphics' }); dict.push({ key: '.odh', value: 'text/plain' }); dict.push({ key: '.odi', value: 'application/vnd.oasis.opendocument.image' }); dict.push({ key: '.odl', value: 'text/plain' }); dict.push({ key: '.odm', value: 'application/vnd.oasis.opendocument.text-master' }); dict.push({ key: '.odp', value: 'application/vnd.oasis.opendocument.presentation' }); dict.push({ key: '.ods', value: 'application/vnd.oasis.opendocument.spreadsheet' }); dict.push({ key: '.odt', value: 'application/vnd.oasis.opendocument.text' }); dict.push({ key: '.oga', value: 'audio/ogg' }); dict.push({ key: '.ogg', value: 'audio/ogg' }); dict.push({ key: '.ogv', value: 'video/ogg' }); dict.push({ key: '.ogx', value: 'application/ogg' }); dict.push({ key: '.one', value: 'application/onenote' }); dict.push({ key: '.onea', value: 'application/onenote' }); dict.push({ key: '.onepkg', value: 'application/onenote' }); dict.push({ key: '.onetmp', value: 'application/onenote' }); dict.push({ key: '.onetoc', value: 'application/onenote' }); dict.push({ key: '.onetoc2', value: 'application/onenote' }); dict.push({ key: '.opus', value: 'audio/ogg' }); dict.push({ key: '.orderedtest', value: 'application/xml' }); dict.push({ key: '.osdx', value: 'application/opensearchdescription+xml' }); dict.push({ key: '.otf', value: 'application/font-sfnt' }); dict.push({ key: '.otg', value: 'application/vnd.oasis.opendocument.graphics-template' }); dict.push({ key: '.oth', value: 'application/vnd.oasis.opendocument.text-web' }); dict.push({ key: '.otp', value: 'application/vnd.oasis.opendocument.presentation-template' }); dict.push({ key: '.ots', value: 'application/vnd.oasis.opendocument.spreadsheet-template' }); dict.push({ key: '.ott', value: 'application/vnd.oasis.opendocument.text-template' }); dict.push({ key: '.oxt', value: 'application/vnd.openofficeorg.extension' }); dict.push({ key: '.p10', value: 'application/pkcs10' }); dict.push({ key: '.p12', value: 'application/x-pkcs12' }); dict.push({ key: '.p7b', value: 'application/x-pkcs7-certificates' }); dict.push({ key: '.p7c', value: 'application/pkcs7-mime' }); dict.push({ key: '.p7m', value: 'application/pkcs7-mime' }); dict.push({ key: '.p7r', value: 'application/x-pkcs7-certreqresp' }); dict.push({ key: '.p7s', value: 'application/pkcs7-signature' }); dict.push({ key: '.pbm', value: 'image/x-portable-bitmap' }); dict.push({ key: '.pcast', value: 'application/x-podcast' }); dict.push({ key: '.pct', value: 'image/pict' }); dict.push({ key: '.pcx', value: 'application/octet-stream' }); dict.push({ key: '.pcz', value: 'application/octet-stream' }); dict.push({ key: '.pdf', value: 'application/pdf' }); dict.push({ key: '.pfb', value: 'application/octet-stream' }); dict.push({ key: '.pfm', value: 'application/octet-stream' }); dict.push({ key: '.pfx', value: 'application/x-pkcs12' }); dict.push({ key: '.pgm', value: 'image/x-portable-graymap' }); dict.push({ key: '.pic', value: 'image/pict' }); dict.push({ key: '.pict', value: 'image/pict' }); dict.push({ key: '.pkgdef', value: 'text/plain' }); dict.push({ key: '.pkgundef', value: 'text/plain' }); dict.push({ key: '.pko', value: 'application/vnd.ms-pki.pko' }); dict.push({ key: '.pls', value: 'audio/scpls' }); dict.push({ key: '.pma', value: 'application/x-perfmon' }); dict.push({ key: '.pmc', value: 'application/x-perfmon' }); dict.push({ key: '.pml', value: 'application/x-perfmon' }); dict.push({ key: '.pmr', value: 'application/x-perfmon' }); dict.push({ key: '.pmw', value: 'application/x-perfmon' }); dict.push({ key: '.png', value: 'image/png' }); dict.push({ key: '.pnm', value: 'image/x-portable-anymap' }); dict.push({ key: '.pnt', value: 'image/x-macpaint' }); dict.push({ key: '.pntg', value: 'image/x-macpaint' }); dict.push({ key: '.pnz', value: 'image/png' }); dict.push({ key: '.pot', value: 'application/vnd.ms-powerpoint' }); dict.push({ key: '.potm', value: 'application/vnd.ms-powerpoint.template.macroEnabled.12' }); dict.push({ key: '.potx', value: 'application/vnd.openxmlformats-officedocument.presentationml.template' }); dict.push({ key: '.ppa', value: 'application/vnd.ms-powerpoint' }); dict.push({ key: '.ppam', value: 'application/vnd.ms-powerpoint.addin.macroEnabled.12' }); dict.push({ key: '.ppm', value: 'image/x-portable-pixmap' }); dict.push({ key: '.pps', value: 'application/vnd.ms-powerpoint' }); dict.push({ key: '.ppsm', value: 'application/vnd.ms-powerpoint.slideshow.macroEnabled.12' }); dict.push({ key: '.ppsx', value: 'application/vnd.openxmlformats-officedocument.presentationml.slideshow' }); dict.push({ key: '.ppt', value: 'application/vnd.ms-powerpoint' }); dict.push({ key: '.pptm', value: 'application/vnd.ms-powerpoint.presentation.macroEnabled.12' }); dict.push({ key: '.pptx', value: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' }); dict.push({ key: '.prf', value: 'application/pics-rules' }); dict.push({ key: '.prm', value: 'application/octet-stream' }); dict.push({ key: '.prx', value: 'application/octet-stream' }); dict.push({ key: '.ps', value: 'application/postscript' }); dict.push({ key: '.psc1', value: 'application/PowerShell' }); dict.push({ key: '.psd', value: 'application/octet-stream' }); dict.push({ key: '.psess', value: 'application/xml' }); dict.push({ key: '.psm', value: 'application/octet-stream' }); dict.push({ key: '.psp', value: 'application/octet-stream' }); dict.push({ key: '.pub', value: 'application/x-mspublisher' }); dict.push({ key: '.pwz', value: 'application/vnd.ms-powerpoint' }); dict.push({ key: '.qht', value: 'text/x-html-insertion' }); dict.push({ key: '.qhtm', value: 'text/x-html-insertion' }); dict.push({ key: '.qt', value: 'video/quicktime' }); dict.push({ key: '.qti', value: 'image/x-quicktime' }); dict.push({ key: '.qtif', value: 'image/x-quicktime' }); dict.push({ key: '.qtl', value: 'application/x-quicktimeplayer' }); dict.push({ key: '.qxd', value: 'application/octet-stream' }); dict.push({ key: '.ra', value: 'audio/x-pn-realaudio' }); dict.push({ key: '.ram', value: 'audio/x-pn-realaudio' }); dict.push({ key: '.rar', value: 'application/x-rar-compressed' }); dict.push({ key: '.ras', value: 'image/x-cmu-raster' }); dict.push({ key: '.rat', value: 'application/rat-file' }); dict.push({ key: '.rc', value: 'text/plain' }); dict.push({ key: '.rc2', value: 'text/plain' }); dict.push({ key: '.rct', value: 'text/plain' }); dict.push({ key: '.rdlc', value: 'application/xml' }); dict.push({ key: '.reg', value: 'text/plain' }); dict.push({ key: '.resx', value: 'application/xml' }); dict.push({ key: '.rf', value: 'image/vnd.rn-realflash' }); dict.push({ key: '.rgb', value: 'image/x-rgb' }); dict.push({ key: '.rgs', value: 'text/plain' }); dict.push({ key: '.rm', value: 'application/vnd.rn-realmedia' }); dict.push({ key: '.rmi', value: 'audio/mid' }); dict.push({ key: '.rmp', value: 'application/vnd.rn-rn_music_package' }); dict.push({ key: '.roff', value: 'application/x-troff' }); dict.push({ key: '.rpm', value: 'audio/x-pn-realaudio-plugin' }); dict.push({ key: '.rqy', value: 'text/x-ms-rqy' }); dict.push({ key: '.rtf', value: 'application/rtf' }); dict.push({ key: '.rtx', value: 'text/richtext' }); dict.push({ key: '.ruleset', value: 'application/xml' }); dict.push({ key: '.s', value: 'text/plain' }); dict.push({ key: '.safariextz', value: 'application/x-safari-safariextz' }); dict.push({ key: '.scd', value: 'application/x-msschedule' }); dict.push({ key: '.scr', value: 'text/plain' }); dict.push({ key: '.sct', value: 'text/scriptlet' }); dict.push({ key: '.sd2', value: 'audio/x-sd2' }); dict.push({ key: '.sdp', value: 'application/sdp' }); dict.push({ key: '.sea', value: 'application/octet-stream' }); dict.push({ key: '.searchConnector-ms', value: 'application/windows-search-connector+xml' }); dict.push({ key: '.setpay', value: 'application/set-payment-initiation' }); dict.push({ key: '.setreg', value: 'application/set-registration-initiation' }); dict.push({ key: '.settings', value: 'application/xml' }); dict.push({ key: '.sgimb', value: 'application/x-sgimb' }); dict.push({ key: '.sgml', value: 'text/sgml' }); dict.push({ key: '.sh', value: 'application/x-sh' }); dict.push({ key: '.shar', value: 'application/x-shar' }); dict.push({ key: '.shtml', value: 'text/html' }); dict.push({ key: '.sit', value: 'application/x-stuffit' }); dict.push({ key: '.sitemap', value: 'application/xml' }); dict.push({ key: '.skin', value: 'application/xml' }); dict.push({ key: '.sldm', value: 'application/vnd.ms-powerpoint.slide.macroEnabled.12' }); dict.push({ key: '.sldx', value: 'application/vnd.openxmlformats-officedocument.presentationml.slide' }); dict.push({ key: '.slk', value: 'application/vnd.ms-excel' }); dict.push({ key: '.sln', value: 'text/plain' }); dict.push({ key: '.slupkg-ms', value: 'application/x-ms-license' }); dict.push({ key: '.smd', value: 'audio/x-smd' }); dict.push({ key: '.smi', value: 'application/octet-stream' }); dict.push({ key: '.smx', value: 'audio/x-smd' }); dict.push({ key: '.smz', value: 'audio/x-smd' }); dict.push({ key: '.snd', value: 'audio/basic' }); dict.push({ key: '.snippet', value: 'application/xml' }); dict.push({ key: '.snp', value: 'application/octet-stream' }); dict.push({ key: '.sol', value: 'text/plain' }); dict.push({ key: '.sor', value: 'text/plain' }); dict.push({ key: '.spc', value: 'application/x-pkcs7-certificates' }); dict.push({ key: '.spl', value: 'application/futuresplash' }); dict.push({ key: '.spx', value: 'audio/ogg' }); dict.push({ key: '.src', value: 'application/x-wais-source' }); dict.push({ key: '.srf', value: 'text/plain' }); dict.push({ key: '.SSISDeploymentManifest', value: 'text/xml' }); dict.push({ key: '.ssm', value: 'application/streamingmedia' }); dict.push({ key: '.sst', value: 'application/vnd.ms-pki.certstore' }); dict.push({ key: '.stl', value: 'application/vnd.ms-pki.stl' }); dict.push({ key: '.sv4cpio', value: 'application/x-sv4cpio' }); dict.push({ key: '.sv4crc', value: 'application/x-sv4crc' }); dict.push({ key: '.svc', value: 'application/xml' }); dict.push({ key: '.svg', value: 'image/svg+xml' }); dict.push({ key: '.swf', value: 'application/x-shockwave-flash' }); dict.push({ key: '.step', value: 'application/step' }); dict.push({ key: '.stp', value: 'application/step' }); dict.push({ key: '.t', value: 'application/x-troff' }); dict.push({ key: '.tar', value: 'application/x-tar' }); dict.push({ key: '.tcl', value: 'application/x-tcl' }); dict.push({ key: '.testrunconfig', value: 'application/xml' }); dict.push({ key: '.testsettings', value: 'application/xml' }); dict.push({ key: '.tex', value: 'application/x-tex' }); dict.push({ key: '.texi', value: 'application/x-texinfo' }); dict.push({ key: '.texinfo', value: 'application/x-texinfo' }); dict.push({ key: '.tgz', value: 'application/x-compressed' }); dict.push({ key: '.thmx', value: 'application/vnd.ms-officetheme' }); dict.push({ key: '.thn', value: 'application/octet-stream' }); dict.push({ key: '.tif', value: 'image/tiff' }); dict.push({ key: '.tiff', value: 'image/tiff' }); dict.push({ key: '.tlh', value: 'text/plain' }); dict.push({ key: '.tli', value: 'text/plain' }); dict.push({ key: '.toc', value: 'application/octet-stream' }); dict.push({ key: '.tr', value: 'application/x-troff' }); dict.push({ key: '.trm', value: 'application/x-msterminal' }); dict.push({ key: '.trx', value: 'application/xml' }); dict.push({ key: '.ts', value: 'video/vnd.dlna.mpeg-tts' }); dict.push({ key: '.tsv', value: 'text/tab-separated-values' }); dict.push({ key: '.ttf', value: 'application/font-sfnt' }); dict.push({ key: '.tts', value: 'video/vnd.dlna.mpeg-tts' }); dict.push({ key: '.txt', value: 'text/plain' }); dict.push({ key: '.u32', value: 'application/octet-stream' }); dict.push({ key: '.uls', value: 'text/iuls' }); dict.push({ key: '.user', value: 'text/plain' }); dict.push({ key: '.ustar', value: 'application/x-ustar' }); dict.push({ key: '.vb', value: 'text/plain' }); dict.push({ key: '.vbdproj', value: 'text/plain' }); dict.push({ key: '.vbk', value: 'video/mpeg' }); dict.push({ key: '.vbproj', value: 'text/plain' }); dict.push({ key: '.vbs', value: 'text/vbscript' }); dict.push({ key: '.vcf', value: 'text/x-vcard' }); dict.push({ key: '.vcproj', value: 'application/xml' }); dict.push({ key: '.vcs', value: 'text/plain' }); dict.push({ key: '.vcxproj', value: 'application/xml' }); dict.push({ key: '.vddproj', value: 'text/plain' }); dict.push({ key: '.vdp', value: 'text/plain' }); dict.push({ key: '.vdproj', value: 'text/plain' }); dict.push({ key: '.vdx', value: 'application/vnd.ms-visio.viewer' }); dict.push({ key: '.vml', value: 'text/xml' }); dict.push({ key: '.vscontent', value: 'application/xml' }); dict.push({ key: '.vsct', value: 'text/xml' }); dict.push({ key: '.vsd', value: 'application/vnd.visio' }); dict.push({ key: '.vsi', value: 'application/ms-vsi' }); dict.push({ key: '.vsix', value: 'application/vsix' }); dict.push({ key: '.vsixlangpack', value: 'text/xml' }); dict.push({ key: '.vsixmanifest', value: 'text/xml' }); dict.push({ key: '.vsmdi', value: 'application/xml' }); dict.push({ key: '.vspscc', value: 'text/plain' }); dict.push({ key: '.vss', value: 'application/vnd.visio' }); dict.push({ key: '.vsscc', value: 'text/plain' }); dict.push({ key: '.vssettings', value: 'text/xml' }); dict.push({ key: '.vssscc', value: 'text/plain' }); dict.push({ key: '.vst', value: 'application/vnd.visio' }); dict.push({ key: '.vstemplate', value: 'text/xml' }); dict.push({ key: '.vsto', value: 'application/x-ms-vsto' }); dict.push({ key: '.vsw', value: 'application/vnd.visio' }); dict.push({ key: '.vsx', value: 'application/vnd.visio' }); dict.push({ key: '.vtx', value: 'application/vnd.visio' }); dict.push({ key: '.wav', value: 'audio/wav' }); dict.push({ key: '.wave', value: 'audio/wav' }); dict.push({ key: '.wax', value: 'audio/x-ms-wax' }); dict.push({ key: '.wbk', value: 'application/msword' }); dict.push({ key: '.wbmp', value: 'image/vnd.wap.wbmp' }); dict.push({ key: '.wcm', value: 'application/vnd.ms-works' }); dict.push({ key: '.wdb', value: 'application/vnd.ms-works' }); dict.push({ key: '.wdp', value: 'image/vnd.ms-photo' }); dict.push({ key: '.webarchive', value: 'application/x-safari-webarchive' }); dict.push({ key: '.webm', value: 'video/webm' }); dict.push({ key: '.webp', value: 'image/webp' }); dict.push({ key: '.webtest', value: 'application/xml' }); dict.push({ key: '.wiq', value: 'application/xml' }); dict.push({ key: '.wiz', value: 'application/msword' }); dict.push({ key: '.wks', value: 'application/vnd.ms-works' }); dict.push({ key: '.WLMP', value: 'application/wlmoviemaker' }); dict.push({ key: '.wlpginstall', value: 'application/x-wlpg-detect' }); dict.push({ key: '.wlpginstall3', value: 'application/x-wlpg3-detect' }); dict.push({ key: '.wm', value: 'video/x-ms-wm' }); dict.push({ key: '.wma', value: 'audio/x-ms-wma' }); dict.push({ key: '.wmd', value: 'application/x-ms-wmd' }); dict.push({ key: '.wmf', value: 'application/x-msmetafile' }); dict.push({ key: '.wml', value: 'text/vnd.wap.wml' }); dict.push({ key: '.wmlc', value: 'application/vnd.wap.wmlc' }); dict.push({ key: '.wmls', value: 'text/vnd.wap.wmlscript' }); dict.push({ key: '.wmlsc', value: 'application/vnd.wap.wmlscriptc' }); dict.push({ key: '.wmp', value: 'video/x-ms-wmp' }); dict.push({ key: '.wmv', value: 'video/x-ms-wmv' }); dict.push({ key: '.wmx', value: 'video/x-ms-wmx' }); dict.push({ key: '.wmz', value: 'application/x-ms-wmz' }); dict.push({ key: '.woff', value: 'application/font-woff' }); dict.push({ key: '.wpl', value: 'application/vnd.ms-wpl' }); dict.push({ key: '.wps', value: 'application/vnd.ms-works' }); dict.push({ key: '.wri', value: 'application/x-mswrite' }); dict.push({ key: '.wrl', value: 'x-world/x-vrml' }); dict.push({ key: '.wrz', value: 'x-world/x-vrml' }); dict.push({ key: '.wsc', value: 'text/scriptlet' }); dict.push({ key: '.wsdl', value: 'text/xml' }); dict.push({ key: '.wvx', value: 'video/x-ms-wvx' }); dict.push({ key: '.x', value: 'application/directx' }); dict.push({ key: '.xaf', value: 'x-world/x-vrml' }); dict.push({ key: '.xaml', value: 'application/xaml+xml' }); dict.push({ key: '.xap', value: 'application/x-silverlight-app' }); dict.push({ key: '.xbap', value: 'application/x-ms-xbap' }); dict.push({ key: '.xbm', value: 'image/x-xbitmap' }); dict.push({ key: '.xdr', value: 'text/plain' }); dict.push({ key: '.xht', value: 'application/xhtml+xml' }); dict.push({ key: '.xhtml', value: 'application/xhtml+xml' }); dict.push({ key: '.xla', value: 'application/vnd.ms-excel' }); dict.push({ key: '.xlam', value: 'application/vnd.ms-excel.addin.macroEnabled.12' }); dict.push({ key: '.xlc', value: 'application/vnd.ms-excel' }); dict.push({ key: '.xld', value: 'application/vnd.ms-excel' }); dict.push({ key: '.xlk', value: 'application/vnd.ms-excel' }); dict.push({ key: '.xll', value: 'application/vnd.ms-excel' }); dict.push({ key: '.xlm', value: 'application/vnd.ms-excel' }); dict.push({ key: '.xls', value: 'application/vnd.ms-excel' }); dict.push({ key: '.xlsb', value: 'application/vnd.ms-excel.sheet.binary.macroEnabled.12' }); dict.push({ key: '.xlsm', value: 'application/vnd.ms-excel.sheet.macroEnabled.12' }); dict.push({ key: '.xlsx', value: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }); dict.push({ key: '.xlt', value: 'application/vnd.ms-excel' }); dict.push({ key: '.xltm', value: 'application/vnd.ms-excel.template.macroEnabled.12' }); dict.push({ key: '.xltx', value: 'application/vnd.openxmlformats-officedocument.spreadsheetml.template' }); dict.push({ key: '.xlw', value: 'application/vnd.ms-excel' }); dict.push({ key: '.xml', value: 'text/xml' }); dict.push({ key: '.xmta', value: 'application/xml' }); dict.push({ key: '.xof', value: 'x-world/x-vrml' }); dict.push({ key: '.XOML', value: 'text/plain' }); dict.push({ key: '.xpm', value: 'image/x-xpixmap' }); dict.push({ key: '.xps', value: 'application/vnd.ms-xpsdocument' }); dict.push({ key: '.xrm-ms', value: 'text/xml' }); dict.push({ key: '.xsc', value: 'application/xml' }); dict.push({ key: '.xsd', value: 'text/xml' }); dict.push({ key: '.xsf', value: 'text/xml' }); dict.push({ key: '.xsl', value: 'text/xml' }); dict.push({ key: '.xslt', value: 'text/xml' }); dict.push({ key: '.xsn', value: 'application/octet-stream' }); dict.push({ key: '.xss', value: 'application/xml' }); dict.push({ key: '.xspf', value: 'application/xspf+xml' }); dict.push({ key: '.xtp', value: 'application/octet-stream' }); dict.push({ key: '.xwd', value: 'image/x-xwindowdump' }); dict.push({ key: '.z', value: 'application/x-compress' }); dict.push({ key: '.zip', value: 'application/zip' }); dict.push({ key: 'application/fsharp-script', value: '.fsx' }); dict.push({ key: 'application/msaccess', value: '.adp' }); dict.push({ key: 'application/msword', value: '.doc' }); dict.push({ key: 'application/octet-stream', value: '.bin' }); dict.push({ key: 'application/onenote', value: '.one' }); dict.push({ key: 'application/postscript', value: '.eps' }); dict.push({ key: 'application/step', value: '.step' }); dict.push({ key: 'application/vnd.ms-excel', value: '.xls' }); dict.push({ key: 'application/vnd.ms-powerpoint', value: '.ppt' }); dict.push({ key: 'application/vnd.ms-works', value: '.wks' }); dict.push({ key: 'application/vnd.visio', value: '.vsd' }); dict.push({ key: 'application/x-director', value: '.dir' }); dict.push({ key: 'application/x-shockwave-flash', value: '.swf' }); dict.push({ key: 'application/x-x509-ca-cert', value: '.cer' }); dict.push({ key: 'application/x-zip-compressed', value: '.zip' }); dict.push({ key: 'application/xhtml+xml', value: '.xhtml' }); dict.push({ key: 'application/xml', value: '.xml' }); dict.push({ key: 'audio/aac', value: '.AAC' }); dict.push({ key: 'audio/aiff', value: '.aiff' }); dict.push({ key: 'audio/basic', value: '.snd' }); dict.push({ key: 'audio/mid', value: '.midi' }); dict.push({ key: 'audio/wav', value: '.wav' }); dict.push({ key: 'audio/x-m4a', value: '.m4a' }); dict.push({ key: 'audio/x-mpegurl', value: '.m3u' }); dict.push({ key: 'audio/x-pn-realaudio', value: '.ra' }); dict.push({ key: 'audio/x-smd', value: '.smd' }); dict.push({ key: 'image/bmp', value: '.bmp' }); dict.push({ key: 'image/jpeg', value: '.jpg' }); dict.push({ key: 'image/pict', value: '.pic' }); dict.push({ key: 'image/png', value: '.png' }); dict.push({ key: 'image/tiff', value: '.tiff' }); dict.push({ key: 'image/x-macpaint', value: '.mac' }); dict.push({ key: 'image/x-quicktime', value: '.qti' }); dict.push({ key: 'message/rfc822', value: '.eml' }); dict.push({ key: 'text/html', value: '.html' }); dict.push({ key: 'text/plain', value: '.txt' }); dict.push({ key: 'text/scriptlet', value: '.wsc' }); dict.push({ key: 'text/xml', value: '.xml' }); dict.push({ key: 'video/3gpp', value: '.3gp' }); dict.push({ key: 'video/3gpp2', value: '.3gp2' }); dict.push({ key: 'video/mp4', value: '.mp4' }); dict.push({ key: 'video/mpeg', value: '.mpg' }); dict.push({ key: 'video/quicktime', value: '.mov' }); dict.push({ key: 'video/vnd.dlna.mpeg-tts', value: '.m2t' }); dict.push({ key: 'video/x-dv', value: '.dv' }); dict.push({ key: 'video/x-la-asf', value: '.lsf' }); dict.push({ key: 'video/x-ms-asf', value: '.asf' }); dict.push({ key: 'x-world/x-vrml', value: '.xof' }); dict.push({ key: 'text/h323', value: '.323' }); dict.push({ key: 'application/x-7z-compressed', value: '.7z' }); dict.push({ key: 'audio/audible', value: '.aa' }); dict.push({ key: 'audio/vnd.audible.aax', value: '.aax' }); dict.push({ key: 'audio/ac3', value: '.ac3' }); dict.push({ key: 'application/msaccess.addin', value: '.accda' }); dict.push({ key: 'application/msaccess.cab', value: '.accdc' }); dict.push({ key: 'application/msaccess.runtime', value: '.accdr' }); dict.push({ key: 'application/msaccess.webapplication', value: '.accdw' }); dict.push({ key: 'application/msaccess.ftemplate', value: '.accft' }); dict.push({ key: 'application/internet-property-stream', value: '.acx' }); dict.push({ key: 'application/x-bridge-url', value: '.adobebridge' }); dict.push({ key: 'audio/vnd.dlna.adts', value: '.ADT' }); dict.push({ key: 'application/vnd.adobe.air-application-installer-package+zip', value: '.air' }); dict.push({ key: 'application/mpeg', value: '.amc' }); dict.push({ key: 'application/annodex', value: '.anx' }); dict.push({ key: 'application/vnd.android.package-archive', value: '.apk' }); dict.push({ key: 'application/x-ms-application', value: '.application' }); dict.push({ key: 'image/x-jg', value: '.art' }); dict.push({ key: 'application/atom+xml', value: '.atom' }); dict.push({ key: 'video/x-msvideo', value: '.avi' }); dict.push({ key: 'audio/annodex', value: '.axa' }); dict.push({ key: 'application/olescript', value: '.axs' }); dict.push({ key: 'video/annodex', value: '.axv' }); dict.push({ key: 'application/x-bcpio', value: '.bcpio' }); dict.push({ key: 'audio/x-caf', value: '.caf' }); dict.push({ key: 'application/vnd.ms-office.calx', value: '.calx' }); dict.push({ key: 'application/vnd.ms-pki.seccat', value: '.cat' }); dict.push({ key: 'application/x-cdf', value: '.cdf' }); dict.push({ key: 'application/x-java-applet', value: '.class' }); dict.push({ key: 'application/x-msclip', value: '.clp' }); dict.push({ key: 'image/x-cmx', value: '.cmx' }); dict.push({ key: 'image/cis-cod', value: '.cod' }); dict.push({ key: 'text/x-ms-contact', value: '.contact' }); dict.push({ key: 'application/x-cpio', value: '.cpio' }); dict.push({ key: 'application/x-mscardfile', value: '.crd' }); dict.push({ key: 'application/pkix-crl', value: '.crl' }); dict.push({ key: 'application/x-csh', value: '.csh' }); dict.push({ key: 'text/css', value: '.css' }); dict.push({ key: 'text/csv', value: '.csv' }); dict.push({ key: 'video/divx', value: '.divx' }); dict.push({ key: 'application/x-msdownload', value: '.dll' }); dict.push({ key: 'text/dlm', value: '.dlm' }); dict.push({ key: 'application/vnd.ms-word.document.macroEnabled.12', value: '.docm' }); dict.push({ key: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', value: '.docx' }); dict.push({ key: 'application/vnd.ms-word.template.macroEnabled.12', value: '.dotm' }); dict.push({ key: 'application/vnd.openxmlformats-officedocument.wordprocessingml.template', value: '.dotx' }); dict.push({ key: 'application/x-dvi', value: '.dvi' }); dict.push({ key: 'drawing/x-dwf', value: '.dwf' }); dict.push({ key: 'application/vnd.ms-fontobject', value: '.eot' }); dict.push({ key: 'application/etl', value: '.etl' }); dict.push({ key: 'text/x-setext', value: '.etx' }); dict.push({ key: 'application/envoy', value: '.evy' }); dict.push({ key: 'application/vnd.fdf', value: '.fdf' }); dict.push({ key: 'application/fractals', value: '.fif' }); dict.push({ key: 'audio/flac', value: '.flac' }); dict.push({ key: 'video/x-flv', value: '.flv' }); dict.push({ key: 'image/gif', value: '.gif' }); dict.push({ key: 'application/gpx+xml', value: '.gpx' }); dict.push({ key: 'text/x-ms-group', value: '.group' }); dict.push({ key: 'audio/x-gsm', value: '.gsm' }); dict.push({ key: 'application/x-gtar', value: '.gtar' }); dict.push({ key: 'application/x-gzip', value: '.gz' }); dict.push({ key: 'application/x-hdf', value: '.hdf' }); dict.push({ key: 'text/x-hdml', value: '.hdml' }); dict.push({ key: 'application/x-oleobject', value: '.hhc' }); dict.push({ key: 'application/winhlp', value: '.hlp' }); dict.push({ key: 'application/mac-binhex40', value: '.hqx' }); dict.push({ key: 'application/hta', value: '.hta' }); dict.push({ key: 'text/x-component', value: '.htc' }); dict.push({ key: 'text/webviewhtml', value: '.htt' }); dict.push({ key: 'image/x-icon', value: '.ico' }); dict.push({ key: 'image/ief', value: '.ief' }); dict.push({ key: 'application/x-iphone', value: '.iii' }); dict.push({ key: 'application/x-internet-signup', value: '.ins' }); dict.push({ key: 'application/x-itunes-ipa', value: '.ipa' }); dict.push({ key: 'application/x-itunes-ipg', value: '.ipg' }); dict.push({ key: 'application/x-itunes-ipsw', value: '.ipsw' }); dict.push({ key: 'text/x-ms-iqy', value: '.iqy' }); dict.push({ key: 'application/x-itunes-ite', value: '.ite' }); dict.push({ key: 'application/x-itunes-itlp', value: '.itlp' }); dict.push({ key: 'application/x-itunes-itms', value: '.itms' }); dict.push({ key: 'application/x-itunes-itpc', value: '.itpc' }); dict.push({ key: 'video/x-ivf', value: '.IVF' }); dict.push({ key: 'application/java-archive', value: '.jar' }); dict.push({ key: 'application/liquidmotion', value: '.jck' }); dict.push({ key: 'image/pjpeg', value: '.jfif' }); dict.push({ key: 'application/x-java-jnlp-file', value: '.jnlp' }); dict.push({ key: 'application/javascript', value: '.js' }); dict.push({ key: 'application/json', value: '.json' }); dict.push({ key: 'text/jscript', value: '.jsx' }); dict.push({ key: 'application/x-latex', value: '.latex' }); dict.push({ key: 'application/windows-library+xml', value: '.library-ms' }); dict.push({ key: 'application/x-ms-reader', value: '.lit' }); dict.push({ key: 'application/x-msmediaview', value: '.m13' }); dict.push({ key: 'audio/m4a', value: '.m4a' }); dict.push({ key: 'audio/m4b', value: '.m4b' }); dict.push({ key: 'audio/m4p', value: '.m4p' }); dict.push({ key: 'audio/x-m4r', value: '.m4r' }); dict.push({ key: 'video/x-m4v', value: '.m4v' }); dict.push({ key: 'application/x-troff-man', value: '.man' }); dict.push({ key: 'application/x-ms-manifest', value: '.manifest' }); dict.push({ key: 'application/x-msaccess', value: '.mdb' }); dict.push({ key: 'application/x-troff-me', value: '.me' }); dict.push({ key: 'application/x-smaf', value: '.mmf' }); dict.push({ key: 'application/x-msmoney', value: '.mny' }); dict.push({ key: 'video/x-sgi-movie', value: '.movie' }); dict.push({ key: 'audio/mpeg', value: '.mp3' }); dict.push({ key: 'application/vnd.ms-mediapackage', value: '.mpf' }); dict.push({ key: 'application/vnd.ms-project', value: '.mpp' }); dict.push({ key: 'application/x-troff-ms', value: '.ms' }); dict.push({ key: 'application/x-miva-compiled', value: '.mvc' }); dict.push({ key: 'application/x-mmxp', value: '.mxp' }); dict.push({ key: 'application/x-netcdf', value: '.nc' }); dict.push({ key: 'application/oda', value: '.oda' }); dict.push({ key: 'application/vnd.oasis.opendocument.database', value: '.odb' }); dict.push({ key: 'application/vnd.oasis.opendocument.chart', value: '.odc' }); dict.push({ key: 'application/vnd.oasis.opendocument.formula', value: '.odf' }); dict.push({ key: 'application/vnd.oasis.opendocument.graphics', value: '.odg' }); dict.push({ key: 'application/vnd.oasis.opendocument.image', value: '.odi' }); dict.push({ key: 'application/vnd.oasis.opendocument.text-master', value: '.odm' }); dict.push({ key: 'application/vnd.oasis.opendocument.presentation', value: '.odp' }); dict.push({ key: 'application/vnd.oasis.opendocument.spreadsheet', value: '.ods' }); dict.push({ key: 'application/vnd.oasis.opendocument.text', value: '.odt' }); dict.push({ key: 'audio/ogg', value: '.oga' }); dict.push({ key: 'video/ogg', value: '.ogv' }); dict.push({ key: 'application/ogg', value: '.ogx' }); dict.push({ key: 'application/opensearchdescription+xml', value: '.osdx' }); dict.push({ key: 'application/font-sfnt', value: '.otf' }); dict.push({ key: 'application/vnd.oasis.opendocument.graphics-template', value: '.otg' }); dict.push({ key: 'application/vnd.oasis.opendocument.text-web', value: '.oth' }); dict.push({ key: 'application/vnd.oasis.opendocument.presentation-template', value: '.otp' }); dict.push({ key: 'application/vnd.oasis.opendocument.spreadsheet-template', value: '.ots' }); dict.push({ key: 'application/vnd.oasis.opendocument.text-template', value: '.ott' }); dict.push({ key: 'application/vnd.openofficeorg.extension', value: '.oxt' }); dict.push({ key: 'application/pkcs10', value: '.p10' }); dict.push({ key: 'application/x-pkcs12', value: '.p12' }); dict.push({ key: 'application/x-pkcs7-certificates', value: '.p7b' }); dict.push({ key: 'application/pkcs7-mime', value: '.p7c' }); dict.push({ key: 'application/x-pkcs7-certreqresp', value: '.p7r' }); dict.push({ key: 'application/pkcs7-signature', value: '.p7s' }); dict.push({ key: 'image/x-portable-bitmap', value: '.pbm' }); dict.push({ key: 'application/x-podcast', value: '.pcast' }); dict.push({ key: 'application/pdf', value: '.pdf' }); dict.push({ key: 'image/x-portable-graymap', value: '.pgm' }); dict.push({ key: 'application/vnd.ms-pki.pko', value: '.pko' }); dict.push({ key: 'audio/scpls', value: '.pls' }); dict.push({ key: 'application/x-perfmon', value: '.pma' }); dict.push({ key: 'image/x-portable-anymap', value: '.pnm' }); dict.push({ key: 'application/vnd.ms-powerpoint.template.macroEnabled.12', value: '.potm' }); dict.push({ key: 'application/vnd.openxmlformats-officedocument.presentationml.template', value: '.potx' }); dict.push({ key: 'application/vnd.ms-powerpoint.addin.macroEnabled.12', value: '.ppam' }); dict.push({ key: 'image/x-portable-pixmap', value: '.ppm' }); dict.push({ key: 'application/vnd.ms-powerpoint.slideshow.macroEnabled.12', value: '.ppsm' }); dict.push({ key: 'application/vnd.openxmlformats-officedocument.presentationml.slideshow', value: '.ppsx' }); dict.push({ key: 'application/vnd.ms-powerpoint.presentation.macroEnabled.12', value: '.pptm' }); dict.push({ key: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', value: '.pptx' }); dict.push({ key: 'application/pics-rules', value: '.prf' }); dict.push({ key: 'application/PowerShell', value: '.psc1' }); dict.push({ key: 'application/x-mspublisher', value: '.pub' }); dict.push({ key: 'text/x-html-insertion', value: '.qht' }); dict.push({ key: 'application/x-quicktimeplayer', value: '.qtl' }); dict.push({ key: 'application/x-rar-compressed', value: '.rar' }); dict.push({ key: 'image/x-cmu-raster', value: '.ras' }); dict.push({ key: 'application/rat-file', value: '.rat' }); dict.push({ key: 'image/vnd.rn-realflash', value: '.rf' }); dict.push({ key: 'image/x-rgb', value: '.rgb' }); dict.push({ key: 'application/vnd.rn-realmedia', value: '.rm' }); dict.push({ key: 'application/vnd.rn-rn_music_package', value: '.rmp' }); dict.push({ key: 'application/x-troff', value: '.roff' }); dict.push({ key: 'audio/x-pn-realaudio-plugin', value: '.rpm' }); dict.push({ key: 'text/x-ms-rqy', value: '.rqy' }); dict.push({ key: 'application/rtf', value: '.rtf' }); dict.push({ key: 'text/richtext', value: '.rtx' }); dict.push({ key: 'application/x-safari-safariextz', value: '.safariextz' }); dict.push({ key: 'application/x-msschedule', value: '.scd' }); dict.push({ key: 'audio/x-sd2', value: '.sd2' }); dict.push({ key: 'application/sdp', value: '.sdp' }); dict.push({ key: 'application/windows-search-connector+xml', value: '.searchConnector-ms' }); dict.push({ key: 'application/set-payment-initiation', value: '.setpay' }); dict.push({ key: 'application/set-registration-initiation', value: '.setreg' }); dict.push({ key: 'application/x-sgimb', value: '.sgimb' }); dict.push({ key: 'text/sgml', value: '.sgml' }); dict.push({ key: 'application/x-sh', value: '.sh' }); dict.push({ key: 'application/x-shar', value: '.shar' }); dict.push({ key: 'application/x-stuffit', value: '.sit' }); dict.push({ key: 'application/vnd.ms-powerpoint.slide.macroEnabled.12', value: '.sldm' }); dict.push({ key: 'application/vnd.openxmlformats-officedocument.presentationml.slide', value: '.sldx' }); dict.push({ key: 'application/x-ms-license', value: '.slupkg-ms' }); dict.push({ key: 'application/futuresplash', value: '.spl' }); dict.push({ key: 'application/x-wais-source', value: '.src' }); dict.push({ key: 'application/streamingmedia', value: '.ssm' }); dict.push({ key: 'application/vnd.ms-pki.certstore', value: '.sst' }); dict.push({ key: 'application/vnd.ms-pki.stl', value: '.stl' }); dict.push({ key: 'application/x-sv4cpio', value: '.sv4cpio' }); dict.push({ key: 'application/x-sv4crc', value: '.sv4crc' }); dict.push({ key: 'image/svg+xml', value: '.svg' }); dict.push({ key: 'application/x-tar', value: '.tar' }); dict.push({ key: 'application/x-tcl', value: '.tcl' }); dict.push({ key: 'application/x-tex', value: '.tex' }); dict.push({ key: 'application/x-texinfo', value: '.texi' }); dict.push({ key: 'application/x-compressed', value: '.tgz' }); dict.push({ key: 'application/vnd.ms-officetheme', value: '.thmx' }); dict.push({ key: 'application/x-msterminal', value: '.trm' }); dict.push({ key: 'text/tab-separated-values', value: '.tsv' }); dict.push({ key: 'text/iuls', value: '.uls' }); dict.push({ key: 'application/x-ustar', value: '.ustar' }); dict.push({ key: 'text/vbscript', value: '.vbs' }); dict.push({ key: 'text/x-vcard', value: '.vcf' }); dict.push({ key: 'application/vnd.ms-visio.viewer', value: '.vdx' }); dict.push({ key: 'application/ms-vsi', value: '.vsi' }); dict.push({ key: 'application/vsix', value: '.vsix' }); dict.push({ key: 'application/x-ms-vsto', value: '.vsto' }); dict.push({ key: 'audio/x-ms-wax', value: '.wax' }); dict.push({ key: 'image/vnd.wap.wbmp', value: '.wbmp' }); dict.push({ key: 'image/vnd.ms-photo', value: '.wdp' }); dict.push({ key: 'application/x-safari-webarchive', value: '.webarchive' }); dict.push({ key: 'video/webm', value: '.webm' }); dict.push({ key: 'image/webp', value: '.webp' }); dict.push({ key: 'application/wlmoviemaker', value: '.WLMP' }); dict.push({ key: 'application/x-wlpg-detect', value: '.wlpginstall' }); dict.push({ key: 'application/x-wlpg3-detect', value: '.wlpginstall3' }); dict.push({ key: 'video/x-ms-wm', value: '.wm' }); dict.push({ key: 'audio/x-ms-wma', value: '.wma' }); dict.push({ key: 'application/x-ms-wmd', value: '.wmd' }); dict.push({ key: 'application/x-msmetafile', value: '.wmf' }); dict.push({ key: 'text/vnd.wap.wml', value: '.wml' }); dict.push({ key: 'application/vnd.wap.wmlc', value: '.wmlc' }); dict.push({ key: 'text/vnd.wap.wmlscript', value: '.wmls' }); dict.push({ key: 'application/vnd.wap.wmlscriptc', value: '.wmlsc' }); dict.push({ key: 'video/x-ms-wmp', value: '.wmp' }); dict.push({ key: 'video/x-ms-wmv', value: '.wmv' }); dict.push({ key: 'video/x-ms-wmx', value: '.wmx' }); dict.push({ key: 'application/x-ms-wmz', value: '.wmz' }); dict.push({ key: 'application/font-woff', value: '.woff' }); dict.push({ key: 'application/vnd.ms-wpl', value: '.wpl' }); dict.push({ key: 'application/x-mswrite', value: '.wri' }); dict.push({ key: 'video/x-ms-wvx', value: '.wvx' }); dict.push({ key: 'application/directx', value: '.x' }); dict.push({ key: 'application/xaml+xml', value: '.xaml' }); dict.push({ key: 'application/x-silverlight-app', value: '.xap' }); dict.push({ key: 'application/x-ms-xbap', value: '.xbap' }); dict.push({ key: 'image/x-xbitmap', value: '.xbm' }); dict.push({ key: 'application/vnd.ms-excel.addin.macroEnabled.12', value: '.xlam' }); dict.push({ key: 'application/vnd.ms-excel.sheet.binary.macroEnabled.12', value: '.xlsb' }); dict.push({ key: 'application/vnd.ms-excel.sheet.macroEnabled.12', value: '.xlsm' }); dict.push({ key: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', value: '.xlsx' }); dict.push({ key: 'application/vnd.ms-excel.template.macroEnabled.12', value: '.xltm' }); dict.push({ key: 'application/vnd.openxmlformats-officedocument.spreadsheetml.template', value: '.xltx' }); dict.push({ key: 'image/x-xpixmap', value: '.xpm' }); dict.push({ key: 'application/vnd.ms-xpsdocument', value: '.xps' }); dict.push({ key: 'application/xspf+xml', value: '.xspf' }); dict.push({ key: 'image/x-xwindowdump', value: '.xwd' }); dict.push({ key: 'application/x-compress', value: '.z' }); dict.push({ key: 'application/zip', value: '.zip' });
    var result = dict.filter(function (obj) {
        return obj.key === extension.toLowerCase();
    });

    if (result.length > 0)
        return result[0].value;
    else
        return "";
}
function bytesToMBs(bytes) {
    if (bytes == 0) return '0';
    var mbs = bytes / Math.pow(1024, 2);
    var truncated = mbs.toString().match(/^-?\d+(?:\.\d{0,6})?/)[0];// truncate to 6 decimal places
    return truncated;
}
function ajaxSetup_beforeSend(xhr) {
}
/**
 * Sanitize and encode all HTML in a user-submitted string
 * @param  {String} str  The user-submitted string
 * @return {String} str  The sanitized string
 */
function sanitizeHTML(str) {
    if (!str)
        return str;
    return str.replace(/[^\w. ]/gi, function (c) {
        return '&#' + c.charCodeAt(0) + ';';
    });
}
/**
 * compare scheme, host, and port from two URIs, if they are the same, then these two URIs are the same origin.
 * @param {string} url url that need to be tested
 */
function isOriginSameAsLocation(url) {
    var pageLocation = window.location;
    var URL_HOST_PATTERN = /(\w+:)?(?:\/\/)([\w.-]+)?(?::(\d+))?\/?/;
    var urlMatch = URL_HOST_PATTERN.exec(url) || [];
    var urlparts = {
        protocol: urlMatch[1] || '',
        host: urlMatch[2] || '',
        port: urlMatch[3] || ''
    };

    function defaultPort(protocol) {
        return { 'http:': 80, 'https:': 443 }[protocol];
    }

    function portOf(location) {
        return location.port || defaultPort(location.protocol || pageLocation.protocol);
    }

    var isFromSameLocation = !!((urlparts.protocol && (urlparts.protocol == pageLocation.protocol)) &&
        (urlparts.host && (urlparts.host == pageLocation.hostname)) &&
        (urlparts.host && (portOf(urlparts) == portOf(pageLocation)))
    );
    if (!isFromSameLocation)
        throw url + "is not from same origin";
}
function showUnAuthorizedModal() {
    $('body').append('<div class="modal fade" id="unauthorized-access-bnsights-js-modal" tabindex="-1" role="dialog" aria-hidden="false" data-backdrop="static" data-keyboard="false">\
         <div class="modal-dialog" role="document">\
         <div class="modal-content border border-danger">\
                 <div class="modal-body py-30">                                                                                                                         \
                     <div class="text-center">                                                                                                                          \
                         <i class="fa fa-exclamation-triangle" style="font-size: 32px; color:red;"></i>                                                                 \
                         <h4>{0}</h4>                                                                    \
                     </div>                                                                                                                                             \
                 </div>                                                                                                                                                 \
                 <div class="modal-footer justify-content-center">                                                                                                      \
                     <a class="btn btn-success ams-refresh" href="/Home/Index"><i class="fa fa-sync-alt"></i> \
        {1} \
                     </a> \
                 </div>\
             </div>\
         </div>\
         </div>'.format(Bnsights.isEnglish ? "Unauthorized access" : "وصول غير مصرح", Bnsights.isEnglish ? "Reload" : "اعادة التحميل"));
    $("#unauthorized-access-bnsights-js-modal").modal('show');
}
